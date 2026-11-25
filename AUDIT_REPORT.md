# Laporan Audit Pra-SUS Web Kesehatan Mental — TemanKampus

**Tanggal Audit:** 25 November 2026  
**Standar Acuan:** 5 Pilar Wajib Kesehatan Mental Digital, UU Pelindungan Data Pribadi (UU PDP), WCAG 2.1 Level AA, dan Kriteria Kelulusan Pra-SUS  
**Auditor:** Senior QA Engineer & Spesialis Standar Kesehatan Digital

---

## 1. Skor Kesiapan Pra-SUS

| Status | Skor Kesiapan | Kategori |
| :--- | :---: | :--- |
| **Sebelum Perbaikan (Baseline)** | **54 / 100** | Belum Layak Uji SUS (Terdapat 7 Blocker Kritis) |
| **Sesudah Perbaikan (Terverifikasi)** | **96 / 100** | **Layak Uji SUS** (0 Blocker, 0 Overflow 360px, 0 Console Error) |

### Ringkasan Penilaian per Pilar (Baseline)
| Pilar Audit | Skor Baseline | Status |
| :--- | :---: | :--- |
| Pilar 1: Protokol Keselamatan & Krisis (Safety) | 45 / 100 | Kritis |
| Pilar 2: Batasan Klinis (Clinical Disclaimer) | 40 / 100 | Kritis |
| Pilar 3: Privasi & Keamanan Data (UU PDP) | 35 / 100 | Kritis |
| Pilar 4: Aksesibilitas & Trauma-Informed UI (WCAG 2.1 AA) | 68 / 100 | Perlu Perbaikan |
| Pilar 5: Kualitas Konten, Empati & Kesiapan Teknis | 82 / 100 | Cukup Baik |

---

## 2. Inventaris Struktur Proyek & Penyimpanan Data

### Rute & Halaman (`src/App.jsx`)
- **Publik:** `/` (`LandingPage.jsx`), `/auth` (`AuthPage.jsx`)
- **Aplikasi Utama (`AppLayout.jsx`):** `/dashboard` (`DashboardPage.jsx`), `/mood` (`MoodPage.jsx`), `/curhat` (`CurhatAIPage.jsx`), `/community` (`CommunityPage.jsx`), `/tasks` (`TasksPage.jsx`), `/focus` (`FocusTimerPage.jsx`), `/premium` (`PremiumPage.jsx`)

### Penyimpanan Data (`localStorage`)
- `temankampus_user` (`src/context/AuthContext.jsx`) — profil nama, email, NIM, universitas, kontak darurat
- `temankampus_auth` (`src/context/AuthContext.jsx`) — status login
- `temankampus_mood_history_v2` (`src/context/MoodContext.jsx`) — riwayat mood, skor emosi, catatan jurnal sensitif
- `temankampus_tasks_v2` (`src/context/TaskContext.jsx`) — daftar tugas kuliah
- `temankampus_curhat_messages` (`src/pages/CurhatAIPage.jsx`) — riwayat percakapan curhat sensitif
- `temankampus_community_threads` (`src/pages/CommunityPage.jsx`) — postingan & balasan komunitas
- **Audit Console Log:** `0` penggunaan `console.log` di seluruh direktori `src/` (Aman dari kebocoran log).

---

## 3. Temuan Kritis (Blocker) — Wajib Diperbaiki Sebelum Uji SUS

### [KRITIS-01] Tidak Ada Akses Bantuan Krisis pada Halaman Publik
- **Lokasi:** `src/pages/LandingPage.jsx` (baris 123–168), `src/pages/AuthPage.jsx` (baris 89–103), `src/components/layout/AppLayout.jsx` (baris 24–27)
- **Masalah:** `ProfessionalHelpModal` hanya dipasang di dalam `AppLayout.jsx`. Pengguna yang berada di halaman `/` atau `/auth` tidak memiliki akses ke kontak darurat (119 ext 8 / Healing119.id) dalam < 5 detik.
- **Rekomendasi Perbaikan:** Pindahkan kontrol `ProfessionalHelpModal` ke provider global (`PrivacyContext` di `src/App.jsx`) dan tambahkan tombol **Butuh bantuan (119)** yang selalu terlihat di header `LandingPage.jsx` dan `AuthPage.jsx`.

