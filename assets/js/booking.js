(function () {
  function field(form, name) {
    return form.elements[name];
  }

  async function populateTalentSelect(talents) {
    const select = document.getElementById("booking-talent");
    if (!select) return;
    talents.forEach((talent) => {
      const option = document.createElement("option");
      option.value = talent.id;
      option.textContent = `${talent.stageName} - ${talent.division}`;
      select.append(option);
    });
  }

  async function populateServiceSelect(services) {
    const select = document.getElementById("booking-service");
    if (!select) return;
    services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service.id;
      option.textContent = service.title;
      select.append(option);
    });
  }

  async function prefillBookingForm(form, talents, events, services) {
    const talentId = SWUtils.getQueryParam("talent");
    const eo = SWUtils.brandFromSlug(SWUtils.getQueryParam("eo") || SWUtils.getQueryParam("brand"));
    const eventId = SWUtils.getQueryParam("event");
    const serviceId = SWUtils.getQueryParam("service");

    if (eo && field(form, "eo")) {
      field(form, "eo").value = eo;
    }

    if (talentId && field(form, "talent")) {
      const talent = talents.find((item) => item.id === talentId);
      if (talent) {
        field(form, "talent").value = talent.id;
        field(form, "eo").value = talent.division === "Hybrid" ? "Hybrid" : talent.division;
      }
    }

    if (serviceId && field(form, "service")) {
      const service = services.find((item) => item.id === serviceId);
      if (service) {
        field(form, "service").value = service.id;
        if (!field(form, "notes").value) {
          field(form, "notes").value = `Service reference: ${service.title} (${service.id})`;
        }
      }
    }

    if (eventId) {
      const event = events.find((item) => item.id === eventId);
      const reference = document.getElementById("booking-event-reference");
      if (event && reference) {
        reference.value = `${event.title} (${event.id})`;
        field(form, "eo").value = event.eoOwner;
        field(form, "eventType").value = event.eoOwner === "SinnersNight" ? "Club" : "Community event";
        if (!field(form, "notes").value) {
          field(form, "notes").value = `Event reference: ${event.title} (${event.id})`;
        }
      } else if (reference) {
        reference.value = eventId;
      }
    }
  }

  function validateBookingForm(form) {
    const required = ["name", "whatsapp", "email", "eo", "eventType", "eventDate", "eventTime", "location"];
    const invalid = required.find((name) => !String(field(form, name).value || "").trim());
    if (invalid) {
      field(form, invalid).focus();
      return `Please fill: ${field(form, invalid).previousElementSibling.textContent.replace("*", "").trim()}.`;
    }
    return "";
  }

  function selectedText(select) {
    return select.options[select.selectedIndex]?.textContent || select.value;
  }

  function generateWhatsAppMessage(form) {
    const talentSelect = field(form, "talent");
    const serviceSelect = field(form, "service");
    return [
      "Halo AintSaint, saya ingin booking untuk acara:",
      "",
      `Nama: ${field(form, "name").value}`,
      `WhatsApp: ${field(form, "whatsapp").value}`,
      `Email: ${field(form, "email").value}`,
      `EO: ${field(form, "eo").value}`,
      `Talent: ${selectedText(talentSelect)}`,
      `Service: ${selectedText(serviceSelect)}`,
      `Jenis acara: ${field(form, "eventType").value}`,
      `Tanggal: ${field(form, "eventDate").value}`,
      `Jam: ${field(form, "eventTime").value}`,
      `Lokasi: ${field(form, "location").value}`,
      `Durasi: ${field(form, "duration").value}`,
      `Budget: ${field(form, "budget").value}`,
      `Request genre: ${field(form, "genreRequest").value}`,
      `Sound system: ${field(form, "soundSystem").value}`,
      `Catatan: ${field(form, "notes").value}`
    ].join("\n");
  }

  function redirectToWhatsApp(settings, message) {
    window.location.href = SWUtils.toWhatsAppUrl(settings.whatsapp, message);
  }

  async function initBooking() {
    const form = document.getElementById("booking-form");
    if (!form) return;
    const message = document.getElementById("booking-message");
    const preview = document.getElementById("booking-preview");
    const copyButton = document.getElementById("copy-booking-message");
    const openLink = document.getElementById("open-whatsapp-link");
    const [settings, talents, events, services] = await Promise.all([
      loadSettings(),
      loadJSON("data/talents.json"),
      loadJSON("data/events.json"),
      loadJSON("data/services.json")
    ]);

    await populateTalentSelect(talents);
    await populateServiceSelect(services);
    await prefillBookingForm(form, talents, events, services);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.classList.remove("is-success");
      const error = validateBookingForm(form);
      if (error) {
        message.textContent = error;
        return;
      }
      const whatsappMessage = generateWhatsAppMessage(form);
      const whatsappUrl = SWUtils.toWhatsAppUrl(settings.whatsapp, whatsappMessage);
      if (preview) preview.value = whatsappMessage;
      if (copyButton) copyButton.disabled = false;
      if (openLink) {
        openLink.href = whatsappUrl;
        openLink.target = "_blank";
        openLink.rel = "noopener";
        openLink.classList.remove("is-disabled");
        openLink.removeAttribute("aria-disabled");
      }
      message.textContent = "Message ready. Copy it or open WhatsApp to send.";
      message.classList.add("is-success");
    });

    copyButton?.addEventListener("click", async () => {
      if (!preview?.value) return;
      try {
        await navigator.clipboard.writeText(preview.value);
        message.textContent = "Booking message copied.";
        message.classList.add("is-success");
      } catch (error) {
        console.warn(error);
        preview.focus();
        preview.select();
        message.textContent = "Copy manually from the preview field.";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initBooking);

  window.getQueryParam = SWUtils.getQueryParam;
  window.populateTalentSelect = populateTalentSelect;
  window.populateServiceSelect = populateServiceSelect;
  window.prefillBookingForm = prefillBookingForm;
  window.validateBookingForm = validateBookingForm;
  window.generateWhatsAppMessage = generateWhatsAppMessage;
  window.redirectToWhatsApp = redirectToWhatsApp;
})();



