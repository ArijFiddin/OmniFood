# Project Context — OmniFood

## 1. Ringkasan dan tujuan aplikasi

OmniFood adalah landing page untuk layanan berlangganan makanan sehat berbasis AI. Produk yang dipresentasikan menjanjikan perencanaan menu personal, pilihan diet yang luas, pemesanan yang fleksibel, dan pengantaran makanan setiap hari.

Tujuan halaman ini adalah:

- Menjelaskan nilai utama layanan dan alur penggunaan dalam tiga langkah.
- Membangun kepercayaan melalui logo publikasi, testimoni, galeri makanan, serta manfaat layanan.
- Mengarahkan calon pelanggan ke formulir pendaftaran / CTA **“Start eating well”**.
- Menampilkan dua paket harga untuk mendorong konversi berlangganan.

Proyek saat ini adalah website statis satu halaman. Tidak ada backend, autentikasi, proses pembayaran, endpoint API, atau sistem routing.

## 2. Target pengguna

- Profesional dan keluarga sibuk yang ingin makan sehat tanpa memasak atau merencanakan menu.
- Pengguna yang membutuhkan menu sesuai preferensi atau batasan diet: vegetarian, vegan, pescatarian, gluten-free, lactose-free, keto, paleo, low FODMAP, dan ramah anak.
- Pengguna yang menghargai bahan lokal/organik, pengurangan limbah, dan fleksibilitas jadwal pengantaran.
- Calon pelanggan berbahasa Inggris, dengan konteks harga dan alamat yang mengarah ke pasar Amerika Serikat.

## 3. Konsep desain

**Arah visual:** modern, ramah, sehat, dan premium tetapi tetap mudah didekati. Palet oranye hangat dipadukan dengan putih dan krem; foto makanan dan manusia dipakai untuk membuat layanan terasa personal dan menggugah selera.

**Pola layout:**

- Container maksimum `120rem` (≈ 1.200 px), dengan hero sedikit lebih lebar (`130rem`).
- Desktop memakai grid dua hingga lima kolom; layout berubah menjadi satu/dua kolom pada tablet dan ponsel.
- Spasi mengikuti skala 2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, dan 128 px.
- Sudut komponen umumnya `9px` atau `11px`, bayangan halus pada kartu dan CTA.
- Tombol utama berwarna oranye, tombol sekunder putih/krem, dan CTA memakai gradasi oranye.
- Navigasi header dapat menjadi sticky dan memiliki menu mobile.
- Footer menggunakan lima kolom di desktop dan direorganisasi pada layar kecil.

## 4. Warna dan typography

### Palet warna yang diterapkan

| Peran | Nilai | Pemakaian utama |
| --- | --- | --- |
| Oranye utama | `#e67e22` | CTA, tombol primer, ikon, aksen |
| Oranye gelap | `#cf711f` | Hover, teks subjudul, penekanan |
| Oranye terang | `#eb984e` | Awal gradasi CTA |
| Krem sangat terang | `#fdf2e9` | Latar hero, testimoni, paket Complete, tombol outline |
| Krem | `#fae5d3` | Lingkaran dekoratif layar aplikasi |
| Cokelat gelap | `#45260a` | Teks pada CTA |
| Hitam lembut | `#333` | Heading dan teks tegas |
| Abu utama | `#555` | Teks isi |
| Abu sekunder | `#6f6f6f`, `#767676`, `#888`, `#aaa`, `#ddd`, `#eee` | Metadata, footer, placeholder, border, elemen dekoratif |
| Hijau | `#51cf66`, `#94d82d` | Tag vegetarian dan vegan |
| Kuning | `#ffd43b` | Tag paleo dan pita “Best value” |
| Putih | `#fff` | Latar dan teks pada tombol primer |

### Tipografi

- Google Fonts memuat **Rubik** dengan bobot 400, 500, 600, dan 700.
- CSS `body` saat ini mendeklarasikan `font-family: "inter", sans-serif`; karena font Inter tidak dimuat, browser akan menggunakan fallback sans-serif. Untuk konsistensi desain, proyek seharusnya memilih satu: gunakan Rubik yang sudah dimuat, atau tambahkan sumber font Inter.
- Ukuran root `62.5%`, sehingga `1rem` = ±10 px.
- Heading: `5.2rem` (hero), `4.4rem` (section), `3rem` (tertiary), bobot 700, `#333`, letter spacing `-0.5px`.
- Teks isi dan daftar: umumnya `1.6rem`–`1.8rem`; hero `2rem`.
- Tombol: `2rem`, bobot 600. Label dan subheading menggunakan huruf kapital/letter spacing ringan.

## 5. Seluruh halaman dan bagian website

Hanya ada satu halaman yang dapat diakses langsung: `omnifood/index.html`.

