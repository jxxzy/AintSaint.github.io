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

  async function prefillBookingForm(form, talents, events) {
    const talentId = SWUtils.getQueryParam("talent");
    const eo = SWUtils.brandFromSlug(SWUtils.getQueryParam("eo") || SWUtils.getQueryParam("brand"));
    const eventId = SWUtils.getQueryParam("event");

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
    const required = ["name", "whatsapp", "eo", "eventType", "eventDate", "eventTime", "location"];
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
    return [
      "Halo AintSaint, saya ingin booking untuk acara:",
      "",
      `Nama: ${field(form, "name").value}`,
      `WhatsApp: ${field(form, "whatsapp").value}`,
      `Email: ${field(form, "email").value}`,
      `EO: ${field(form, "eo").value}`,
      `Talent: ${selectedText(talentSelect)}`,
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
    const [settings, talents, events] = await Promise.all([
      loadSettings(),
      loadJSON("data/talents.json"),
      loadJSON("data/events.json")
    ]);

    await populateTalentSelect(talents);
    await prefillBookingForm(form, talents, events);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      message.classList.remove("is-success");
      const error = validateBookingForm(form);
      if (error) {
        message.textContent = error;
        return;
      }
      const whatsappMessage = generateWhatsAppMessage(form);
      message.textContent = "Opening WhatsApp...";
      message.classList.add("is-success");
      redirectToWhatsApp(settings, whatsappMessage);
    });
  }

  document.addEventListener("DOMContentLoaded", initBooking);

  window.getQueryParam = SWUtils.getQueryParam;
  window.populateTalentSelect = populateTalentSelect;
  window.prefillBookingForm = prefillBookingForm;
  window.validateBookingForm = validateBookingForm;
  window.generateWhatsAppMessage = generateWhatsAppMessage;
  window.redirectToWhatsApp = redirectToWhatsApp;
})();



