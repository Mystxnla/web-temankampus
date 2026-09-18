# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## TemanKampus — Web App Asisten Kesejahteraan Mahasiswa

## Ringkasan Dokumen

Dokumen ini merupakan Product Requirements Document (PRD) untuk pengembangan versi web app penuh dari TemanKampus, sebuah platform asisten kesejahteraan mahasiswa. PRD ini disusun berdasarkan hasil Analisis SWOT & Segmentasi Pasar serta Laporan Root Cause Analysis (RCA) yang telah dilakukan sebelumnya, dan diperluas dengan spesifikasi produk serta teknis agar dapat langsung digunakan sebagai acuan pengembangan oleh tim engineering.

**Status saat ini:** Prototype/MVP tahap awal, dijalankan di lingkungan lokal (localhost) untuk keperluan presentasi/demo ke tenant (belum di-deploy ke server produksi). Deployment ke lingkungan publik menjadi milestone terpisah setelah demo.

## 1. Latar Belakang & Problem Statement

### 1.1 Masalah yang Diidentifikasi

Berdasarkan hasil Root Cause Analysis (metode 5 Whys), ditemukan bahwa:

**Masalah utama:** Tingginya tingkat stres, kecemasan, dan burnout pada mahasiswa akibat tekanan akademik dan aktivitas perkuliahan yang padat.

**Root cause:** Belum tersedia solusi yang sederhana, terjangkau, dan secara khusus dirancang untuk membantu mahasiswa mengelola tugas, waktu, stres, serta kebutuhan sosial-emosional dalam satu platform.

### 1.2 Mengapa Web App Penuh?

Selain versi mobile (Android/iOS), TemanKampus dikembangkan sebagai web app penuh agar mahasiswa dapat mengakses seluruh fitur (task manager, mood check-in, focus timer, komunitas, dsb.) melalui laptop/desktop — perangkat yang lebih sering dipakai saat mengerjakan tugas kuliah — tanpa kehilangan fungsionalitas dibanding versi mobile. Web app juga mempermudah integrasi dengan pihak kampus (dashboard institusi) di fase berikutnya.

## 2. Tujuan Produk & Success Metrics

### 2.1 Tujuan Produk

- Membantu mahasiswa mengelola tugas, deadline, dan waktu secara terpusat dalam satu platform.

- Meningkatkan kesadaran dan pemantauan kondisi emosional mahasiswa secara rutin (mood tracking).

- Menyediakan ruang dukungan sosial (komunitas) dan akses ke bantuan profesional bila diperlukan.

- Memvalidasi model bisnis freemium melalui MVP berbasis web sebelum scaling ke versi mobile penuh.

### 2.2 Success Metrics (KPI) — Target 3 Bulan Setelah Peluncuran MVP

| **Metrik**                   | **Target**                               | **Cara Ukur**                        |
|------------------------------|------------------------------------------|--------------------------------------|
| Jumlah pengguna terdaftar    | ≥ 500 mahasiswa (skala kampus UNNES)     | Jumlah akun aktif di database        |
| Weekly Active User (WAU)     | ≥ 30% dari total pengguna terdaftar      | Analytics (login/aktivitas mingguan) |
| Retention rate (minggu ke-4) | ≥ 25%                                    | Cohort retention analytics           |
| Konversi ke Premium          | ≥ 3% dari pengguna aktif                 | Data transaksi/subscription          |
| Task completion rate         | ≥ 50% tugas yang dibuat ditandai selesai | Data task manager                    |
| Mood check-in rate           | ≥ 40% pengguna aktif check-in ≥3x/minggu | Data fitur mood check-in             |

## 3. Target Pengguna

### 3.1 Persona Utama — "Mahasiswa Sibuk"

| **Atribut**      | **Deskripsi**                                                                                      |
|------------------|----------------------------------------------------------------------------------------------------|
| Usia             | 18–24 tahun, mahasiswa aktif S1                                                                    |
| Karakteristik    | Aktif di media sosial (Instagram, TikTok, WhatsApp), memiliki smartphone & laptop, price-sensitive |
| Pain points      | Tugas menumpuk, sulit atur waktu, stres/burnout akademik, kesepian, kurang istirahat               |
| Kebutuhan        | Tool praktis untuk atur tugas & waktu, reminder istirahat, komunitas suportif, tracking mood       |
| Perilaku digital | Terbiasa pakai aplikasi produktivitas, familiar dengan UI modern & minim friksi                    |

### 3.2 Target Sekunder

- Pihak kampus: BEM, HIMA, UKM, bagian kemahasiswaan, pusat konseling — sebagai mitra institusi (fase lanjutan).

