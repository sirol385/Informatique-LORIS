const TOOLS = [
  { id: "img-convert", icon: "🔄", name: "Convertir une image",
    desc: "JPG, PNG, WEBP, PDF ou ICO.",
    accept: "image/*", multiple: true, options: "format",
    formats: [
      { value: "jpg", label: "JPG" },
      { value: "png", label: "PNG" },
      { value: "webp", label: "WEBP" },
      { value: "pdf", label: "PDF" },
      { value: "ico", label: "ICO" },],
    run: runImageConvert,},
  { id: "pdf-convert", icon: "📄", name: "Convertir un PDF",
    desc: "Exporter en JPG ou en texte Word.",
    accept: "application/pdf", multiple: false, options: "format",
    formats: [
      { value: "jpg", label: "JPG" },
      { value: "word", label: "Word (.docx)" },],
    run: runPdfConvert,},
  { id: "compress-jpg", icon: "🗜️", name: "Compresser une image",
    desc: "Réduire le poids d'un JPG.",
    accept: "image/*", multiple: true, options: "compress",
    run: runCompressJpg,},
  { id: "compress-pdf", icon: "📦", name: "Compresser un PDF",
    desc: "Réduire le poids d'un PDF.",
    accept: "application/pdf", multiple: false, options: "compress",
    run: runCompressPdf,},
  { id: "merge-pdf", icon: "🧩", name: "Fusionner en PDF",
    desc: "Word ou Excel en un seul PDF.",
    accept: ".docx,.xlsx,.xls,.csv,.pdf,image/*", multiple: true, merge: true, options: null,
    runLabel: "Fusionner", busyLabel: "Fusion…",
    run: runMergePdf,},];