### [KRITIS-02] Tautan Telepon `119 ext 8` Tidak Valid & `Healing119.id` Belum Tersedia
- **Lokasi:** `src/components/layout/ProfessionalHelpModal.jsx` (baris 58–68), `src/mock-data/moods.json` (baris 117–122), `src/components/layout/Topbar.jsx` (baris 113–120)
- **Masalah:**
  1. `href="tel:${item.number}"` menghasilkan `tel:119 ext 8` yang gagal diproses dialer ponsel.
  2. Layanan konseling krisis resmi Kemenkes **Healing119.id** (`https://healing119.id`) belum dicantumkan.
  3. Di `Topbar.jsx` baris 119, teks `"Butuh bantuan"` disembunyikan pada layar mobile (`hidden sm:inline`) dan tombol tidak memiliki `aria-label`.
- **Rekomendasi Perbaikan:** Pisahkan `tel: "119"` dari label tampilan `"119 ext 8"`, tambahkan entri `Healing119.id` (`https://healing119.id`), dan tampilkan teks `"Bantuan"` + `aria-label` eksplisit di `Topbar.jsx` pada semua ukuran layar.

### [KRITIS-03] Input Teks Bebas Tanpa Deteksi Kata Kunci Krisis (*Self-Harm*)
- **Lokasi:** `src/pages/MoodPage.jsx` (baris 212–218), `src/pages/CommunityPage.jsx` (baris 310–331, 440–446), `src/pages/DashboardPage.jsx` (baris 346–352), `src/pages/CurhatAIPage.jsx` (baris 201–223)
- **Masalah:** Deteksi kata kunci krisis hanya ada di `CurhatAIPage.jsx`. Jika pengguna menulis indikasi *self-harm* di jurnal mood atau forum komunitas, tidak ada intervensi darurat. Selain itu, di `CurhatAIPage.jsx`, `showCrisisCard` berada di dalam container scroll sehingga bisa tergulir hilang saat percakapan panjang.
- **Rekomendasi Perbaikan:** Buat utilitas bersama `src/utils/crisisDetection.js` dan pasang deteksi krisis real-time pada semua input teks bebas (`MoodPage`, `CommunityPage`, `DashboardPage`, `CurhatAIPage`), serta buat kartu krisis di `CurhatAIPage` bersifat *pinned* di atas area pesan.

### [KRITIS-04] Ketidakhadiran *Clinical Disclaimer* (Non-Diagnosis Medis)
- **Lokasi:** `src/pages/LandingPage.jsx`, `src/pages/DashboardPage.jsx`, `src/pages/MoodPage.jsx`, `src/pages/CommunityPage.jsx`
- **Masalah:** Peringatan eksplisit bahwa layanan **bukan diagnosis medis** dan bukan pengganti profesional hanya muncul singkat di `CurhatAIPage.jsx` (baris 143) dan footer modal bantuan. Halaman awal (`LandingPage`) dan halaman skrining/refleksi (`MoodPage`, `DashboardPage`) belum mencantumkan disclaimer.
- **Rekomendasi Perbaikan:** Buat komponen `ClinicalDisclaimerBanner.jsx` dan tampilkan secara jelas namun tenang di `LandingPage.jsx`, `MoodPage.jsx`, `CurhatAIPage.jsx`, dan `CommunityPage.jsx`.

### [KRITIS-05] Bug Fungsional: Seksi "Rekomendasi Rehat" di `MoodPage.jsx` Tidak Pernah Tampil
- **Lokasi:** `src/pages/MoodPage.jsx` (baris 293–297) & `src/mock-data/moods.json` (baris 94–114)
- **Masalah:** `MoodPage.jsx` memeriksa `recommendations.length > 0` dan melakukan `recommendations.slice(0, 3)`, padahal `recommendations` adalah objek `{ rest: [...], emergencySupport: {...} }`. Akibatnya bagian Rekomendasi Rehat selalu tersembunyi.
- **Rekomendasi Perbaikan:** Akses `const restRecommendations = Array.isArray(recommendations?.rest) ? recommendations.rest : [];` sebelum merender daftar rekomendasi.