## 4. Ruang Lingkup (Scope)

### 4.1 In-Scope (MVP — Web App)

- Registrasi & login (email, opsional SSO kampus)

- Task & Deadline Manager

- Mood Check-In harian

- Focus Timer (Pomodoro)

- Pengingat Istirahat

- Komunitas Mahasiswa (dasar: forum/grup diskusi)

- Dashboard ringkasan aktivitas & mood

- Sesi Curhat dengan AI (AI companion chat untuk wellness)

- Langganan Premium (upgrade plan)

### 4.2 In-Scope (Fase 2 — Pasca-MVP)

- Rekomendasi Aktivitas personalisasi (AI-based)

- Akses Bantuan Profesional (integrasi konselor/psikolog)

- Dashboard kampus/institusi (statistik agregat untuk mitra universitas)

- Notifikasi push berbasis web (Web Push API)

### 4.3 Out-of-Scope (Belum Dikerjakan)

- Diagnosis atau layanan psikologis profesional langsung dalam aplikasi (hanya penyedia akses/rujukan)

- Ekspansi ke luar kampus UNNES pada tahap MVP

- Integrasi LMS kampus (fase jauh lebih lanjut)

- Deployment ke server produksi/publik — pada tahap ini aplikasi masih berjalan di localhost khusus untuk keperluan demo/presentasi ke tenant

- Domain, SSL, dan infrastruktur cloud — baru direncanakan setelah prototype divalidasi

## 5. Alur Pengguna (User Flow) Utama

### 5.1 Onboarding

> 1\. Pengguna mengakses landing page → klik "Daftar".
>
> 2\. Mengisi form registrasi (nama, email, password, asal kampus/fakultas).
>
> 3\. Verifikasi email.
>
> 4\. Onboarding singkat: pilih minat/kebutuhan utama (produktivitas, wellness, komunitas).
>
> 5\. Diarahkan ke Dashboard utama.

### 5.2 Mengelola Tugas

> 1\. Dari Dashboard, klik "Tambah Tugas".
>
> 2\. Isi judul, mata kuliah, deadline, prioritas.
>
> 3\. Tugas muncul di daftar & kalender akademik.
>
> 4\. Pengguna menandai tugas selesai; sistem update progress & statistik.

### 5.3 Mood Check-In

> 1\. Notifikasi/banner harian muncul di Dashboard: "Bagaimana harimu?"
>
> 2\. Pengguna memilih 1 dari 4 opsi mood (baik, biasa saja, stres, sangat lelah).
>
> 3\. Jika memilih "stres"/"sangat lelah" 3 hari berturut-turut, sistem menampilkan rekomendasi istirahat/aktivitas & opsi akses bantuan profesional.

### 5.4 Sesi Curhat dengan AI

> 1\. Pengguna membuka menu "Curhat" dari Dashboard atau langsung setelah mengisi Mood Check-In yang negatif.
>
> 2\. Muncul disclaimer singkat: AI companion bukan pengganti psikolog/konselor profesional.
>
> 3\. Pengguna mengetik/mengirim pesan; AI merespons dengan nada suportif, reflektif, dan tidak menghakimi (bukan memberi diagnosis atau nasihat medis).
>
> 4\. Jika sistem mendeteksi indikasi krisis (misal: menyebut keinginan menyakiti diri sendiri), chat otomatis menampilkan kontak layanan darurat/hotline kesehatan mental dan tombol "Hubungi Bantuan Profesional", tanpa menunggu pengguna memintanya.
>
> 5\. Riwayat percakapan tersimpan terenkripsi dan hanya bisa diakses oleh pengguna yang bersangkutan.

### 5.5 Focus Timer

> 1\. Pengguna membuka menu Focus Timer, memilih durasi (default Pomodoro 25/5 menit).
>
> 2\. Timer berjalan; pengguna dapat mengaitkan sesi dengan tugas tertentu.
>
> 3\. Setelah selesai, sistem mencatat sesi ke statistik produktivitas.

## 6. Functional Requirements

### 6.1 Autentikasi & Onboarding

- Sebagai pengguna baru, saya ingin mendaftar dengan email & password, supaya saya punya akun pribadi.

- Sebagai pengguna, saya ingin login/logout dengan aman, supaya data saya terlindungi.

- Sebagai pengguna, saya ingin reset password via email, supaya saya tidak terkunci dari akun.

**Detail teknis:** verifikasi email wajib sebelum akses penuh; password di-hash (bcrypt/argon2); session token (JWT) dengan expiry & refresh token.

### 6.2 Task & Deadline Manager