async function runImgToPdf(files, opts, setStatus) {
  await loadScript(JSPDF_URL);
  const { jsPDF } = window.jspdf;
  let doc = null;
  for (let i = 0; i < files.length; i++) {
    setStatus(`Image ${i + 1}/${files.length}…`);
    const img = await fileToImage(files[i]);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const orientation = canvas.width > canvas.height ? "l" : "p";
    if (!doc) doc = new jsPDF({ orientation, unit: "px", format: [canvas.width, canvas.height] });
    else doc.addPage([canvas.width, canvas.height], orientation);
    doc.addImage(dataUrl, "JPEG", 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(img.src);
  }
  return { blob: doc.output("blob"), filename: "images.pdf" };
}
async function runPdfToJpg(files, opts, setStatus) {
  const pdfjsLib = await loadPdfjs();
  const buf = await files[0].arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const outputs = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    setStatus(`Page ${p}/${pdf.numPages}…`);
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", 0.9));
    outputs.push({ blob, filename: `page-${String(p).padStart(2, "0")}.jpg` });
  }
  return zipOrSingle(outputs, "pages.zip");
}
async function runPdfToWord(files, opts, setStatus) {
  const pdfjsLib = await loadPdfjs();
  const { Document, Packer, Paragraph, PageBreak } = await loadDocx();
  const buf = await files[0].arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const children = [];
  for (let p = 1; p <= pdf.numPages; p++) {
    setStatus(`Page ${p}/${pdf.numPages}…`);
    const page = await pdf.getPage(p);
    const content = await page.getTextContent();
    const lines = {};
    content.items.forEach(item => {
      const y = Math.round(item.transform[5]);
      (lines[y] = lines[y] || []).push(item.str);
    });
    Object.keys(lines).map(Number).sort((a, b) => b - a).forEach(y => {
      children.push(new Paragraph(lines[y].join(" ")));
    });
    if (p < pdf.numPages) children.push(new Paragraph({ children: [new PageBreak()] }));
  }
  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  return { blob, filename: `${baseName(files[0].name)}.docx` };
}
async function runPdfConvert(files, opts, setStatus) {
  if (opts.format === "word") return runPdfToWord(files, opts, setStatus);
  return runPdfToJpg(files, opts, setStatus);
}
async function runImageToIco(files, opts, setStatus) {
  const sizes = [16, 32, 48, 64, 128, 256];
  const img = await fileToImage(files[0]);
  const pngBuffers = [];
  for (const size of sizes) {
    setStatus(`Génération ${size}×${size}…`);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    const ratio = Math.min(size / img.naturalWidth, size / img.naturalHeight);
    const w = img.naturalWidth * ratio;
    const h = img.naturalHeight * ratio;
    ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
    const blob = await new Promise(res => canvas.toBlob(res, "image/png"));
    pngBuffers.push(new Uint8Array(await blob.arrayBuffer()));
  }
  URL.revokeObjectURL(img.src);
  const headerSize = 6 + 16 * sizes.length;
  const total = headerSize + pngBuffers.reduce((a, b) => a + b.length, 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);
  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, sizes.length, true);
  let offset = headerSize;
  sizes.forEach((size, i) => {
    const e = 6 + i * 16;
    out[e] = size === 256 ? 0 : size;
    out[e + 1] = size === 256 ? 0 : size;
    view.setUint16(e + 4, 1, true);
    view.setUint16(e + 6, 32, true);
    view.setUint32(e + 8, pngBuffers[i].length, true);
    view.setUint32(e + 12, offset, true);
    out.set(pngBuffers[i], offset);
    offset += pngBuffers[i].length;
  });
  return { blob: new Blob([out], { type: "image/x-icon" }), filename: "favicon.ico" };
}
async function runImageConvert(files, opts, setStatus) {
  const format = opts.format || "png";
  if (format === "pdf") return runImgToPdf(files, opts, setStatus);
  if (format === "ico") return runImageToIco(files, opts, setStatus);
  const targetMime = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" }[format];
  const outputs = [];
  for (let i = 0; i < files.length; i++) {
    setStatus(`Image ${i + 1}/${files.length}…`);
    const img = await fileToImage(files[i]);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (targetMime === "image/jpeg") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise(res => canvas.toBlob(res, targetMime, 0.92));
    outputs.push({ blob, filename: `${baseName(files[i].name)}.${format}` });
    URL.revokeObjectURL(img.src);
  }
  return zipOrSingle(outputs, "images-converties.zip");
}
async function runCompressJpg(files, opts, setStatus) {
  const quality = JPG_LEVELS[opts.compressLevel] || JPG_LEVELS.recommandee;
  const outputs = [];
  for (let i = 0; i < files.length; i++) {
    setStatus(`Compression ${i + 1}/${files.length}…`);
    const img = await fileToImage(files[i]);
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise(res => canvas.toBlob(res, "image/jpeg", quality));
    outputs.push({ blob, filename: `${baseName(files[i].name)}-compresse.jpg` });
    URL.revokeObjectURL(img.src);
  }
  return zipOrSingle(outputs, "images-compressees.zip");
}
async function runCompressPdf(files, opts, setStatus) {
  const pdfjsLib = await loadPdfjs();
  await loadScript(JSPDF_URL);
  const { jsPDF } = window.jspdf;
  const level = PDF_LEVELS[opts.compressLevel] || PDF_LEVELS.recommandee;
  const buf = await files[0].arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  let doc = null;
  for (let p = 1; p <= pdf.numPages; p++) {
    setStatus(`Page ${p}/${pdf.numPages}…`);
    const page = await pdf.getPage(p);
    const viewport = page.getViewport({ scale: level.scale });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    const dataUrl = canvas.toDataURL("image/jpeg", level.quality);
    const orientation = canvas.width > canvas.height ? "l" : "p";
    if (!doc) doc = new jsPDF({ orientation, unit: "px", format: [canvas.width, canvas.height] });
    else doc.addPage([canvas.width, canvas.height], orientation);
    doc.addImage(dataUrl, "JPEG", 0, 0, canvas.width, canvas.height);
  }
  return { blob: doc.output("blob"), filename: `${baseName(files[0].name)}-compresse.pdf` };
}
const MERGE_TYPES = {
  docx: "word", xlsx: "excel", xls: "excel", csv: "excel", pdf: "pdf",
  jpg: "image", jpeg: "image", png: "image", webp: "image", gif: "image", bmp: "image",};