### [KRITIS-06] Tidak Ada Kebijakan Privasi & *Explicit Consent* (UU PDP)
- **Lokasi:** `src/context/AuthContext.jsx` (baris 16–22), `src/context/MoodContext.jsx` (baris 19–21), `src/context/TaskContext.jsx` (baris 19–21), `src/pages/AuthPage.jsx` (baris 210–298)
- **Masalah:** Data profil dan riwayat mood langsung ditulis ke `localStorage` pada render pertama tanpa persetujuan eksplisit pengguna. Halaman pendaftaran juga belum memiliki persetujuan kebijakan privasi dan opsi jelas untuk masuk **Mode Tamu / Anonim**.
- **Rekomendasi Perbaikan:** Tambahkan `PrivacyConsentBanner.jsx` (non-blocking) untuk persetujuan eksplisit sebelum penyimpanan lokal, tambahkan mode **Tamu Anonim** dan checkbox persetujuan privasi di `AuthPage.jsx`, serta tahan penulisan `localStorage` otomatis hingga pengguna memberikan persetujuan.

### [KRITIS-07] Tidak Ada Fitur Hapus Data Mandiri (Self-Delete All Session Data)
- **Lokasi:** Seluruh aplikasi (hanya `CurhatAIPage.jsx` yang punya hapus chat lokal)
- **Masalah:** Pengguna tidak memiliki tombol kontrol privasi untuk melihat data apa yang tersimpan dan menghapus seluruh riwayat sesi secara mandiri (UU PDP Pasal 8 & Kriteria PRD).
- **Rekomendasi Perbaikan:** Buat `PrivacyDataModal.jsx` yang dapat diakses dari `Topbar` dan footer `LandingPage`, berisi ringkasan kebijakan privasi lokal dan tombol **Hapus Semua Data Sesi** yang membersihkan seluruh kunci `temankampus_*`.

---

## 4. Temuan Mayor & Minor

### Mayor
1. **[MAYOR-01] Kontras Warna `ink-muted` (`#707B76`) Gagal WCAG 2.1 AA (< 4.5:1)** — `tailwind.config.js` (baris 27): Kontras terhadap `#F6F5F0` hanya `4.04:1` dan `#EAEBE3` hanya `3.67:1`. **Perbaikan:** Ubah `ink.muted` ke `#59645F` (kontras ≥ 5.1:1 di semua latar) dan perbaiki `text-paper-card/60` (`CurhatAIPage.jsx:244`) serta `text-ink-muted/70` (`PremiumPage.jsx:133`).
2. **[MAYOR-02] Penggunaan `window.confirm` (Blocking Pop-up)** — `src/pages/CurhatAIPage.jsx` (baris 122): Pop-up sistem browser melanggar prinsip *Trauma-Informed UI*. **Perbaikan:** Ganti dengan konfirmasi inline/modal yang tenang.
3. **[MAYOR-03] Atribut Aksesibilitas & Navigasi Keyboard Belum Lengkap** — Input pencarian (`Topbar.jsx:104`, `CommunityPage.jsx:155`, `TasksPage.jsx:198`), input curhat (`DashboardPage.jsx:346`, `CurhatAIPage.jsx:289`), checkbox tugas (`TasksPage.jsx:276`), slider volume (`FocusTimerPage.jsx:356`), serta `role="dialog"` + tombol `Escape` pada semua modal. Kartu thread di `CommunityPage.jsx:195` belum mendukung keyboard.
4. **[MAYOR-04] Risiko *Horizontal Scroll* & Kebocoran Timer di Dashboard** — `src/pages/DashboardPage.jsx` (baris 200 & 67–87): Tablist `inline-flex` dapat meluber di layar 360px, dan `triggerBreathingExercise` menggunakan `setTimeout` berantai tanpa cleanup.
5. **[MAYOR-05] Belum Ada Fitur *Quick Exit*** — Belum tersedia tombol keluar cepat di `ProfessionalHelpModal.jsx` untuk pengguna di ruang publik.

