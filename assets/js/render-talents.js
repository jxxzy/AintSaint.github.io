(function () {
  async function getTalents() {
    return await loadJSON("data/talents.json");
  }

  function includesDivision(talent, division) {
    if (!division || division === "All") return true;
    if (division === "SinnersNight") return talent.division === "SinnersNight" || talent.division === "Hybrid";
    if (division === "WestSidePeople") return talent.division === "WestSidePeople" || talent.division === "Hybrid";
    return talent.division === division;
  }

  function talentCard(talent) {
    return `
      <article class="talent-card reveal">
        <img class="talent-card__image" src="${SWUtils.escapeHTML(talent.photo)}" alt="${SWUtils.escapeHTML(talent.stageName)}">
        <div class="talent-card__body">
          <div class="talent-card__meta">${SWUtils.badge(talent.division)}</div>
          <h3>${SWUtils.escapeHTML(talent.stageName)}</h3>
          <p><strong>${SWUtils.escapeHTML(talent.name)}</strong></p>
          <p>${SWUtils.escapeHTML(talent.mainGenre)}</p>
          <div class="tag-cloud">${SWUtils.genreTags(talent.genres)}</div>
          <p>${SWUtils.escapeHTML(talent.shortBio)}</p>
          <div class="social-row">${SWUtils.socialLinks(talent)}</div>
          <div class="talent-card__actions">
            <a class="btn btn-ghost" href="talent-detail.html?id=${SWUtils.escapeHTML(talent.id)}">View profile</a>
            <a class="btn btn-primary" href="booking.html?talent=${SWUtils.escapeHTML(talent.id)}">Book talent</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderTalentCards(containerId, talents) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!talents || talents.length === 0) {
      SWUtils.renderEmpty(container, "No talent found for this filter.");
      return;
    }
    container.innerHTML = talents.map(talentCard).join("");
    if (window.requestAnimationFrame) {
      requestAnimationFrame(() => container.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible")));
    }
  }

  function renderFeaturedTalents(containerId, talents) {
    const source = talents || [];
    const featured = source.filter((talent) => talent.featured);
    renderTalentCards(containerId, (featured.length ? featured : source.slice(0, 4)).slice(0, 4));
  }

  async function renderTalentsByDivision(containerId, division) {
    const talents = await getTalents();
    renderTalentCards(containerId, talents.filter((talent) => includesDivision(talent, division)));
  }

  async function filterTalentsByDivision() {
    const grid = document.getElementById("talent-grid");
    if (!grid) return;
    const talents = await getTalents();
    const search = document.getElementById("talent-search");
    const buttons = [...document.querySelectorAll("[data-talent-filter]")];
    let activeDivision = "All";

    function update() {
      const query = (search?.value || "").trim().toLowerCase();
      const filtered = talents.filter((talent) => {
        const byDivision = includesDivision(talent, activeDivision);
        const haystack = `${talent.stageName} ${talent.name} ${talent.mainGenre} ${(talent.genres || []).join(" ")}`.toLowerCase();
        return byDivision && (!query || haystack.includes(query));
      });
      renderTalentCards("talent-grid", filtered);
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeDivision = button.dataset.talentFilter;
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        update();
      });
    });
    search?.addEventListener("input", update);
    update();
  }

  async function renderTalentDetail() {
    const root = document.getElementById("talent-detail-root");
    if (!root) return;

    const id = SWUtils.getQueryParam("id");
    const [talents, mixes, gallery] = await Promise.all([
      loadJSON("data/talents.json"),
      loadJSON("data/mixes.json"),
      loadJSON("data/gallery.json")
    ]);
    const talent = talents.find((item) => item.id === id);

    if (!talent) {
      root.innerHTML = `
        <section class="hero hero--subpage">
          <div class="container hero__simple">
            <h1>Talent not found.</h1>
            <p>Please choose a talent from the AintSaint talents page.</p>
            <div class="hero__actions"><a class="btn btn-primary" href="talents.html">View Talents</a></div>
          </div>
        </section>
      `;
      return;
    }

    document.title = `${talent.stageName} - AintSaint Talent Detail`;
    const talentMixes = mixes
      .filter((mix) => mix.status === "Published" && mix.talentId === talent.id)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    const galleryItems = gallery.filter((item) => item.talentId === talent.id).slice(0, 3);
    const fallbackGallery = gallery.length ? gallery.slice(0, 3) : [];
    const related = talents
      .filter((item) => item.id !== talent.id && (item.division === talent.division || item.division === "Hybrid" || talent.division === "Hybrid"))
      .slice(0, 3);

    root.innerHTML = `
      <section class="hero hero--subpage talent-detail-hero">
        <div class="container talent-detail-grid">
          <img class="talent-detail-photo reveal" src="${SWUtils.escapeHTML(talent.photo)}" alt="${SWUtils.escapeHTML(talent.stageName)}">
          <div class="hero__simple reveal">
            <div class="talent-card__meta">${SWUtils.badge(talent.division)}</div>
            <h1>${SWUtils.escapeHTML(talent.stageName)}</h1>
            <p>${SWUtils.escapeHTML(talent.fullBio)}</p>
            <div class="hero__actions">
              <a class="btn btn-primary" href="booking.html?talent=${SWUtils.escapeHTML(talent.id)}">Book This Talent</a>
              <a class="btn btn-ghost" href="#mixes">View Mix Library</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container detail-section-grid">
          <article class="card reveal">
            <h2>Genre & Signature Sound</h2>
            <p>${SWUtils.escapeHTML(talent.signatureSound)}</p>
            <div class="tag-cloud">${SWUtils.genreTags(talent.genres)}</div>
          </article>
          <article class="card reveal">
            <h2>Best For Event</h2>
            <ul class="check-list">${(talent.bestFor || []).map((item) => `<li>${SWUtils.escapeHTML(item)}</li>`).join("")}</ul>
          </article>
        </div>
      </section>

      <section class="section section--soft" id="mixes">
        <div class="container">
          <div class="section-header">
            <div>
              <h2>Talent Music / Mix Library</h2>
              <p>Published content from ${SWUtils.escapeHTML(talent.stageName)}.</p>
            </div>
            <a class="text-link" href="mixes.html?talent=${SWUtils.escapeHTML(talent.id)}">Open main library</a>
          </div>
          <div id="talent-mixes" class="mix-grid"></div>
        </div>
      </section>

      <section class="section">
        <div class="container two-column">
          <article class="card reveal">
            <h2>Video / Reels</h2>
            <p>Use YouTube, TikTok, Instagram, or SoundCloud links in <code>data/mixes.json</code> to update this talent content.</p>
            <div class="social-row">${SWUtils.socialLinks(talent)}</div>
          </article>
          <article class="card reveal">
            <h2>Gallery</h2>
            <div class="gallery-strip">
              ${(galleryItems.length ? galleryItems : fallbackGallery).map((item) => `<img src="${SWUtils.escapeHTML(item.image)}" alt="${SWUtils.escapeHTML(item.title)}">`).join("")}
            </div>
          </article>
        </div>
      </section>

      <section class="section section--soft">
        <div class="container">
          <div class="section-header">
            <div>
              <h2>Related Talents</h2>
              <p>Explore more AintSaint talent direction.</p>
            </div>
            <a class="text-link" href="talents.html">All talents</a>
          </div>
          <div id="related-talents" class="card-grid"></div>
        </div>
      </section>

      <section class="section section--cta">
        <div class="container cta-band reveal">
          <div>
            <h2>Book ${SWUtils.escapeHTML(talent.stageName)}</h2>
            <p>Talent otomatis terpilih di booking form.</p>
          </div>
          <a class="btn btn-light" href="booking.html?talent=${SWUtils.escapeHTML(talent.id)}">Book This Talent</a>
        </div>
      </section>
    `;

    if (window.renderMixCards) renderMixCards("talent-mixes", talentMixes);
    renderTalentCards("related-talents", related);
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const page = document.body.dataset.page;
    if (page === "home") {
      const talents = await getTalents();
      renderFeaturedTalents("featured-talents", talents);
    }
    if (page === "sinnersnight") renderTalentsByDivision("sinners-talents-grid", "SinnersNight");
    if (page === "westsidepeople") renderTalentsByDivision("westside-talents-grid", "WestSidePeople");
    if (page === "talents") filterTalentsByDivision();
    if (page === "talent-detail") renderTalentDetail();
  });

  window.renderTalentCards = renderTalentCards;
  window.renderFeaturedTalents = renderFeaturedTalents;
  window.renderTalentsByDivision = renderTalentsByDivision;
  window.renderTalentDetail = renderTalentDetail;
  window.filterTalentsByDivision = filterTalentsByDivision;
})();



