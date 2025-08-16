// assets/js/index/index.footer.js
console.log(
  "✔️ This is inside the index.footer.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

function createFooter() {
  const mount = document.getElementById("mount");

  /** Footer */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.classList.add("theme-text");

  footer.style.background = "var(--color-primary)";
  footer.style.margin = "0";
  footer.style.flexShrink = "0";

  /** Footer Title */
  const title = document.createElement("h2");
  title.setAttribute("data-i18n", "footerTitle");
  title.textContent = t("footerTitle");

  // remove default heading margins that can cause spacing gaps
  title.style.margin = "0";
  title.style.padding = "0.5rem 0";

  /** Footer Profiles */
  const profiles = document.createElement("div");
  profiles.className = "profiles";

  for (let i = 1; i <= 5; i++) {
    const img = document.createElement("img");
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.borderRadius = "50%";
    img.style.objectFit = "cover";
    img.style.border = "2px solid #fff";
    img.src = "assets/images/components/profilepictures/user.svg";
    img.alt = `Profile ${i}`;
    profiles.appendChild(img);
  }

  footer.appendChild(title);
  footer.appendChild(profiles);
  mount.appendChild(footer);

  console.log("✔️ Footer got created!");
}

createFooter();
