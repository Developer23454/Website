// assets/js/index/index.darkmodebutton.js
import { t } from "../i18n.js";

function createDarkModeButton() {
  const wrapper = document.getElementById("button-wrapper");
  if (!wrapper) return;

  const btn = document.createElement("button");
  btn.classList.add("theme-text");
  Object.assign(btn.style, {
    display: "inline-block",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "var(--color-fourth)",
    cursor: "pointer",
    transition: "opacity 0.3s",
  });

  btn.setAttribute("data-i18n", "darkMode");
  btn.textContent = t("darkMode");

  btn.addEventListener("pointerenter", (e) => {
    btn.style.filter = "var(--content-hover-brightness)";
    btn.style.opacity = "0.6";
  });
  btn.addEventListener("pointerleave", (e) => {
    btn.style.filter = "";
    btn.style.opacity = "1";
  });

  let darkMode = false;
  btn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle("dark-mode", darkMode);
    btn.textContent = darkMode ? t("lightMode") : t("darkMode");
  });

  wrapper.appendChild(btn);
  console.log("✔️ Dark Mode Button created!");
}

createDarkModeButton();
