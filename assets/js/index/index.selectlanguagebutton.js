// assets/js/index/index.selectlanguagebutton.js

console.log(
  "✔️ This is inside the index.selectlanguagebutton.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t, loadLanguage } from "../i18n.js";

function createSelectLanguageButton() {
  const buttonWrapper = document.getElementById("button-wrapper");

  /** Select Language Button */
  const selectLanguage = document.createElement("select");
  selectLanguage.classList.add("theme-text");
  Object.assign(selectLanguage.style, {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
    display: "inline-block",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "var(--color-fourth)",
    cursor: "pointer",
    color: "var(--color-primary)",
  });

  // hover effects
  selectLanguage.addEventListener("mouseenter", () => {
    selectLanguage.style.filter = "var(--content-hover-brightness)";
  });
  selectLanguage.addEventListener("mouseleave", () => {
    selectLanguage.style.filter = "";
  });

  // language options
  ["en", "de"].forEach((code) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = code === "en" ? "English" : "Deutsch";
    selectLanguage.appendChild(opt);
  });

  // change language on select
  selectLanguage.addEventListener("change", (e) => {
    loadLanguage(e.target.value);
  });

  // load default language on first load
  loadLanguage("en");

  buttonWrapper.appendChild(selectLanguage);

  console.log("✔️ Select Language Button got created!");
}

createSelectLanguageButton();