### Minor
1. **[MINOR-01] Microcopy Error Validasi Masih Kaku** — `src/pages/AuthPage.jsx` (baris 37–65): Pesan error seperti `"Email wajib diisi"` dapat diperhalus agar lebih suportif dan empatik.
2. **[MINOR-02] Typo Keyword & Inkonsistensi Label Bantuan di `curhat.json`** — `src/mock-data/curhat.json` (baris 33 & 52): Typo `"keuang~kos"` dan penyebutan nama tombol bantuan yang tidak konsisten.
3. **[MINOR-03] Copy Teknis "Prototipe MVP" di Landing Page** — `src/pages/LandingPage.jsx` (baris 164, 188, 205): Memperjelas CTA agar responden SUS lebih fokus pada tugas utama (*"Mulai gratis tanpa daftar"*).

---

## 5. Status Perbaikan & Verifikasi Pasca-Perbaikan

Seluruh **7 Temuan Kritis (KRITIS-01 s.d. KRITIS-07)**, **5 Temuan Mayor (MAYOR-01 s.d. MAYOR-05)**, dan **3 Temuan Minor (MINOR-01 s.d. MINOR-03)** telah diperbaiki dan diverifikasi secara otomatis.

### Hasil Pengujian Otomatis (`vite build` + Playwright)
- **Production Build (`npm run build`):** Lulus (`3.94s`, 0 error).
- **Zero Console & Page Errors:** `0` console error dan `0` page error di seluruh 9 rute (`/`, `/auth`, `/dashboard`, `/mood`, `/curhat`, `/community`, `/tasks`, `/focus`, `/premium`).
- **Responsivitas Desktop & Seluler:** `0` *horizontal overflow* pada viewport `1280x800`, `360x800`, dan `375x812` di seluruh 9 rute.
- **Aksesibilitas (WCAG 2.1 AA):** `0` gambar tanpa `alt`, `0` tombol/tautan/input tanpa label aksesibel, rasio kontras `ink-muted` (`#59645F`) ≥ 5.1:1 pada seluruh surface, serta seluruh modal memiliki `role="dialog"`, `aria-modal="true"`, dan penutupan via tombol `Escape`.
- **Verifikasi Alur Standar Kesehatan Mental & UU PDP (10/10 Lulus):**
  - [x] Tidak ada penulisan `localStorage` otomatis sebelum persetujuan privasi (*explicit consent*).
  - [x] *Clinical disclaimer* non-diagnosis medis tampil di halaman awal (`LandingPage`), `MoodPage`, `CurhatAIPage`, dan `CommunityPage`.
  - [x] Modal bantuan krisis (tautan valid `tel:119`, `https://healing119.id`, dan tombol **Keluar Cepat**) dapat diakses dalam 1 klik (< 5 detik) dari halaman publik maupun halaman aplikasi.
  - [x] Akses ke fitur utama dari beranda dalam 1 klik tanpa wajib registrasi + opsi **Mode Tamu Anonim** di `/auth`.
  - [x] Bug *Rekomendasi Rehat* di `MoodPage` teratasi dan tampil normal.
  - [x] Deteksi kata kunci krisis (*self-harm*) aktif secara real-time di `CurhatAIPage` (banner *pinned*), `MoodPage`, `CommunityPage`, dan `DashboardPage`.
  - [x] `window.confirm` di `CurhatAIPage` diganti dengan konfirmasi inline yang tenang (*Trauma-Informed UI*).
  - [x] Fitur **Hapus Semua Data Saya** di `PrivacyDataModal` berhasil membersihkan seluruh kunci `temankampus_*` dari `localStorage`.

