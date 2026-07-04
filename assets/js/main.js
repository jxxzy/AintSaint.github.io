(function () {
  const navItems = [
    ["index.html", "Home"],
    ["about.html", "About AintSaint"],
    ["sinnersnight.html", "SinnersNight"],
    ["westsidepeople.html", "WestSidePeople"],
    ["talents.html", "Talents"],
    ["mixes.html", "Music / Mixes"],
    ["events.html", "Events"],
    ["media.html", "Media"],
    ["booking.html", "Booking"],
    ["contact.html", "Contact"]
  ];

  function currentPageFile() {
    const file = window.location.pathname.split("/").pop();
    return file || "index.html";
  }

  function navMarkup(className) {
    const current = currentPageFile();
    return navItems
      .map(([href, label]) => {
        const active = current === href || (current === "" && href === "index.html") ? " is-active" : "";
        return `<a class="${active.trim()}" href="${href}">${label}</a>`;
      })
      .join("");
  }

  function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    mount.innerHTML = `
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="index.html" aria-label="AintSaint home">
            <img src="assets/img/logos/aintsaint-logo.png" alt="AintSaint logo">
            <span>AintSaint</span>
          </a>
          <nav class="navbar" aria-label="Primary navigation">
            ${navMarkup("navbar")}
          </nav>
          <a class="btn btn-primary" href="booking.html">Book Event</a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="mobile-menu" id="mobile-menu">
          <div class="container mobile-menu__inner">
            ${navMarkup("mobile-menu")}
            <a href="booking.html">Book Event</a>
          </div>
        </div>
      </header>
    `;
  }

  function renderFooter(settings) {
    const mount = document.getElementById("site-footer");
    if (!mount) return;
    mount.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="site-footer__grid">
            <div class="site-footer__brand">
              <img src="assets/img/logos/aintsaint-logo.png" alt="AintSaint logo">
              <h2>${SWUtils.escapeHTML(settings.brandName)}</h2>
              <p>${SWUtils.escapeHTML(settings.tagline)}</p>
              <p>AintSaint adalah media platform, event hub, talent showcase, dan booking gateway untuk dua EO: SinnersNight dan WestSidePeople.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                <li><a href="sinnersnight.html">SinnersNight</a></li>
                <li><a href="westsidepeople.html">WestSidePeople</a></li>
                <li><a href="talents.html">Talents</a></li>
                <li><a href="mixes.html">Music / Mixes</a></li>
                <li><a href="media.html">Media</a></li>
              </ul>
            </div>
            <div>
              <h3>Business</h3>
              <ul>
                <li><a href="events.html">Events</a></li>
                <li><a href="booking.html">Booking</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li><a href="${SWUtils.toWhatsAppUrl(settings.whatsapp, "Halo AintSaint, saya ingin bertanya tentang booking.")}">WhatsApp</a></li>
                <li><a href="mailto:${SWUtils.escapeHTML(settings.email)}">${SWUtils.escapeHTML(settings.email)}</a></li>
                <li>${SWUtils.escapeHTML(settings.address)}</li>
              </ul>
            </div>
          </div>
          <div class="site-footer__bottom">
            <span>Copyright <span data-year></span> AintSaint. All rights reserved.</span>
            <span>Static HTML/CSS/JS. GitHub Pages ready.</span>
          </div>
        </div>
      </footer>
    `;
    setYear();
  }

  function initMobileMenu() {
    const toggle = document.querySelector(".nav-toggle");
    const menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      document.body.classList.toggle("menu-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((element) => {
      element.textContent = new Date().getFullYear();
    });
  }

  function applySettings(settings) {
    const whatsappMessage = "Halo AintSaint, saya ingin bertanya tentang booking.";
    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      link.href = SWUtils.toWhatsAppUrl(settings.whatsapp, whatsappMessage);
      link.target = "_blank";
      link.rel = "noopener";
    });

    document.querySelectorAll("[data-setting-email]").forEach((link) => {
      link.href = `mailto:${settings.email}`;
      if (link.tagName === "A" && link.children.length === 0 && link.textContent.includes("@")) {
        link.textContent = settings.email;
      }
    });

    const socialMap = [
      ["data-setting-instagram-aintsaint", settings.instagramAintSaint],
      ["data-setting-instagram-sinners", settings.instagramSinnersNight],
      ["data-setting-instagram-westside", settings.instagramWestSidePeople],
      ["data-setting-tiktok", settings.tiktok],
      ["data-setting-youtube", settings.youtube],
      ["data-setting-soundcloud", settings.soundcloud]
    ];
    socialMap.forEach(([attr, url]) => {
      document.querySelectorAll(`[${attr}]`).forEach((link) => {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener";
      });
    });
  }

  function initReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    elements.forEach((element) => observer.observe(element));
  }

  async function initShell() {
    renderHeader();
    initMobileMenu();
    setYear();
    initReveal();
    const settings = await loadSettings();
    applySettings(settings);
    renderFooter(settings);
  }

  document.addEventListener("DOMContentLoaded", initShell);
})();



