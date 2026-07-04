(function () {
  const fallbackData = {
    settings: {
      brandName: "AintSaint",
      tagline: "Global Sounds. Local Energy. One Media Movement.",
      whatsapp: "6281234567890",
      email: "booking@aintsaint.media",
      instagramAintSaint: "https://instagram.com/",
      instagramSinnersNight: "https://instagram.com/",
      instagramWestSidePeople: "https://instagram.com/",
      tiktok: "https://tiktok.com/",
      youtube: "https://youtube.com/",
      soundcloud: "https://soundcloud.com/",
      address: "Indonesia"
    },
    talents: [
      {
        id: "talent-01",
        name: "Talent 01",
        stageName: "DJ Talent 01",
        division: "SinnersNight",
        mainGenre: "Global Club / Baile Funk / Jersey Club",
        secondaryGenre: "Tech House / Bass House",
        genres: ["Global Club", "Baile Funk", "Jersey Club", "Tech House"],
        shortBio: "DJ dengan karakter global club sound, energetic, dan cocok untuk event modern.",
        fullBio: "DJ Talent 01 membawa warna global club sound dengan kombinasi baile funk, jersey club, dan energy set yang cocok untuk club night, private party, dan global showcase.",
        signatureSound: "Energetic global club sound with fast switch and high crowd energy.",
        bestFor: ["Club Night", "Private Party", "Global Sound Showcase"],
        photo: "assets/img/talents/talent-01.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: true
      },
      {
        id: "talent-02",
        name: "Talent 02",
        stageName: "DJ Talent 02",
        division: "SinnersNight",
        mainGenre: "Afro House / Tech House / Hard Groove",
        secondaryGenre: "Global Club / Bass House",
        genres: ["Afro House", "Tech House", "Hard Groove", "Bass House"],
        shortBio: "Selector dengan groove internasional, set rapi, dan build-up yang cocok untuk lounge sampai club.",
        fullBio: "DJ Talent 02 fokus pada afro house, tech house, dan hard groove dengan flow yang clean. Cocok untuk event yang butuh mood premium, transisi halus, dan energi bertahap.",
        signatureSound: "Percussive global groove, deep drums, and clean club transitions.",
        bestFor: ["Lounge Night", "Club Night", "Brand Event"],
        photo: "assets/img/talents/talent-02.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: true
      },
      {
        id: "talent-03",
        name: "Talent 03",
        stageName: "DJ Talent 03",
        division: "SinnersNight",
        mainGenre: "Trap / Drum & Bass / Bass House",
        secondaryGenre: "Jersey Club / Global Bass",
        genres: ["Trap", "Drum & Bass", "Bass House", "Jersey Club"],
        shortBio: "High-impact DJ untuk crowd yang butuh drop besar, bass pressure, dan momen peak-time.",
        fullBio: "DJ Talent 03 memainkan sisi lebih keras dari SinnersNight: trap, drum and bass, bass house, dan global bass. Setnya cocok untuk peak hour, campus event, dan party yang butuh adrenalin.",
        signatureSound: "Heavy bass switches, sharp drops, and festival-style peak moments.",
        bestFor: ["Campus Event", "Festival", "Peak Hour Club Set"],
        photo: "assets/img/talents/talent-03.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: false
      },
      {
        id: "talent-04",
        name: "Talent 04",
        stageName: "DJ Talent 04",
        division: "WestSidePeople",
        mainGenre: "Breakbeat / Funkot / Indo Bounce",
        secondaryGenre: "Hardfunk / BKB",
        genres: ["Breakbeat", "Funkot", "Indo Bounce", "BKB"],
        shortBio: "Local crowd specialist dengan energi familiar, fun, dan tetap dikemas modern.",
        fullBio: "DJ Talent 04 membawa genre lokal Indonesia ke format yang lebih rapi untuk venue modern. Breakbeat, funkot, dan indo bounce dikemas dengan kontrol crowd yang kuat.",
        signatureSound: "Local bounce, quick chant moments, and crowd-first transitions.",
        bestFor: ["Coffee Shop Event", "Community Event", "Local Night"],
        photo: "assets/img/talents/talent-04.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: true
      },
      {
        id: "talent-05",
        name: "Talent 05",
        stageName: "DJ Talent 05",
        division: "WestSidePeople",
        mainGenre: "Hardfunk / Jungle Dutch / Dutch Boxing",
        secondaryGenre: "Slow Bass / BLB",
        genres: ["Hardfunk", "Jungle Dutch", "Dutch Boxing", "Slow Bass"],
        shortBio: "DJ lokal dengan sound agresif, crowd call jelas, dan cocok untuk local movement stage.",
        fullBio: "DJ Talent 05 membangun set dari hardfunk, jungle dutch, dan dutch boxing. Karakternya cocok untuk acara komunitas, crowd padat, dan format event yang ingin terasa lokal tapi profesional.",
        signatureSound: "Hard local rhythm, crowd call, and street-stage energy.",
        bestFor: ["Community Showcase", "Outdoor Party", "Local Culture Event"],
        photo: "assets/img/talents/talent-05.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: false
      },
      {
        id: "talent-06",
        name: "Talent 06",
        stageName: "DJ Talent 06",
        division: "WestSidePeople",
        mainGenre: "Campursari Switch / Pantura Style / Local Remix",
        secondaryGenre: "Breakbeat / House Kota",
        genres: ["Campursari Switch", "Pantura Style", "Breakbeat", "House Kota"],
        shortBio: "Performer dengan local remix culture, seleksi unik, dan pendekatan crowd yang hangat.",
        fullBio: "DJ Talent 06 menghubungkan local remix culture dengan format event modern. Campursari switch, pantura style, dan house kota dibuat lebih clean untuk audience luas.",
        signatureSound: "Local remix storytelling with playful switch-ups and warm crowd energy.",
        bestFor: ["Private Party", "Coffee Shop", "Local Brand Event"],
        photo: "assets/img/talents/talent-06.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: false
      },
      {
        id: "talent-07",
        name: "Talent 07",
        stageName: "DJ Talent 07",
        division: "Hybrid",
        mainGenre: "Local x Global Switch",
        secondaryGenre: "Baile Funk / Breakbeat / Tech House",
        genres: ["Local x Global Switch", "Baile Funk", "Breakbeat", "Tech House"],
        shortBio: "Hybrid selector yang menghubungkan SinnersNight dan WestSidePeople dalam satu set fleksibel.",
        fullBio: "DJ Talent 07 menjadi jembatan antara global sound dan local Indonesia energy. Setnya bisa bergerak dari baile funk, tech house, breakbeat, sampai local remix tergantung event dan crowd.",
        signatureSound: "Global-to-local switches, flexible pacing, and crossover crowd moments.",
        bestFor: ["Hybrid Showcase", "Brand Event", "Private Party"],
        photo: "assets/img/talents/talent-07.jpg",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/",
        youtube: "https://youtube.com/",
        soundcloud: "https://soundcloud.com/",
        featured: true
      }
    ],
    mixes: [
      {
        id: "mix-001",
        title: "AintSaint Opening Mix",
        talentId: "talent-01",
        talentName: "DJ Talent 01",
        eoOwner: "SinnersNight",
        platform: "YouTube",
        contentType: "Mix",
        genres: ["Baile Funk", "Jersey Club"],
        thumbnail: "assets/img/mixes/mix-001.jpg",
        url: "https://youtube.com/",
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
        duration: "30:00",
        publishedAt: "2026-07-05",
        featured: true,
        status: "Published"
      },
      {
        id: "mix-002",
        title: "Afro Groove Night Session",
        talentId: "talent-02",
        talentName: "DJ Talent 02",
        eoOwner: "SinnersNight",
        platform: "SoundCloud",
        contentType: "Studio Mix",
        genres: ["Afro House", "Tech House", "Hard Groove"],
        thumbnail: "assets/img/mixes/mix-002.jpg",
        url: "https://soundcloud.com/",
        embedUrl: "",
        duration: "42:10",
        publishedAt: "2026-07-03",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-003",
        title: "Bass Pressure Club Cut",
        talentId: "talent-03",
        talentName: "DJ Talent 03",
        eoOwner: "SinnersNight",
        platform: "TikTok",
        contentType: "Short Video",
        genres: ["Trap", "Drum & Bass", "Bass House"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://tiktok.com/",
        embedUrl: "",
        duration: "00:58",
        publishedAt: "2026-06-28",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-004",
        title: "Local Bounce Starter Pack",
        talentId: "talent-04",
        talentName: "DJ Talent 04",
        eoOwner: "WestSidePeople",
        platform: "YouTube",
        contentType: "Live Set",
        genres: ["Breakbeat", "Funkot", "Indo Bounce"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://youtube.com/",
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
        duration: "35:20",
        publishedAt: "2026-06-25",
        featured: true,
        status: "Published"
      },
      {
        id: "mix-005",
        title: "Hardfunk Street Signal",
        talentId: "talent-05",
        talentName: "DJ Talent 05",
        eoOwner: "WestSidePeople",
        platform: "Instagram",
        contentType: "Reel",
        genres: ["Hardfunk", "Jungle Dutch", "Dutch Boxing"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://instagram.com/",
        embedUrl: "",
        duration: "01:20",
        publishedAt: "2026-06-22",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-006",
        title: "Campursari Switch Tape",
        talentId: "talent-06",
        talentName: "DJ Talent 06",
        eoOwner: "WestSidePeople",
        platform: "SoundCloud",
        contentType: "Mix",
        genres: ["Campursari Switch", "Pantura Style", "House Kota"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://soundcloud.com/",
        embedUrl: "",
        duration: "28:44",
        publishedAt: "2026-06-18",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-007",
        title: "Local x Global Switch Vol. 1",
        talentId: "talent-07",
        talentName: "DJ Talent 07",
        eoOwner: "Hybrid",
        platform: "YouTube",
        contentType: "Visualizer",
        genres: ["Local x Global Switch", "Baile Funk", "Breakbeat"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://youtube.com/",
        embedUrl: "https://www.youtube.com/embed/VIDEO_ID",
        duration: "24:30",
        publishedAt: "2026-06-15",
        featured: true,
        status: "Published"
      },
      {
        id: "mix-008",
        title: "SinnersNight Behind The Booth",
        talentId: "talent-01",
        talentName: "DJ Talent 01",
        eoOwner: "SinnersNight",
        platform: "Instagram",
        contentType: "Behind The Scene",
        genres: ["Global Club", "Tech House"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://instagram.com/",
        embedUrl: "",
        duration: "01:05",
        publishedAt: "2026-06-11",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-009",
        title: "WestSidePeople Crowd Recap",
        talentId: "talent-04",
        talentName: "DJ Talent 04",
        eoOwner: "WestSidePeople",
        platform: "TikTok",
        contentType: "Event Recap",
        genres: ["Breakbeat", "Funkot", "Local Remix Culture"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://tiktok.com/",
        embedUrl: "",
        duration: "00:45",
        publishedAt: "2026-06-06",
        featured: false,
        status: "Published"
      },
      {
        id: "mix-010",
        title: "Draft Testing Mix",
        talentId: "talent-07",
        talentName: "DJ Talent 07",
        eoOwner: "Hybrid",
        platform: "YouTube",
        contentType: "Mix",
        genres: ["Local x Global Switch"],
        thumbnail: "assets/img/mixes/mix-placeholder.jpg",
        url: "https://youtube.com/",
        embedUrl: "",
        duration: "12:00",
        publishedAt: "2026-06-01",
        featured: false,
        status: "Hidden"
      }
    ],
    events: [
      {
        id: "event-001",
        title: "AintSaint Showcase",
        eoOwner: "Hybrid",
        venue: "Monday Coffee",
        city: "Indonesia",
        date: "2026-07-11",
        time: "15:00",
        lineup: ["talent-01", "talent-04", "talent-07"],
        genreDirection: "Global sound x local Indonesia energy",
        poster: "assets/img/events/event-001.jpg",
        description: "AintSaint Showcase adalah event dengan konsep global sound dan local Indonesia energy.",
        status: "Upcoming"
      },
      {
        id: "event-002",
        title: "SinnersNight: Global Room",
        eoOwner: "SinnersNight",
        venue: "Club Session",
        city: "Indonesia",
        date: "2026-07-25",
        time: "21:00",
        lineup: ["talent-01", "talent-02", "talent-03"],
        genreDirection: "Baile Funk, Afro House, Tech House, Bass House",
        poster: "assets/img/events/event-placeholder.jpg",
        description: "International club direction untuk venue yang butuh sound modern dan premium.",
        status: "Upcoming"
      },
      {
        id: "event-003",
        title: "WestSidePeople Local Crowd",
        eoOwner: "WestSidePeople",
        venue: "Community Yard",
        city: "Indonesia",
        date: "2026-08-08",
        time: "19:00",
        lineup: ["talent-04", "talent-05", "talent-06"],
        genreDirection: "Breakbeat, Funkot, Hardfunk, Local Remix Culture",
        poster: "assets/img/events/event-placeholder.jpg",
        description: "Local Indonesia sound dengan konsep crowd culture dan community showcase.",
        status: "Upcoming"
      },
      {
        id: "event-004",
        title: "Coffee Switch Session",
        eoOwner: "Hybrid",
        venue: "Neighbour Coffee",
        city: "Indonesia",
        date: "2026-06-21",
        time: "16:00",
        lineup: ["talent-02", "talent-06"],
        genreDirection: "Warm global groove x local remix",
        poster: "assets/img/events/event-placeholder.jpg",
        description: "Sesi sore untuk coffee shop dengan transisi global dan lokal yang ringan.",
        status: "Past"
      },
      {
        id: "event-005",
        title: "Private Bass Room",
        eoOwner: "SinnersNight",
        venue: "Private Venue",
        city: "Indonesia",
        date: "2026-05-31",
        time: "22:00",
        lineup: ["talent-03", "talent-07"],
        genreDirection: "Trap, Drum & Bass, Local x Global Switch",
        poster: "assets/img/events/event-placeholder.jpg",
        description: "Private party dengan sound bass dan switch cepat untuk crowd kecil.",
        status: "Past"
      }
    ],
    services: [
      { id: "service-dj-performance", title: "DJ Performance", description: "DJ performance untuk coffee shop, club, private party, campus event, dan brand event.", bestFor: ["Coffee Shop", "Club", "Private Party", "Brand Event"] },
      { id: "service-event-organizer", title: "Event Organizer", description: "Konsep, lineup, flow acara, dan koordinasi basic untuk event musik kecil sampai menengah.", bestFor: ["Club Night", "Community Event", "Campus Event"] },
      { id: "service-talent-booking", title: "Talent Booking", description: "Booking DJ AintSaint berdasarkan EO, genre direction, crowd, dan kebutuhan venue.", bestFor: ["Venue", "Private Client", "Sponsor"] },
      { id: "service-coffee-shop-event", title: "Coffee Shop Event", description: "Format musik sore atau malam untuk coffee shop yang ingin membuat crowd moment.", bestFor: ["Coffee Shop", "Pop-up", "Community"] },
      { id: "service-club-night", title: "Club Night", description: "Club format dengan direction SinnersNight, WestSidePeople, atau hybrid sesuai crowd.", bestFor: ["Club", "Bar", "Night Venue"] },
      { id: "service-private-party", title: "Private Party", description: "Lineup dan set direction untuk ulang tahun, private celebration, dan gathering.", bestFor: ["Private Party", "Gathering", "Afterparty"] },
      { id: "service-campus-event", title: "Campus Event", description: "DJ set dan music direction untuk event kampus dengan crowd muda dan dinamis.", bestFor: ["Campus Event", "Festival", "Student Community"] },
      { id: "service-brand-event", title: "Brand Event", description: "Music programming untuk activation, launch, dan event sponsor skala kecil sampai menengah.", bestFor: ["Brand Event", "Launch", "Activation"] },
      { id: "service-music-direction", title: "Music Direction", description: "Bantuan menentukan genre, mood, lineup, dan flow sound agar event punya identitas jelas.", bestFor: ["Venue", "Brand", "Community"] },
      { id: "service-media-aftermovie", title: "Media / Aftermovie", description: "Koordinasi konten event, short video, recap, dan dokumentasi ringan sesuai kebutuhan.", bestFor: ["Event Recap", "Social Content", "Sponsor Report"] }
    ],
    media: [
      { id: "media-001", title: "AintSaint Media Opening Reel", eoOwner: "Hybrid", talentId: "talent-07", platform: "Instagram", contentType: "Reel", category: "Talent Content", thumbnail: "assets/img/media/media-001.jpg", url: "https://instagram.com/", publishedAt: "2026-07-05", status: "Published", featured: true },
      { id: "media-002", title: "SinnersNight Booth Signal", eoOwner: "SinnersNight", talentId: "talent-01", platform: "TikTok", contentType: "Behind The Scene", category: "Video", thumbnail: "assets/img/media/media-002.jpg", url: "https://tiktok.com/", publishedAt: "2026-07-03", status: "Published", featured: false },
      { id: "media-003", title: "WestSidePeople Crowd Cut", eoOwner: "WestSidePeople", talentId: "talent-04", platform: "YouTube", contentType: "Event Recap", category: "Aftermovie", thumbnail: "assets/img/media/media-003.jpg", url: "https://youtube.com/", publishedAt: "2026-06-29", status: "Published", featured: true },
      { id: "media-004", title: "Global Sound Session Clip", eoOwner: "SinnersNight", talentId: "talent-02", platform: "Instagram", contentType: "Short Video", category: "Video", thumbnail: "assets/img/media/media-placeholder.jpg", url: "https://instagram.com/", publishedAt: "2026-06-23", status: "Published", featured: false },
      { id: "media-005", title: "Local Remix Culture Moment", eoOwner: "WestSidePeople", talentId: "talent-06", platform: "TikTok", contentType: "Reel", category: "Talent Content", thumbnail: "assets/img/media/media-placeholder.jpg", url: "https://tiktok.com/", publishedAt: "2026-06-18", status: "Published", featured: false }
    ],
    gallery: [
      { id: "gallery-001", title: "AintSaint Event Moment", eoOwner: "Hybrid", talentId: "talent-01", eventId: "event-001", image: "assets/img/gallery/gallery-placeholder.jpg", category: "Event", date: "2026-07-05" },
      { id: "gallery-002", title: "SinnersNight Booth", eoOwner: "SinnersNight", talentId: "talent-02", eventId: "event-002", image: "assets/img/gallery/gallery-placeholder.jpg", category: "Booth", date: "2026-07-03" },
      { id: "gallery-003", title: "WestSidePeople Crowd", eoOwner: "WestSidePeople", talentId: "talent-04", eventId: "event-003", image: "assets/img/gallery/gallery-placeholder.jpg", category: "Crowd", date: "2026-06-25" }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function keyFromPath(path) {
    const fileName = String(path).split("/").pop().split("\\").pop().replace(".json", "");
    return fileName;
  }

  function fallbackFor(path) {
    const key = keyFromPath(path);
    if (Object.prototype.hasOwnProperty.call(fallbackData, key)) {
      return clone(fallbackData[key]);
    }
    return [];
  }

  window.SW_FALLBACK_DATA = fallbackData;

  window.loadJSON = async function loadJSON(path) {
    try {
      if (window.location.protocol === "file:") {
        return fallbackFor(path);
      }
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`Failed to load ${path}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(error);
      return fallbackFor(path);
    }
  };

  window.loadSettings = async function loadSettings() {
    const data = await window.loadJSON("data/settings.json");
    return Array.isArray(data) ? clone(fallbackData.settings) : data;
  };
})();



