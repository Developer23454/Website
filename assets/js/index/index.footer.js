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
    const avatar = document.createElement("span");

    // accessible name (replaces img.alt)
    avatar.setAttribute("role", "img");
    avatar.setAttribute("aria-label", `Profile ${i}`);

    // inline styles (keeps your style pattern)
    Object.assign(avatar.style, {
      display: "inline-block",
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      boxSizing: "border-box",
      // color source for the mask — this is the variable you asked for:
      backgroundColor: "var(--text-color)",
      // white border like your original img had
      border: "2px solid #fff",
      // ensure the mask is centered and scaled
      WebkitMaskImage:
        "url('assets/images/components/profilepictures/user.svg')",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      WebkitMaskSize: "contain",
      maskImage: "url('assets/images/components/profilepictures/user.svg')",
      maskRepeat: "no-repeat",
      maskPosition: "center",
      maskSize: "contain",
      // keep pointer semantics consistent if these will be clickable later
      cursor: "default",
      // optional: preserve a little fallback background in case mask isn't supported
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "contain",
      // small accessibility / layout tweak
      overflow: "hidden",
    });

    profiles.appendChild(avatar);
  }

  footer.appendChild(title);
  footer.appendChild(profiles);
  mount.appendChild(footer);

  console.log("✔️ Footer got created!");
}

createFooter();
