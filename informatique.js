const CONTACT = { name: "Loris GOUHIER", phone: "07.67.29.58.91", email: "lorisgouhier@gmail.com" };
const SKILLS = [
  { name: "Installation & configuration", desc: "Installation de système d'exploitation et de licences Windows/Office.", icon: "🖥️", color: "#4f9dff" },
  { name: "Test & diagnostic de panne", desc: "Vérification du PC et recherche de pannes matérielles ou logicielles.", icon: "🔍", color: "#e2574c" },
  { name: "Changement de composants", desc: "Remplacement et amélioration des composants internes de l'ordinateur.", icon: "🔩", color: "#f5b74f" },
  { name: "Matériels & logiciels", desc: "Montage d'ordinateur, installation de périphériques et de logiciels.", icon: "🧩", color: "#5fb894" },
  { name: "Montage vidéo & photos drone", desc: "Montage vidéo, édition audio et vues par drone. <a class=\"skill-link\" href=\"https://drone.lorisg.fr\" target=\"_blank\" rel=\"noopener noreferrer\"><span class=\"br-mobile\"></span>drone.lorisg.fr</a>", icon: "🎬", color: "#eef4ff" },
  { name: "Dépannage à distance", desc: "Intervention rapide et sécurisée via AnyDesk.", icon: "🌐", color: "#2f6fd0" }];
