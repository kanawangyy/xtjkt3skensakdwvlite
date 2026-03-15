/* ════════════════════════════════════════════════════════════════
   X-TJKT-3.OS  ·  script.js
   JavaScript Logic: Clock, Schedule, Piket, Org SVG, Terminal,
                     Dark Mode, Modal, Easter Egg (TKJ secret)
   Author: Senior Frontend Architect
   Note: Code is commented thoroughly for Grade 10 students!
════════════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────────
   DATA: JADWAL PELAJARAN (Real data per hari)
   Format per item: { time, name, room, tag, isBreak, isTkj }
   dayIndex: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
────────────────────────────────────────────────────────────── */
const SCHEDULE_DATA = {

  /* ── SENIN (Monday) ── */
  1: [
    { time: '07:00–08:00', name: 'Upacara Bendera', room: 'Lapangan', tag: '一般', isBreak: false, isTkj: false },
    { time: '08:00–09:00', name: 'MBG (Makan Bergizi Gratis)', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '09:00–09:30', name: 'Istirahat 1 & Sholat Dhuha', room: '—', tag: '休憩', isBreak: true, isTkj: false },
    { time: '09:30–10:30', name: 'Bahasa Indonesia (Fairuzabadi, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '10:30–12:00', name: 'Matematika (Zam Zami, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '12:00–13:00', name: 'Sholat Dzuhur Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
    { time: '13:00–13:30', name: 'Bahasa Jawa (Eka Sri Nidayanti, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '13:30–14:00', name: 'Bimbingan Konseling', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '14:00–15:00', name: 'Mapel Coding & AI (Nor Amalia, S.Pd)', room: 'D3', tag: '専門', isBreak: false, isTkj: true },
    { time: '15:00–15:30', name: 'Sholat Ashar Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
],

  /* ── SELASA (Tuesday) – Full Day TKJ ── */
  2: [
    { time: '07:00–08:00', name: 'MBG (Makan Bergizi Gratis)', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '08:00–09:00', name: 'Dasar-Dasar TJKT (Miftakhudin, S.Kom)', room: 'BTKJ2', tag: '専門', isBreak: false, isTkj: true },
    { time: '09:00–09:30', name: 'Istirahat 1 & Sholat Dhuha', room: '—', tag: '休憩', isBreak: true, isTkj: false },
    { time: '09:30–12:00', name: 'Dasar-Dasar TJKT (Miftakhudin, S.Kom)', room: 'BTKJ2', tag: '専門', isBreak: false, isTkj: true },
    { time: '12:00–12:30', name: 'Sholat Dzuhur Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
    { time: '12:30–15:00', name: 'Dasar-Dasar TJKT (Fariz Hidayatullah, S.Pd)', room: 'BTKJ1', tag: '専門', isBreak: false, isTkj: true },
    { time: '15:00–15:30', name: 'Sholat Ashar Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
],

  /* ── RABU (Wednesday) ── */
  3: [
    { time: '07:00–08:00', name: 'MBG (Makan Bergizi Gratis)', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '08:00–09:00', name: 'Bahasa Inggris (Gita Rianawati, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '09:00–09:30', name: 'Istirahat 1 & Sholat Dhuha', room: '—', tag: '休憩', isBreak: true, isTkj: false },
    { time: '09:30–11:00', name: 'PJOK (Susilo, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '11:00–12:00', name: 'Matematika (Zam Zami, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '12:00–12:30', name: 'Sholat Dzuhur Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
    { time: '12:30–13:30', name: 'Seni Budaya (Andika Rizqi R, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '13:30–15:00', name: 'Proyek IPAS (Nur Fatwa, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '15:00–15:30', name: 'Sholat Ashar Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
],

  /* ── KAMIS (Thursday) ── */
  4: [
    { time: '07:00–08:00', name: 'MBG (Makan Bergizi Gratis)', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '08:00–09:00', name: 'Sejarah (Lidya Dwi J, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '09:00–09:30', name: 'Istirahat 1 & Sholat Dhuha', room: '—', tag: '休憩', isBreak: true, isTkj: false },
    { time: '09:30–11:00', name: 'Pendidikan Agama (Abdul Mughni, S.Pd.I)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '11:00–12:00', name: 'Bahasa Indonesia (Fairuzabadi, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '12:00–12:30', name: 'Sholat Dzuhur Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
    { time: '12:30–13:30', name: 'Pendidikan Pancasila/PPKN', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '13:30–15:00', name: 'Informatika (Agung Eka Maulana, S.T)', room: 'D3', tag: '専門', isBreak: false, isTkj: true },
    { time: '15:00–15:30', name: 'Sholat Ashar Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
],

  /* ── JUMAT (Friday) – Short day ── */
  5: [
    { time: '07:00–07:30', name: 'Jum’at Bersih', room: 'Lingkungan', tag: '一般', isBreak: false, isTkj: false },
    { time: '07:30–08:30', name: 'MBG (Makan Bergizi Gratis)', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '08:30–09:00', name: 'Kegiatan PBP', room: 'Kelas', tag: '一般', isBreak: false, isTkj: false },
    { time: '09:00–09:30', name: 'Istirahat 1 & Sholat Dhuha', room: '—', tag: '休憩', isBreak: true, isTkj: false },
    { time: '09:30–10:30', name: 'Kokurikuler', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '10:30–11:30', name: 'Proyek IPAS (Nur Fatwa, S.Pd)', room: 'D3', tag: '一般', isBreak: false, isTkj: false },
    { time: '11:30–13:00', name: 'Sholat Jum’at', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
    { time: '13:00–15:00', name: 'Ekstra Wajib Pramuka', room: 'Lapangan', tag: '一般', isBreak: false, isTkj: false },
    { time: '15:00–15:30', name: 'Sholat Ashar Berjamaah', room: 'Mushola', tag: '休憩', isBreak: true, isTkj: false },
],

  /* Weekend – no class */
  0: null,
  6: null,
};

/* ──────────────────────────────────────────────────────────────
   DATA: PIKET HARIAN (Duty roster per day)
────────────────────────────────────────────────────────────── */
const PIKET_DATA = {
  1: [ // Senin
    { name: 'Zahra',   task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Haikal',  task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
    { name: 'Farish',  task: '掃除 · Bersih-bersih & Menyapu', progress: 90 },
    { name: 'Tsaqib',  task: '掃除 · Bersih-bersih & Menyapu', progress: 60 },
    { name: 'Nadia',   task: '掃除 · Bersih-bersih & Menyapu', progress: 80 },
    { name: 'Luna',    task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Nakesya', task: '掃除 · Bersih-bersih & Menyapu', progress: 75 },
],
  2: [ // Selasa
    { name: 'Nala',   task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Intan',  task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
    { name: 'Edgar',  task: '掃除 · Bersih-bersih & Menyapu', progress: 90 },
    { name: 'Niken',  task: '掃除 · Bersih-bersih & Menyapu', progress: 60 },
    { name: 'Novi',   task: '掃除 · Bersih-bersih & Menyapu', progress: 80 },
    { name: 'Octa',   task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Prisca', task: '掃除 · Bersih-bersih & Menyapu', progress: 75 },
],
  3: [ // Rabu
    { name: 'Syaqova', task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Nabila',  task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
    { name: 'Regina',  task: '掃除 · Bersih-bersih & Menyapu', progress: 90 },
    { name: 'Reva',    task: '掃除 · Bersih-bersih & Menyapu', progress: 60 },
    { name: 'Salma',   task: '掃除 · Bersih-bersih & Menyapu', progress: 80 },
    { name: 'Rosana',  task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
],
  4: [ // Kamis
    { name: 'Sazkia', task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Umay',   task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
    { name: 'Ruroh',  task: '掃除 · Bersih-bersih & Menyapu', progress: 90 },
    { name: 'Bagus',  task: '掃除 · Bersih-bersih & Menyapu', progress: 100 },
    { name: 'Zain',   task: '掃除 · Bersih-bersih & Menyapu', progress: 80 },
    { name: 'Ocha',   task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Aini',   task: '掃除 · Bersih-bersih & Menyapu', progress: 75 },
    { name: 'Siva',   task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
],
  5: [ // Jumat
    { name: 'Tiyas',  task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Sinta',  task: '掃除 · Bersih-bersih & Menyapu', progress: 70 },
    { name: 'Umiy',   task: '掃除 · Bersih-bersih & Menyapu', progress: 90 },
    { name: 'Vivian', task: '掃除 · Bersih-bersih & Menyapu', progress: 60 },
    { name: 'Syafa',  task: '掃除 · Bersih-bersih & Menyapu', progress: 80 },
    { name: 'Syifa',  task: '掃除 · Bersih-bersih & Menyapu', progress: 85 },
    { name: 'Zaskia', task: '掃除 · Bersih-bersih & Menyapu', progress: 75 },
],

  /* Weekend – no class */
  0: null,
  6: null,
};

/* ──────────────────────────────────────────────────────────────
   DATA: TERMINAL LOG MESSAGES
────────────────────────────────────────────────────────────── */
const TERMINAL_LOGS = [
  { type: 'info', text: 'Booting X_TJKT_3.OS v3.0.1 ...' },
  { type: 'ok',   text: 'Kernel initialized. RAM: 16 GB OK  |  CPU: 8 cores' },
  { type: 'info', text: 'Fetching class_data.db ...' },
  { type: 'ok',   text: 'class_data.db loaded  →  36 students registered' },
  { type: 'info', text: 'Scanning network interface wlan0 ...' },
  { type: 'ok',   text: 'IP Detected: 192.168.10.42  (WLAN-TKJ · SSID: SMKN-LAB)' },
  { type: 'ok',   text: 'Connection: 192.168.1.100 gateway  ·  Latency: 4ms' },
  { type: 'warn', text: 'Resolving DNS: xtjkt3skensakdwvlite.vercel.app ...' },
  { type: 'ok',   text: 'DNS resolved  →  104.21.8.72' },
  { type: 'info', text: 'Loading schedule database ...' },
  { type: 'ok',   text: 'Schedule sync complete  ·  Updated: ' + new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
  { type: 'info', text: 'Checking system status ...' },
  { type: 'ok',   text: 'All systems nominal  ·  Uptime: 99.9%' },
  { type: 'ok',   text: 'System Status: All students accounted for.' },
  { type: 'dim',  text: '═'.repeat(48) },
  { type: 'info', text: 'Welcome to the Lab, X TJKT-3!  頑張ってください。' },
];

/* ──────────────────────────────────────────────────────────────
   UTILITY: Day names lookup tables
────────────────────────────────────────────────────────────── */
const DAY_NAME_ID  = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const DAY_KANJI    = ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'];
const DAY_BADGE    = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTH_JP     = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

/* ──────────────────────────────────────────────────────────────
   MODULE A: REAL-TIME CLOCK
   Updates every second in the top bar.
────────────────────────────────────────────────────────────── */
function updateClock() {
  const now = new Date();

  /* Format HH:MM:SS */
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  /* Format Japanese date: YYYY年M月D日 · 曜日 */
  const year  = now.getFullYear();
  const month = MONTH_JP[now.getMonth()];
  const day   = now.getDate();
  const kanji = DAY_KANJI[now.getDay()];

  const clockEl = document.getElementById('tbClock');
  const dateEl  = document.getElementById('tbDate');

  if (clockEl) clockEl.textContent = `${hh}:${mm}:${ss}`;
  if (dateEl)  dateEl.textContent  = `${year}年${month}${day}日 · ${kanji}`;
}

/* Start clock immediately and update every second */
updateClock();
setInterval(updateClock, 1000);

/* ──────────────────────────────────────────────────────────────
   UTILITY: Parse time string like "07:00–09:15"
   Returns { startMin, endMin } in minutes-from-midnight.
────────────────────────────────────────────────────────────── */
function parseTimeRange(timeStr) {
  /* Split on em-dash "–" */
  const [startStr, endStr] = timeStr.split('–');
  const toMin = (t) => {
    const [h, m] = t.trim().split(':').map(Number);
    return h * 60 + m;
  };
  return { startMin: toMin(startStr), endMin: toMin(endStr) };
}

function getNowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

/* ──────────────────────────────────────────────────────────────
   MODULE B1: RENDER SCHEDULE WIDGET
   Uses switch-case pattern to handle each day.
────────────────────────────────────────────────────────────── */
function renderSchedule() {
  const today    = new Date();
  const dayIndex = today.getDay(); // 0=Sun ... 6=Sat
  const nowMin   = getNowMinutes();

  /* Update day labels in widget header */
  const schedDayName  = document.getElementById('schedDayName');
  const schedDayKanji = document.getElementById('schedDayKanji');
  const schedDayBadge = document.getElementById('schedDayBadge');
  const schedList     = document.getElementById('schedList');

  if (!schedList) return;

  if (schedDayName)  schedDayName.textContent  = DAY_NAME_ID[dayIndex];
  if (schedDayKanji) schedDayKanji.textContent = DAY_KANJI[dayIndex];
  if (schedDayBadge) schedDayBadge.textContent = DAY_BADGE[dayIndex];

  /* Use switch-case to get today's data */
  let todayData;
  switch (dayIndex) {
    case 1:  todayData = SCHEDULE_DATA[1]; break;  // Senin
    case 2:  todayData = SCHEDULE_DATA[2]; break;  // Selasa
    case 3:  todayData = SCHEDULE_DATA[3]; break;  // Rabu
    case 4:  todayData = SCHEDULE_DATA[4]; break;  // Kamis
    case 5:  todayData = SCHEDULE_DATA[5]; break;  // Jumat
    default: todayData = null; break;              // Weekend
  }

  /* ── Weekend / No Class ── */
  if (!todayData) {
    schedList.innerHTML = `
      <div class="sched-empty">
        <span class="sched-kanji">休日</span>
        🎌 Hari Libur — Nikmati hari ini!<br/>
        <span style="font-size:0.7rem;opacity:0.6;">Sekolah dimulai kembali hari Senin.</span>
      </div>`;
    return;
  }

  /* ── Build each schedule row ── */
  schedList.innerHTML = '';

  todayData.forEach((item) => {
    const { startMin, endMin } = parseTimeRange(item.time);
    const isCurrent = !item.isBreak && (nowMin >= startMin && nowMin < endMin);

    /* Build tag element string */
    let tagClass = 'sched-tag';
    if (item.isTkj)    tagClass += ' tag-tkj';
    if (item.isBreak)  tagClass += ' tag-break';

    /* Only show start time (before the dash) */
    const displayTime = item.time.split('–')[0];

    const div = document.createElement('div');
    div.className = `sched-item${isCurrent ? ' active' : ''}`;
    div.innerHTML = `
      <span class="sched-time">${displayTime}</span>
      <span class="sched-dot"></span>
      <div class="sched-info">
        <div class="sched-name">${item.name}</div>
        <div class="sched-room">${item.room}</div>
      </div>
      <span class="${tagClass}">${item.tag}</span>
      ${isCurrent ? '<span class="sched-now-badge">NOW</span>' : ''}
    `;
    schedList.appendChild(div);
  });
}

/* ──────────────────────────────────────────────────────────────
   MODULE B2: RENDER PIKET WIDGET
────────────────────────────────────────────────────────────── */
function renderPiket() {
  const dayIndex     = new Date().getDay();
  const piketGrid    = document.getElementById('piketGrid');
  const piketBadge   = document.getElementById('piketDayBadge');

  if (!piketGrid) return;

  if (piketBadge) piketBadge.textContent = DAY_BADGE[dayIndex];

  /* Weekend: show holiday message, no piket */
  if (!PIKET_DATA[dayIndex]) {
    piketGrid.innerHTML = `
      <div class="sched-empty" style="grid-column:1/-1;padding:var(--s-12) var(--s-8);">
        <span class="sched-kanji">休日</span>
        🎌 Tidak ada piket hari ini!<br/>
        <span style="font-size:0.7rem;opacity:0.6;">Piket dimulai kembali hari Senin.</span>
      </div>`;
    return;
  }

  const piketList = PIKET_DATA[dayIndex];
  piketGrid.innerHTML = '';

  piketList.forEach((student) => {
    const card = document.createElement('div');
    card.className = 'piket-card';
    card.innerHTML = `
      <div class="piket-avatar">
        <svg xmlns="http://www.w3.org/2000/svg" class="piket-ava-icon" viewBox="0 0 24 24"
             fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <p class="piket-name">${student.name}</p>
      <p class="piket-task sawarabi">${student.task}</p>
    `;
    piketGrid.appendChild(card);
  });

  /* Animate progress bars: start at 0, fill to target after render */
  setTimeout(() => {
    document.querySelectorAll('.prog-fill').forEach((bar) => {
      bar.style.width = bar.getAttribute('data-target') + '%';
    });
  }, 500);
}

/* ──────────────────────────────────────────────────────────────
   MODULE C: ORG CHART — SVG Curved Connector Lines
   Uses getBoundingClientRect() to find node positions,
   then draws Bezier curves between them.
────────────────────────────────────────────────────────────── */
function drawOrgLines() {
  const svg     = document.getElementById('treeSvg');
  const treeWrap = document.querySelector('.tree-wrap');
  if (!svg || !treeWrap) return;

  /* Clear previous lines */
  svg.innerHTML = '';

  const wrapRect = treeWrap.getBoundingClientRect();

  /* Helper: get center-top and center-bottom of a node relative to .tree-wrap */
  function getNodePoints(node) {
    const r = node.getBoundingClientRect();
    return {
      topX:    r.left + r.width / 2  - wrapRect.left,
      topY:    r.top               - wrapRect.top,
      bottomX: r.left + r.width / 2  - wrapRect.left,
      bottomY: r.bottom            - wrapRect.top,
    };
  }

  /* Helper: draw a smooth cubic Bezier path between two points */
  function drawCurve(x1, y1, x2, y2, color = 'rgba(123,110,232,0.28)', dash = '5 4') {
    const midY   = (y1 + y2) / 2;
    const path   = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d',                `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
    path.setAttribute('fill',             'none');
    path.setAttribute('stroke',           color);
    path.setAttribute('stroke-width',     '1.6');
    path.setAttribute('stroke-dasharray', dash);
    path.setAttribute('stroke-linecap',   'round');
    svg.appendChild(path);
  }

  /* Helper: draw straight horizontal line */
  function drawHLine(x1, x2, y, color = 'rgba(123,110,232,0.22)') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1',           x1);
    line.setAttribute('y1',           y);
    line.setAttribute('x2',           x2);
    line.setAttribute('y2',           y);
    line.setAttribute('stroke',       color);
    line.setAttribute('stroke-width', '1.6');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }

  /* Helper: draw straight vertical line */
  function drawVLine(x, y1, y2, color = 'rgba(123,110,232,0.22)', dash = '0') {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1',            x);
    line.setAttribute('y1',            y1);
    line.setAttribute('x2',            x);
    line.setAttribute('y2',            y2);
    line.setAttribute('stroke',        color);
    line.setAttribute('stroke-width',  '1.6');
    line.setAttribute('stroke-dasharray', dash);
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  }

  /* ── Query all node levels ── */
  const level0Nodes = document.querySelectorAll('.level-0 .tree-node');
  const level1Nodes = document.querySelectorAll('.level-1 .tree-node');
  const level2Nodes = document.querySelectorAll('.level-2 .tree-node');
  const level3Nodes = document.querySelectorAll('.level-3 .tree-node');

  /* ── LEVEL 0 (Wali) → LEVEL 1 (Ketua) ── */
  if (level0Nodes.length && level1Nodes.length) {
    const src  = getNodePoints(level0Nodes[0]);
    const dest = getNodePoints(level1Nodes[0]);
    drawCurve(src.bottomX, src.bottomY, dest.topX, dest.topY, 'rgba(52,211,153,0.40)', '5 4');
  }

  /* ── LEVEL 1 (Ketua) → LEVEL 2 nodes ── */
  if (level1Nodes.length && level2Nodes.length) {
    const src = getNodePoints(level1Nodes[0]);

    /* Get all destination x positions */
    const destPoints = Array.from(level2Nodes).map(n => getNodePoints(n));

    /* Vertical drop from Ketua to a horizontal junction point */
    const junctionY = src.bottomY + (destPoints[0].topY - src.bottomY) * 0.45;
    drawVLine(src.bottomX, src.bottomY, junctionY, 'rgba(123,110,232,0.35)', '0');

    /* Horizontal spanning bar connecting all dest columns */
    const minX = Math.min(...destPoints.map(p => p.topX));
    const maxX = Math.max(...destPoints.map(p => p.topX));
    if (minX !== maxX) {
      drawHLine(minX, maxX, junctionY, 'rgba(123,110,232,0.28)');
    }

    /* Vertical drops from junction to each level-2 node */
    destPoints.forEach(p => {
      drawVLine(p.topX, junctionY, p.topY, 'rgba(123,110,232,0.28)', '0');
    });
  }

  /* ── LEVEL 2 → LEVEL 3 ── */
  if (level2Nodes.length && level3Nodes.length) {
    const srcPoints  = Array.from(level2Nodes).map(n => getNodePoints(n));
    const destPoints = Array.from(level3Nodes).map(n => getNodePoints(n));

    /* Overall junction Y between levels */
    const junctionY = srcPoints[0].bottomY + (destPoints[0].topY - srcPoints[0].bottomY) * 0.4;

    /* Drop lines from each level-2 down to junction */
    srcPoints.forEach(p => {
      drawVLine(p.bottomX, p.bottomY, junctionY, 'rgba(123,110,232,0.22)', '0');
    });

    /* Horizontal bar spanning all level-2 nodes */
    const minSrcX = Math.min(...srcPoints.map(p => p.bottomX));
    const maxSrcX = Math.max(...srcPoints.map(p => p.bottomX));
    drawHLine(minSrcX, maxSrcX, junctionY, 'rgba(123,110,232,0.18)');

    /* Curved lines to each level-3 node */
    destPoints.forEach(p => {
      drawCurve(
        p.topX, junctionY,
        p.topX, p.topY,
        'rgba(123,110,232,0.25)', '5 4'
      );
    });
  }
}

/* ──────────────────────────────────────────────────────────────
   MODULE D: TERMINAL AUTO-TYPE
   Appends lines one by one with realistic delays.
────────────────────────────────────────────────────────────── */
function runTerminal() {
  const body = document.getElementById('termBody');
  if (!body) return;

  let i = 0;

  function appendNextLine() {
    if (i >= TERMINAL_LOGS.length) return;
    const log = TERMINAL_LOGS[i++];

    /* Get current timestamp */
    const now = new Date();
    const ts  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    /* Choose CSS class and prefix badge based on log type */
    let badge, textClass;
    switch (log.type) {
      case 'ok':   badge = '[  OK  ]'; textClass = 'tl-ok';   break;
      case 'warn': badge = '[ WARN ]'; textClass = 'tl-warn'; break;
      case 'err':  badge = '[ ERR  ]'; textClass = 'tl-err';  break;
      case 'dim':  badge = '';         textClass = 'tl-dim';   break;
      default:     badge = '[ INFO ]'; textClass = 'tl-info'; break;
    }

    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `
      <span class="tl-ts">${ts}</span>
      ${badge ? `<span class="tl-pre">${badge}</span>` : ''}
      <span class="${textClass}">${log.text}</span>
    `;

    body.appendChild(line);
    /* Auto-scroll terminal to bottom */
    body.scrollTop = body.scrollHeight;

    /* Delay before next line (randomized for realism) */
    const delay = log.type === 'dim'
      ? 150
      : 300 + Math.random() * 280;

    setTimeout(appendNextLine, delay);
  }

  /* Small initial delay before terminal "boots" */
  setTimeout(appendNextLine, 900);
}

/* ──────────────────────────────────────────────────────────────
   MODULE E: MODAL — Node Detail on Click
────────────────────────────────────────────────────────────── */
function initModal() {
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalClose');

  /* Attach click event to each tree-node */
  document.querySelectorAll('.tree-node').forEach(node => {
    node.addEventListener('click', () => {
      const name  = node.getAttribute('data-name')  || '—';
      const role  = node.getAttribute('data-role')  || '—';
      const jp    = node.getAttribute('data-jp')    || '—';
      const desc  = node.getAttribute('data-desc')  || '';
      const ig    = node.getAttribute('data-ig')    || '';

      document.getElementById('modalName').textContent = name;
      document.getElementById('modalRole').textContent = role;
      document.getElementById('modalJp').textContent   = jp;
      document.getElementById('modalDesc').textContent = desc;

      /* Render IG handles as chips */
      const igWrap = document.getElementById('modalIg');
      igWrap.innerHTML = '';
      if (ig) {
        ig.split(' ').filter(Boolean).forEach(handle => {
          const chip = document.createElement('span');
          chip.className = 'modal-ig-chip';
          chip.textContent = handle;
          igWrap.appendChild(chip);
        });
      }

      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
    });
  });

  /* Close modal on button or backdrop click */
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  /* Close on Escape key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

/* ──────────────────────────────────────────────────────────────
   MODULE F: DARK MODE TOGGLE
────────────────────────────────────────────────────────────── */
function initThemeToggle() {
  const btn      = document.getElementById('themeToggle');
  const iconEl   = document.getElementById('toggleIcon');
  if (!btn) return;

  /* Load saved preference */
  const saved = localStorage.getItem('xtjkt3-theme');
  if (saved === 'dark') enableDark();

  btn.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      disableDark();
    } else {
      enableDark();
    }
  });

  function enableDark() {
    document.body.classList.add('dark');
    localStorage.setItem('xtjkt3-theme', 'dark');
    /* Swap icon to sun */
    iconEl.setAttribute('data-lucide', 'sun');
    lucide.createIcons();
  }

  function disableDark() {
    document.body.classList.remove('dark');
    localStorage.setItem('xtjkt3-theme', 'light');
    /* Swap icon back to moon */
    iconEl.setAttribute('data-lucide', 'moon');
    lucide.createIcons();
  }
}

/* ──────────────────────────────────────────────────────────────
   MODULE G: EASTER EGG — Type "tkj" anywhere on page
   A fun secret for TKJ students! 🎌
────────────────────────────────────────────────────────────── */
function initEasterEgg() {
  const overlay    = document.getElementById('easterOverlay');
  const closeBtn   = document.getElementById('easterClose');
  const secretCode = 'tkj';
  let   buffer     = '';

  document.addEventListener('keydown', (e) => {
    /* Append character to buffer */
    buffer += e.key.toLowerCase();
    /* Keep only last N characters (same length as secret) */
    buffer = buffer.slice(-secretCode.length);

    /* Check if buffer matches the secret code */
    if (buffer === secretCode) {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      buffer = '';
    }
  });

  closeBtn.addEventListener('click', () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
  });
}

/* ──────────────────────────────────────────────────────────────
   MODULE H: ALL-SCHEDULE MODAL
   Shows full week timetable with day tabs.
────────────────────────────────────────────────────────────── */
function initAllScheduleModal() {
  const backdrop  = document.getElementById('allSchedBackdrop');
  const closeBtn  = document.getElementById('allSchedClose');
  const body      = document.getElementById('allSchedBody');
  const tabsWrap  = document.getElementById('schedDayTabs');
  const openBtn   = document.getElementById('btnAllSched');
  if (!backdrop || !openBtn) return;

  const DAY_FULL = ['', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  let activeDay = 1;

  function renderSchedTab(dayIndex) {
    const data = SCHEDULE_DATA[dayIndex];
    body.innerHTML = '';
    if (!data) {
      body.innerHTML = `<div class="sched-empty"><span class="sched-kanji">休日</span>🎌 Hari Libur!</div>`;
      return;
    }
    const nowMin = getNowMinutes();
    const todayIdx = new Date().getDay();
    data.forEach(item => {
      const { startMin, endMin } = parseTimeRange(item.time);
      const isCurrent = dayIndex === todayIdx && !item.isBreak && nowMin >= startMin && nowMin < endMin;
      let tagClass = 'sched-tag';
      if (item.isTkj)   tagClass += ' tag-tkj';
      if (item.isBreak) tagClass += ' tag-break';
      const displayTime = item.time.split('–')[0];
      const div = document.createElement('div');
      div.className = `sched-item${isCurrent ? ' active' : ''}`;
      div.innerHTML = `
        <span class="sched-time">${displayTime}</span>
        <span class="sched-dot"></span>
        <div class="sched-info">
          <div class="sched-name">${item.name}</div>
          <div class="sched-room">${item.room}</div>
        </div>
        <span class="${tagClass}">${item.tag}</span>
        ${isCurrent ? '<span class="sched-now-badge">NOW</span>' : ''}
      `;
      body.appendChild(div);
    });
  }

  function switchTab(dayIndex) {
    activeDay = dayIndex;
    tabsWrap.querySelectorAll('.day-tab').forEach(t => {
      t.classList.toggle('active', Number(t.dataset.day) === dayIndex);
    });
    renderSchedTab(dayIndex);
  }

  tabsWrap.addEventListener('click', e => {
    const tab = e.target.closest('.day-tab');
    if (tab) switchTab(Number(tab.dataset.day));
  });

  openBtn.addEventListener('click', () => {
    /* Default to today's tab if weekday, else Monday */
    const today = new Date().getDay();
    switchTab(today >= 1 && today <= 5 ? today : 1);
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => closeAllSched());
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeAllSched(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllSched(); });

  function closeAllSched() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

/* ──────────────────────────────────────────────────────────────
   MODULE I: ALL-PIKET MODAL
   Shows full week piket roster with day tabs.
────────────────────────────────────────────────────────────── */
function initAllPiketModal() {
  const backdrop  = document.getElementById('allPiketBackdrop');
  const closeBtn  = document.getElementById('allPiketClose');
  const body      = document.getElementById('allPiketBody');
  const tabsWrap  = document.getElementById('piketDayTabs');
  const openBtn   = document.getElementById('btnAllPiket');
  if (!backdrop || !openBtn) return;

  function renderPiketTab(dayIndex) {
    const list = PIKET_DATA[dayIndex];
    body.innerHTML = '';
    if (!list) {
      body.innerHTML = `<div class="sched-empty"><span class="sched-kanji">休日</span>🎌 Tidak ada piket hari ini!</div>`;
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'piket-grid';
    list.forEach(student => {
      const card = document.createElement('div');
      card.className = 'piket-card';
      card.innerHTML = `
        <div class="piket-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" class="piket-ava-icon" viewBox="0 0 24 24"
               fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <p class="piket-name">${student.name}</p>
        <p class="piket-task sawarabi">${student.task}</p>
      `;
      grid.appendChild(card);
    });
    body.appendChild(grid);
  }

  function switchPiketTab(dayIndex) {
    tabsWrap.querySelectorAll('.day-tab').forEach(t => {
      t.classList.toggle('active', Number(t.dataset.day) === dayIndex);
    });
    renderPiketTab(dayIndex);
  }

  tabsWrap.addEventListener('click', e => {
    const tab = e.target.closest('.day-tab');
    if (tab) switchPiketTab(Number(tab.dataset.day));
  });

  openBtn.addEventListener('click', () => {
    const today = new Date().getDay();
    switchPiketTab(today >= 1 && today <= 5 ? today : 1);
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => closeAllPiket());
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeAllPiket(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllPiket(); });

  function closeAllPiket() {
    backdrop.classList.remove('open');
    backdrop.setAttribute('aria-hidden', 'true');
  }
}

/* ──────────────────────────────────────────────────────────────
   INIT — Run everything on DOM ready
────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* 1. Initialize Lucide Icons (converts data-lucide attributes into SVGs) */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* 2. Render dashboard widgets */
  renderSchedule();
  renderPiket();

  /* 3. Draw SVG org chart lines after layout settles */
  requestAnimationFrame(() => {
    /* Small delay ensures nodes are fully painted */
    setTimeout(drawOrgLines, 350);
  });

  /* 4. Start terminal */
  runTerminal();

  /* 5. Wire up modal interactions */
  initModal();

  /* 6. Dark mode toggle */
  initThemeToggle();

  /* 7. Easter egg */
  initEasterEgg();

  /* 8. All-schedule & all-piket modals */
  initAllScheduleModal();
  initAllPiketModal();

  /* 9. Animated background particles */
  initParticles();

  /* 10. Scroll-reveal animations */
  initScrollReveal();

  /* 11. Ripple click effect on all buttons */
  initRipple();

  /* 12. Motivation quotes */
  initMotivation();

  /* 8. Redraw SVG connector lines on window resize */
  let resizeDebounce;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(drawOrgLines, 200);
  });
});

/* ──────────────────────────────────────────────────────────────
   MODULE X: ANIMATED BACKGROUND PARTICLES
   Spawns small glowing orbs that float upward randomly.
────────────────────────────────────────────────────────────── */
function initParticles() {
  // Disabled for performance
}

/* ──────────────────────────────────────────────────────────────
   MODULE Y: SCROLL-REVEAL
   Uses IntersectionObserver to animate elements into view.
────────────────────────────────────────────────────────────── */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────────────────────────────
   MODULE Z: RIPPLE CLICK EFFECT
   Creates a material-design ripple on any .ripple-host element.
────────────────────────────────────────────────────────────── */
function initRipple() {
  document.addEventListener('click', (e) => {
    const host = e.target.closest('.ripple-host');
    if (!host) return;

    const rect   = host.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const wave = document.createElement('span');
    wave.className = 'ripple-wave';
    wave.style.cssText = `
      width:${size}px; height:${size}px;
      left:${x}px; top:${y}px;
    `;
    host.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  });

  /* Also add ripple-host to tree nodes and sf-links dynamically */
  document.querySelectorAll('.tree-node, .sf-link, .day-tab, .easter-close, .theme-toggle').forEach(el => {
    el.classList.add('ripple-host');
  });
}

/* ──────────────────────────────────────────────────────────────
   MODULE M: MOTIVATION QUOTES
   50 quotes from famous figures. Displayed randomly below footer.
────────────────────────────────────────────────────────────── */
const MOTIVATION_QUOTES = [
  { text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.", author: "Nelson Mandela" },
  { text: "Belajarlah seolah kamu akan hidup selamanya, hiduplah seolah kamu akan mati besok.", author: "Mahatma Gandhi" },
  { text: "Kesuksesan adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.", author: "Colin Powell" },
  { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah dengan mencintai apa yang kamu lakukan.", author: "Steve Jobs" },
  { text: "Imajinasi lebih penting daripada pengetahuan. Pengetahuan terbatas, imajinasi melingkupi dunia.", author: "Albert Einstein" },
  { text: "Tantangan hidup bukan untuk mengalahkan kita, melainkan untuk mengungkapkan potensi kita.", author: "Oprah Winfrey" },
  { text: "Jangan biarkan kemarin mengambil terlalu banyak dari hari ini.", author: "Will Rogers" },
  { text: "Mulailah dengan melakukan apa yang perlu, lalu lakukan apa yang mungkin, dan tiba-tiba kamu melakukan yang mustahil.", author: "Francis of Assisi" },
  { text: "Keberhasilan bukanlah kunci kebahagiaan. Kebahagiaan adalah kunci keberhasilan. Jika kamu mencintai apa yang kamu lakukan, kamu akan berhasil.", author: "Albert Schweitzer" },
  { text: "Jangan takut gagal. Tidak mungkin sukses tanpa gagal terlebih dahulu.", author: "Walt Disney" },
  { text: "Dalam setiap kesulitan terdapat kemudahan.", author: "Buya Hamka" },
  { text: "Masa depan adalah milik mereka yang percaya pada keindahan mimpi-mimpi mereka.", author: "Eleanor Roosevelt" },
  { text: "Semakin keras kamu bekerja untuk sesuatu, semakin besar perasaan puas saat kamu mencapainya.", author: "Anonim" },
  { text: "Orang yang berhasil memiliki momentum. Semakin mereka berhasil, semakin mereka ingin berhasil.", author: "Tony Robbins" },
  { text: "Teknologi adalah alat terbesar untuk menyamakan kesempatan yang pernah ada di dunia.", author: "Arne Sorenson" },
  { text: "Kode adalah puisi yang bisa berjalan.", author: "Anonim (Programmer)" },
  { text: "Setiap masalah yang dipecahkan menjadi aturan baru untuk memecahkan masalah serupa.", author: "Alan Turing" },
  { text: "Komputer tidak berguna. Komputer hanya bisa menjawab pertanyaan.", author: "Pablo Picasso" },
  { text: "Jaringan komputer adalah tulang punggung dunia modern. Belajarlah membangunnya.", author: "Vint Cerf" },
  { text: "Programmer yang baik bukan yang menulis kode paling banyak, tapi yang memecahkan masalah paling elegan.", author: "Linus Torvalds" },
  { text: "Kalau kamu tidak pernah mencoba, kamu tidak akan pernah tahu.", author: "Anonim" },
  { text: "Hari ini kamu akan melakukan hal-hal yang orang biasa tidak mau, sehingga besok kamu bisa melakukan hal-hal yang orang biasa tidak bisa.", author: "Jerry Rice" },
  { text: "Satu-satunya batasan dari pencapaian kita adalah keraguan-keraguan hari ini.", author: "Franklin D. Roosevelt" },
  { text: "Disiplin adalah jembatan antara tujuan dan pencapaian.", author: "Jim Rohn" },
  { text: "Setiap langkah ke depan, sekecil apapun, adalah kemajuan.", author: "Martin Luther King Jr." },
  { text: "Beri aku sebuah tuas yang cukup panjang dan aku akan menggerakkan bumi.", author: "Archimedes" },
  { text: "Inovasi membedakan pemimpin dari pengikut.", author: "Steve Jobs" },
  { text: "Internet adalah kota terbesar yang pernah ada. Dan kita baru saja memulai pembangunannya.", author: "John Perry Barlow" },
  { text: "Belajar adalah bukan tentang usia. Saat pikiran terbuka, umur tidak relevan.", author: "Martina Navratilova" },
  { text: "Kita tidak bisa memecahkan masalah dengan cara berpikir yang sama seperti ketika kita menciptakannya.", author: "Albert Einstein" },
  { text: "Keberanian bukanlah tidak adanya rasa takut, melainkan keputusan bahwa ada sesuatu yang lebih penting dari rasa takut.", author: "Ambrose Redmoon" },
  { text: "Tiada hari tanpa sesuatu yang baru untuk dipelajari.", author: "Ki Hajar Dewantara" },
  { text: "Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.", author: "Ki Hajar Dewantara" },
  { text: "Kemajuan ilmu pengetahuan tidak selalu berarti kemajuan manusia, tetapi tanpa ilmu, manusia tidak bisa maju.", author: "Tan Malaka" },
  { text: "Kegagalan adalah awal dari kesuksesan, bukan akhir dari segalanya.", author: "Soekarno" },
  { text: "Setinggi-tingginya ilmu, semurni-murninya tauhid, seteguh-teguhnya hati.", author: "Buya Hamka" },
  { text: "Mimpi kamu hari ini adalah kenyataan kamu hari esok.", author: "B.J. Habibie" },
  { text: "Jadilah perubahan yang ingin kamu lihat di dunia.", author: "Mahatma Gandhi" },
  { text: "Hidup tanpa visi seperti berlayar tanpa kompas.", author: "Anonim" },
  { text: "Software adalah kombinasi dari ekspresi manusia dan logika mesin yang mengubah dunia.", author: "Bill Gates" },
  { text: "Beri perhatian pada detail. Hal-hal kecil membangun hal-hal besar.", author: "Theodore Roosevelt" },
  { text: "Setiap malam kita pergi tidur, besok pagi kita mendapat kesempatan baru untuk menjadi lebih baik.", author: "Anonim" },
  { text: "Jika kamu tidak mau belajar, tidak ada yang bisa membantumu. Jika kamu bertekad belajar, tidak ada yang bisa menghentikanmu.", author: "Zig Ziglar" },
  { text: "Keingintahuan yang sungguh-sungguh adalah hadiah intelektual terbesar.", author: "Leo Tolstoy" },
  { text: "Keberhasilan sejati diukur dari seberapa banyak kamu memberi, bukan seberapa banyak kamu mendapat.", author: "Adam Grant" },
  { text: "Debugging lebih sulit dari menulis kode pada awalnya. Oleh karena itu, jika kamu menulis kode sepintar mungkin, kamu tidak cukup pintar untuk mendebugnya.", author: "Brian W. Kernighan" },
  { text: "Koneksi antar manusia adalah jaringan yang paling kuat dan indah di dunia.", author: "Anonim" },
  { text: "Sesuatu yang tampak mustahil hanya belum ditemukan caranya.", author: "Arthur C. Clarke" },
  { text: "Kepintaran bukanlah tentang seberapa banyak yang kamu ketahui, tapi seberapa cepat kamu belajar.", author: "Aristotle" },
  { text: "Jangan berhenti ketika kamu lelah. Berhentilah ketika kamu selesai.", author: "Anonim" },
  { text: "Ilmu adalah cahaya yang menerangi jalan kehidupan.", author: "Imam Ali bin Abi Thalib" },
  { text: "Bersabarlah, karena kesabaran adalah kunci segala kemudahan.", author: "Imam Syafi'i" },
  { text: "Tuntutlah ilmu dari buaian sampai liang lahat.", author: "Hadits" },
  { text: "Orang yang berhenti belajar adalah orang yang sudah tua, meskipun berumur 20 tahun.", author: "Henry Ford" },
  { text: "Hidup bukan tentang menunggu badai berlalu, tapi belajar menari dalam hujan.", author: "Vivian Greene" },
  { text: "Satu buku membuka seribu pintu pengetahuan.", author: "Anonim" },
  { text: "Jika kamu ingin pergi cepat, pergilah sendiri. Jika kamu ingin pergi jauh, pergilah bersama.", author: "Pepatah Afrika" },
  { text: "Pikiran yang kuat mampu mengubah hambatan menjadi tangga menuju puncak.", author: "Anonim" },
  { text: "Jadikan setiap hari sebagai karya terbaik hidupmu.", author: "John Wooden" },
  { text: "Teknologi terbaik adalah yang mempertemukan manusia, bukan memisahkan mereka.", author: "Anonim" },
  { text: "Setiap detik yang terbuang adalah kesempatan yang tidak bisa kembali.", author: "Anonim" },
  { text: "Kerja keras mengalahkan bakat ketika bakat tidak mau bekerja keras.", author: "Tim Notke" },
  { text: "Fokus pada perjalananmu, bukan milik orang lain.", author: "Paulo Coelho" },
  { text: "Programmer sejati tidak melihat bug sebagai masalah, tapi sebagai teka-teki yang menunggu dipecahkan.", author: "Anonim" },
  { text: "Buku adalah guru yang tidak pernah marah.", author: "Anonim" },
  { text: "Jaringan yang baik dimulai dari koneksi yang kuat.", author: "Anonim (TKJ)" },
  { text: "Setiap kesalahan adalah data baru untuk algoritma kehidupan.", author: "Anonim" },
  { text: "Jadilah seperti air, yang selalu menemukan jalannya.", author: "Bruce Lee" },
  { text: "Yang membedakan orang sukses dan orang biasa adalah cara mereka menghabiskan waktu luang.", author: "Michael Jordan" },
  { text: "Otak yang terlatih lebih tajam dari pedang.", author: "Anonim" },
  { text: "Kreativitas adalah kecerdasan yang sedang bersenang-senang.", author: "Albert Einstein" },
  { text: "Pendidikan bukan persiapan untuk kehidupan; pendidikan adalah kehidupan itu sendiri.", author: "John Dewey" },
  { text: "Keberanian untuk memulai adalah setengah dari kemenangan.", author: "Anonim" },
  { text: "Setiap pagi membawa kesempatan untuk menulis halaman baru.", author: "Brad Paisley" },
  { text: "Kesempatan datang kepada yang siap.", author: "Louis Pasteur" },
  { text: "Coding bukan hanya pekerjaan, coding adalah seni menciptakan solusi.", author: "Anonim" },
  { text: "Tidak ada yang namanya gagal, hanya ada belajar dan belajar lebih banyak.", author: "Richard Branson" },
  { text: "Dengan ilmu, hidup menjadi mudah. Dengan seni, hidup menjadi indah. Dengan iman, hidup menjadi bermakna.", author: "Buya Hamka" },
  { text: "Waktu yang tepat untuk memulai adalah sekarang.", author: "Anonim" },
  { text: "Jalanmu mungkin berbeda, tapi tujuan kita sama: menjadi lebih baik dari kemarin.", author: "Anonim" },
  { text: "Internet adalah perpustakaan terbesar yang pernah ada. Gunakan dengan bijak.", author: "Anonim" },
  { text: "Setiap server yang kamu bangun adalah fondasi bagi koneksi jutaan manusia.", author: "Anonim (TKJ)" },
  { text: "Hidup adalah proyek, dan kamu adalah project manager-nya.", author: "Anonim" },
  { text: "Kecerdasan tanpa karakter adalah bahaya terbesar.", author: "Martin Luther King Jr." },
  { text: "Satu langkah nyata lebih berharga dari seribu rencana yang terpendam.", author: "Anonim" },
  { text: "Data tanpa analisis hanya angka. Analisis tanpa data hanya opini.", author: "W. Edwards Deming" },
  { text: "Mimpi besar dimulai dari langkah kecil yang konsisten.", author: "Anonim" },
  { text: "Orang hebat tidak dilahirkan, mereka dibentuk oleh pilihan dan kerja keras.", author: "Anonim" },
  { text: "Setiap baris kode yang kamu tulis adalah kontribusi untuk dunia digital.", author: "Anonim" },
  { text: "Jangan takut bertanya. Pertanyaan adalah awal dari semua pengetahuan.", author: "Socrates" },
  { text: "Kamu tidak bisa menghubungkan titik-titik dengan melihat ke depan. Kamu hanya bisa menghubungkannya dengan melihat ke belakang.", author: "Steve Jobs" },
  { text: "Sukses adalah perjalanan, bukan tujuan.", author: "Arthur Ashe" },
  { text: "Dedikasi adalah harga yang harus dibayar untuk keahlian.", author: "Anonim" },
  { text: "Bagi pelajar TKJ: setiap packet data yang berhasil diterima adalah bukti kamu bekerja dengan benar.", author: "Anonim (TKJ)" },
  { text: "Logika membawa kamu dari A ke B. Imajinasi membawa kamu ke mana saja.", author: "Albert Einstein" },
  { text: "Teruslah bergerak maju, karena di situlah masa depanmu menunggu.", author: "Walt Disney" },
  { text: "Tidak ada kata terlambat untuk menjadi apa yang seharusnya kamu menjadi.", author: "George Eliot" },
  { text: "Investasi terbaik yang bisa kamu lakukan adalah pada dirimu sendiri.", author: "Warren Buffett" },
  { text: "Semangat belajar adalah kompas terbaik yang akan selalu menunjukkan arah yang benar.", author: "Anonim" },
  { text: "Ilmu tanpa amal seperti pohon tanpa buah. Amalkan apa yang kamu pelajari.", author: "Imam Al-Ghazali" },
];

function initMotivation() {
  const textEl    = document.getElementById('motivText');
  const authorEl  = document.getElementById('motivAuthor');
  const shuffleBtn= document.getElementById('motivShuffle');
  if (!textEl) return;

  /* Shuffle all quotes into a random order once */
  let indices = Array.from({ length: MOTIVATION_QUOTES.length }, (_, i) => i);
  /* Fisher-Yates shuffle */
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  let cursor = 0;

  function showQuote(idx) {
    const q = MOTIVATION_QUOTES[idx];
    /* fade out */
    textEl.classList.add('fade-out');
    authorEl.classList.add('fade-out');

    setTimeout(() => {
      textEl.textContent   = q.text;
      authorEl.textContent = `— ${q.author}`;
      /* fade in */
      textEl.classList.remove('fade-out');
      authorEl.classList.remove('fade-out');
      textEl.classList.add('fade-in');
      authorEl.classList.add('fade-in');
      setTimeout(() => {
        textEl.classList.remove('fade-in');
        authorEl.classList.remove('fade-in');
      }, 500);
    }, 300);
  }

  /* Show first quote immediately */
  showQuote(indices[cursor]);

  /* Shuffle: re-shuffle and jump to a random one */
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      cursor = 0;
      showQuote(indices[cursor]);
    });
  }

  /* Auto-advance every 20 seconds */
  setInterval(() => {
    cursor = (cursor + 1) % MOTIVATION_QUOTES.length;
    showQuote(indices[cursor]);
  }, 20000);
}