- Sebagai mahasiswa, saya ingin menambah, mengedit, dan menghapus tugas dengan judul, mata kuliah, deadline, dan prioritas, supaya saya bisa mengatur pekerjaan saya.

- Sebagai mahasiswa, saya ingin melihat tugas dalam tampilan list dan kalender, supaya saya bisa memantau deadline dengan mudah.

- Sebagai mahasiswa, saya ingin mendapat notifikasi H-1 dan hari-H deadline, supaya saya tidak terlambat.

- Sebagai mahasiswa, saya ingin menandai tugas sebagai selesai, supaya progres saya tercatat.

**Field data:** judul, deskripsi (opsional), mata kuliah, tanggal deadline, waktu, prioritas (rendah/sedang/tinggi), status (belum/proses/selesai).

### 6.3 Mood Check-In

- Sebagai mahasiswa, saya ingin mencatat kondisi emosional harian saya (4 pilihan: baik, biasa saja, stres, sangat lelah), supaya saya lebih sadar akan kondisi diri.

- Sebagai mahasiswa, saya ingin melihat riwayat/statistik mood saya (mingguan/bulanan), supaya saya bisa melihat pola.

- Sebagai mahasiswa, saya ingin mendapat rekomendasi ringan (aktivitas/istirahat) saat mood negatif terdeteksi berulang, supaya saya terbantu mengelola stres.

**Catatan sensitivitas data:** data mood tergolong data kesehatan mental yang sensitif — lihat bagian Non-Functional Requirements (Privasi & Keamanan).

### 6.4 Focus Timer (Pomodoro)

- Sebagai mahasiswa, saya ingin menjalankan timer belajar dengan durasi kustom, supaya saya bisa fokus terstruktur.

- Sebagai mahasiswa, saya ingin mengaitkan sesi timer dengan tugas tertentu, supaya waktu belajar saya tercatat per tugas.

- Sebagai mahasiswa, saya ingin melihat total waktu fokus harian/mingguan, supaya saya termotivasi.

### 6.5 Pengingat Istirahat

- Sebagai mahasiswa, saya ingin mendapat pengingat untuk istirahat setelah sesi belajar panjang (misal >90 menit tanpa jeda), supaya saya tidak burnout.

- Sebagai mahasiswa, saya ingin mengatur preferensi jadwal istirahat saya sendiri (opsional), supaya sesuai kebiasaan saya.

### 6.6 Komunitas Mahasiswa

- Sebagai mahasiswa, saya ingin bergabung dengan grup/forum berdasarkan minat atau kondisi (misal: grup manajemen stres, grup belajar), supaya saya merasa terhubung.

- Sebagai mahasiswa, saya ingin membuat dan membalas post di dalam grup, supaya saya bisa berinteraksi dengan pengguna lain.

- Sebagai admin, saya ingin bisa moderasi konten (hapus post/laporkan pengguna), supaya komunitas tetap aman.

**Catatan MVP:** cukup forum sederhana (bukan real-time chat) untuk mengurangi kompleksitas teknis di tahap awal.

### 6.7 Langganan Premium

- Sebagai pengguna, saya ingin upgrade ke akun Premium melalui pembayaran online, supaya saya bisa mengakses fitur analisis lanjutan.

- Sebagai pengguna Premium, saya ingin melihat statistik produktivitas & mood yang lebih detail, sebagai nilai tambah langganan.

**Detail teknis:** integrasi payment gateway lokal (misal Midtrans/Xendit) yang mendukung QRIS, e-wallet, dan transfer bank.

### 6.8 Sesi Curhat dengan AI (AI Wellness Companion)

- Sebagai mahasiswa, saya ingin bercerita/curhat ke AI companion kapan saja, supaya saya punya tempat melepas keluh kesah tanpa merasa dihakimi.

- Sebagai mahasiswa, saya ingin AI merespons dengan empati dan reflektif (bukan sekadar template), supaya percakapan terasa membantu.

- Sebagai mahasiswa, saya ingin diarahkan ke bantuan profesional atau hotline darurat jika AI mendeteksi tanda-tanda krisis (self-harm, keputusasaan berat), supaya saya tetap aman.

- Sebagai mahasiswa, saya ingin riwayat curhat saya bersifat privat dan bisa saya hapus kapan saja, supaya saya merasa aman berbagi.

- Sebagai pengguna Premium, saya ingin sesi curhat tanpa batas jumlah pesan harian, sedangkan pengguna gratis dibatasi kuota harian, sebagai bagian dari model freemium.

