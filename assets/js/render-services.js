(function () {
  function serviceCard(service) {
    return `
      <article class="service-card reveal">
        <h3>${SWUtils.escapeHTML(service.title)}</h3>
        <p>${SWUtils.escapeHTML(service.description)}</p>
        <div class="tag-cloud">${SWUtils.genreTags(service.bestFor)}</div>
        <div class="talent-card__actions">
          <a class="btn btn-ghost" href="booking.html?service=${SWUtils.escapeHTML(service.id)}">Book service</a>
        </div>
      </article>
    `;
  }

  function renderServicesGrid(containerId, services) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = services.map(serviceCard).join("");
    requestAnimationFrame(() => container.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible")));
  }

  async function initServices() {
    const services = await loadJSON("data/services.json");
    if (document.body.dataset.page === "home") {
      renderServicesGrid("home-services", services.slice(0, 4));
    }
    if (document.body.dataset.page === "services") {
      renderServicesGrid("services-grid", services);
    }
  }

  document.addEventListener("DOMContentLoaded", initServices);
  window.renderServicesGrid = renderServicesGrid;
})();



