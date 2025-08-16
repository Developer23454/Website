// assets/js/index/index.layout.js

console.log(
  "✔️ Hey ho this is inside the index.layout.js script! Therefore it has loaded!"
);

function runWhenReady(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

// darkModeButton.js
import { t } from "../i18n.js";

const mount = document.getElementById("mount");

function createPaneWrapper() {
  const mount = document.getElementById("mount");
  if (!mount) {
    console.error("mount not found");
    return;
  }

  // Make mount a vertical flex container so footer can sit at the bottom naturally
  mount.style.display = "flex";
  mount.style.flexDirection = "column";
  mount.style.minHeight = "100vh";
  mount.style.margin = "0";
  mount.style.padding = "0";
  mount.style.boxSizing = "border-box";

  let paneWrapper = document.getElementById("pane-wrapper");
  if (!paneWrapper) {
    paneWrapper = document.createElement("div");
    paneWrapper.id = "pane-wrapper";
    mount.appendChild(paneWrapper);
  }

  // Base inline styles that never change
  paneWrapper.style.display = "flex";
  paneWrapper.style.width = "100%";
  /* paneWrapper.style.minHeight = "100vh"; */
  paneWrapper.style.position = "relative"; // give banner an absolute-position reference
  paneWrapper.style.flexWrap = "nowrap"; // avoid unexpected wrapping
  paneWrapper.style.margin = "0";
  paneWrapper.style.padding = "0";
  paneWrapper.style.boxSizing = "border-box";
  paneWrapper.style.alignItems = "stretch";
  paneWrapper.style.gap = "0";
  paneWrapper.style.flex = "1 1 auto";
}

function clearMobileSizing(pane) {
  if (!pane) return;
  pane.style.height = "";
  pane.style.maxHeight = "";
  pane.style.overflow = "";
  pane.style.overflowX = "";
  pane.style.boxSizing = "";
}

/* function applyLayout(info) {
  const wrapper = document.getElementById("pane-wrapper");
  if (!wrapper) return;

  // Decide row/column based on watcher category
  wrapper.style.flexDirection = info.isDesktop ? "row" : "column";

  // Make left/right panes equal size (JS-driven, no CSS)
  const leftPane = document.getElementById("left-pane");
  const rightPane = document.getElementById("right-pane");

  if (leftPane && rightPane) {
     // Ensure wrapper fills the visible viewport height (use innerHeight for mobile reliability)
    //const viewportH =
    //  window.innerHeight || document.documentElement.clientHeight;

   // wrapper.style.minHeight = `${viewportH}px`;
 
    if (info.isDesktop) {
      // --- DESKTOP: restore flex-driven layout (clear mobile forced sizes) ---
      // clear any mobile-specific sizing so flex takes over
      leftPane.style.height = "";
      rightPane.style.minHeight = "";
      leftPane.style.maxHeight = "";
      rightPane.style.maxHeight = "";
      leftPane.style.overflow = "";
      rightPane.style.overflow = "";
      leftPane.style.boxSizing = "";
      rightPane.style.boxSizing = "";

      leftPane.style.flex = "1 1 0";
      rightPane.style.flex = "1 1 0";
      leftPane.style.minWidth = "0";
      rightPane.style.minWidth = "0";
    } else {
      // --- STACKED (mobile/tablet): pin each pane to half the visible viewport height ---
      // const halfPx = Math.floor(viewportH / 2); 

      // Use the wrapper's allocated height so the footer stays below naturally
      const availableH =
        wrapper.clientHeight ||
        window.innerHeight ||
        document.documentElement.clientHeight;
      const halfPx = Math.floor(availableH / 2);

      leftPane.style.flex = "0 0 auto";
      rightPane.style.flex = "0 0 auto";

      leftPane.style.width = "100%";
      rightPane.style.width = "100%";

      // set explicit height and max-height to prevent children from forcing growth
      leftPane.style.height = `${halfPx}px`;
      rightPane.style.height = `${halfPx}px`;
      leftPane.style.maxHeight = `${halfPx}px`;
      rightPane.style.maxHeight = `${halfPx}px`;

      // **NO internal scrollbars**: clip overflowing content so panes keep exact size
      leftPane.style.overflow = "hidden";
      rightPane.style.overflow = "hidden";

      // box-sizing prevents padding/border from expanding the element beyond the measured height
      leftPane.style.boxSizing = "border-box";
      rightPane.style.boxSizing = "border-box";

      // guard against horizontal overflow from children
      leftPane.style.overflowX = "hidden";
      rightPane.style.overflowX = "hidden";

      leftPane.style.minWidth = "0";
      rightPane.style.minWidth = "0";
    }
  }

  // (Optional) expose category so other scripts can read quickly
  wrapper.setAttribute("data-screen-category", info.category);

  // Save the latest screen info globally for other scripts (banner will use it)
  window.__SCREEN_INFO__ = info;

  // If banner registered a reposition helper, call it now
  if (typeof window.__POSITION_BANNER__ === "function") {
    window.__POSITION_BANNER__();
  }
} */

function applyLayout(info) {
  const wrapper = document.getElementById("pane-wrapper");
  if (!wrapper) return;

  // helper: best available viewport height (accounts for mobile address bar)
  function getViewportH() {
    const vv = window.visualViewport;
    if (vv && vv.height) return Math.floor(vv.height);
    return Math.floor(
      window.innerHeight || document.documentElement.clientHeight || 0
    );
  }
  const viewportH = getViewportH();

  // Ensure wrapper behaves as a flex child inside #mount column layout
  wrapper.style.display = "flex";
  wrapper.style.flex = wrapper.style.flex || "1 1 auto";
  wrapper.style.flexDirection = info.isDesktop ? "row" : "column";
  wrapper.style.alignItems = "stretch";
  wrapper.style.boxSizing = "border-box";
  wrapper.style.gap = "0";

  // --- Important: ensure wrapper is at least the viewport tall so footer sits below the fold ---
  wrapper.style.minHeight = viewportH + "px";

  // expose category and save globally
  wrapper.setAttribute("data-screen-category", info.category);
  window.__SCREEN_INFO__ = info;

  const leftPane = document.getElementById("left-pane");
  const rightPane = document.getElementById("right-pane");

  if (leftPane && rightPane) {
    if (info.isDesktop) {
      // DESKTOP: Flex-driven layout — panes share available wrapper height.
      clearMobileSizing(leftPane);
      clearMobileSizing(rightPane);

      leftPane.style.flex = "1 1 0";
      rightPane.style.flex = "1 1 0";

      // allow shrink/grow correctly inside flex container
      leftPane.style.minHeight = "0";
      rightPane.style.minHeight = "0";

      // remove explicit heights (let flexbox do the job)
      leftPane.style.height = "";
      rightPane.style.height = "";

      leftPane.style.overflow = leftPane.style.overflow || "auto";
      rightPane.style.overflow = rightPane.style.overflow || "auto";
      leftPane.style.overflowX = "hidden";
      rightPane.style.overflowX = "hidden";

      leftPane.style.boxSizing = "border-box";
      rightPane.style.boxSizing = "border-box";

      leftPane.style.alignSelf = "stretch";
      rightPane.style.alignSelf = "stretch";
    } else {
      // MOBILE/TABLET: stacked panes, each half the viewport height (so footer is offscreen)
      const halfPx = Math.floor(viewportH / 2);

      leftPane.style.flex = "0 0 auto";
      rightPane.style.flex = "0 0 auto";

      leftPane.style.width = "100%";
      rightPane.style.width = "100%";

      leftPane.style.height = `${halfPx}px`;
      rightPane.style.height = `${halfPx}px`;
      leftPane.style.maxHeight = `${halfPx}px`;
      rightPane.style.maxHeight = `${halfPx}px`;

      leftPane.style.overflow = "hidden";
      rightPane.style.overflow = "hidden";
      leftPane.style.overflowX = "hidden";
      rightPane.style.overflowX = "hidden";

      leftPane.style.boxSizing = "border-box";
      rightPane.style.boxSizing = "border-box";

      leftPane.style.minWidth = "0";
      rightPane.style.minWidth = "0";
    }
  }

  // reposition helper if any
  if (typeof window.__POSITION_BANNER__ === "function") {
    window.__POSITION_BANNER__();
  }
}

createPaneWrapper();

runWhenReady(() => {
  // Use the global (because size.handler.js is loaded in <head> as a normal script)
  if (typeof window.createScreenSizeWatcher !== "function") {
    console.error(
      "createScreenSizeWatcher not found. Is size.handler.js loaded before index scripts?"
    );
    return;
  }

  const watcher = window.createScreenSizeWatcher();

  // 1) Apply layout immediately (initial render)
  const first = watcher.getSize();
  applyLayout(first);

  // 2) Re-apply layout on every watcher change and keep unsubscribe handle
  const unsubscribe = watcher.onChange((info) => {
    applyLayout(info);
  });

  // 3) Also re-run layout on wrapper resize (handles chrome UI / font changes)
  const wrapperEl = document.getElementById("pane-wrapper");
  let ro = null;
  try {
    ro = new ResizeObserver(() => {
      applyLayout(watcher.getSize());
    });
    if (wrapperEl) ro.observe(wrapperEl);
  } catch (e) {
    // ResizeObserver not available — watcher handles typical resize/orientation changes
    ro = null;
  }

  // 4) Cleanup on unload to avoid leaks
  window.addEventListener("beforeunload", () => {
    try {
      if (typeof unsubscribe === "function") unsubscribe();
      if (ro) ro.disconnect();
    } catch (e) {}
  });
});
