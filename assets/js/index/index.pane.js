// assets/js/index/index.pane.js

import { t } from "../i18n.js";

function createPane(side) {
  const paneWrapper = document.getElementById("pane-wrapper");
  if (!paneWrapper) {
    console.error("createPane: pane-wrapper not found");
    return;
  }

  const pane = document.createElement("a");
  pane.id = side + "-pane";
  pane.classList.add("pane");

  pane.href = side === "right" ? "share/index.html" : "borrow/index.html";

  pane.style.display = "flex";
  pane.style.flexDirection = "column";
  pane.style.alignItems = "center";
  pane.style.justifyContent = "center";
  pane.style.boxSizing = "border-box";
  pane.style.padding = "12px 16px";
  pane.style.gap = "12px";
  pane.style.textDecoration = "none"; // keep it looking like your pane

  pane.style.cursor = "pointer";
  pane.style.transition = "filter 0.25s ease";
  pane.style.background =
    side === "left" ? "var(--color-secondary)" : "var(--color-third)";
  pane.style.color = "var(--color-primary)";

  pane.style.minWidth = "0";
  pane.style.minHeight = "0";

  const content = document.createElement("div");
  content.id = side + "-pane-content";
  content.classList.add("pane-content");
  content.classList.add("theme-text");

  content.style.position = "relative";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.alignItems = "center"; // center horizontally
  content.style.justifyContent = "center"; // center vertically
  content.style.gap = "1.5rem"; // space between title & searchbar
  content.style.flex = "1 1 auto"; // allows content to grow/shrink
  content.style.width = "100%"; // fill pane width
  content.style.maxWidth = "1000px"; // optional: prevent excessive stretch
  content.style.height = "100%"; // fill vertical space
  content.style.boxSizing = "border-box";
  content.style.overflow = "hidden";

  const title = document.createElement("h1");
  title.id = side + "-pane-title";
  title.classList.add("pane-title");
  const key = side === "left" ? "leftPanelTitle" : "rightPanelTitle";
  title.setAttribute("data-i18n", key);
  title.textContent = t(key);

  title.style.position = "relative";

  title.style.margin = "0";
  title.style.lineHeight = "1.2";
  title.style.fontSize = "clamp(2rem, 5vw, 4rem)";
  title.style.textAlign = "center";
  title.style.fontWeight = "600";
  title.style.textAlign = "center";
  title.style.letterSpacing = "0.2px";
  title.style.whiteSpace = "normal";
  title.style.textOverflow = "clip";
  title.style.overflow = "hidden";
  title.style.userSelect = "none";

  pane.setAttribute("role", "region");
  pane.setAttribute("aria-labelledby", title.id);

  pane.addEventListener("pointerenter", (e) => {
    pane.style.filter = "var(--content-hover-brightness)";
    title.style.filter = "var(--text-hover-brightness)";
    title.style.transform = "scale(1.08)";
  });
  pane.addEventListener("pointerleave", (e) => {
    pane.style.filter = "";
    title.style.filter = "";
    title.style.transform = "scale(1)";
  });
  pane.addEventListener("touchstart", () => {
    pane.style.opacity = "0.98";
    setTimeout(() => (pane.style.opacity = ""), 120);
  });

  pane.addEventListener("click", () => {
    pane.style.boxShadow =
      "inset 0 10px 20px rgba(0,0,0,0.18), inset 0 -6px 12px rgba(255,255,255,0.15)";
  });

  // clear all pane shadows when the page is shown/returned to
  window.addEventListener("pageshow", () => {
    document
      .querySelectorAll(".pane")
      .forEach((p) => (p.style.boxShadow = "none"));
  });

  content.appendChild(title);
  pane.appendChild(content);
  paneWrapper.appendChild(pane);

  console.log(`✔️ ${side} Pane created!`);
}

createPane("left");
createPane("right");