**Detail teknis:** menggunakan LLM API (misal Claude API) dengan system prompt yang dirancang khusus untuk percakapan suportif, non-diagnostik, dan berbatas jelas — dilengkapi lapisan keyword/classifier untuk deteksi krisis yang memicu tampilan kontak darurat secara otomatis. Riwayat chat dienkripsi dan tidak digunakan untuk melatih ulang model tanpa consent eksplisit.

**Batasan penting:** AI companion secara eksplisit diposisikan sebagai teman bicara awal, BUKAN pengganti diagnosis atau terapi profesional. Setiap sesi menampilkan disclaimer ini, dan fitur "Akses Bantuan Profesional" harus selalu terlihat/mudah dijangkau dari layar chat.

## 7. Non-Functional Requirements

| **Aspek**              | **Requirement**                                                                                                                                                                                          |
|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Performa               | Waktu muat halaman utama < 3 detik pada koneksi 4G; API response time < 500ms untuk operasi umum.                                                                                                      |
| Keamanan & Privasi     | Data mood/kesehatan mental dienkripsi at-rest; akses data pribadi dibatasi (role-based access); kepatuhan terhadap UU PDP (Perlindungan Data Pribadi); consent eksplisit saat pengumpulan data sensitif. |
| Skalabilitas           | Arsitektur mampu menangani pertumbuhan dari ratusan ke puluhan ribu pengguna tanpa perombakan besar (horizontal scaling di backend).                                                                     |
| Aksesibilitas          | Mengikuti standar WCAG 2.1 level AA dasar (kontras warna, navigasi keyboard, label form).                                                                                                                |
| Kompatibilitas Browser | Mendukung Chrome, Firefox, Safari, Edge versi 2 tahun terakhir; responsif untuk desktop, tablet, dan mobile web.                                                                                         |
| Ketersediaan (Uptime)  | Target uptime 99% pada tahap MVP.                                                                                                                                                                        |
| SEO Dasar              | Landing page dioptimasi untuk pencarian (meta tag, semantic HTML) guna mendukung akuisisi pengguna organik.                                                                                              |

## 8. Desain & UX

- Gaya visual: clean, calming, ramah generasi Z — palet warna soft (biru/hijau pastel) untuk kesan menenangkan, sesuai tema wellness.

- Struktur halaman utama: Landing Page, Dashboard, Task Manager, Mood Check-In, Focus Timer, Komunitas, Pengaturan Akun/Langganan.

- Wireframe low-fidelity untuk tiap halaman perlu dibuat pada tahap desain (belum tersedia di dokumen sumber — menjadi deliverable terpisah oleh tim desain).

- Mobile-responsive wajib, mengingat sebagian pengguna akan mengakses lewat browser HP.

## 9. Spesifikasi Teknis

Prototype ini dibangun dan dijalankan sepenuhnya di lingkungan lokal (localhost) untuk keperluan demo/presentasi ke tenant. Stack teknis sudah ditetapkan sebagai berikut:

