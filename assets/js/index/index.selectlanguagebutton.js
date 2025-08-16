// assets/js/index/index.selectlanguagebutton.js

import { t, loadLanguage } from "../i18n.js";

function createSelectLanguageButton() {
  const wrapper = document.getElementById("button-wrapper");
  if (!wrapper) return;

  const select = document.createElement("select");
  select.classList.add("theme-text");
  Object.assign(select.style, {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    cursor: "pointer",
    display: "inline-block",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "var(--color-fourth)",
  });

  select.addEventListener("pointerenter", (e) => {
    select.style.filter = "var(--content-hover-brightness)";
    select.style.opacity = "0.6";
  });
  select.addEventListener("pointerleave", (e) => {
    select.style.filter = "";
    select.style.opacity = "1";
  });

  ["en", "de"].forEach((code) => {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = code === "en" ? "English" : "Deutsch";
    select.appendChild(opt);
  });

  select.addEventListener("change", (e) => loadLanguage(e.target.value));
  loadLanguage("en");

  wrapper.appendChild(select);
  console.log("✔️ Select Language Button created!");
}

createSelectLanguageButton();
