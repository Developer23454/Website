// assets/js/index/index.buttonwrapper.js
export function createButtonWrapper(minGap = 16) {
  let wrapper = document.getElementById("button-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "button-wrapper";
    wrapper.style.setProperty("--button-gap", `${minGap}px`);

    // prefer to attach inside pane-wrapper so absolute placement aligns with banner
    const prefer = document.getElementById("pane-wrapper");
    const mount = document.getElementById("mount") || document.body;

    // base inline styles (small, safe defaults; override with CSS if you want)
    wrapper.style.display = "flex";
    wrapper.style.gap = "var(--button-gap)";
    wrapper.style.alignItems = "center";
    wrapper.style.padding = "6px";
    wrapper.style.borderRadius = "8px";
    wrapper.style.pointerEvents = "auto";
    wrapper.style.zIndex = "1200";
    wrapper.style.transition =
      "transform 160ms ease, opacity 160ms ease, right 160ms ease, left 160ms ease, bottom 160ms ease";
    wrapper.style.touchAction = "manipulation";

    (prefer || mount).appendChild(wrapper);

    console.log("✔️ Button Wrapper created!");
  } else {
    wrapper.style.setProperty("--button-gap", `${minGap}px`);
  }

  // --- responsive placement and watcher wiring ---
  function applyPlacement(info) {
    // always treat as desktop (upper right)
    wrapper.style.position = "absolute";
    wrapper.style.top = "12px";
    wrapper.style.right = "12px";
    wrapper.style.left = "";
    wrapper.style.bottom = "";
    wrapper.style.transform = "none";
    wrapper.style.justifyContent = "flex-end";

    // always use the larger gap
    wrapper.style.setProperty(
      "--button-gap",
      `${Math.max(minGap, Math.round(minGap * 1.2))}px`
    );

    wrapper.style.gap = "var(--button-gap)";
  }

  // hook into screen watcher if available; fallback to resize
  let unsubscribeWatcher = null;
  if (typeof window.createScreenSizeWatcher === "function") {
    try {
      const watcher = window.createScreenSizeWatcher();
      applyPlacement(watcher.getSize());
      unsubscribeWatcher = watcher.onChange((info) => {
        try {
          applyPlacement(info);
        } catch (e) {
          console.error("button-wrapper watcher:", e);
        }
      });
    } catch (e) {
      console.warn(
        "button-wrapper: watcher init failed, falling back to resize",
        e
      );
    }
  }

  // fallback resize handler if watcher not used
  let resizeHandler = null;
  if (!unsubscribeWatcher) {
    const breakPx = 768;
    resizeHandler = () =>
      applyPlacement({ isDesktop: window.innerWidth >= breakPx });
    resizeHandler();
    window.addEventListener("resize", resizeHandler, { passive: true });
    window.addEventListener("orientationchange", resizeHandler);
  }

  // cleanup helper to unsubscribe listeners / observers
  function cleanUpButtonWrapper() {
    try {
      if (typeof unsubscribeWatcher === "function") unsubscribeWatcher();
    } catch (e) {}
    try {
      if (resizeHandler) {
        window.removeEventListener("resize", resizeHandler);
        window.removeEventListener("orientationchange", resizeHandler);
      }
    } catch (e) {}
  }
  // ensure cleanup when page unloads
  window.addEventListener("beforeunload", cleanUpButtonWrapper, { once: true });

  return wrapper;
}

// Call once at startup
createButtonWrapper(20);