| Urutan | Bagian / anchor | Isi dan fungsi |
| --- | --- | --- |
| 1 | Header | Logo, navigasi menuju How it works, Meals, Testimonials, Pricing, dan CTA “Try for free”; termasuk tombol menu mobile. |
| 2 | Hero | Janji utama layanan, dua CTA, metrik “250,000+ meals”, avatar pelanggan, dan gambar hero makanan/pengantaran. |
| 3 | Featured in | Lima logo media/publikasi untuk social proof. |
| 4 | `#how` — How it works | Tiga langkah: memilih preferensi, menyetujui meal plan, dan menerima makanan; masing-masing membutuhkan mockup layar aplikasi. |
| 5 | `#meals` — Meals | Dua kartu menu (Japanese Gyozas dan Avocado Salad), data nutrisi, tag diet, dan daftar jenis diet yang didukung. |
| 6 | `#testimonials` — Testimonials | Empat testimoni pelanggan serta galeri 12 foto makanan. |
| 7 | `#pricing` — Pricing | Paket Starter dan Complete, detail manfaat, serta empat alasan pendukung layanan. |
| 8 | `#cta` — Get your first meal | Form nama, email, sumber referensi, tombol daftar, dan foto sisi kanan. |
| 9 | Footer | Logo, tautan sosial, copyright, kontak, tautan Account, Company, dan Resources. |

### Berkas dan perilaku teknis

| Berkas | Peran |
| --- | --- |
| `omnifood/index.html` | Struktur seluruh landing page dan tautan CDN untuk Google Fonts, Ionicons, serta smooth-scroll polyfill. |
| `omnifood/general.css` | Reset, token visual informal, komponen layout/grid/heading/button umum. |
| `omnifood/style.css` | Styling per bagian: header hingga footer. |
| `omnifood/quries.css` | Breakpoint responsif untuk desktop kecil, tablet, dan ponsel. Nama berkas memakai ejaan `quries`. |
| `omnifood/script.js` | Tahun copyright dinamis, tombol navigasi mobile, smooth scroll, sticky header, dan fallback flex-gap. |

## 6. Status aset saat ini

Tidak ada berkas gambar di dalam repository. `index.html` memiliki banyak tag `<img>` dengan atribut `src=""`, sehingga gambar belum dapat ditampilkan. Satu gambar CTA direferensikan dari CSS sebagai `../Marsha.jpg`; berkas tersebut juga tidak ada.

Karena belum ada folder aset, tabel berikut menetapkan **lokasi target yang direkomendasikan**. Lokasi ini adalah dokumentasi kebutuhan aset, bukan perubahan yang sudah diterapkan ke aplikasi.

## 7. Daftar gambar yang dibutuhkan

### Identitas dan bukti sosial

| ID | Gambar yang dibutuhkan | Jumlah | Ukuran sumber minimum | Rasio | Lokasi target yang direkomendasikan | Referensi saat ini |
| --- | --- | ---: | --- | --- | --- | --- |
| brand-logo | Logo OmniFood horizontal, versi berwarna dan/atau gelap | 1, dipakai 2 kali | 320 × 80 px | 4:1 | `omnifood/assets/images/logo/omnifood-logo.png` | Header dan footer: `<img class="logo" src="">` |
| featured-logo | Logo TechCrunch | 1 | 320 × 80 px | 4:1 | `omnifood/assets/images/logos/techcrunch.png` | Featured in: `src=""` |
| featured-logo | Logo Business Insider | 1 | 320 × 80 px | 4:1 | `omnifood/assets/images/logos/business-insider.png` | Featured in: `src=""` |
| featured-logo | Logo The New York Times | 1 | 320 × 80 px | 4:1 | `omnifood/assets/images/logos/new-york-times.png` | Featured in: `src=""` |
| featured-logo | Logo Forbes | 1 | 320 × 80 px | 4:1 | `omnifood/assets/images/logos/forbes.png` | Featured in: `src=""` |
| featured-logo | Logo USA Today | 1 | 320 × 80 px | 4:1 | `omnifood/assets/images/logos/usa-today.png` | Featured in: `src=""` |

### Hero dan aplikasi

| ID | Gambar yang dibutuhkan | Jumlah | Ukuran sumber minimum | Rasio | Lokasi target yang direkomendasikan | Referensi saat ini |
| --- | --- | ---: | --- | --- | --- | --- |
| hero | Perempuan menikmati makanan, wadah makan, dan mangkuk makanan | 1 | 1.600 × 1.200 px | 4:3 | `omnifood/assets/images/hero/hero.webp` | Hero: `.hero-img`, `src=""` |
| customer-avatar | Avatar pelanggan beragam | 6 | 192 × 192 px masing-masing | 1:1 | `omnifood/assets/images/customers/customer-01.webp` s.d. `customer-06.webp` | Hero: enam `<img>` dalam `.delivered-imgs`, `src=""` |
| app-screen | Layar aplikasi: pemilihan preferensi | 1 | 750 × 1.500 px | 1:2 | `omnifood/assets/images/app/app-screen-01.png` | How it works, langkah 01: `.step-img`, `src=""` |
| app-screen | Layar aplikasi: persetujuan meal plan | 1 | 750 × 1.500 px | 1:2 | `omnifood/assets/images/app/app-screen-02.png` | How it works, langkah 02: `.step-img`, `src=""` |
| app-screen | Layar aplikasi: jadwal/pengantaran | 1 | 750 × 1.500 px | 1:2 | `omnifood/assets/images/app/app-screen-03.png` | How it works, langkah 03: `.step-img`, `src=""` |

