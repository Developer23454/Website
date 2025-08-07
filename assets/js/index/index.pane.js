// assets/js/index/index.pane.js

console.log(
  "✔️ This is inside the index.pane.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

function createPane(side) {
  const paneWrapper = document.getElementById("pane-wrapper");

  /** Pane */
  const pane = document.createElement("div");
  pane.id = side + "-pane";
  Object.assign(pane.style, {
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s ease",
    background:
      side === "left" ? "var(--color-secondary)" : "var(--color-third)",
    color: "var(--color-primary)",
  });

  // Content container
  const content = document.createElement("div");
  content.id = side + "-pane-content";
  Object.assign(content.style, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "1rem",
    textAlign: "center",
  });

  // Title
  const title = document.createElement("h1");
  title.id = side + "-pane-title";
  const key = side === "left" ? "leftPanelTitle" : "rightPanelTitle";
  title.setAttribute("data-i18n", key);
  title.textContent = t(key);

  Object.assign(title.style, {
    fontSize: "5.5rem",
    margin: "0 0 1rem",
    transition: "0.3s ease",
  });

  // hover effects
  pane.addEventListener("mouseenter", () => {
    pane.style.filter = "var(--content-hover-brightness)";
    title.style.filter = "var(--text-hover-brightness)";
    title.style.fontSize = "6rem";
  });
  pane.addEventListener("mouseleave", () => {
    pane.style.filter = "";
    title.style.filter = "";
    title.style.fontSize = "5.5rem";
  });

  // assemble
  content.appendChild(title);
  pane.appendChild(content);
  paneWrapper.appendChild(pane);

  console.log(`✔️ ${side} Pane got created!`);
}

// create left + right panes
createPane("left");
createPane("right");
