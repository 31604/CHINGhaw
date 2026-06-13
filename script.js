/**
 * IndustriaOS — Support Hub
 * Handles: EN/FR i18n, support form validation & submission via EmailJS.
 *
 * ── HOW TO ACTIVATE EMAIL SENDING ──────────────────────────────
 * 1. Go to https://www.emailjs.com and create a FREE account.
 * 2. Add an Email Service (Gmail, Outlook, etc.) → copy the Service ID.
 * 3. Create an Email Template with these variables:
 *      {{from_category}}  {{from_description}}  {{from_email}}
 *    Copy the Template ID.
 * 4. Go to Account → API Keys → copy your Public Key.
 * 5. Paste all three values into the EMAILJS CONFIG block below.
 * ────────────────────────────────────────────────────────────────
 */

/* ── EmailJS Config ── */
const EMAILJS_CONFIG = {
  publicKey:   "cyKq-RtUiURhBfvNH",
  serviceId:   "service_6wrvx6o",
  templateIds: [
    "template_ql1wnbd",   // primary template
    "template_fbuksqr",   // secondary template
  ],
};

/* ──────────────────────────────────────────────────────────────
   TRANSLATION DICTIONARY
   ────────────────────────────────────────────────────────────── */
const i18n = {
  en: {
    "nav.help":         "Help",
    "hero.badge":       "Support Hub",
    "hero.title.line1": "Fast answers.",
    "hero.title.line2": "Live infrastructure insight.",
    "hero.desc":        "Everything you need to keep your industrial IoT network running with confidence. From node configuration to real-time service health — one hub, zero friction.",
    "stats.sensors":    "Sensor Types",
    "stats.arch":       "Node Architecture",
    "stats.protocol":   "Protocol",
    "docs.title":       "Technical Documentation",
    "docs.desc":        "Setup guides, API references, MQTT topic schemas, node configuration, OTA updates, and calibration workflows for ESP32-based monitoring.",
    "docs.link1":       "Quick Start Guide",
    "docs.link2":       "ESP32 Wiring & Firmware",
    "docs.link3":       "MQTT Topic Reference",
    "docs.link4":       "Sensor Calibration Manual",
    "docs.cta":         "View Documentation",
    "report.title":     "Report an Issue",
    "report.desc":      "Sensor anomaly, node offline, or data stream fault? Submit a ticket and our engineering team responds within one business day.",
    "form.category":    "Issue Category",
    "form.select":      "Select a category…",
    "form.opt1":        "Node / ESP32 Offline",
    "form.opt2":        "Sensor Data Anomaly",
    "form.opt3":        "MQTT Broker Fault",
    "form.opt4":        "Alert Not Triggering",
    "form.opt5":        "Other",
    "form.desc":        "Description",
    "form.placeholder": "Describe the fault, affected nodes, or unexpected readings…",
    "form.email":       "Contact Email",
    "form.submit":      "Submit Report",
    "success.title":    "Report received.",
    "success.sub":      "Our team will respond within one business day.",
    "success.reset":    "Submit another",
  },
  fr: {
    "nav.help":         "Aide",
    "hero.badge":       "Centre de Support",
    "hero.title.line1": "Des réponses rapides.",
    "hero.title.line2": "Supervision en temps réel.",
    "hero.desc":        "Tout ce dont vous avez besoin pour maintenir votre réseau IoT industriel opérationnel. Configuration des nœuds, santé des services — un seul hub, zéro friction.",
    "stats.sensors":    "Types de Capteurs",
    "stats.arch":       "Architecture Nœud",
    "stats.protocol":   "Protocole",
    "docs.title":       "Documentation Technique",
    "docs.desc":        "Guides d'installation, références API, schémas MQTT, configuration des nœuds ESP32, mises à jour OTA et procédures de calibration.",
    "docs.link1":       "Guide de Démarrage Rapide",
    "docs.link2":       "Câblage & Firmware ESP32",
    "docs.link3":       "Référence Topics MQTT",
    "docs.link4":       "Manuel de Calibration Capteurs",
    "docs.cta":         "Voir la Documentation",
    "report.title":     "Signaler un Problème",
    "report.desc":      "Anomalie capteur, nœud hors ligne ou défaut de flux de données ? Soumettez un ticket et notre équipe répond sous un jour ouvrable.",
    "form.category":    "Catégorie du Problème",
    "form.select":      "Sélectionnez une catégorie…",
    "form.opt1":        "Nœud / ESP32 Hors Ligne",
    "form.opt2":        "Anomalie de Données Capteur",
    "form.opt3":        "Panne Broker MQTT",
    "form.opt4":        "Alerte Non Déclenchée",
    "form.opt5":        "Autre",
    "form.desc":        "Description",
    "form.placeholder": "Décrivez le problème, les nœuds affectés ou les lectures inattendues…",
    "form.email":       "Email de Contact",
    "form.submit":      "Envoyer le Ticket",
    "success.title":    "Ticket reçu.",
    "success.sub":      "Notre équipe répondra sous un jour ouvrable.",
    "success.reset":    "Soumettre un autre",
  },
};