### Menu, testimoni, dan galeri

| ID | Gambar yang dibutuhkan | Jumlah | Ukuran sumber minimum | Rasio | Lokasi target yang direkomendasikan | Referensi saat ini |
| --- | --- | ---: | --- | --- | --- | --- |
| meal | Foto Japanese Gyozas | 1 | 1.200 × 900 px | 4:3 | `omnifood/assets/images/meals/japanese-gyozas.webp` | Kartu meal pertama: `.meal-img`, `src=""` |
| meal | Foto Avocado Salad | 1 | 1.200 × 900 px | 4:3 | `omnifood/assets/images/meals/avocado-salad.webp` | Kartu meal kedua: `.meal-img`, `src=""` |
| testimonial-avatar | Foto Dave Bryson | 1 | 256 × 256 px | 1:1 | `omnifood/assets/images/testimonials/dave-bryson.webp` | Testimonial 01: `.testimonial-img`, `src=""` |
| testimonial-avatar | Foto Ben Hodley | 1 | 256 × 256 px | 1:1 | `omnifood/assets/images/testimonials/ben-hodley.webp` | Testimonial 02: `.testimonial-img`, `src=""` |
| testimonial-avatar | Foto Steve Miller | 1 | 256 × 256 px | 1:1 | `omnifood/assets/images/testimonials/steve-miller.webp` | Testimonial 03: `.testimonial-img`, `src=""` |
| testimonial-avatar | Foto Hannah Smith | 1 | 256 × 256 px | 1:1 | `omnifood/assets/images/testimonials/hannah-smith.webp` | Testimonial 04: `.testimonial-img`, `src=""` |
| gallery-food | Foto makanan tersaji indah, variasi menu dan suasana makan | 12 | 900 × 900 px masing-masing | 1:1 | `omnifood/assets/images/gallery/gallery-01.webp` s.d. `gallery-12.webp` | Dua belas `.gallery-item img`, seluruhnya `src=""` |

### CTA

| ID | Gambar yang dibutuhkan | Jumlah | Ukuran sumber minimum | Rasio | Lokasi target yang direkomendasikan | Referensi saat ini |
| --- | --- | ---: | --- | --- | --- | --- |
| cta-photo | Perempuan sedang menikmati makanan; area fokus sebaiknya di tengah karena memakai `background-position: center` | 1 | 1.200 × 1.600 px | 3:4 | `omnifood/assets/images/cta/cta-woman-eating.webp` | CSS `.cta-img-box` pada `omnifood/style.css`; saat ini menunjuk `../Marsha.jpg` |

**Total kebutuhan:** 1 logo merek, 5 logo publikasi, 1 hero, 6 avatar pelanggan, 3 layar aplikasi, 2 gambar menu, 4 avatar testimoni, 12 foto galeri, dan 1 foto CTA = **35 aset gambar unik**.

## 8. Rekomendasi format dan optimasi aset

- Gunakan **SVG** untuk logo bila tersedia; PNG transparan adalah fallback yang baik.
- Gunakan **WebP** untuk foto di web; pertahankan PNG untuk screenshot antarmuka aplikasi bila ketajaman teks penting.
- Sediakan gambar minimal pada ukuran sumber di tabel agar tetap tajam pada layar retina. Hindari memuat foto lebih besar dari yang diperlukan secara signifikan.
- Semua foto harus relevan dengan makanan sehat, keberagaman pelanggan, dan kualitas layanan. Pastikan lisensi penggunaan komersialnya jelas.
- Gunakan alt text deskriptif yang sudah hampir lengkap di HTML; perbaiki hanya saat aset benar-benar diintegrasikan.

## 9. Catatan batasan saat ini

- Semua tautan navigasi internal dan CTA mengarah ke anchor atau `#`; belum ada halaman terpisah untuk Account, Company, atau Resources.
- Form CTA belum memiliki backend pemrosesan data.
- Ikon sosial dan ikon fitur memakai Ionicons dari CDN.
- Beberapa detail teks/markup masih berupa hasil latihan/prototipe (misalnya typo konten dan beberapa elemen placeholder). Dokumen ini hanya mendeskripsikan kondisi yang ada dan tidak mengubahnya.
