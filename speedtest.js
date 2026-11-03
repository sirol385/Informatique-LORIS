let SpeedTest = null;
try {
  ({ default: SpeedTest } = await import("https://cdn.jsdelivr.net/npm/@cloudflare/speedtest@1/+esm"));
} catch (e) {
  console.warn("Moteur Cloudflare indisponible :", e);
}
const PROFILES = {
  full: {
    duration: 35,
    measurements: [
  { type: "latency", numPackets: 45 },
  { type: "download", bytes: 1e5, count: 8 },
  { type: "download", bytes: 1e6, count: 7 },
  { type: "download", bytes: 1e7, count: 8 },
  { type: "download", bytes: 2.5e7, count: 10 },
  { type: "upload", bytes: 1e5, count: 8 },
  { type: "upload", bytes: 1e6, count: 7 },
  { type: "upload", bytes: 1e7, count: 8 },
  { type: "upload", bytes: 2.5e7, count: 10 }]}};
function stFmt(v) {
  if (!isFinite(v) || v === null || v === undefined) return "—";
  return v >= 100 ? v.toFixed(0) : v.toFixed(1);
}
function updateRecord(records, key, value, higherIsBetter) {
  if (!isFinite(value) || value <= 0) return false;
  const current = records[key];
  if (current === undefined || (higherIsBetter ? value > current : value < current)) {
    records[key] = value;
    return true;
  }
  return false;
}
function themeColor(varName, fallback) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return val || fallback;
}
function renderRecords(records) {
  document.getElementById("speed-ping-record").textContent = stFmt(records.ping);
  document.getElementById("speed-download-record").textContent = stFmt(records.download);
  document.getElementById("speed-upload-record").textContent = stFmt(records.upload);
  document.getElementById("speed-jitter-record").textContent = stFmt(records.jitter);
}
function initSpeedtest() {
  const startBtn = document.getElementById("speed-start-btn");
  const statusEl = document.getElementById("speed-status");
  const progressBar = document.getElementById("speed-progress-bar");
  const pingEl = document.getElementById("speed-ping");
  const dlEl = document.getElementById("speed-download");
  const ulEl = document.getElementById("speed-upload");
  const jitterEl = document.getElementById("speed-jitter");
  const chartCanvas = document.getElementById("speed-chart");
  const chartCtx = chartCanvas ? chartCanvas.getContext("2d") : null;
  if (!startBtn) return;
  const profile = "full";
  const records = {};
  renderRecords(records);
  let dlHistory = [];
  let ulHistory = [];
  let running = false;
  let cancelled = false;
  let currentEngine = null;
  let progressTimer = null;
  function setRunning(state) {
    running = state;
    startBtn.disabled = false;
    startBtn.textContent = state ? "Arrêter le test" : "Démarrer le test";
    startBtn.classList.toggle("stop", state);
  }
  function stopTest() {
    cancelled = true;
    if (currentEngine) { try { currentEngine.pause(); } catch (e) {} currentEngine = null; }
    if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
    setRunning(false);
    statusEl.textContent = "Test arrêté, prêt à relancer.";
    statusEl.classList.remove("done");
    progressBar.style.width = "0%";
  }
  function drawChart() {
    if (!chartCtx || !chartCanvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = chartCanvas.getBoundingClientRect();
    const w = rect.width || chartCanvas.clientWidth || 300;
    const h = rect.height || chartCanvas.clientHeight || 120;
    chartCanvas.width = Math.round(w * dpr);
    chartCanvas.height = Math.round(h * dpr);
    chartCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    chartCtx.clearRect(0, 0, w, h);
    const padding = { top: 10, right: 10, bottom: 20, left: 34 };
    const plotW = Math.max(1, w - padding.left - padding.right);
    const plotH = Math.max(1, h - padding.top - padding.bottom);
    const allPoints = dlHistory.concat(ulHistory);
    const maxT = Math.max(1, ...allPoints.map(p => p.t));
    const rawMax = Math.max(1, ...allPoints.map(p => p.v));
    const niceSteps = [5, 10, 25, 50, 100, 150, 200, 250, 300, 400, 500, 750, 1000, 1500, 2000];
    const maxV = niceSteps.find(s => s >= rawMax * 1.1) || Math.ceil(rawMax * 1.1 / 500) * 500;
    const gridColor = themeColor("--border", "#212c3d");
    const dlColor = themeColor("--accent-strong", "#4f9dff");
    const ulColor = "#ff9f43";
    const labelColor = themeColor("--text-dim", "#8a97ad");
    chartCtx.strokeStyle = gridColor;
    chartCtx.lineWidth = 1;
    chartCtx.font = "500 10px Inter, sans-serif";
    chartCtx.textAlign = "right";
    chartCtx.textBaseline = "middle";
    const gridLines = 4;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (plotH / gridLines) * i;
      chartCtx.strokeStyle = gridColor;
      chartCtx.beginPath();
      chartCtx.moveTo(padding.left, y + 0.5);
      chartCtx.lineTo(padding.left + plotW, y + 0.5);
      chartCtx.stroke();
      const labelValue = Math.round(maxV - (maxV / gridLines) * i);
      chartCtx.fillStyle = labelColor;
      chartCtx.fillText(labelValue + "", padding.left - 6, y);
    }
    chartCtx.textAlign = "left";
    chartCtx.textBaseline = "alphabetic";
    function drawLine(history, color) {
      if (history.length < 2) return;
      chartCtx.beginPath();
      chartCtx.strokeStyle = color;
      chartCtx.lineWidth = 2;
      chartCtx.lineJoin = "round";
      history.forEach((p, i) => {
        const x = padding.left + (p.t / maxT) * plotW;
        const y = padding.top + plotH - (p.v / maxV) * plotH;
        if (i === 0) chartCtx.moveTo(x, y);
        else chartCtx.lineTo(x, y);
      });
      chartCtx.stroke();
    }
    drawLine(dlHistory, dlColor);
    drawLine(ulHistory, ulColor);
    chartCtx.font = "600 11px Inter, sans-serif";
    chartCtx.fillStyle = dlColor;
    chartCtx.fillText("● Téléchargement", padding.left, h - 5);
    chartCtx.fillStyle = ulColor;
    chartCtx.fillText("● Envoi", padding.left + 118, h - 5);
  }
  drawChart();
  window.addEventListener("resize", () => drawChart());
  const speedTabBtn = document.querySelector('.tab[data-tab="speedtest"]');
  if (speedTabBtn) {
    speedTabBtn.addEventListener("click", () => {
      requestAnimationFrame(() => requestAnimationFrame(() => drawChart()));
    });
  }
  let provider = "cloudflare";
  const providerBtns = document.querySelectorAll("#speed-provider-toggle .speed-mode-btn");
  providerBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (startBtn.disabled || running) return;
      providerBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      provider = btn.dataset.provider;
    });
  });
  async function runLocalTest() {
    setRunning(true);
    cancelled = false;
    statusEl.classList.remove("done");
    pingEl.textContent = "—"; dlEl.textContent = "—"; ulEl.textContent = "—"; jitterEl.textContent = "—";
    progressBar.style.width = "0%";
    statusEl.textContent = "Test en cours…";
    dlHistory = []; ulHistory = [];
    drawChart();
    const rounds = 20;
    const t0all = performance.now();
    try {
      const parallel = 3;
      for (let i = 0; i < rounds; i++) {
        if (cancelled) break;
        const t0 = performance.now();
        const results = await Promise.all(
          Array.from({ length: parallel }, () =>
            fetch("speedtest-file.bin?cb=" + Math.random(), { cache: "no-store" }).then(r => {
              if (!r.ok) throw new Error("speedtest-file.bin introuvable (HTTP " + r.status + ")");
              return r.blob();
            })
          )
        );
        if (cancelled) break;
        const t1 = performance.now();
        const totalBytes = results.reduce((sum, b) => sum + b.size, 0);
        const mbps = (totalBytes * 8) / ((t1 - t0) / 1000) / 1e6;
        dlEl.textContent = stFmt(mbps);
        dlHistory.push({ t: (t1 - t0all) / 1000, v: mbps });
        updateRecord(records, "download", mbps, true);
        renderRecords(records);
        drawChart();
        progressBar.style.width = Math.round(((i + 1) / rounds) * 100) + "%";
      }
      if (!cancelled) {
        statusEl.textContent = "✅ Test terminé (download uniquement)";
        statusEl.classList.add("done");
      }
    } catch (err) {
      if (!cancelled) statusEl.textContent = "Erreur : " + err;
    }
    if (cancelled) { cancelled = false; return; }
    setRunning(false);
    setTimeout(() => {
      statusEl.textContent = "Prêt à démarrer le test.";
      statusEl.classList.remove("done");
      progressBar.style.width = "0%";
    }, 4000);
  }
  startBtn.addEventListener("click", () => {
    if (running) { stopTest(); return; }
    if (provider === "local") { runLocalTest(); return; }
    if (!SpeedTest) { statusEl.textContent = "Moteur Cloudflare indisponible (connexion ou bloqueur)."; return; }
    setRunning(true);
    cancelled = false;
    statusEl.classList.remove("done");
    pingEl.textContent = "—"; dlEl.textContent = "—"; ulEl.textContent = "—"; jitterEl.textContent = "—";
    progressBar.style.width = "0%";
    statusEl.textContent = "Test en cours…";
    dlHistory = [];
    ulHistory = [];
    drawChart();
    const startTime = performance.now();
    const estDuration = PROFILES[profile].duration;
    let displayedPct = 0;
    let targetPct = 0;
    progressTimer = setInterval(() => {
      const elapsed = (performance.now() - startTime) / 1000;
      const timeBasedPct = Math.min(95, (elapsed / estDuration) * 100);
      targetPct = Math.max(targetPct, timeBasedPct);
      const diff = targetPct - displayedPct;
      const step = diff > 15 ? diff * 0.15 : 0.4;
      displayedPct = Math.min(targetPct, displayedPct + step);
      progressBar.style.width = Math.min(95, displayedPct) + "%";
    }, 150);
    function bumpTarget(pct) {
      targetPct = Math.max(targetPct, pct);
    }
        const engine = new SpeedTest({ autoStart: false, measurements: PROFILES[profile].measurements });
    currentEngine = engine;
    const watchdog = setTimeout(() => {
      if (currentEngine === engine) engine.onFinish(engine.results);
    }, 30000);
    engine.onResultsChange = ({ type } = {}) => {
      const s = engine.results.getSummary();
      const elapsed = (performance.now() - startTime) / 1000;
      let changed = false;
      if (type === "download" || s.download !== undefined) {
        bumpTarget(50);
      }
      if (s.download) {
        const dlMbps = s.download / 1e6;
        dlEl.textContent = stFmt(dlMbps);
        dlHistory.push({ t: elapsed, v: dlMbps });
        if (updateRecord(records, "download", dlMbps, true)) changed = true;
      }
      if (type === "upload" || s.upload !== undefined) {
        bumpTarget(50);
      }
      if (s.upload) {
        const ulMbps = s.upload / 1e6;
        ulEl.textContent = stFmt(ulMbps);
        ulHistory.push({ t: elapsed, v: ulMbps });
        if (updateRecord(records, "upload", ulMbps, true)) changed = true;
        bumpTarget(90);
      }
      if (s.latency) {
        pingEl.textContent = stFmt(s.latency);
        if (updateRecord(records, "ping", s.latency, false)) changed = true;
      }
      if (s.jitter) {
        jitterEl.textContent = stFmt(s.jitter);
        if (updateRecord(records, "jitter", s.jitter, false)) changed = true;
      }
      if (changed) renderRecords(records);
      drawChart();
    };
      engine.onFinish = (results) => {
      clearTimeout(watchdog);
      if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
      if (currentEngine === null) return;
      currentEngine = null;
      try { engine.pause(); } catch (e) {}
      const s = results.getSummary();
      const dlMbps = s.download / 1e6;
      const ulMbps = s.upload / 1e6;
      pingEl.textContent = stFmt(s.latency);
      dlEl.textContent = stFmt(dlMbps);
      ulEl.textContent = stFmt(ulMbps);
      jitterEl.textContent = stFmt(s.jitter);
      updateRecord(records, "ping", s.latency, false);
      updateRecord(records, "download", dlMbps, true);
      updateRecord(records, "upload", ulMbps, true);
      updateRecord(records, "jitter", s.jitter, false);
      renderRecords(records);
      const finalElapsed = (performance.now() - startTime) / 1000;
      dlHistory.push({ t: finalElapsed, v: dlMbps });
      ulHistory.push({ t: finalElapsed, v: ulMbps });
      drawChart();
      progressBar.style.width = "100%";
      statusEl.textContent = "✅ Test terminé";
      statusEl.classList.add("done");
      setRunning(false);
      setTimeout(() => {
        statusEl.textContent = "Prêt à démarrer le test.";
        statusEl.classList.remove("done");
        progressBar.style.width = "0%";
      }, 4000);
    };
      engine.onError = (err) => {
      clearTimeout(watchdog);
      if (progressTimer) { clearInterval(progressTimer); progressTimer = null; }
      currentEngine = null;
      if (!cancelled) {
        statusEl.textContent = "Erreur : " + err;
        statusEl.classList.remove("done");
      }
      setRunning(false);
      progressBar.style.width = "0%";
    };
    engine.play();
  });
}
function detectOS() {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS X")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "OS inconnu";
}
function detectBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/")) return "Safari";
  return "Navigateur inconnu";
}
function loadNetworkInfo() {
  const ipEl = document.getElementById("ip-value-v4");
  const ispEl = document.getElementById("ip-isp");
  fetch("https://api.ipify.org?format=json")
    .then(r => r.json())
    .then(data => { ipEl.textContent = data.ip || "—"; })
    .catch(() => { ipEl.textContent = "Non disponible"; });
  fetch("https://ipapi.co/json/")
    .then(r => r.json())
    .then(data => { ispEl.textContent = (data.org || "—") + " · " + (data.city || "—"); })
    .catch(() => { ispEl.textContent = detectBrowser() + " · " + detectOS(); });
}
function boot() {
  initSpeedtest();
  loadNetworkInfo();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}