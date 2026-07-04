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
- Services
- Booking via WhatsApp
- Contact

## Cara Buka Lokal

Cara cepat:

1. Jalankan static server lokal agar JSON bisa dibaca browser.
2. Buka URL lokal dari server.

Contoh:

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

### Cara Update Data

- `settings.json`: WhatsApp booking, email, Instagram AintSaint, Instagram SinnersNight, Instagram WestSidePeople, TikTok, YouTube, SoundCloud, dan address.
- `talents.json`: 7 talent, division, genre, bio, foto, dan social link resmi.
- `mixes.json`: URL konten asli, platform, thumbnail, talent owner, EO owner, genre, status, mood, tracklist, eventId, dan series.
- `events.json`: event asli, venue, city, date, lineup, poster, description, dan status.
- `media.json`: latest video, reels, aftermovie, event recap, behind the scene, talent content, URL asli, caption, priority, dan eventId.
- `services.json`: layanan publik yang dirender di `services.html`, termasuk title, description, bestFor, dan booking query.
- `gallery.json`: foto performance, crowd, booth, event moment, dan hubungan ke talent/event.

### Fallback Data

`assets/js/data-loader.js` hanya menyimpan fallback minimal untuk production. Jangan isi dummy panjang di fallback. Data utama harus tetap ada di folder `data/`.

### Checklist Placeholder Sebelum Publish

- Tidak ada nama brand lama.
- Tidak ada nama EO lokal lama.
- Tidak ada embed ID dummy.
- Tidak ada URL umum platform sosial/media.
- Social link kosong akan tampil pending/non-clickable sampai link resmi diisi.
- Update nomor WhatsApp dan email asli sebelum dipakai untuk campaign.
- Ganti nama/foto talent placeholder dengan data resmi sebelum public brand push besar.

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

Booking mendukung query:

```text
booking.html?eo=sinnersnight
booking.html?eo=westsidepeople
booking.html?talent=talent-01
booking.html?event=event-001
booking.html?service=service-dj-performance
```

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

`robots.txt` dan `sitemap.xml` sudah diarahkan ke:

```text
https://jxxzy.github.io/AintSaint.github.io/
```

## Future Auto Sync

Current: manual JSON update.

Auto sync belum aktif. Phase 1.5 bisa ditambahkan nanti dengan GitHub Actions:

- `workflow_dispatch`
- schedule setiap 6 jam
- ambil konten dari YouTube, SoundCloud, TikTok, atau Instagram
- API key disimpan di GitHub Secrets
- output ditulis ke `data/mixes.json` atau `data/media.json`
- GitHub Pages otomatis update setelah JSON berubah

Jangan taruh API key di JavaScript frontend.



