// i18n.js

let messages = {}; // this holds your current language strings

export async function loadLanguage(langCode) {
  const res = await fetch(`Website/assets/messages/strings.${langCode}.json`);
  messages = await res.json();
  updateAllTexts(); // optional: auto-update text in DOM
}

// Update all elements with [data-i18n]
function updateAllTexts() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (messages[key]) {
      el.textContent = messages[key];
    }
    if (el.placeholder !== undefined) {
      el.placeholder = messages[key];
    }
  });
}

// Exported function for use in other scripts
export function t(key) {
  return messages[key] || key; // fallback to key if missing
}



