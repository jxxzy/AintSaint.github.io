(function () {
  const fallbackData = {
    settings: {
      brandName: "AintSaint",
      tagline: "Global Sounds. Local Energy. One Media Movement.",
      whatsapp: "6281234567890",
      email: "booking@aintsaint.media",
      instagramAintSaint: "",
      instagramSinnersNight: "",
      instagramWestSidePeople: "",
      tiktok: "",
      youtube: "",
      soundcloud: "",
      address: "Indonesia"
    },
    talents: [],
    mixes: [],
    events: [],
    services: [],
    media: [],
    gallery: []
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function keyFromPath(path) {
    return String(path).split("/").pop().split("\\").pop().replace(".json", "");
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
