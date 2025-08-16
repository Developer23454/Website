// assets/js/index/index.searchbar.js

import { t } from "../i18n.js";

const placeholderStyle = document.createElement("style");
placeholderStyle.textContent = `
  .searchbar::placeholder { color: currentColor; opacity: 0.7; }
`;
document.head.appendChild(placeholderStyle);

function createSearchbar(side) {
  const content = document.getElementById(`${side}-pane-content`);
  if (!content) {
    console.error("createSearchbar: pane-content for", side, "not found");
    return;
  }

  const wrapper = document.createElement("div");
  wrapper.className = "searchbar-wrapper";

  wrapper.style.position = "relative";
  wrapper.style.width = "100%";
  wrapper.style.maxWidth = "400px";
  wrapper.style.background = "transparent";
  wrapper.style.transition = "transform 160ms ease";
  wrapper.style.margin = "0 auto";

  const input = document.createElement("input");
  input.classList.add("searchbar");
  input.classList.add("theme-text");
  input.type = "text";

  input.style.minWidth = "0"; // prevent overflow in flexbox
  input.style.width = "clamp(180px, 100%, 10000px)";
  input.style.boxSizing = "border-box";
  input.style.padding =
    "clamp(10px, 2.5vw, 16px) clamp(16px, 3vw, 20px) clamp(10px, 2.5vw, 16px) clamp(40px, 6vw, 48px)";
  input.style.fontSize = "clamp(1.2rem, 2.5vw, 2rem)";
  input.style.border = "1px solid currentColor";
  input.style.borderRadius = "2rem";
  input.style.background = "transparent";
  input.style.transition = "border-color 0.2s ease";

  input.setAttribute("data-i18n", "searchbarPlaceholder");
  input.placeholder = t("searchbarPlaceholder");
  input.addEventListener("focus", () => {
    input.style.outline = "none";
    input.style.boxShadow = "0 0 0 2px var(--color-primary)";
    input.style.borderColor = "var(--text-color)";
  });
  input.addEventListener("blur", () => {
    input.style.boxShadow = "";
  });

  const icon = document.createElement("img");
  icon.src = "assets/images/components/searchbars/search.svg";
  icon.alt = "";
  icon.className = "search-icon";
  icon.setAttribute("aria-hidden", "true");

  icon.style.position = "absolute";
  icon.style.left = "1rem";
  icon.style.top = "50%";
  icon.style.transform = "translateY(-50%)";
  icon.style.width = "clamp(16px, 2vw, 24px)";
  icon.style.height = "auto";
  icon.style.pointerEvents = "none";
  icon.style.opacity = "0.7";

  wrapper.addEventListener("pointerenter", (e) => {
    wrapper.style.transform = "scale(1.08)";
  });
  wrapper.addEventListener("pointerleave", (e) => {
    wrapper.style.transform = "scale(1)";
  });

  wrapper.append(input, icon);
  content.appendChild(wrapper);

  console.log(`✔️ Searchbar created in the ${side} pane`);
}

createSearchbar("left");
createSearchbar("right");

function adjustSearchbarSpacing() {
  const wrappers = document.querySelectorAll(".searchbar-wrapper");
  const isDesktop = window.innerWidth >= 768;
  wrappers.forEach((w) => {
    w.style.margin = isDesktop ? "8px 0" : "12px 0";
  });
}
adjustSearchbarSpacing();
window.addEventListener("resize", adjustSearchbarSpacing, { passive: true });
