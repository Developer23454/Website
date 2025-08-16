// assets/js/index/index.settingsbutton.js
import { t } from "../i18n.js";

function createSettingsButton() {
  const paneWrapper = document.getElementById("pane-wrapper");
  if (!paneWrapper) return;

  const settingsButton = document.createElement("div");
  settingsButton.className = "settings-button";
  Object.assign(settingsButton.style, {
    position: "fixed",
    top: "16px",
    left: "16px",
    zIndex: "9999",
  });

  /*  const icon = document.createElement("img");
  icon.src = "assets/images/components/buttons/settings.svg";
  icon.alt = t("settings");
  icon.style.width = "50px";
  icon.style.height = "50px";
  icon.style.cursor = "pointer";
  icon.style.transition = "transform 0.5s ease-in-out";
 */

  const icon = document.createElement("span");
  icon.className = "settings-icon-mask";
  Object.assign(icon.style, {
    display: "inline-block",
    width: "50px",
    height: "50px",
    cursor: "pointer",
    transition: "transform 0.5s ease-in-out",
    backgroundColor: "var(--text-color)", // the color we want
    WebkitMaskImage: "url('assets/images/components/buttons/settings.svg')",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
    maskImage: "url('assets/images/components/buttons/settings.svg')",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
  });
  icon.setAttribute("role", "img");
  icon.setAttribute("aria-label", t("settings"));

  const dropdown = document.createElement("div");
  Object.assign(dropdown.style, {
    position: "absolute",
    top: "60px",
    left: "0",
    padding: "8px 0",
    boxShadow: "0 4px 8px var(--color-fifth)",
    display: "none",
    zIndex: "10000",
    backgroundColor: "var(--color-third)",
    borderRadius: "20px",
    overflow: "hidden",
  });

  const links = [
    { href: "settings/index.html", key: "settings" },
    { href: "account/index.html", key: "account" },
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.classList.add("theme-text");
    a.href = link.href;
    a.setAttribute("data-i18n", link.key);
    a.textContent = t(link.key);
    Object.assign(a.style, {
      display: "block",
      padding: "8px 16px",
      textDecoration: "none",
    });
    dropdown.appendChild(a);
  });

  let hideTimer;
  settingsButton.addEventListener("pointerenter", (e) => {
    clearTimeout(hideTimer);
    dropdown.style.display = "block";
    icon.style.transform = "scale(1) rotate(40deg)";
  });
  settingsButton.addEventListener("pointerleave", (e) => {
    hideTimer = setTimeout(() => {
      dropdown.style.display = "none";
      icon.style.transform = "none";
    }, 300);
  });

  settingsButton.append(icon, dropdown);
  paneWrapper.appendChild(settingsButton);

  console.log("✔️ Settings Button created!");
}

createSettingsButton();
