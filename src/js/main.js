(function () {
  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Cookie consent banner (simple localStorage flag — swap for a full CMP if you need
  // stricter GDPR/CCPA compliance)
  var CONSENT_KEY = "patch-consent";
  var banner = document.getElementById("consent-banner");
  var acceptBtn = document.getElementById("consent-accept");
  var declineBtn = document.getElementById("consent-decline");

  function getConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      /* ignore — private browsing etc */
    }
  }

  if (banner && !getConsent()) {
    banner.classList.add("is-visible");
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setConsent("accepted");
      banner.classList.remove("is-visible");
      // Hook your analytics/ads init here if you gate them on consent.
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      setConsent("declined");
      banner.classList.remove("is-visible");
    });
  }
})();
