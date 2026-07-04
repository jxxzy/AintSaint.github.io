(function () {
  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(dateValue) {
    if (!dateValue) return "TBA";
    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime())) return escapeHTML(dateValue);
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  }

  function sortByDateDesc(items, field) {
    return [...items].sort((a, b) => new Date(b[field]) - new Date(a[field]));
  }

  function sortByDateAsc(items, field) {
    return [...items].sort((a, b) => new Date(a[field]) - new Date(b[field]));
  }

  function brandClass(brand) {
    const value = String(brand || "").toLowerCase();
    if (value.includes("sinners")) return "badge--sinners";
    if (value.includes("westside")) return "badge--westside";
    return "badge--hybrid";
  }

  function brandFromSlug(value) {
    const key = String(value || "").toLowerCase();
    if (key === "sinnersnight" || key === "sinners night") return "SinnersNight";
    if (key === "westsidepeople") return "WestSidePeople";
    if (key === "hybrid") return "Hybrid";
    return value || "";
  }

  function genreTags(genres) {
    return (genres || []).map((genre) => `<span>${escapeHTML(genre)}</span>`).join("");
  }

  function badge(value) {
    return `<span class="badge ${brandClass(value)}">${escapeHTML(value)}</span>`;
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function truncate(value, maxLength) {
    const text = String(value || "");
    if (text.length <= maxLength) return text;
    return `${text.slice(0, Math.max(0, maxLength - 1)).trim()}...`;
  }

  function cleanPhone(phone) {
    return String(phone || "").replace(/[^\d]/g, "");
  }

  function toWhatsAppUrl(phone, message) {
    return `https://wa.me/${cleanPhone(phone)}?text=${encodeURIComponent(message)}`;
  }

  function talentNameById(talents, id) {
    const talent = (talents || []).find((item) => item.id === id);
    return talent ? talent.stageName : id;
  }

  function renderEmpty(container, message) {
    const element = typeof container === "string" ? document.getElementById(container) : container;
    if (!element) return;
    element.innerHTML = `<div class="empty-state">${escapeHTML(message)}</div>`;
  }

  function socialLinks(item) {
    const links = [
      ["instagram", "Instagram", "assets/icons/instagram.svg"],
      ["tiktok", "TikTok", "assets/icons/tiktok.svg"],
      ["youtube", "YouTube", "assets/icons/youtube.svg"],
      ["soundcloud", "SoundCloud", "assets/icons/soundcloud.svg"]
    ];
    return links
      .filter(([key]) => item[key])
      .map(([key, label, icon]) => `<a href="${escapeHTML(item[key])}" target="_blank" rel="noopener" aria-label="${escapeHTML(label)} ${escapeHTML(item.stageName || "")}"><img src="${icon}" alt=""></a>`)
      .join("");
  }

  async function shareUrl(url, title) {
    const shareData = { title: title || "AintSaint", url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return "Shared.";
      }
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        return "Link copied.";
      }
    } catch (error) {
      console.warn(error);
    }
    window.prompt("Copy this link:", url);
    return "Copy link manually.";
  }

  window.SWUtils = {
    escapeHTML,
    formatDate,
    sortByDateDesc,
    sortByDateAsc,
    brandClass,
    brandFromSlug,
    genreTags,
    badge,
    getQueryParam,
    truncate,
    cleanPhone,
    toWhatsAppUrl,
    talentNameById,
    renderEmpty,
    socialLinks,
    shareUrl
  };

  window.escapeHTML = escapeHTML;
  window.getQueryParam = getQueryParam;
})();



