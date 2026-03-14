# X-TJKT-3.OS · Class Dashboard

> Portal kelas digital untuk **X TJKT-3 · SMK** — Teknik Jaringan Komputer & Telekomunikasi  
> 教室ポータル · 2025/2026

---

## 📋 Deskripsi

**X-TJKT-3.OS** adalah dashboard kelas berbasis web yang dirancang khusus untuk siswa kelas X TJKT-3. Website ini menampilkan informasi kelas secara real-time dengan tampilan modern bergaya glassmorphism + estetika Jepang, lengkap dengan animasi dan fitur interaktif.

---

## ✨ Fitur

| Fitur | Deskripsi |
|---|---|
| 🕐 **Jam & Tanggal Real-time** | Jam digital yang terus diperbarui di topbar |
| 📅 **Jadwal Pelajaran** | Jadwal otomatis berdasarkan hari aktif (Senin–Jumat) |
| 🧹 **Jadwal Piket** | Daftar siswa piket harian lengkap dengan semua hari |
| 🌳 **Struktur Organisasi** | Pohon organisasi kelas dengan koneksi SVG animasi |
| 💬 **Kata Motivasi** | 100 kutipan inspiratif dari tokoh dunia & lokal, acak otomatis |
| 💻 **Terminal Animasi** | Simulasi terminal shell di footer |
| 🌙 **Dark / Light Mode** | Toggle tema gelap dan terang |
| 🎌 **Easter Egg** | Tersembunyi — temukan sendiri! |
| 🔗 **Social Links** | TikTok, Instagram, Website Sekolah, dan Laporkan Bug |

---

## 🗂️ Struktur File

```
project/
├── index.html   # Markup utama — semua layout dan komponen HTML
├── style.css    # Styling — glassmorphism, animasi, dark mode, responsif
└── script.js    # Logic — jam, jadwal, piket, modal, motivasi, terminal
```

---

## 🚀 Cara Menjalankan

Tidak perlu instalasi apapun. Cukup buka file langsung di browser:

```bash
# Klik dua kali file index.html
# — atau —
# Drag & drop ke browser
```

> Untuk pengalaman terbaik, gunakan **Google Chrome** atau **Microsoft Edge** versi terbaru.

---

## 🛠️ Teknologi yang Digunakan

- **HTML5** — Struktur semantik dengan ARIA untuk aksesibilitas
- **CSS3** — Glassmorphism, CSS Variables, animasi keyframe, responsif
- **JavaScript (Vanilla ES6+)** — Tanpa framework, murni JS
- **[Lucide Icons](https://lucide.dev)** — CDN icon SVG modern
- **[Google Fonts](https://fonts.google.com)** — Plus Jakarta Sans + Sawarabi Mincho

---

## 📆 Data Jadwal

Jadwal pelajaran mencakup **Senin hingga Jumat** dengan format:

```js
{ time: '08:00–09:00', name: 'Nama Mapel', room: 'Ruangan', tag: '専門', isTkj: true }
```

- `tag: '専門'` → Mata pelajaran kejuruan TKJ
- `tag: '一般'` → Mata pelajaran umum
- `tag: '休憩'` → Istirahat / sholat
- `isTkj: true` → Ditandai dengan badge khusus TKJ

---

## 🔗 Tautan

| Platform | Link |
|---|---|
| 🌐 Website Sekolah | [skensakdw.sch.id](https://skensakdw.sch.id) |
| 📸 Instagram Kelas | [@xtjkt3skensakdw](https://www.instagram.com/xtjkt3skensakdw) |
| 🎵 TikTok Kelas | [@xtjkt3skensakdw](https://www.tiktok.com/@xtjkt3skensakdw) |
| 👨‍💻 Pembuat | [@yoikagevt](https://www.tiktok.com/@yoikagevt) |

---

## 🐛 Laporkan Bug

Temukan masalah atau error? Hubungi via WhatsApp:

[📲 Laporkan Bug](https://wa.me/62816694700?text=Halo%2C%20saya%20ingin%20melaporkan%20bug%20di%20website%20X-TJKT-3.OS%3A%0A)

---

## 📄 Lisensi

© 2025/2026 · X TJKT-3 · SMKN 1 Kedungwuni  
頑張ってください。— *Semangat terus belajar!*