const REMOTE_STEPS = [ "Cliquez sur le bouton ci-dessus pour télécharger AnyDesk.", "Double-cliquez sur le fichier téléchargé pour le lancer.", "Transmettez-moi le numéro du poste de travail qui s'affiche.", "Cliquez sur \"Accepter\" lorsque la demande de connexion apparaît."];
const APPS = [
  { name: "7 Zip", desc: "Compression d'archives", url: "https://7-zip.org/download.html", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/7-Zip_Icon.svg" },
  { name: "Adobe Acrobat", desc: "Lecteur de PDF", url: "https://get.adobe.com/reader/", logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Adobe_Acrobat_Reader_icon_%282020%29.svg" },
  { name: "Advanced IP Scanner", desc: "Scanner de réseau local", url: "https://www.advanced-ip-scanner.com/fr/download/", logo: "https://a.storyblok.com/f/135430/169d0b2a7b/advanced-ip-scanner.png" },
  { name: "AnyDesk", desc: "Prise en main à distance", url: "https://anydesk.com/en/downloads/windows", logo: "https://cdn.simpleicons.org/anydesk/EF443B" },
  { name: "Audacity", desc: "Éditeur audio", url: "https://www.audacityteam.org/download/windows/", logo: "https://static.wikia.nocookie.net/logopedia/images/6/6f/Audacity_Logo_large.svg/revision/latest?cb=20210922232929" },
  { name: "Captvty", desc: "Replay TV", url: "https://captvty.fr/", logo: "https://www.google.com/s2/favicons?sz=128&domain=v3.captvty.fr" },
  { name: "Claude", desc: "Assistant IA pour le Code", url: "https://claude.com/fr", logo: "https://cdn.prod.website-files.com/6883119fb08482e1a28b331b/68b1a91141a014f6037a9a61_68adecff420db5aa8aaaf7a9_claude-logo.svg" },
  { name: "DaVinci Resolve", desc: "Éditeur vidéo", url: "https://www.blackmagicdesign.com/products/davinciresolve", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/DaVinci_Resolve_Studio.png/960px-DaVinci_Resolve_Studio.png" },
  { name: "Discord", desc: "Chat vocal et messagerie", url: "https://discord.com/download", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/discord-round-color-icon.png" },
  { name: "Epic Games Launcher", desc: "Launcher de jeux", url: "https://store.epicgames.com/download?lang=FR-FR", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/960px-Epic_Games_logo.svg.png" },
  { name: "Everything", desc: "Recherche de fichiers", url: "https://www.voidtools.com/en-us/downloads/", logo: "https://www.google.com/s2/favicons?sz=128&domain=voidtools.com" },
  { name: "Firefox", desc: "Navigateur web", url: "https://www.firefox.com/fr/download/all/desktop-release/win64/fr/", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg" },
  { name: "Gimp", desc: "Éditeur d'image", url: "https://www.gimp.org/downloads/", logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/The_GIMP_icon_-_v3.0.svg" },
  { name: "Google Chrome", desc: "Navigateur web", url: "https://www.google.com/chrome/index.html", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" },
  { name: "HandBrake", desc: "Convertisseur vidéo", url: "https://handbrake.fr/downloads.php", logo: "https://handbrake.fr/img/logo.png" },
  { name: "LibreOffice", desc: "Suite bureautique gratuite", url: "https://www.libreoffice.org/download/", logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/LibreOffice_7.5_Main_Icon.svg" },
  { name: "Notepad ++", desc: "Éditeur de texte", url: "https://notepad-plus-plus.org/downloads/", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq5KlyCqBYZbxZlXU0u2zJ-4ttQSiTfbNhgs1cvrXZuQ&s=10" },
  { name: "NVIDIA App", desc: "Pilotes cartes graphiques", url: "https://www.nvidia.com/fr-fr/software/nvidia-app/", logo: "https://cdn.simpleicons.org/nvidia/76B900" },
  { name: "Office 365", desc: "Suite bureautique Office", url: "https://www.microsoft.com/fr-fr/microsoft-365/download-office", logo: "https://raw.githubusercontent.com/selfhst/icons/main/svg/microsoft-office.svg" },
  { name: "Office 2024", desc: "Suite bureautique Office", url: "https://www.google.com/url?sa=D&q=https://download.winandoffice.com/Volume/office/2024/FR/Office_2024_FR_64Bits.exe&ust=1783920120000000&usg=AOvVaw2pBZcNK6k5EYTitVqoIk3D&hl=fr", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Microsoft_365_%282022%29.svg" },
  { name: "Partition Wizard", desc: "Gestion des disques/partitions", url: "https://www.partitionwizard.com/download.html", logo: "https://www.google.com/s2/favicons?sz=128&domain=partitionwizard.com" },
  { name: "Photo Filtre 7", desc: "Éditeur d'image", url: "https://www.photofiltre-studio.com/pf7.htm", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJju242P9UkaHrMn3FLIj24WN6aRHl8VpMwtJGDurLMQ&s=10" },
  { name: "Proton VPN", desc: "Service de VPN", url: "https://protonvpn.com/download", logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/proton-vpn-icon.png" },
  { name: "Putty", desc: "Client SSH et Telnet", url: "https://putty.org/index.html", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/PuTTY_Icon.svg" },
  { name: "Rekordbox", desc: "Éditeur de musique", url: "https://rekordbox.com/fr/download/", logo: "https://play-lh.googleusercontent.com/jLK7kB2y9Cg0LtMu9nwz4lYJC12_QmuvnA-0N-fCtSyExyGO5ArVLqbmjMM23mzOpFW1MGcqm5ePC2PNitDuaQ" },
  { name: "Riot Games", desc: "Launcher de jeux", url: "https://playvalorant.com/fr-fr/download/", logo: "https://cdn.simpleicons.org/riotgames/EB0029" },
  { name: "Rockstar Games", desc: "Launcher de jeux", url: "https://socialclub.rockstargames.com/rockstar-games-launcher", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Rockstar_Games_Logo.svg" },
  { name: "Rufus", desc: "Création de clé bootable", url: "https://rufus.ie/fr/", logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Rufus-logo.png" },
  { name: "SDI RUS", desc: "Installation de pilotes", url: "https://sdi-tool.org/download/", logo: "https://www.google.com/s2/favicons?sz=128&domain=sdi-tool.org" },
  { name: "Space Sniffer", desc: "Analyse espace disque", url: "https://space-sniffer.com/#download", logo: "https://www.google.com/s2/favicons?sz=128&domain=space-sniffer.com" },
  { name: "Spotify", desc: "Streaming musical", url: "https://www.spotify.com/fr/download/windows/", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/3840px-Spotify_logo_without_text.svg.png" },
  { name: "Steam", desc: "Plateforme de jeux", url: "https://store.steampowered.com/about/download", logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" },
  { name: "TeamViewer", desc: "Prise en main à distance", url: "https://www.teamviewer.com/fr/download/windows/?", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS1bquwwlZxaGeO_lwzZlr0A_xiK5_Lsrr2eTG9Ndr1g&s" },
  { name: "UserDiag", desc: "Diagnostic matériel", url: "https://userdiag.com/fr/", logo: "https://www.google.com/s2/favicons?sz=128&domain=userdiag.com" },
  { name: "Ventoy", desc: "Création de clé bootable", url: "https://www.ventoy.net/en/download.html", logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Ventoy_Logo.png" },
  { name: "VirtualDJ", desc: "Éditeur de musique", url: "https://fr.virtualdj.com/download/", logo: "https://img.utdstc.com/icon/0f2/807/0f2807098d95ccbe389659fcf38ff91f42adc21f0b09636e38b2191d74dd97f1:600" },
  { name: "Visual Studio Code", desc: "Éditeur de code", url: "https://code.visualstudio.com/download?_exp_download=fb315fc982", logo: "https://www.google.com/s2/favicons?sz=128&domain=code.visualstudio.com" },
  { name: "VLC", desc: "Lecteur vidéo et multimédia", url: "https://www.videolan.org/vlc/index.html", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e6/VLC_Icon.svg" },
  { name: "VMWare Workstation", desc: "Virtualisation de systèmes", url: "https://support.broadcom.com/group/ecx/productdownloads?subfamily=VMware%20Workstation%20Pro&freeDownloads=true", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Vmware_workstation_16_icon.svg" },
  { name: "Windows 11", desc: "Système d'exploitation", url: "https://www.microsoft.com/fr-fr/software-download/windows11", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Windows_11.webp" },];
const ISO = [
  { name: "Debian", version: "13.7.0", official: "https://www.debian.org/distrib/", mega: "https://mega.nz/file/D1QmFIZC#DOjI--Y2J7gwr1v3Nz6pk8Ctl734Y4GCuQ2Exo5wZ98", nas: "https://gouhier85.freeboxos.fr:55443/share/XCRYdXAvuL3JU9mA/Debian_13.7.0_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Openlogo-debianV2.svg/960px-Openlogo-debianV2.svg.png" },
  { name: "Fedora", version: "44.1.7", official: "https://fedoraproject.org/workstation/download/", mega: "https://mega.nz/file/z4BzGLxa#59r90z9dlECQPolhDT0Gi_z7OxXcwVw2oqMbtz5JJjc", nas: "https://gouhier85.freeboxos.fr:55443/share/rRaeHSEItFw8v0Mx/Fedora_44.1.7_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Fedora_icon_%282021%29.svg/960px-Fedora_icon_%282021%29.svg.png" },
  { name: "Kali", version: "2026.2", official: "https://www.kali.org/get-kali/#kali-installer-images", mega: "https://mega.nz/file/P9oRjLTZ#mD5uwbDPb_H6yxKmEpFpD4O5M7wh121tLjfj2-Fh-Qo", nas: "https://gouhier85.freeboxos.fr:55443/share/Fz3QZhKQxzNYv9KP/Kali_2026.2_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Kali-dragon-icon.svg/960px-Kali-dragon-icon.svg.png" },
  { name: "Mint", version: "22.3", official: "https://www.linuxmint.com/edition.php?id=326", mega: "https://mega.nz/file/7sZ0hAZQ#fQidL6yOWMBRy6TcCUXLm5j5zvI81UKt0hk4K926kLA", nas: "https://gouhier85.freeboxos.fr:55443/share/VGbHXN-XLuRLhdA5/Mint_22.3_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Linux_Mint_logo_without_wordmark.svg/960px-Linux_Mint_logo_without_wordmark.svg.png" },
  { name: "Strelec", version: "2026.09.08", official: "https://sergeistrelec.name/winpe-10-8-sergei-strelec-english/", mega: "https://mega.nz/file/H9gHBQAB#X3KoTHMxmitlWZu9TMlyn-qk114f9-rMlkHhH9NpZOE", nas: "https://gouhier85.freeboxos.fr:55443/share/BJXN8wRtoLGsm8No/Strelec_2026.09.08_LORIS.iso", logo: "https://www.google.com/s2/favicons?sz=128&domain=sergeistrelec.name" },
  { name: "Ubuntu", version: "26.04.01", official: "https://ubuntu.com/download/desktop", mega: "https://mega.nz/file/TkYE0ZYB#NeHTfCsFVO9xbffkH2Ud7axgsHPTWpnVUdUDd95uGQs", nas: "https://gouhier85.freeboxos.fr:55443/share/GxDYx_gkpN-6nykp/Ubuntu_26.04.1_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ubuntu-logo-no-wordmark-solid-o-2022.svg/960px-Ubuntu-logo-no-wordmark-solid-o-2022.svg.png" },
  { name: "Windows", version: "10", official: "https://www.microsoft.com/fr-fr/software-download/windows10", mega: "https://mega.nz/file/v8wxXLqI#gxJPuAKGe2NO7wZ9fhM54Gx02p0DxUJf2qXP7D5yqdQ", nas: "https://gouhier85.freeboxos.fr:55443/share/nYcgV8sLuiXIJFRa/Windows_10_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/960px-Windows_logo_-_2012.svg.png" },
  { name: "Windows", version: "11", official: "https://www.microsoft.com/fr-fr/software-download/windows11", mega: "https://mega.nz/file/S8YDnSxD#p2JzaXeNvu-0s_CUQYyzRYBsr98dJMcJBe4iCLFoVO4", nas: "https://gouhier85.freeboxos.fr:55443/share/HmcyX7ldJkp_UN13/Windows_11_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_Windows_11.webp" },
  { name: "Windows Server", version: "25", official: "https://www.microsoft.com/fr-fr/evalcenter/download-windows-server-2025", mega: "https://mega.nz/file/bxYD3biT#yAoKSXZTRWQfx-KRdWR4RH_PchsBghd8ZF9XE7737Fs", nas: "https://gouhier85.freeboxos.fr:55443/share/gzHpPbtQlHEKyj3F/Windows_Server_2025_LORIS.iso", logo: "https://www.google.com/s2/favicons?sz=128&domain=microsoft.com" },
  { name: "ZorinOS", version: "18.1", official: "https://zorin.com/os/download/", mega: "https://mega.nz/file/esgUSLQK#ypYM9iz0tJpCvnnneFpfqzLig-v60T85uBR_xTSLNoc", nas: "https://gouhier85.freeboxos.fr:55443/share/UdJjF3-OrEXYErYH/ZorinOS_18.1_LORIS.iso", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Zorin_OS.svg/960px-Zorin_OS.svg.png" },];
const LINKS = [
  { name: "APPLICATIONS", mega: "https://mega.nz/folder/6tBH3S5S#CU7aAWrfLvs-Qs5ZdWEs4w", nas: "https://gouhier85.freeboxos.fr:55443/share/MRm8-DUO6PV0ePZR/", logo: "https://cdn-icons-png.flaticon.com/512/5044/5044729.png" },
  { name: "MUSIQUES", mega: "https://mega.nz/folder/7kBUwRJD#EcLYSOi6c-jJ94RCC6kzyQ", nas: "https://gouhier85.freeboxos.fr:55443/share/I46MyVF6t8jZaJ-R/", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg" },
  { name: "Reportages Puy du Fou", mega: "https://mega.nz/folder/O5QwzBxA#QbOUKrH9UVKr2fuJ-20K4Q", nas: "https://gouhier85.freeboxos.fr:55443/share/zZteObEANUd-hph3/", logo: "https://play-lh.googleusercontent.com/fHPTRrTeDaGb2x-ULrluEZanP4mqwVEAazyTvMca9wOJBZAvaXvzxpb1Mio18g9_tBRqpXPA25bjKpxYfGPuSOY=w240-h480-rw" },
  { name: "FILMS", mega: "https://mega.nz/folder/z55S2CqL#VlOWWIZzwBo28_S_SWNZRA", nas: "https://gouhier85.freeboxos.fr:55443/share/t7iPAv3Xpcz6pNOg/", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4xXZVkhyh9UeCKNUTqaDJJ9HPJBYKi13t3l6ljT91RQ&s=10" },];
const SITES = [
  { name: "FrenchBreaches", desc: "Fuites de données en France", url: "https://frenchbreaches.com/", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEUQFkIQFkMQFkQQF0QQF0UQGEURGEYACEAAADEAADgPED4OADQPCzpnan7i4+a7u8EGTZsxhugvguAobMEYNm4AAD1zdYj////U09YAU6Y3mf82k/o3l/8mYa79/f0UJlqChJUAADsMACwhUZYSCzwZOXUbRIWen6xZW3VcX3gkIkg1kPljYnUjWaUsedU9PVgXL2iIiZkGEEJFSGVI84ekAAABjElEQVR4AV3RB3bjMAwEUAIY0rHs9B7Jce/dvv/ddiByW0Zd/xFs4W9ExC8PP37+83dVE+Xhn+Vov8wMECP7l/6GfFfAIiKVzrS/LRjvQQUpxZTgBUyIISikc1PSrXo5/SrBVaxze1dy//DY5un5pQ9YCIbXt/eSj8+vum4anl+DvhERid/fBZu6fnysef8a+nitxffRzXg87g6a+utlMnlm+2kF9omM3U6nMyM282q24GPhiIzL1Wq13jhO5wsW3s7UNFhosc1u3/iAeDvMqsQRwcqAHAeOrtvHYQX9PaD7JXMsZZ+pW/XR4s9oX7t5QFVvsN1yuBKiZHyNKVUZtbdvtttBXwOsYEqp77gYnqbbrU+UiIxjZCwD8j7zaDnQM8sSvxrPtmkeh5IcL8fz6Hy9sKy+TKfTB16LYU8BDijiwmW9JCBGqUoE7ZZBzaAR7JJnCYymEkg8LCK2hoz8TCYBrsEYOLjAEeBoWVkiQVv1oxRWDd5S+DSIt4ww8OmnigVQDSbkNmQX/yW/ALONKa0uPwqZAAAAAElFTkSuQmCC" },
  { name: "VirusTotal", desc: "Scanner des fichiers suspects", url: "https://www.virustotal.com/", logo: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/webp/virustotal.webp" },
  { name: "Have I Been Pwned", desc: "Vérifier email/mot de passe fuité", url: "https://haveibeenpwned.com/", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRooyG6Hx8oHpkNAXlYzyGUiuHDHXG286MgVA5vlIXtQ&s=10" },
  { name: "DownDetector", desc: "Vérifier l'état d'un service", url: "https://downdetector.com/", logo: "https://static.wikia.nocookie.net/logopedia/images/7/75/Downdetector_2013_Icon.svg/revision/latest?cb=20220411120406" },];
const WINDOWS = [
  { shell: "%temp%", desc: "Ouvre le dossier temporaire de l'utilisateur.", right: "Utilisateur" },
  { shell: "bcdboot C:\\Windows", desc: "Répare le démarrage de Windows.", right: "Admin" },
  { shell: "chkdsk C: /f", desc: "Recherche, corrige et répare les erreurs du disque.", right: "Admin" },
  { shell: "cls", desc: "Efface l'historique du terminal.", right: "Terminal" },
  { shell: "cscript \"C:\\Program Files\\Microsoft Office\\Office16\\OSPP.VBS\" /dstatus", desc: "Affiche la clé licence Office 2021/2024.", right: "Terminal" },
  { shell: "diskpart", desc: "Gère les partitions du disque.", right: "Admin" },
  { shell: "diskpart>list disk", desc: "Affiche les disques durs, leur capacité et son numéro.", right: "Admin" },
  { shell: "diskpart>select disk X", desc: "Sélectionne le disque dur.", right: "Admin" },
  { shell: "diskpart>clean", desc: "Nettoie le disque dur.", right: "Admin" },
  { shell: "diskpart>convert gpt", desc: "Convertit le disque dur en format GPT.", right: "Admin" },
  { shell: "DISM /Online /Cleanup-Image /RestoreHealth", desc: "Répare l'image système Windows.", right: "Admin" },
  { shell: "Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All", desc: "Active Hyper-V pour faire des machines virtuelles.", right: "Admin" },
  { shell: "Get-CimInstance Win32_BIOS | Select-Object SerialNumber", desc: "Affiche le numéro de série de l'ordinateur.", right: "Terminal" },
  { shell: "get-filehash \"C:\\X.iso\" -algorithm SHA256", desc: "Vérifie l'empreinte SHA256 d'un fichier ISO.", right: "Terminal" },
  { shell: "getmac", desc: "Affiche l'adresse mac de l'ordinateur.", right: "Terminal" },
  { shell: "Get-NetIPConfiguration", desc: "Affiche la configuration réseau simplement.", right: "Terminal" },
  { shell: "gpupdate /force", desc: "Force la mise à jour de la stratégie.", right: "Admin" },
  { shell: "hostname", desc: "Affiche le nom du PC.", right: "Terminal" },
  { shell: "ipconfig /all", desc: "Affiche la configuration réseau détaillée.", right: "Terminal" },
  { shell: "ipconfig /flushdns", desc: "Vide le cache DNS.", right: "Admin" },
  { shell: "ipconfig /release", desc: "Libère l'adresse IP.", right: "Terminal" },
  { shell: "ipconfig /renew", desc: "Renouvelle l'adresse IP.", right: "Terminal" },
  { shell: "net localgroup Administrateurs X /add", desc: "Ajoute le compte utilisateur en administrateur.", right: "Admin" },
  { shell: "net user X /active:no", desc: "Désactive un utilisateur.", right: "Admin" },
  { shell: "net user X /add", desc: "Ajoute un compte utilisateur.", right: "Admin" },
  { shell: "net user X /delete", desc: "Supprime un utilisateur.", right: "Admin" },
  { shell: "nslookup", desc: "Vérifie le nom DNS à l'IP associée.", right: "Terminal" },
  { shell: "oobe\\bypassnro", desc: "Ne configure pas le réseau sur une nouvelle installation.", right: "Terminal" },
  { shell: "ping X -t", desc: "Teste la connexion et la latence du réseau en continu.", right: "Terminal" },
  { shell: "powercfg /batteryreport", desc: "Crée un rapport de la batterie.", right: "Terminal" },
  { shell: "sfc /scannow", desc: "Analyse et répare les fichiers systèmes corrompus.", right: "Admin" },
  { shell: "shutdown /s /t X", desc: "Éteint son ordinateur après un délai défini.", right: "Terminal" },
  { shell: "shutdown /a", desc: "Annule l'extinction automatique définie avant.", right: "Terminal" },
  { shell: "slmgr /dlv", desc: "Affiche la version et licence de Windows en version détaillée.", right: "Terminal" },
  { shell: "slmgr /ipk X", desc: "Installe la clé licence/clé produit.", right: "Admin" },
  { shell: "systeminfo", desc: "Résume les informations complètes du système.", right: "Terminal" },
  { shell: "tracert X", desc: "Trace la route ou les sauts réseaux.", right: "Terminal" },
  { shell: "tree X /f", desc: "Recherche les fichiers et dossiers d'un chemin.", right: "Terminal" },
  { shell: "winget list", desc: "Liste les applications installées.", right: "Terminal" },
  { shell: "winget upgrade --all", desc: "Met à jour tous les logiciels.", right: "Terminal" },
  { shell: "winver", desc: "Affiche la version de Windows.", right: "Terminal" },]
const LINUX = [
  { shell: "adduser X", desc: "Ajoute un nouvel utilisateur.", right: "Admin" },
  { shell: "cat /etc/os-release", desc: "Affiche la version de la distribution Linux F.", right: "Terminal" },
  { shell: "clear", desc: "Efface le terminal.", right: "Terminal" },
  { shell: "deluser X", desc: "Supprime un utilisateur.", right: "Admin" },
  { shell: "df -h", desc: "Affiche l'espace disque disponible.", right: "Terminal" },
  { shell: "free -h", desc: "Affiche la mémoire RAM disponible.", right: "Terminal" },
  { shell: "ip a", desc: "Affiche les adresses IP et cartes réseau.", right: "Terminal" },
  { shell: "lsb_release -a", desc: "Affiche la version de la distribution Linux DKMUZ.", right: "Terminal" },
  { shell: "lsblk", desc: "Liste les disques et partitions.", right: "Terminal" },
  { shell: "nano X", desc: "Édite un fichier dans le terminal.", right: "Terminal" },
  { shell: "passwd", desc: "Change le mot de passe de l'utilisateur actuel.", right: "Terminal" },
  { shell: "ping google.com", desc: "Teste la connexion réseau.", right: "Terminal" },
  { shell: "poweroff", desc: "Éteint la machine immédiatement.", right: "Admin" },
  { shell: "pwd", desc: "Affiche le dossier courant.", right: "Terminal" },
  { shell: "su -", desc: "Passe en super-utilisateur (root) avec son environnement.", right: "Terminal" },
  { shell: "sudo apt update", desc: "Met à jour la liste puis installe les paquets disponibles DKMUZ.", right: "Admin" },
  { shell: "sudo apt upgrade", desc: "Met à jour la dernière version du noyau et du système DKMUZ.", right: "Admin" },
  { shell: "sudo apt-get clean", desc: "Vide le cache des paquets DKMUZ.", right: "Admin" },
  { shell: "sudo apt-get autoremove -y", desc: "Supprime les dépendances inutilisées DKMUZ.", right: "Admin" },
  { shell: "sudo dnf update", desc: "Met à jour la liste puis installe les paquets disponibles F.", right: "Admin" },
  { shell: "sudo dnf upgrade", desc: "Met à jour les paquets disponibles F.", right: "Admin" },
  { shell: "sudo dnf clean all", desc: "Vide le cache des paquets F.", right: "Admin" },
  { shell: "sudo dnf autoremove -y", desc: "Supprime les dépendances inutilisées F.", right: "Admin" },
  { shell: "systemctl status service", desc: "Affiche l'état d'un service.", right: "Terminal" },
  { shell: "systemctl restart service", desc: "Redémarre un service.", right: "Admin" },
  { shell: "uname -a", desc: "Donne la version du noyau et du système.", right: "Terminal" },
  { shell: "whoami", desc: "Montre le nom de l'utilisateur actuel.", right: "Terminal" },];
const SHORTCUTS = [
  { keys: ["Alt", "F4"], desc: "Ferme la fênetre active." },
  { keys: ["Alt", "Tab"], desc: "Bascule entre les fenêtres ouvertes." },
  { keys: ["Alt", "Échap"], desc: "Bascule les fenêtres sans aperçu." },
  { keys: ["Alt", "Entrer"], desc: "Ouvre les propriétés de l'élément sélectionné." },
  { keys: ["Maj", "Flèche"], desc: "Sélectionne le texte caractère par caractère." },
  { keys: ["Ctrl", "Win", "Flèche", "< ou >"], desc: "Change de bureau virtuel." },
  { keys: ["Ctrl", "0"], desc: "Réinitialise le zoom à 100%." },
  { keys: ["Ctrl", "A"], desc: "Sélectionne tout." },
  { keys: ["Ctrl", "Alt", "Suppr"], desc: "Fenêtre de sécurité et d'administration." },
  { keys: ["Ctrl", "B"], desc: "Met le texte en gras." },
  { keys: ["Ctrl", "C"], desc: "Copie ce qui est sélectionné." },
  { keys: ["Ctrl", "D"], desc: "Met un favori ou supprime un fichier." },
  { keys: ["Ctrl", "Maj", "Flèche"], desc: "Sélectionne le texte mot par mot." },
  { keys: ["Ctrl", "F"], desc: "Recherche d'un élement." },
  { keys: ["Ctrl", "F5"], desc: "Actualise la page sans cache." },
  { keys: ["Ctrl", "H"], desc: "Remplacer ou historique." },
  { keys: ["Ctrl", "I"], desc: "Met le texte en italique." },
  { keys: ["Ctrl", "J"], desc: "Téléchargements." },
  { keys: ["Ctrl", "L"], desc: "Barre d'adresse." },
  { keys: ["Ctrl", "Maj", "Echap"], desc: "Ouvre le Gestionnaire des tâches." },
  { keys: ["Ctrl", "Maj", "N"], desc: "Nouveau dossier / Navigation privée." },
  { keys: ["Ctrl", "Maj", "T"], desc: "Rouvre le dernier onglet fermé." },
  { keys: ["Ctrl", "Maj", "Tab"], desc: "Passe à l'onglet précédent." },
  { keys: ["Ctrl", "Maj", "V"], desc: "Colle un texte sans mise en page." },
  { keys: ["Ctrl", "Molette"], desc: "Zoom avant/arrière." },
  { keys: ["Ctrl", "N"], desc: "Ouvre une nouvelle fenêtre ou document." },
  { keys: ["Ctrl", "O"], desc: "Ouvrir un fichier." },
  { keys: ["Ctrl", "P"], desc: "Imprimer un fichier." },
  { keys: ["Ctrl", "Retour arrière"], desc: "Supprime le mot précédent." },
  { keys: ["Ctrl", "R"], desc: "Actualise la page/fenêtre." },
  { keys: ["Ctrl", "Suppr"], desc: "Supprime le mot suivant." },
  { keys: ["Ctrl", "S"], desc: "Enregistrer un fichier." },
  { keys: ["Ctrl", "Tab"], desc: "Passe à l'onglet suivant." },
  { keys: ["Ctrl", "U"], desc: "Met le texte en souligné." },
  { keys: ["Ctrl", "V"], desc: "Colle ce qui à déjà été copier ou couper." },
  { keys: ["Ctrl", "W"], desc: "Ferme l'onglet ouvert." },
  { keys: ["Ctrl", "Win", "D"], desc: "Créé un bureau virtuel." },
  { keys: ["Ctrl", "X"], desc: "Coupe vers le presse-papiers." },
  { keys: ["Ctrl", "Y"], desc: "Rétabli l'action annulée." },
  { keys: ["Ctrl", "Z"], desc: "Annule la dernière action." },
  { keys: ["Ctrl", "+"], desc: "Zoom avant." },
  { keys: ["Ctrl", "-"], desc: "Zoom arrière." },
  { keys: ["Entrée"], desc: "Valide ou ouvre l'élément sélectionné." },
  { keys: ["Espace"], desc: "Coche une case ou active un bouton sélectionné." },
  { keys: ["F1"], desc: "Ouvre l'aide." },
  { keys: ["F2"], desc: "Renome l'élément sélectionné." },
  { keys: ["F5"], desc: "Actualise la page ou le dossier." },
  { keys: ["F8"], desc: "Menu de démarrage avancé de Windows." },
  { keys: ["F11"], desc: "Mode plein écran." },
  { keys: ["F12"], desc: "Outils de développement." },
  { keys: ["Impr écran"], desc: "Copie l'écran complet dans le presse-papiers." },
  { keys: ["Maj", "Suppr"], desc: "Supprime sans passer par la corbeille." },
  { keys: ["Tab"], desc: "Passe à l'éléament suivant." },
  { keys: ["Win", ","], desc: "Aperçu temporaire du bureau." },
  { keys: ["Win", ";"], desc: "Ouvre la fenêtre des emojis." },
  { keys: ["Win", "+"], desc: "Zoom avant avec la loupe." },
  { keys: ["Win", "A"], desc: "Ouvre les actions rapides de Windows." },
  { keys: ["Win", "Ctrl", "O"], desc: "Clavier visuel." },
  { keys: ["Win", "Ctrl", "Maj", "B"], desc: "Réinitialise le pilote graphique." },
  { keys: ["Win", "D"], desc: "Masque et affiche toutes les fenêtres." },
  { keys: ["Win", "E"], desc: "Ouvre l'explorateur de fichiers." },
  { keys: ["Win", "Flèche", "< ou >"], desc: "Ancre la fenêtre sur un côté de l'écran." },
  { keys: ["Win", "G"], desc: "Ouvre la barre de jeux Xbox." },
  { keys: ["Win", "I"], desc: "Ouvre les paramètres de l'ordinateur." },
  { keys: ["Win", "Imp écran"], desc: "Capture l'écran complet." },
  { keys: ["Win", "K"], desc: "Connexion aux écrans sans fil." },
  { keys: ["Win", "L"], desc: "Verrouille la session." },
  { keys: ["Win", "N"], desc: "Ouvre le centre de notifications." },
  { keys: ["Win", "Maj", "Flèche", "< ou >"], desc: "Déplace la fenêtre actuelle." },
  { keys: ["Win", "P"], desc: "Menu de projection." },
  { keys: ["Win", "R"], desc: "Boîte de dialogue «Exécuter»." },
  { keys: ["Win", "S"], desc: "Recherche Windows." },
  { keys: ["Win", "V"], desc: "Ouvre l'historique du presse-papiers." },
  { keys: ["Win", "Tab"], desc: "Affiche les bureaux virtuels." },
  { keys: ["Win", "X"], desc: "Menu système avancé de Windows." },
  { keys: ["Win", "Z"], desc: "Ouvre le menu d'ancrage des fenêtres." },];
function buildSites() {
  const grid = document.getElementById("sites-grid");
  SITES.forEach(s => {
    const card = document.createElement("a");
    card.className = "file-card";
    card.href = s.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
<div class="file-header">
        <div class="file-icon">${s.logo ? `<img src="${s.logo}" alt="${s.name}" loading="lazy" onerror="this.parentElement.textContent='WEB'">` : "WEB"}</div>
        <span class="file-name">${s.name}</span>
      </div>
      <div class="file-desc">${s.desc}</div>
    `;
    grid.appendChild(card);
  });
}
function buildApps() {
  const grid = document.getElementById("apps-grid");
  APPS.forEach(a => {
    const card = document.createElement("a");
    card.className = "file-card";
    card.href = a.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.innerHTML = `
<div class="file-header">
        <div class="file-icon">${a.logo ? `<img src="${a.logo}" alt="${a.name}" loading="lazy" onerror="this.parentElement.textContent='APP'">` : "APP"}</div>
        <span class="file-name">${a.name}</span>
      </div>
      <div class="file-desc">${a.desc}</div>
    `;
    grid.appendChild(card);
  });
}
function buildContact() {
  const card = document.getElementById("contact-card");
  card.innerHTML = `
    <div class="contact-body">
      <div class="contact-name">${CONTACT.name}</div>
<div class="contact-actions">
        <a class="contact-pill" href="tel:${CONTACT.phone.replace(/\./g, "")}">
          <span class="pill-icon">📞</span>
          <span>${CONTACT.phone}</span>
        </a>
        <a class="contact-pill" href="mailto:${CONTACT.email}">
          <span class="pill-icon">✉️</span>
          <span>${CONTACT.email}</span>
        </a>
        <div class="contact-social">
          <a class="contact-pill" href="https://wa.me/33767295891" target="_blank" rel="noopener noreferrer">
            <img class="pill-icon-svg" src="https://cdn.simpleicons.org/whatsapp/EEF4FF" alt="WhatsApp" />
            <span>WhatsApp</span>
          </a>
          <a class="contact-pill" href="https://www.facebook.com/lorisgouhier85/" target="_blank" rel="noopener noreferrer">
            <img class="pill-icon-svg" src="https://cdn.simpleicons.org/facebook/EEF4FF" alt="Facebook" />
            <span>Facebook</span>
          </a>
          <a class="contact-pill" href="https://discord.com/users/1151044922472935425" target="_blank" rel="noopener noreferrer">
            <img class="pill-icon-svg" src="https://cdn.simpleicons.org/discord/EEF4FF" alt="Discord" />
            <span>Discord</span>
          </a>
        </div>
      </div>
  `;
}
function buildSkills() {
  const grid = document.getElementById("skills-grid");
  SKILLS.forEach(s => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.style.setProperty("--skill-color", s.color);
    card.style.setProperty("--skill-bg", s.color + "20");
    card.innerHTML = `
<div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-desc">${s.desc}</div>
    `;
    grid.appendChild(card);
  });
}
function buildRemoteSteps() {
  const container = document.getElementById("remote-steps");
  REMOTE_STEPS.forEach((text, i) => {
    const step = document.createElement("div");
    step.className = "remote-step";
    step.innerHTML = `<span class="step-num">${i + 1}</span><span class="step-text">${text}</span>`;
    container.appendChild(step);
  });
}
function makeCopyIcon(text) {
  const icon = document.createElement("span");
  icon.className = "copy-icon";
  icon.textContent = "📄";
  icon.title = "Copier";
  icon.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      icon.textContent = "✅";
      setTimeout(() => {
        icon.textContent = "📄";
      }, 2000);
    });
  });
  return icon;
}
function buildCommands(containerId, commands) {
  const container = document.getElementById(containerId);
  commands.forEach(c => {
    const row = document.createElement("div");
    row.className = "shell-row";
    const shellWrap = document.createElement("span");
    shellWrap.className = "shell-wrap";
    const shellText = document.createElement("span");
    shellText.className = "shell-text";
    shellText.textContent = c.shell;
    shellWrap.appendChild(shellText);
    shellWrap.appendChild(makeCopyIcon(c.shell));
    const desc = document.createElement("span");
    desc.className = "shell-desc";
    desc.textContent = c.desc;
    const right = document.createElement("span");
    const rightSlug = c.right.toLowerCase().replace(/\s+/g, "-");
    right.className = `right-badge right-${rightSlug}`;
    right.textContent = c.right;
    row.appendChild(shellWrap);
    row.appendChild(desc);
    row.appendChild(right);
    container.appendChild(row);
  });
}
function buildShortcuts() {
  const list = document.getElementById("shortcuts-list");
  SHORTCUTS.forEach(s => {
    const row = document.createElement("div");
    row.className = "shortcut-row";
    const keysDiv = document.createElement("span");
    keysDiv.className = "shortcut-keys";
    s.keys.forEach((k, i) => {
      if (i > 0) {
        const plus = document.createElement("span");
        plus.className = "key-plus";
        plus.textContent = "+";
        keysDiv.appendChild(plus);
      }
      const keySpan = document.createElement("span");
      keySpan.className = "key";
      keySpan.textContent = k;
      keysDiv.appendChild(keySpan);
    });
    const desc = document.createElement("span");
    desc.className = "shortcut-desc";
    desc.textContent = s.desc;
    row.appendChild(keysDiv);
    row.appendChild(desc);
    list.appendChild(row);
  });
}
function buildISO() {
  const grid = document.getElementById("iso-grid");
  ISO.forEach(iso => {
  const card = document.createElement("div");
      card.className = "file-card iso-card";
      card.innerHTML = `
  <div class="file-header">
          <div class="file-icon">${iso.logo ? `<img src="${iso.logo}" alt="${iso.name}" loading="lazy" onerror="this.parentElement.textContent='ISO'">` : "ISO"}</div>
          <span class="file-name">${iso.name}</span>
          <span class="file-version">${iso.version}</span>
        </div>
      <div class="file-links">
        <a href="${iso.official}" target="_blank" rel="noopener noreferrer" class="file-link">Lien Officiel</a>
        <a href="${iso.mega}" target="_blank" rel="noopener noreferrer" class="file-link">Méga</a>
        <a href="${iso.nas}" target="_blank" rel="noopener noreferrer" class="file-link">NAS-GOUHIER</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
function buildLinks() {
  const grid = document.getElementById("links-grid");
  LINKS.forEach(l => {
    const card = document.createElement("div");
    card.className = "file-card";
    card.innerHTML = `
  <div class="file-header">
          <div class="file-icon">${l.logo ? `<img src="${l.logo}" alt="${l.name}" loading="lazy" onerror="this.parentElement.textContent='DIR'">` : "DIR"}</div>
          <span class="file-name">${l.name}</span>
        </div>
      <div class="file-links">
        <a href="${l.mega}" target="_blank" rel="noopener noreferrer" class="file-link">${l.label1 || "Méga"}</a>
        <a href="${l.nas}" target="_blank" rel="noopener noreferrer" class="file-link">${l.label2 || "NAS-GOUHIER"}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}
function initPasswordGenerator() {
  const output = document.getElementById("pwd-output");
  const copyBtn = document.getElementById("pwd-copy");
  const generateBtn = document.getElementById("pwd-generate");
  const lengthInput = document.getElementById("pwd-length");
  const upperCheck = document.getElementById("pwd-upper");
  const numbersCheck = document.getElementById("pwd-numbers");
  const symbolsCheck = document.getElementById("pwd-symbols");
  const copiedMsg = document.getElementById("pwd-copied");
  if (!output || !generateBtn) return;
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";
  const syms = "*@-_.!?#%&";
  function generate() {
    const length = Math.min(50, Math.max(4, parseInt(lengthInput.value) || 16));
    let chars = lower;
    if (upperCheck.checked) chars += upper;
    if (numbersCheck.checked) chars += nums;
    if (symbolsCheck.checked) chars += syms;
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars[crypto.getRandomValues(new Uint32Array(1))[0] % chars.length];
    }
    output.value = password;
    copiedMsg.style.visibility = "hidden";
  }
  function copy() {
    if (output.value.trim() === "") return;
    navigator.clipboard.writeText(output.value);
    copiedMsg.style.visibility = "visible";
    setTimeout(() => copiedMsg.style.visibility = "hidden", 4000);
  }
  generateBtn.addEventListener("click", generate);
  copyBtn.addEventListener("click", copy);
}
function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const indicator = document.getElementById("tab-indicator");
  const nav = document.getElementById("tabs");
  const menuToggle = document.getElementById("menu-toggle");
  function closeMenu() {
    if (!nav || !menuToggle) return;
    nav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle("open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && e.target !== menuToggle) {
        closeMenu();
      }
    });
  }
  function moveIndicator(tabName) {
    if (!indicator) return;
    const btn = Array.from(tabs).find(t => t.dataset.tab === tabName);
    if (!btn) return;
    indicator.style.left = btn.offsetLeft + "px";
    indicator.style.width = btn.offsetWidth + "px";
  }
  function activate(tabName) {
  moveIndicator(tabName);
    window.scrollTo(0, 0);
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabName));
    contents.forEach(c => {
      c.classList.remove("active", "visible");
    });
    const target = document.getElementById(tabName);
    if (target) {
      target.classList.add("active");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.classList.add("visible");
        });
      });
    }
  }
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activate(tab.dataset.tab);
      closeMenu();
    });
  });
  const brand = document.getElementById("brand-home");
  if (brand) {
    brand.addEventListener("click", () => activate("aide"));
    brand.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate("aide");
      }
    });
  }
  window.addEventListener("resize", () => {
    const current = document.querySelector(".tab.active");
    if (current) moveIndicator(current.dataset.tab);
  });
if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const current = document.querySelector(".tab.active");
      if (current) moveIndicator(current.dataset.tab);
    });
  }
  activate("aide");
  requestAnimationFrame(() => {
    if (indicator) indicator.classList.remove("no-anim");
  });
}
function initReveals() {
  if (!("IntersectionObserver" in window)) {
document.querySelectorAll(".reveal-card").forEach(el => el.classList.add("reveal-in"));
    return;
  }
  document.querySelectorAll("#fichiers .file-card").forEach(el => el.classList.add("reveal-card"));
  const cardObserver = new IntersectionObserver((entries, obs) => {
    const toReveal = entries.filter(e => e.isIntersecting);
    toReveal.forEach((entry, i) => {
      entry.target.style.transitionDelay = (i * 0.02) + "s";
      entry.target.classList.add("reveal-in");
      setTimeout(() => { entry.target.style.transitionDelay = ""; }, 800);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
  document.querySelectorAll("#fichiers .file-card").forEach(el => cardObserver.observe(el));
}
window.addEventListener('pageshow', (e) => { if (e.persisted) window.scrollTo(0, 0); });
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('mentionsModal');
  const closeBtn = document.querySelector('.close-btn');
  let _triggerEl = null, _trapHandler = null;
  window.openModal = function() {
    _triggerEl = document.activeElement;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { modal.classList.add('show'); });
    document.querySelectorAll('body > *').forEach(el => {
      if (el !== modal && !el.contains(modal)) { el.setAttribute('inert', ''); el.setAttribute('data-was-inert', ''); }
    });
    _trapHandler = function(e) { if (e.key === 'Tab') e.preventDefault(); };
    document.addEventListener('keydown', _trapHandler);
  }
  window.closeModal = function() {
    if (_trapHandler) { document.removeEventListener('keydown', _trapHandler); _trapHandler = null; }
    document.querySelectorAll('[data-was-inert]').forEach(el => { el.removeAttribute('inert'); el.removeAttribute('data-was-inert'); });
    modal.classList.remove('show');
    document.body.style.overflow = '';
    setTimeout(() => { modal.style.display = 'none'; }, 100);
    if (_triggerEl && typeof _triggerEl.focus === 'function') { _triggerEl.focus(); _triggerEl = null; }
  }
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape" && modal.classList.contains('show')) { closeModal(); }
  });
  buildContact();
  buildSkills();
  buildRemoteSteps();
  buildApps();
  buildCommands("win-commands", WINDOWS);
  buildCommands("linux-commands", LINUX);
  buildShortcuts();
  buildISO();
  buildSites();
  initTabs();
  buildLinks();
  initPasswordGenerator();
  initReveals();
});