/* ──────────────────────────────────────────────────────────────
   LANGUAGE TOGGLE
   ────────────────────────────────────────────────────────────── */
let currentLang = localStorage.getItem("lang") || "en";

/**
 * Applies the chosen language across all data-i18n elements.
 * @param {"en"|"fr"} lang
 */
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  const dict = i18n[lang];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.getElementById("btn-lang-en").classList.toggle("lang-active", lang === "en");
  document.getElementById("btn-lang-fr").classList.toggle("lang-active", lang === "fr");
}

/* ──────────────────────────────────────────────────────────────
   SUPPORT FORM — VALIDATION & SUBMISSION
   ────────────────────────────────────────────────────────────── */
const form        = document.getElementById("support-form");
const formSuccess = document.getElementById("form-success");

function markInvalid(el, bad) {
  el.classList.toggle("border-red-500",   bad);
  el.classList.toggle("ring-2",           bad);
  el.classList.toggle("ring-red-500/20",  bad);
}

function validateField(el) {
  const valid = el.checkValidity() && el.value.trim() !== "";
  markInvalid(el, !valid);
  return valid;
}

if (form) {
  const fields = ["f-category", "f-desc", "f-email"].map((id) =>
    document.getElementById(id)
  );

  fields.forEach((el) => {
    const evt = el.tagName === "SELECT" ? "change" : "input";
    el.addEventListener(evt, () => {
      if (el.classList.contains("border-red-500")) validateField(el);
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const allValid = fields.map(validateField).every(Boolean);
    if (!allValid) return;

    const btn = form.querySelector("button[type=submit]");
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `
      <svg class="w-4 h-4 spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="23 4 23 10 17 10"/>
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
      Sending…`;

    try {
      emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });

      const payload = {
        from_category:    fields[0].value,
        from_description: fields[1].value,
        from_email:       fields[2].value,
      };

      await Promise.all(
        EMAILJS_CONFIG.templateIds.map((templateId) =>
          emailjs.send(EMAILJS_CONFIG.serviceId, templateId, payload)
        )
      );

      form.classList.add("hidden");
      formSuccess.classList.add("show");
      lucide.createIcons();

    } catch (err) {
      console.error("[SupportForm] EmailJS error:", err);
      btn.disabled = false;
      btn.innerHTML = originalHTML;

      // Show an inline error message under the button
      let errMsg = form.querySelector(".send-error");
      if (!errMsg) {
        errMsg = document.createElement("p");
        errMsg.className = "send-error text-xs text-red-400 text-center mt-2";
        btn.parentNode.insertBefore(errMsg, btn.nextSibling);
      }
      errMsg.textContent = "Failed to send. Please check your connection and try again.";
    }
  });
}

function resetForm() {
  if (!form) return;
  form.reset();
  form.querySelectorAll(".border-red-500").forEach((el) => markInvalid(el, false));
  const errMsg = form.querySelector(".send-error");
  if (errMsg) errMsg.remove();
  form.classList.remove("hidden");
  formSuccess.classList.remove("show");

  const btn = form.querySelector("button[type=submit]");
  btn.disabled = false;
  btn.innerHTML = `<span>${i18n[currentLang]["form.submit"]}</span>
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>`;
}

/* ── Init ── */
document.addEventListener("DOMContentLoaded", () => setLang(currentLang));
