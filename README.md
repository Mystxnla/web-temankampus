# TemanKampus — Web App Kesejahteraan & Produktivitas Mahasiswa

> **Status:** MVP Phase 1 — Frontend (React + Vite + Tailwind CSS)
> **Tahap saat ini:** Frontend dengan mock/dummy data lokal. Backend (Node.js/Express) & Database (PostgreSQL/MongoDB) menyusul di Fase 2 dan 3.

---

## 🌸 Tentang Proyek

**TemanKampus** adalah platform asisten kesejahteraan mahasiswa Indonesia yang memadukan:

- 📋 **Task & Deadline Manager** — kelola tugas kuliah per mata kuliah dengan kalender akademik
- 😊 **Mood Check-In Harian** — lacak kondisi emosional & deteksi dini burnout
- ⏱️ **Focus Timer (Pomodoro)** — belajar terstruktur dengan audio ambience kampus
- 💬 **Sesi Curhat AI (Mimi)** — teman bicara empatik 24/7 dengan proteksi krisis
- 👥 **Komunitas Mahasiswa Sebaya** — forum diskusi suportif non-toxic
- ⭐ **Langganan Premium** — simulasi gateway pembayaran QRIS/e-wallet Indonesia

---

## ✨ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (Campus Pop Lilac Design System) |
| Routing | React Router v6 |
| State | React Context API + localStorage |
| Data | JSON mock data di `/src/mock-data/` |
| Fonts | Anton (display) + Plus Jakarta Sans (body) |
| Icons | Lucide React |

---

## 🚀 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/Mystxnla/web-temankampus.git
cd web-temankampus

# Install dependencies
npm install

# Jalankan dev server (localhost:3000)
npm run dev
```

Buka `http://localhost:3000` di browser. Klik **"Masuk sebagai Nadira Az-Zahra"** di halaman `/auth` untuk akses demo langsung tanpa login.

---

## 📁 Struktur Folder

```
src/
├── mock-data/          # JSON data dummy (kontrak data untuk API Fase 2)
│   ├── user.json
│   ├── tasks.json
│   ├── moods.json
│   ├── timer.json
│   ├── curhat.json
│   ├── community.json
│   └── plans.json
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   ├── TaskContext.jsx
│   └── MoodContext.jsx
├── components/layout/  # Sidebar, Topbar, BottomNav, Modal
└── pages/              # 9 screen utama
    ├── LandingPage.jsx
    ├── AuthPage.jsx
    ├── DashboardPage.jsx
    ├── TasksPage.jsx
    ├── MoodPage.jsx
    ├── FocusTimerPage.jsx
    ├── CurhatAIPage.jsx
    ├── CommunityPage.jsx
    └── PremiumPage.jsx
```

---

## 🗺️ Halaman & Rute

| Rute | Halaman | Deskripsi |
|------|---------|-----------|
| `/` | Landing Page | Hero, fitur, testimoni mahasiswa |
| `/auth` | Login / Register | Form mahasiswa + quick demo login |
| `/dashboard` | Dashboard Utama | Mood check-in, metrik, jadwal, AI prompt |
| `/tasks` | Task Manager | List + Calendar view, add/edit/delete tugas |
| `/mood` | Mood Check-In | Jurnal harian, chart 7 hari, alert burnout |
| `/focus` | Focus Timer | Pomodoro, audio ambience, session log |
| `/curhat` | Teman Curhat (Mimi) | AI chat dengan disclaimer & proteksi krisis |
| `/community` | Komunitas Sebaya | Forum thread, replies, pelukan hangat ❤️ |
| `/premium` | Langganan Pro | Freemium vs Pro, simulasi QRIS & e-wallet |

---

## 🔒 Catatan Penting: Sesi Curhat AI (PRD Section 6.8)

- **Disclaimer** permanen: Mimi adalah teman bicara awal, **BUKAN** pengganti psikolog/konselor profesional.
- **Deteksi krisis otomatis**: Jika input mengandung kata kunci krisis (mis. "bunuh diri"), sistem langsung menampilkan kontak hotline darurat (Sejiwa 119 ext 8, Yayasan Pulih) tanpa menunggu permintaan pengguna.
- **Tombol "Hubungi Bantuan Profesional"** selalu terlihat di semua halaman via header Topbar.

---

## 👥 Tim TemanKampus

| Peran | Nama |
|-------|------|
| CEO | Rivshultan Raza Alif Dzakiyy |
| CTO | Noya Dzakwan Rahman |
| CMO | Yosua Nicolay |
| CFO | Muhammad Zahi Ustadzi |
| CPO | Haidar Yahya Syarif |

---

## 📋 Roadmap Pengembangan

- [x] **Fase 1** — Frontend React (mock data) ✅ *Saat ini*
- [ ] **Fase 2** — Backend REST API (Node.js/Express)
- [ ] **Fase 3** — Database (PostgreSQL/MongoDB) + integrasi penuh
- [ ] **Fase 4** — Testing & Persiapan Demo ke Tenant
- [ ] **Fase 5** — Deployment ke cloud (Vercel + Railway)

---

*© 2026 TemanKampus — Ruang Tenang & Tumbuh Mahasiswa Indonesia*
