(function () {
  function published(mixes) {
    return mixes.filter((mix) => mix.status === "Published");
  }

  function mixCard(mix) {
    const url = mix.url || "#";
    return `
      <article class="mix-card reveal">
        <img class="mix-card__thumb" src="${SWUtils.escapeHTML(mix.thumbnail)}" alt="${SWUtils.escapeHTML(mix.title)} thumbnail">
        <div class="mix-card__body">
          <div class="mix-card__topline">
            <span>${SWUtils.escapeHTML(mix.platform)}</span>
            <span>${SWUtils.escapeHTML(mix.duration || "")}</span>
          </div>
          <div class="mix-card__meta">${SWUtils.badge(mix.eoOwner)}<span class="badge">${SWUtils.escapeHTML(mix.contentType)}</span></div>
          <h3>${SWUtils.escapeHTML(mix.title)}</h3>
          <p>${SWUtils.escapeHTML(mix.talentName)}</p>
          <div class="tag-cloud">${SWUtils.genreTags(mix.genres)}</div>
          <p>${SWUtils.formatDate(mix.publishedAt)}</p>
          <div class="mix-card__actions">
            <a class="btn btn-primary" href="${SWUtils.escapeHTML(url)}" target="_blank" rel="noopener">Listen / Watch</a>
            <button class="btn btn-ghost" type="button" data-share-url="${SWUtils.escapeHTML(url)}" data-share-title="${SWUtils.escapeHTML(mix.title)}">Share</button>
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

  function renderMixCards(containerId, mixes) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!mixes || mixes.length === 0) {
      SWUtils.renderEmpty(container, "No content found for this filter.");
      return;
    }
    container.innerHTML = mixes.map(mixCard).join("");
    attachShareHandlers(container);
    requestAnimationFrame(() => container.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible")));
  }

  async function renderLatestMixes(containerId, limit) {
    const mixes = await loadJSON("data/mixes.json");
    renderMixCards(containerId, SWUtils.sortByDateDesc(published(mixes), "publishedAt").slice(0, limit || 6));
  }

  async function renderMixesByBrand(containerId, eoOwner) {
    const mixes = await loadJSON("data/mixes.json");
    const filtered = published(mixes)
      .filter((mix) => mix.eoOwner === eoOwner || mix.eoOwner === "Hybrid")
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    renderMixCards(containerId, filtered.slice(0, 6));
  }

  async function renderMixesByTalent(containerId, talentId) {
    const mixes = await loadJSON("data/mixes.json");
    renderMixCards(containerId, SWUtils.sortByDateDesc(published(mixes).filter((mix) => mix.talentId === talentId), "publishedAt"));
  }

  async function renderFeaturedMix() {
    const container = document.getElementById("featured-mix");
    if (!container) return;
    const mixes = await loadJSON("data/mixes.json");
    const featured = published(mixes).find((mix) => mix.featured) || published(mixes)[0];
    renderMixCards("featured-mix", featured ? [featured] : []);
  }

  async function initMixFilters() {
    const form = document.getElementById("mix-filter-form");
    const grid = document.getElementById("mix-grid");
    if (!form || !grid) return;

    const [mixes, talents] = await Promise.all([loadJSON("data/mixes.json"), loadJSON("data/talents.json")]);
    const talentSelect = document.getElementById("filter-talent");
    const count = document.getElementById("mix-results-count");
    const inputs = {
      eoOwner: document.getElementById("filter-eo"),
      talent: talentSelect,
      platform: document.getElementById("filter-platform"),
      type: document.getElementById("filter-type"),
      genre: document.getElementById("filter-genre")
    };

    talents.forEach((talent) => {
      const option = document.createElement("option");
      option.value = talent.id;
      option.textContent = talent.stageName;
      talentSelect.append(option);
    });

    const queryEO = SWUtils.brandFromSlug(SWUtils.getQueryParam("eo") || SWUtils.getQueryParam("brand"));
    const queryTalent = SWUtils.getQueryParam("talent");
    const hasOption = (select, value) => [...select.options].some((option) => option.value === value);
    if (queryEO && hasOption(inputs.eoOwner, queryEO)) inputs.eoOwner.value = queryEO;
    if (queryTalent && hasOption(inputs.talent, queryTalent)) inputs.talent.value = queryTalent;

    function update() {
      const filtered = published(mixes).filter((mix) => {
        const eoMatch = inputs.eoOwner.value === "All" || mix.eoOwner === inputs.eoOwner.value;
        const talentMatch = inputs.talent.value === "All" || mix.talentId === inputs.talent.value;
        const platformMatch = inputs.platform.value === "All" || mix.platform === inputs.platform.value;
        const typeMatch = inputs.type.value === "All" || mix.contentType === inputs.type.value;
        const genreMatch = inputs.genre.value === "All" || (mix.genres || []).includes(inputs.genre.value);
        return eoMatch && talentMatch && platformMatch && typeMatch && genreMatch;
      });
      const sorted = SWUtils.sortByDateDesc(filtered, "publishedAt");
      count.textContent = `${sorted.length} published content${sorted.length === 1 ? "" : "s"} shown`;
      renderMixCards("mix-grid", sorted);
    }

    form.addEventListener("change", update);
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "home") renderLatestMixes("latest-mixes", 6);
    if (page === "sinnersnight") renderMixesByBrand("sinners-mixes", "SinnersNight");
    if (page === "westsidepeople") renderMixesByBrand("westside-mixes", "WestSidePeople");
    if (page === "mixes") {
      renderFeaturedMix();
      initMixFilters();
    }
  });

  window.renderMixCards = renderMixCards;
  window.renderLatestMixes = renderLatestMixes;
  window.renderMixesByBrand = renderMixesByBrand;
  window.renderMixesByTalent = renderMixesByTalent;
  window.initMixFilters = initMixFilters;
})();



