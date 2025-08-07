// assets/js/index/index.settingsbutton.js

console.log(
  "✔️ This is inside the index.settingsbutton.js! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

function createSettingsButton() {
  const paneWrapper = document.getElementById("pane-wrapper");

  /** Settings Button */
  const settingsButton = document.createElement("div");
  Object.assign(settingsButton.style, {
    position: "fixed",
    top: "16px",
    left: "16px",
    display: "inline-block",
    zIndex: "9999",
  });

  /** Settings Icon */
  const settingsIcon = document.createElement("img");
  settingsIcon.src = "../public/assets/images/components/buttons/settings.svg";
  settingsIcon.setAttribute("data-i18n", "settings");
  settingsIcon.alt = t("settings");
  Object.assign(settingsIcon.style, {
    width: "50px",
    height: "50px",
    cursor: "pointer",
    transition: "transform 0.5s ease-in-out",
  });

  // Create dropdown container
  const dropdown = document.createElement("div");
  dropdown.classList.add("theme-text");
  Object.assign(dropdown.style, {
    position: "absolute",
    top: "60px", // a little below the icon (icon is 50px high + 10px margin)
    left: "0px",
    padding: "8px 0",
    boxShadow: "0 4px 8px var(--color-fifth)",
    display: "none",
    zIndex: "10000",
    display: "none",
    textDecoration: "none",
    backgroundColor: "var(--color-third)",
    //round & clip children
    borderRadius: "20px",
    overflow: "hidden",
  });

  /** Settings Link */
  const settingsLink = document.createElement("a");
  settingsLink.classList.add("theme-text");
  settingsLink.href = "../public/settings/index.html";
  settingsLink.setAttribute("data-i18n", "settings");
  settingsLink.textContent = t("settings");
  Object.assign(settingsLink.style, {
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
  });

  /** Account Link */
  const accountLink = document.createElement("a");
  accountLink.classList.add("theme-text");
  accountLink.href = "../public/account/index.html";
  accountLink.setAttribute("data-i18n", "account");
  accountLink.textContent = t("account");
  Object.assign(accountLink.style, {
    display: "block",
    padding: "8px 16px",
    textDecoration: "none",
  });

  const links = [settingsLink, accountLink];

  // hover effects
  let hideTimer;
  function showMenu() {
    clearTimeout(hideTimer);
    dropdown.style.display = "block";
    settingsIcon.style.transform = "scale(1) rotate(40deg)";
  }
  function hideMenu() {
    hideTimer = setTimeout(() => {
      dropdown.style.display = "none";
      settingsIcon.style.transform = "none";
    }, 300); // <-- delay in ms before hiding
  }
  settingsButton.addEventListener("mouseenter", showMenu);
  settingsButton.addEventListener("mouseleave", hideMenu);

  // append links to dropdown
  dropdown.appendChild(settingsLink);
  dropdown.appendChild(accountLink);

  settingsButton.appendChild(settingsIcon);
  settingsButton.appendChild(dropdown);
  paneWrapper.appendChild(settingsButton);

  console.log("✔️ Settings Button got created!");
}

createSettingsButton();
