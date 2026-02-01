# CafeFinder ☕

**Find The Best Cafe & Resto in Your City.**

CafeFinder adalah aplikasi web modern untuk menemukan rekomendasi cafe, restoran, dan tempat nongkrong terbaik di sekitar Anda. Dibangun dengan teknologi web terkini untuk performa cepat dan pengalaman pengguna yang mulus.

![CafeFinder Preview](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop)

## Fitur Utama ✨

*   **📍 Rekomendasi Berbasis Lokasi**: Otomatis mendeteksi lokasi pengguna atau pilih kota secara manual (misal: Yogyakarta, Jakarta).
*   **🔍 Pencarian Cerdas**: Cari cafe berdasarkan nama, atau filter berdasarkan kategori (Coffee Shop, Family Resto, Buka 24 Jam).
*   **🌍 Bilingual (ID/EN)**: Dukungan penuh Bahasa Indonesia dan Bahasa Inggris yang dapat diganti secara instan.
*   **📱 Fully Responsive**: Tampilan optimal di Desktop, Tablet, dan Mobile (dilengkapi Hamburger Menu & Mobile Modal).
*   **🗺️ Peta Interaktif**: Integrasi OpenStreetMap (Leaflet) untuk melihat lokasi akurat.
*   **🔗 Fitur Berbagi**: Share link cafe favorit ke teman via WhatsApp atau media sosial lainnya (Web Share API support).
*   **🛠️ Data Real-time**: Menggunakan OpenStreetMap (Nominatim & Overpass API) untuk data tempat yang akurat.

## Tech Stack 🛠️

Project ini dibangun menggunakan:

*   **Core**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) (untuk manajemen lokasi global)
*   **Routing**: [React Router DOM](https://reactrouter.com/)
*   **Internationalization**: [i18next](https://www.i18next.com/)
*   **Maps**: [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **API**: OpenStreetMap (Nominatim & Overpass)

## Struktur Project 📂

```
src/
├── components/      # Komponen UI yang dapat digunakan kembali
│   ├── cafe/        # Komponen spesifik cafe (Card, List)
│   ├── home/        # Komponen halaman utama (Hero, Featured)
│   ├── layout/      # Layout utama (Header, Footer)
│   └── ui/          # Elemen UI dasar (Button, Modal, Input)
├── hooks/           # Custom Hooks (useLocationStore)
├── locales/         # File terjemahan (en.json, id.json)
├── pages/           # Halaman aplikasi (Home, Detail, Search, About, dll)
├── services/        # Integrasi API (api.ts)
└── types/           # Definisi tipe TypeScript
```

## Cara Menjalankan (Development) 🚀

Pastikan Anda sudah menginstal Node.js (v18+) dan npm/pnpm.

1.  **Clone repository:**
    ```bash
    git clone https://github.com/username/recomend-cafe.git
    cd recomend-cafe
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # atau
    pnpm install
    ```

3.  **Jalankan server development:**
    ```bash
    npm run dev
    # atau
    pnpm dev
    ```

4.  Buka browser dan akses `http://localhost:5173`.

## Lisensi 📄

Project ini dibuat untuk tujuan pembelajaran dan portofolio.

---

Dibuat dengan ☕ dan ❤️ oleh **Ryan Sutrisno**.