const MERGE_ICONS = { word: "📝", excel: "📊", pdf: "📄", image: "🖼️" };
function fileExt(name) {
  const m = /\.([^.]+)$/.exec(name);
  return m ? m[1].toLowerCase() : "";
}
function mergeKind(file) {
  return MERGE_TYPES[fileExt(file.name)] || null;
}
async function runMergePdf(files, opts, setStatus) {
  await loadScript(PDFLIB_URL);
  const { PDFDocument } = window.PDFLib;
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const label = `Fichier ${i + 1}/${files.length} : ${f.name}`;
    setStatus(label + "…");
    const kind = mergeKind(f);
    let bytes;
    if (kind === "pdf") bytes = new Uint8Array(await f.arrayBuffer());
    else if (kind === "word") bytes = await wordToPdfBytes(f, msg => setStatus(label + " (" + msg + ")"));
    else if (kind === "excel") bytes = await excelToPdfBytes(f);
    else if (kind === "image") bytes = await imageToPdfBytes(f);
    else throw new Error("Format non pris en charge : " + f.name);
    let src;
    try { src = await PDFDocument.load(bytes); }
    catch (e) { throw new Error("PDF illisible ou protégé par mot de passe : " + f.name); }
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach(p => out.addPage(p));
  }
  const bytes = await out.save();
  return { blob: new Blob([bytes], { type: "application/pdf" }), filename: "fusion.pdf" };
}
async function imageToPdfBytes(file) {
  await loadScript(JSPDF_URL);
  const { jsPDF } = window.jspdf;
  const img = await fileToImage(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(img.src);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  const doc = new jsPDF({ orientation: canvas.width > canvas.height ? "l" : "p", unit: "pt", format: "a4" });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const ratio = Math.min((pw - 56) / canvas.width, (ph - 56) / canvas.height);
  const w = canvas.width * ratio;
  const h = canvas.height * ratio;
  doc.addImage(dataUrl, "JPEG", (pw - w) / 2, (ph - h) / 2, w, h);
  return new Uint8Array(doc.output("arraybuffer"));
}
async function excelToPdfBytes(file) {
  await loadScript(XLSX_URL);
  await loadScript(JSPDF_URL);
  await loadScript(AUTOTABLE_URL);
  const { jsPDF } = window.jspdf;
  let wb;
  try {
    wb = fileExt(file.name) === "csv"
      ? window.XLSX.read(await file.text(), { type: "string" })
      : window.XLSX.read(await file.arrayBuffer(), { type: "array" });
  } catch (e) { throw new Error("Fichier Excel illisible : " + file.name); }
  let doc = null;
  wb.SheetNames.forEach(name => {
    const rows = window.XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, raw: false, defval: "" })
      .filter(r => r.some(c => String(c).trim() !== ""));
    if (!rows.length) return;
    const cols = Math.max(...rows.map(r => r.length));
    const orientation = cols > 6 ? "l" : "p";
    if (!doc) doc = new jsPDF({ orientation, unit: "pt", format: "a4" });
    else doc.addPage("a4", orientation);
    const padded = rows.map(r => r.concat(Array(cols - r.length).fill("")));
    let startY = 30;
    if (wb.SheetNames.length > 1) {
      doc.setFontSize(11);
      doc.text(name, 30, 30);
      startY = 40;
    }
    doc.autoTable({
      head: [padded[0]], body: padded.slice(1), startY, margin: 30, theme: "grid",
      styles: { fontSize: 8, cellPadding: 3, overflow: "linebreak" },
      headStyles: { fillColor: [79, 157, 255], textColor: 255 },
      horizontalPageBreak: true,
    });
  });
  if (!doc) throw new Error("Classeur vide : " + file.name);
  return new Uint8Array(doc.output("arraybuffer"));
}
function lineRects(sec) {
  const top = sec.getBoundingClientRect().top;
  const rects = [];
  const range = document.createRange();
  const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    if (!walker.currentNode.nodeValue.trim()) continue;
    range.selectNodeContents(walker.currentNode);
    for (const r of range.getClientRects()) if (r.height) rects.push([r.top - top, r.bottom - top, 0.15]);
  }
  sec.querySelectorAll("img, svg, canvas").forEach(el => {
    const r = el.getBoundingClientRect();
    rects.push([r.top - top, r.bottom - top, 0]);
  });
  return rects;
}
function snapCut(rects, min, max) {
  for (let c = Math.floor(max); c > min; c--) {
    const cuts = rects.some(([t, b, k]) => { const m = (b - t) * k; return c > t + m && c < b - m; });
    if (!cuts) return c;
  }
  return max;
}
async function wordToPdfBytes(file, setStatus) {
  await loadScript(JSZIP_URL);
  await loadScript(DOCXPREVIEW_URL);
  await loadScript(HTML2CANVAS_URL);
  await loadScript(JSPDF_URL);
  const { jsPDF } = window.jspdf;
  const root = document.createElement("div");
  root.id = "merge-render-root";
  root.style.cssText = "position:absolute;left:-100000px;top:0;background:#fff;";
  document.body.appendChild(root);
  try {
    try {
      await window.docx.renderAsync(file, root, null, {
        className: "docx", inWrapper: false, breakPages: true,
        ignoreLastRenderedPageBreak: false, useBase64URL: true,
      });
    } catch (e) { throw new Error("Fichier Word illisible : " + file.name); }
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    const sections = Array.from(root.querySelectorAll("section.docx"));
    if (!sections.length) throw new Error("Document Word vide : " + file.name);
    const SCALE = 2;
    const PT = 0.75;
    let doc = null;
    let pageNo = 0;
    for (const sec of sections) {
      const cs = getComputedStyle(sec);
      const pageW = Math.round(sec.getBoundingClientRect().width);
      const totalH = Math.ceil(sec.getBoundingClientRect().height);
      const pageH = Math.round(parseFloat(cs.minHeight)) || Math.round(pageW * 1.414);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const padBottom = parseFloat(cs.paddingBottom) || 0;
      const chunks = [];
      if (totalH <= pageH * 1.02) {
        chunks.push({ y: 0, h: totalH, top: 0, pageH: Math.max(pageH, totalH) });
      } else {
        const contentH = Math.max(200, pageH - padTop - padBottom);
        const end = totalH - padBottom;
        const lines = lineRects(sec);
        let y = padTop;
        while (y < end - 1) {
          let cut = Math.min(y + contentH, end);
          if (cut < end) cut = snapCut(lines, y + contentH * 0.6, cut);
          chunks.push({ y, h: cut - y, top: padTop, pageH });
          y = cut;
        }
      }
      for (const c of chunks) {
        pageNo++;
        setStatus("page " + pageNo);
        const canvas = await window.html2canvas(sec, {
          scale: SCALE, backgroundColor: "#fff", useCORS: true, logging: false,
          y: Math.round(c.y), height: Math.round(c.h), width: pageW, windowWidth: Math.max(window.innerWidth, pageW + 40),
          onclone: d => { const r = d.getElementById("merge-render-root"); if (r) r.style.left = "0"; },
        });
        const img = canvas.toDataURL("image/jpeg", 0.8);
        const fmt = [pageW * PT, c.pageH * PT];
        const orientation = pageW > c.pageH ? "l" : "p";
        if (!doc) doc = new jsPDF({ orientation, unit: "pt", format: fmt });
        else doc.addPage(fmt, orientation);
        doc.addImage(img, "JPEG", 0, c.top * PT, pageW * PT, c.h * PT);
      }
    }
    return new Uint8Array(doc.output("arraybuffer"));
  } finally {
    root.remove();
  }
}
function moveFile(i, delta) {
  const j = i + delta;
  if (j < 0 || j >= currentFiles.length) return;
  const copy = currentFiles.slice();
  [copy[i], copy[j]] = [copy[j], copy[i]];
  currentFiles = copy;
  renderFileList();
}
function removeFile(i) {
  currentFiles = currentFiles.filter((f, k) => k !== i);
  renderFileList();
}
async function runCurrentTool() {
  if (!currentTool || !currentFiles.length) return;
  const runBtn = document.getElementById("convert-run-btn");
  const status = document.getElementById("convert-status");
  const dl = document.getElementById("convert-download");
  runBtn.disabled = true;
    runBtn.textContent = currentTool.busyLabel || "Conversion…";
  dl.hidden = true;
  try {
    const opts = {
      format: currentTool.options === "format" ? document.getElementById("convert-format-select").value : null,
      compressLevel,
    };
    const result = await currentTool.run(currentFiles, opts, msg => { status.textContent = msg; });
    if (dl.href && dl.href.startsWith("blob:")) URL.revokeObjectURL(dl.href);
    const url = URL.createObjectURL(result.blob);
    dl.href = url;
    dl.download = result.filename;
    dl.hidden = false;
    dl.click();
    status.textContent = "Terminé ✅";
  } catch (err) {
    console.error(err);
    status.textContent = "Erreur : " + (err && err.message ? err.message : "conversion impossible.");
  } finally {
    runBtn.disabled = currentFiles.length === 0;
    runBtn.textContent = currentTool.runLabel || "Convertir";
  }
}
async function loadPdfjs() {
  if (_pdfjsLib) return _pdfjsLib;
  _pdfjsLib = await import(`https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.min.mjs`);
  _pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build/pdf.worker.min.mjs`;
  return _pdfjsLib;
}
async function loadDocx() {
  if (_docxLib) return _docxLib;
  _docxLib = await import("https://cdn.jsdelivr.net/npm/docx@8/+esm");
  return _docxLib;
}
async function zipOrSingle(outputs, zipName) {
  if (outputs.length === 1) return outputs[0];
  await loadScript(JSZIP_URL);
  const zip = new window.JSZip();
  outputs.forEach(o => zip.file(o.filename, o.blob));
  return { blob: await zip.generateAsync({ type: "blob" }), filename: zipName };
}
function buildGrid() {
  const grid = document.getElementById("convert-grid");
  if (!grid) return;
  grid.innerHTML = "";
  TOOLS.forEach(tool => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "file-card convert-card";
    card.innerHTML = `
      <div class="file-header">
        <div class="file-icon">${tool.icon}</div>
        <span class="file-name">${tool.name}</span>
      </div>
      <div class="file-desc">${tool.desc}</div>
    `;
    card.addEventListener("click", () => openTool(tool));
    grid.appendChild(card);
  });
}
function resetPanel() {
  const dl = document.getElementById("convert-download");
  if (dl.href && dl.href.startsWith("blob:")) URL.revokeObjectURL(dl.href);
  currentFiles = [];
  document.getElementById("convert-filelist").innerHTML = "";
  document.getElementById("convert-file-input").value = "";
  document.getElementById("convert-status").textContent = "";
  dl.hidden = true;
  document.getElementById("convert-run-btn").disabled = true;
    document.getElementById("convert-run-btn").textContent = (currentTool && currentTool.runLabel) || "Convertir";
}
function openTool(tool) {
  currentTool = tool;
  resetPanel();
  document.getElementById("convert-tool-title").textContent = tool.name;
  document.getElementById("convert-tool-desc").textContent = tool.desc;
  document.getElementById("convert-file-input").accept = tool.accept;
  document.getElementById("convert-file-input").multiple = !!tool.multiple;
  document.getElementById("convert-dropzone-text").textContent = tool.merge
    ? "Glissez vos fichiers ici ou cliquez (ajout possible en plusieurs fois)"
    : tool.multiple
      ? "Glissez un ou plusieurs fichiers ici ou cliquez"
      : "Glissez un fichier ici ou cliquez pour choisir";
  const formatRow = document.getElementById("convert-option-format");
  if (tool.options === "format") {
    document.getElementById("convert-format-select").innerHTML =
      tool.formats.map(f => `<option value="${f.value}">${f.label}</option>`).join("");
    formatRow.hidden = false;
  } else {
    formatRow.hidden = true;
  }
  document.getElementById("convert-option-compress").hidden = tool.options !== "compress";
  document.getElementById("convert-panel").hidden = false;
  document.getElementById("convert-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function renderFileList() {
  const list = document.getElementById("convert-filelist");
  const merge = !!(currentTool && currentTool.merge);
  list.classList.toggle("merge", merge);
  list.replaceChildren(...currentFiles.map((f, i) => {
    if (!merge) {
      const chip = document.createElement("span");
      chip.className = "convert-file-chip";
      chip.textContent = f.name;
      return chip;
    }
    const row = document.createElement("div");
    row.className = "convert-file-chip merge-row";
    const icon = document.createElement("span");
    icon.textContent = MERGE_ICONS[mergeKind(f)] || "📁";
    const name = document.createElement("span");
    name.className = "merge-name";
    name.textContent = (i + 1) + ". " + f.name;
    const btn = (label, title, disabled, fn) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "merge-btn";
      b.textContent = label;
      b.title = title;
      b.setAttribute("aria-label", title);
      b.disabled = disabled;
      b.addEventListener("click", fn);
      return b;
    };
    row.append(icon, name,
      btn("↑", "Monter", i === 0, () => moveFile(i, -1)),
      btn("↓", "Descendre", i === currentFiles.length - 1, () => moveFile(i, 1)),
      btn("✕", "Retirer", false, () => removeFile(i)));
    return row;
  }));
  document.getElementById("convert-run-btn").disabled = currentFiles.length === 0;
}
function handleFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  const status = document.getElementById("convert-status");
  if (currentTool.merge) {
    const ignored = files.filter(f => !mergeKind(f)).map(f => f.name);
    currentFiles = currentFiles.concat(files.filter(f => mergeKind(f)));
    status.textContent = ignored.length ? "Format non pris en charge, ignoré : " + ignored.join(", ") : "";
  } else {
    currentFiles = currentTool.multiple ? files : [files[0]];
    status.textContent = "";
  }
  document.getElementById("convert-download").hidden = true;
  renderFileList();
}
function initConvert() {
  buildGrid();
  const dropzone = document.getElementById("convert-dropzone");
  const input = document.getElementById("convert-file-input");
  if (!dropzone || !input) return;
  input.addEventListener("change", () => { handleFiles(input.files); input.value = ""; });
  dropzone.addEventListener("dragover", e => { e.preventDefault(); dropzone.classList.add("dragover"); });
  dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("dragover");
    handleFiles(e.dataTransfer.files);
  });
  document.getElementById("convert-run-btn").addEventListener("click", runCurrentTool);
  document.querySelectorAll("#convert-option-compress .convert-compress-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#convert-option-compress .convert-compress-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      compressLevel = btn.dataset.level;
    });
  });
}
function loadScript(url) {
  if (_loaded[url]) return _loaded[url];
  _loaded[url] = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Échec de chargement d'une librairie."));
    document.head.appendChild(s);
  });
  return _loaded[url];
}
function fileToImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Image illisible : " + file.name)); };
    img.src = url;
  });
}
function baseName(name) {
  return name.replace(/\.[^./\\]+$/, "");
}
const JPG_LEVELS = { legere: 0.9, recommandee: 0.75, forte: 0.5 };
const PDF_LEVELS = {
  legere: { scale: 2.2, quality: 0.85 },
  recommandee: { scale: 1.6, quality: 0.7 },
  forte: { scale: 1.0, quality: 0.45 },};
const JSPDF_URL = "https://cdn.jsdelivr.net/npm/jspdf@2/dist/jspdf.umd.min.js";
const JSZIP_URL = "https://cdn.jsdelivr.net/npm/jszip@3/dist/jszip.min.js";
const PDFLIB_URL = "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js";
const XLSX_URL = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
const AUTOTABLE_URL = "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js";
const DOCXPREVIEW_URL = "https://cdn.jsdelivr.net/npm/docx-preview@0.3.3/dist/docx-preview.min.js";
const HTML2CANVAS_URL = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
const PDFJS_VERSION = "4.0.379";
const _loaded = {};
let currentTool = null;
let currentFiles = [];
let compressLevel = "recommandee";
let _pdfjsLib = null;
let _docxLib = null;
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initConvert);
} else {
  initConvert();
}