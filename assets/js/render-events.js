(function () {
  async function eventContext() {
    const [events, talents] = await Promise.all([loadJSON("data/events.json"), loadJSON("data/talents.json")]);
    return { events, talents };
  }

  function eventCard(event, talents) {
    const lineup = (event.lineup || []).map((id) => SWUtils.talentNameById(talents, id)).join(", ");
    return `
      <article class="event-card reveal">
        <img class="event-card__poster" src="${SWUtils.escapeHTML(event.poster)}" alt="${SWUtils.escapeHTML(event.title)} poster">
        <div class="event-card__body">
          <div class="event-card__topline">
            <span>${SWUtils.escapeHTML(event.status)}</span>
            <span>${SWUtils.formatDate(event.date)}</span>
          </div>
          <div class="event-card__meta">${SWUtils.badge(event.eoOwner)}</div>
          <h3>${SWUtils.escapeHTML(event.title)}</h3>
          <p>${SWUtils.escapeHTML(event.venue)} - ${SWUtils.escapeHTML(event.city)} at ${SWUtils.escapeHTML(event.time)}</p>
          <p>${SWUtils.escapeHTML(lineup)}</p>
          <p>${SWUtils.escapeHTML(event.genreDirection)}</p>
          <div class="event-card__actions">
            <button class="btn btn-ghost" type="button" data-event-detail="${SWUtils.escapeHTML(event.id)}">Detail</button>
            <a class="btn btn-primary" href="booking.html?event=${SWUtils.escapeHTML(event.id)}">Booking / Collab</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderEventCards(containerId, events, talents) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (!events || events.length === 0) {
      SWUtils.renderEmpty(container, "No event found.");
      return;
    }
    container.innerHTML = events.map((event) => eventCard(event, talents || [])).join("");
    requestAnimationFrame(() => container.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible")));
  }

  async function renderUpcomingEvents(containerId) {
    const { events, talents } = await eventContext();
    const upcoming = SWUtils.sortByDateAsc(events.filter((event) => event.status === "Upcoming"), "date");
    renderEventCards(containerId, upcoming, talents);
    initEventModal(events, talents);
  }

  async function renderPastEvents(containerId) {
    const { events, talents } = await eventContext();
    const past = SWUtils.sortByDateDesc(events.filter((event) => event.status === "Past"), "date");
    renderEventCards(containerId, past, talents);
    initEventModal(events, talents);
  }

  async function renderHomeEvents() {
    const { events, talents } = await eventContext();
    const upcoming = SWUtils.sortByDateAsc(events.filter((event) => event.status === "Upcoming"), "date").slice(0, 2);
    const past = SWUtils.sortByDateDesc(events.filter((event) => event.status === "Past"), "date").slice(0, 1);
    renderEventCards("home-events", [...upcoming, ...past], talents);
  }

  async function renderFeaturedEventByEO(containerId, eoOwner) {
    const { events, talents } = await eventContext();
    const filtered = SWUtils.sortByDateAsc(
      events.filter((event) => event.status === "Upcoming" && (event.eoOwner === eoOwner || event.eoOwner === "Hybrid")),
      "date"
    );
    renderEventCards(containerId, filtered.slice(0, 1), talents);
    initEventModal(events, talents);
  }

  function modalHTML(event, talents) {
    const lineup = (event.lineup || []).map((id) => SWUtils.talentNameById(talents, id)).join(", ");
    return `
      <img class="event-card__poster" src="${SWUtils.escapeHTML(event.poster)}" alt="${SWUtils.escapeHTML(event.title)} poster">
      <div class="event-card__body">
        <div class="event-card__meta">${SWUtils.badge(event.eoOwner)}<span class="badge">${SWUtils.escapeHTML(event.status)}</span></div>
        <h2 id="event-modal-title">${SWUtils.escapeHTML(event.title)}</h2>
        <p>${SWUtils.escapeHTML(event.description)}</p>
        <ul class="check-list">
          <li>Venue: ${SWUtils.escapeHTML(event.venue)}, ${SWUtils.escapeHTML(event.city)}</li>
          <li>Date: ${SWUtils.formatDate(event.date)} at ${SWUtils.escapeHTML(event.time)}</li>
          <li>Lineup: ${SWUtils.escapeHTML(lineup)}</li>
          <li>Genre direction: ${SWUtils.escapeHTML(event.genreDirection)}</li>
        </ul>
        <div class="event-card__actions"><a class="btn btn-primary" href="booking.html?event=${SWUtils.escapeHTML(event.id)}">Booking / Collab</a></div>
      </div>
    `;
  }

  function initEventModal(events, talents) {
    const modal = document.getElementById("event-modal");
    const content = document.getElementById("event-modal-content");
    if (!modal || !content || modal.dataset.ready === "true") return;
    modal.dataset.ready = "true";

    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-event-detail]");
      if (!button) return;
      const item = events.find((entry) => entry.id === button.dataset.eventDetail);
      if (!item) return;
      content.innerHTML = modalHTML(item, talents);
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-close-modal]")) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "home") renderHomeEvents();
    if (page === "sinnersnight") renderFeaturedEventByEO("sinners-featured-event", "SinnersNight");
    if (page === "westsidepeople") renderFeaturedEventByEO("westside-featured-event", "WestSidePeople");
    if (page === "events") {
      renderUpcomingEvents("upcoming-events");
      renderPastEvents("past-events");
    }
  });

  window.renderUpcomingEvents = renderUpcomingEvents;
  window.renderPastEvents = renderPastEvents;
  window.renderFeaturedEventByEO = renderFeaturedEventByEO;
  window.renderEventCards = renderEventCards;
})();



