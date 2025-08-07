// assets/js/index/index.layout.js

console.log(
  "✔️ Hey ho this is inside the index.layout.js script! Therefore is has loaded!"
);

// darkModeButton.js
import { t } from "../i18n.js";

const mount = document.getElementById("mount");

function createPaneWrapper() {
  /** Wrapper for the panes to go into */
  const paneWrapper = document.createElement("div");
  paneWrapper.id = "pane-wrapper";
  Object.assign(paneWrapper.style, {
    display: "flex",
    width: "100vw",
    height: "100vh",
    margin: "0",
    padding: "0",
    overflow: "hidden",
  });

  mount.appendChild(paneWrapper);

  console.log("✔️ Pane Wrapper got created!");
}

createPaneWrapper();
