(function () {
  function published(items) {
    return items.filter((item) => item.status === "Published");
  }

  function mediaCard(item, talents) {
    const talentName = item.talentId ? SWUtils.talentNameById(talents, item.talentId) : "AintSaint";
    return `
      <article class="mix-card reveal">
        <img class="mix-card__thumb" src="${SWUtils.escapeHTML(item.thumbnail)}" alt="${SWUtils.escapeHTML(item.title)} thumbnail">
        <div class="mix-card__body">
          <div class="mix-card__topline">
            <span>${SWUtils.escapeHTML(item.platform)}</span>
            <span>${SWUtils.escapeHTML(item.category)}</span>
          </div>
          <div class="mix-card__meta">${SWUtils.badge(item.eoOwner)}<span class="badge">${SWUtils.escapeHTML(item.contentType)}</span></div>
          <h3>${SWUtils.escapeHTML(item.title)}</h3>
          <p>${SWUtils.escapeHTML(talentName)}</p>
          <p>${SWUtils.formatDate(item.publishedAt)}</p>
          <div class="mix-card__actions">
            <a class="btn btn-primary" href="${SWUtils.escapeHTML(item.url || "#")}" target="_blank" rel="noopener">Watch</a>
            <button class="btn btn-ghost" type="button" data-share-url="${SWUtils.escapeHTML(item.url || window.location.href)}" data-share-title="${SWUtils.escapeHTML(item.title)}">Share</button>
          </div>
        </div>
      </article>
    `;
  }

  function attachShareHandlers(container) {
    container.querySelectorAll("[data-share-url]").forEach((button) => {
      button.addEventListener("click", async () => {
        const message = await SWUtils.shareUrl(button.dataset.shareUrl, button.dataset.shareTitle);
        button.textContent = message;
        setTimeout(() => {
          button.textContent = "Share";
        }, 1800);
      });
    });
  }

  function renderMediaCards(containerId, media, talents) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!media || media.length === 0) {
      SWUtils.renderEmpty(container, "No media found for this filter.");
      return;
    }
    container.innerHTML = media.map((item) => mediaCard(item, talents || [])).join("");
    attachShareHandlers(container);
    requestAnimationFrame(() => container.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible")));
  }

  async function renderLatestMedia(containerId, limit) {
    const [media, talents] = await Promise.all([loadJSON("data/media.json"), loadJSON("data/talents.json")]);
    renderMediaCards(containerId, SWUtils.sortByDateDesc(published(media), "publishedAt").slice(0, limit || 3), talents);
  }

  async function renderMediaByEO(containerId, eoOwner, limit) {
    const [media, talents] = await Promise.all([loadJSON("data/media.json"), loadJSON("data/talents.json")]);
    const filtered = published(media).filter((item) => item.eoOwner === eoOwner || item.eoOwner === "Hybrid");
    renderMediaCards(containerId, SWUtils.sortByDateDesc(filtered, "publishedAt").slice(0, limit || 6), talents);
  }

  async function initMediaFilters() {
    const form = document.getElementById("media-filter-form");
    const grid = document.getElementById("media-grid");
    if (!form || !grid) return;

    const [media, talents] = await Promise.all([loadJSON("data/media.json"), loadJSON("data/talents.json")]);
    const talentSelect = document.getElementById("filter-media-talent");
    const count = document.getElementById("media-results-count");
    const inputs = {
      eo: document.getElementById("filter-media-eo"),
      talent: talentSelect,
      platform: document.getElementById("filter-media-platform"),
      type: document.getElementById("filter-media-type"),
      category: document.getElementById("filter-media-category")
    };

    talents.forEach((talent) => {
      const option = document.createElement("option");
      option.value = talent.id;
      option.textContent = talent.stageName;
      talentSelect.append(option);
    });

    function update() {
      const filtered = published(media).filter((item) => {
        const eoMatch = inputs.eo.value === "All" || item.eoOwner === inputs.eo.value;
        const talentMatch = inputs.talent.value === "All" || item.talentId === inputs.talent.value;
        const platformMatch = inputs.platform.value === "All" || item.platform === inputs.platform.value;
        const typeMatch = inputs.type.value === "All" || item.contentType === inputs.type.value;
        const categoryMatch = inputs.category.value === "All" || item.category === inputs.category.value;
        return eoMatch && talentMatch && platformMatch && typeMatch && categoryMatch;
      });
      const sorted = SWUtils.sortByDateDesc(filtered, "publishedAt");
      count.textContent = `${sorted.length} media item${sorted.length === 1 ? "" : "s"} shown`;
      renderMediaCards("media-grid", sorted, talents);
    }

    form.addEventListener("change", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "home") renderLatestMedia("home-media", 3);
    if (page === "sinnersnight") renderMediaByEO("sinners-media", "SinnersNight", 6);
    if (page === "westsidepeople") renderMediaByEO("westside-media", "WestSidePeople", 6);
    if (page === "media") initMediaFilters();
  });

  window.renderMediaCards = renderMediaCards;
  window.renderLatestMedia = renderLatestMedia;
  window.renderMediaByEO = renderMediaByEO;
  window.initMediaFilters = initMediaFilters;
})();
