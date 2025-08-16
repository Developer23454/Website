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

  // REPLACE WITH (mask-based icon painted by --text-color)
  const icon = document.createElement("span");
  icon.className = "search-icon";
  icon.setAttribute("aria-hidden", "true");

  Object.assign(icon.style, {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "clamp(16px, 2vw, 24px)",
    height: "clamp(16px, 2vw, 24px)",
    display: "block",
    pointerEvents: "none",
    opacity: "0.7",
    // color source for the mask:
    backgroundColor: "var(--text-color)",
    // use the SVG as a mask (alpha channel of the SVG controls visibility)
    WebkitMaskImage: "url('assets/images/components/searchbars/search.svg')",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
    maskImage: "url('assets/images/components/searchbars/search.svg')",
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    // fallback: keep background-size & position consistent
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "contain",
  });

  // prevent pane <a> link from triggering when interacting with the searchbar
  // allow default on pointer/touch down so the input can be focused by the browser,
  // but stop propagation so the parent <a> doesn't see the event.
  ["pointerdown", "touchstart"].forEach((evt) => {
    input.addEventListener(evt, (e) => {
      e.stopPropagation();
      // DO NOT call preventDefault() here — that prevents focus on some browsers/devices
    });
  });

  // intercept click to stop navigation, then focus the input explicitly
  input.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault(); // stops the anchor from navigating
    // ensure the input is focused so the user can type immediately
    input.focus();
  });

  // prevent Enter from bubbling to the parent anchor (so pressing Enter won't trigger navigation)
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.stopPropagation();
      // optional: e.preventDefault(); // uncomment if you don't want any default form behavior
      // trigger search handling here if needed
    }
  });

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
