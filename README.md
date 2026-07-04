# AintSaint Static Website

Website versi 1 untuk AintSaint, media platform yang menaungi dua EO: SinnersNight dan WestSidePeople. Dibuat dengan HTML, CSS, dan Vanilla JavaScript static agar siap deploy ke GitHub Pages.

## Isi Website

- Home
- About
- SinnersNight
- WestSidePeople
- Talents
- Talent detail dynamic via `talent-detail.html?id=talent-xx`
- Music / Mix Library dengan filter
- Events
- Media
- Booking via WhatsApp
- Contact

## Cara Buka Lokal

Cara cepat:

1. Buka `index.html` langsung di browser.
2. Jika browser memblokir fetch JSON saat dibuka dari file lokal, gunakan Live Server di VS Code.

Alternatif:

```bash
python -m http.server 4173
```

Lalu buka:

```text
http://localhost:4173/
```

## Update Konten

Konten utama ada di folder `data/`:

- `data/settings.json`
- `data/talents.json`
- `data/mixes.json`
- `data/events.json`
- `data/media.json`
- `data/services.json`
- `data/gallery.json`

Update gambar ada di folder `assets/img/`.

Gunakan path relatif seperti:

```text
assets/img/talents/talent-01.jpg
```

Jangan gunakan path absolut seperti:

```text
/assets/img/talents/talent-01.jpg
```

## Booking WhatsApp

Nomor WhatsApp ada di:

```text
data/settings.json
```

Format:

```json
{
  "whatsapp": "6281234567890"
}
```

Booking form tidak menggunakan backend dan tidak menyimpan data pribadi ke localStorage. Setelah form valid, website membuat pesan WhatsApp otomatis.

## Deploy GitHub Pages

1. Buat repo GitHub.
2. Upload semua file di folder ini ke root repo.
3. Pastikan `index.html` ada di root.
4. Jangan hapus `.nojekyll`.
5. Buka GitHub repo Settings.
6. Masuk Pages.
7. Source: Deploy from a branch.
8. Branch: `main`.
9. Folder: `/root`.
10. Save.
11. Buka URL GitHub Pages yang diberikan GitHub.

## SEO

Setiap page sudah punya:

- `<title>`
- meta description
- Open Graph title
- Open Graph description
- Open Graph image
- favicon placeholder
- semantic HTML

Update `robots.txt` dan `sitemap.xml` setelah URL GitHub Pages final diketahui.

## Future Auto Sync

Phase 1 saat ini memakai manual JSON.

Phase 1.5 bisa ditambahkan nanti dengan GitHub Actions:

- `workflow_dispatch`
- schedule setiap 6 jam
- ambil konten dari YouTube, SoundCloud, TikTok, atau Instagram
- API key disimpan di GitHub Secrets
- output ditulis ke `data/mixes.json` atau `data/media.json`
- GitHub Pages otomatis update setelah JSON berubah

Jangan taruh API key di JavaScript frontend.



