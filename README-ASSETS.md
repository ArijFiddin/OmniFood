# OmniFood — Visual Asset Pack

Paket ini dibuat berdasarkan pemeriksaan `index.html`, `style.css`, `general.css`,
`quries.css`, `script.js`, dan `PROJECT_CONTEXT.md` pada ZIP yang diberikan.

## Arah visual
- Healthy food subscription / AI meal planning / food delivery
- Orange `#E67E22`, cream `#FDF2E9`, putih, dan charcoal `#222`
- Foto realistis, pencahayaan natural, nuansa hangat dan premium

## Aset yang sudah disertakan
| File | Untuk apa |
|---|---|
| `assets/images/logo/omnifood-logo.svg` | Logo horizontal untuk header dan footer |
| `assets/images/logo/omnifood-icon.svg` | Ikon brand untuk aplikasi / favicon |
| `assets/images/logo/favicon.svg` | Favicon browser |
| `assets/images/hero/hero.webp` | Foto utama hero landing page |
| `assets/images/cta/cta-woman-eating.webp` | Foto CTA; crop dari foto hero agar tone konsisten |
| `assets/images/featured/*.svg` | Wordmark teks publikasi sebagai placeholder visual; bukan artwork logo resmi |
| `assets/images/app/app-screen-01.svg` | Mockup ilustratif pemilihan preferensi |
| `assets/images/app/app-screen-02.svg` | Mockup ilustratif persetujuan meal plan |
| `assets/images/app/app-screen-03.svg` | Mockup ilustratif jadwal pengiriman |

## Foto yang masih perlu dibuat / dipilih
Repository awal memerlukan total 35 aset unik. Saat ini foto hero/CTA sudah tersedia.
Foto pelanggan, foto menu, 12 foto galeri, dan avatar testimoni belum dibuat dalam paket ini.
Saya tidak mengisi bagian tersebut dengan foto acak atau mengklaim placeholder sebagai foto final.

## Pemetaan seluruh kebutuhan sesuai project
| Aset | Lokasi target | Penggunaan |
|---|---|---|
| Logo OmniFood | `assets/images/logo/omnifood-logo.svg` | Header + footer |
| Favicon | `assets/images/logo/favicon.svg` | Tab browser |
| TechCrunch | `assets/images/featured/techcrunch.svg` | Featured in |
| Business Insider | `assets/images/featured/business-insider.svg` | Featured in |
| The New York Times | `assets/images/featured/new-york-times.svg` | Featured in |
| Forbes | `assets/images/featured/forbes.svg` | Featured in |
| USA Today | `assets/images/featured/usa-today.svg` | Featured in |
| Hero | `assets/images/hero/hero.webp` | Foto utama di hero |
| 6 avatar pelanggan | `assets/images/customers/customer-01.webp` … `customer-06.webp` | Avatar jumlah pelanggan |
| App screen 1 | `assets/images/app/app-screen-01.svg` | Step 01: preferensi |
| App screen 2 | `assets/images/app/app-screen-02.svg` | Step 02: approve meal plan |
| App screen 3 | `assets/images/app/app-screen-03.svg` | Step 03: delivery |
| Japanese Gyozas | `assets/images/meals/japanese-gyozas.webp` | Kartu menu pertama |
| Avocado Salad | `assets/images/meals/avocado-salad.webp` | Kartu menu kedua |
| Dave Bryson | `assets/images/testimonials/dave-bryson.webp` | Avatar testimoni 1 |
| Ben Hodley | `assets/images/testimonials/ben-hodley.webp` | Avatar testimoni 2 |
| Steve Miller | `assets/images/testimonials/steve-miller.webp` | Avatar testimoni 3 |
| Hannah Smith | `assets/images/testimonials/hannah-smith.webp` | Avatar testimoni 4 |
| Gallery 01–12 | `assets/images/gallery/gallery-01.webp` … `gallery-12.webp` | Galeri makanan |
| CTA | `assets/images/cta/cta-woman-eating.webp` | Background CTA |

## Catatan integrasi
- Folder `assets/images` ini berada di dalam folder `omnifood` pada paket.
- Sesuaikan path di HTML menjadi `assets/images/...`.
- Untuk logo SVG gunakan `<img src="assets/images/logo/omnifood-logo.svg" ...>`.
- Featured logos disediakan sebagai wordmark teks sederhana. Untuk publikasi, gunakan logo resmi hanya jika memiliki izin penggunaan.
- Mockup aplikasi berbentuk SVG sehingga tetap tajam saat diubah ukurannya.