| **Layer**       | **Teknologi**                                          | **Keterangan**                                                                                                     |
|-----------------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Frontend        | React.js                                               | Dijalankan di localhost (misal via Vite/CRA dev server, contoh: http://localhost:3000)                             |
| Backend         | Node.js (Express.js)                                   | REST API lokal (contoh: http://localhost:5000), menangani logic task manager, mood check-in, curhat AI, dsb.       |
| Database        | PostgreSQL atau MongoDB (lokal)                        | Dijalankan lokal untuk tahap prototype; pemilihan final menyesuaikan struktur data tim                             |
| Autentikasi     | JWT (disimpan di localStorage/cookie untuk sesi lokal) | Cukup untuk demo; hardening keamanan dilakukan sebelum deployment publik                                           |
| Payment Gateway | Midtrans / Xendit (mode sandbox/testing)               | Simulasi transaksi untuk demo, belum transaksi nyata                                                               |
| AI / LLM        | LLM API (misal Claude API) untuk fitur Sesi Curhat     | Dipanggil dari backend Node.js agar API key tidak terekspos di frontend                                            |
| Deployment      | Belum dilakukan — masih localhost                      | Rencana deployment (misal Vercel untuk frontend, Railway/Render untuk backend) menjadi tahap terpisah setelah demo |

**Catatan demo ke tenant:** karena aplikasi belum online, presentasi/demo dilakukan melalui screen-share atau server lokal yang diakses di jaringan yang sama (localhost/LAN), bukan via link publik.

**Urutan pengerjaan:** Frontend (React.js dengan data dummy) dikerjakan dan dimaksimalkan lebih dulu, disusul Backend (Node.js/Express API), baru terakhir Database (desain skema & integrasi data persisten). Lihat bagian 11 untuk rincian tahapan.

## 10. Prioritas Fitur (MoSCoW)

| **Kategori**         | **Fitur**                                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------|
| Must Have            | Autentikasi, Task & Deadline Manager, Mood Check-In, Dashboard ringkasan                              |
| Should Have          | Focus Timer, Pengingat Istirahat, Komunitas dasar                                                     |
| Could Have           | Langganan Premium & statistik lanjutan, Rekomendasi aktivitas otomatis                                |
| Won't Have (MVP ini) | Dashboard kampus/institusi, integrasi LMS, akses langsung ke konselor profesional (baru rujukan link) |

## 11. Timeline & Milestone (Usulan)

### 11.1 Strategi Pengembangan: Frontend → Backend → Database

Tim sepakat mengembangkan secara bertahap per layer, bukan paralel, supaya masing-masing bagian bisa difokuskan dan didemokan progresnya secara jelas:

> 1\. Frontend dulu — bangun seluruh tampilan & interaksi (React.js) memakai data dummy/mock, supaya alur & UI/UX bisa langsung terlihat dan didiskusikan.
>
> 2\. Backend menyusul — bangun REST API (Node.js/Express) sesuai kontrak data yang sudah dipakai frontend, lalu sambungkan menggantikan data dummy.
>
> 3\. Database terakhir — desain skema & hubungkan backend ke database sungguhan, migrasi dari penyimpanan sementara (in-memory/JSON) ke database persisten.

### 11.2 Timeline per Fase

| **Fase**                                   | **Durasi** | **Output**                                                                                                                                       |
|--------------------------------------------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Fase 1 — Desain & Perencanaan              | 1–2 minggu | Wireframe, UI design, struktur komponen, kontrak data (mock JSON) untuk tiap fitur                                                               |
| Fase 2 — Frontend (Maksimalkan Tampilan)   | 3–4 minggu | Seluruh halaman & fitur (Auth UI, Task Manager, Mood Check-In, Dashboard, Sesi Curhat AI, dll) dengan data dummy — bisa diklik & didemokan penuh |
| Fase 3 — Backend (API)                     | 3–4 minggu | REST API Node.js/Express untuk semua fitur; frontend mulai disambungkan menggantikan data dummy satu per satu                                    |
| Fase 4 — Database                          | 1–2 minggu | Desain skema, setup database (PostgreSQL/MongoDB), migrasi dari data sementara ke database persisten, backend terhubung penuh                    |
| Fase 5 — Internal Testing & Persiapan Demo | 1–2 minggu | Bug fixing end-to-end, uji coba internal, penyiapan skenario demo                                                                                |
| Fase 6 — Presentasi Prototype ke Tenant    | 1 minggu   | Demo aplikasi (localhost/LAN) ke tenant, pengumpulan feedback                                                                                    |
| Fase 7 — Deployment ke Publik (Pasca-Demo) | 1–2 minggu | Deploy frontend & backend ke cloud, setup domain, database produksi                                                                              |

**Catatan:** karena frontend dibangun lebih dulu dengan data dummy, pastikan struktur mock data (nama field, format tanggal, tipe data) sudah disepakati sejak Fase 1 agar transisi ke backend di Fase 3 tidak butuh banyak rombak ulang di sisi frontend.

## 12. Stakeholder & Dependency

- CEO (Rivshultan Raza Alif Dzakiyy) — product owner, keputusan strategis

- CTO (Noya Dzakwan Rahman) — arsitektur teknis, pengembangan

- CMO (Yosua Nicolay) — strategi pemasaran & akuisisi pengguna

- CFO (Muhammad Zahi Ustadzi) — model bisnis & monetisasi

- CPO (Haidar Yahya Syarif) — product design & requirement

- Dependency eksternal: payment gateway (Midtrans/Xendit), pihak kampus untuk kerja sama distribusi awal

## 13. Risiko Utama (Ringkasan dari SWOT)

- Kompetisi dari aplikasi produktivitas & wellness yang sudah established (Todoist, Notion, Headspace, Calm).

- Retention rate rendah — perlu fokus pada onboarding yang baik dan community-driven engagement.

- Kepatuhan regulasi privasi data kesehatan mental — perlu legal review sebelum fitur mood check-in dirilis luas.

- Validasi pasar belum teruji — MVP web ini berfungsi sekaligus sebagai sarana validasi sebelum scaling ke mobile penuh.

## 14. Lampiran

Dokumen pendukung yang menjadi dasar PRD ini:

- Laporan Root Cause Analysis (RCA) — Ide Bisnis Startup "TemanKampus"

- Laporan Analisis SWOT dan Segmentasi Pasar Pelanggan — "TemanNgampus"
