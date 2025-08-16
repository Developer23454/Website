// assets/js/size.handler.js
// Version: usable as ES module (import) AND registers a global shortcut window.createScreenSizeWatcher
// Paste this file as-is.

export function createScreenSizeWatcher(options = {}) {
  const breakpoints = options.breakpoints || { mobile: 767, tablet: 1023 };
  const debounceMs =
    typeof options.debounceMs === "number" ? options.debounceMs : 100;

  const subscribers = new Set();

  function debounce(fn, ms) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  function compute() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = height >= width ? "portrait" : "landscape";

    let category;
    if (width <= breakpoints.mobile) category = "mobile";
    else if (width <= breakpoints.tablet) category = "tablet";
    else category = "desktop";

    return {
      width,
      height,
      orientation,
      category,
      isMobile: category === "mobile",
      isTablet: category === "tablet",
      isDesktop: category === "desktop",
      breakpoints: { ...breakpoints },
    };
  }

  const notify = () => {
    const info = compute();
    subscribers.forEach((cb) => {
      try {
        cb(info);
      } catch (e) {
        console.error("screen-watcher subscriber error:", e);
      }
    });
  };

  const debouncedNotify = debounce(notify, debounceMs);

  function resizeHandler() {
    debouncedNotify();
  }

  window.addEventListener("resize", resizeHandler, { passive: true });
  window.addEventListener("orientationchange", resizeHandler);

  let ro = null;
  try {
    ro = new ResizeObserver(debouncedNotify);
    ro.observe(document.documentElement);
  } catch (e) {
    ro = null;
  }

  return {
    getSize: () => compute(),
    onChange: (cb) => {
      if (typeof cb !== "function")
        throw new TypeError("onChange callback must be a function");
      subscribers.add(cb);
      // call immediately with current size
      try {
        cb(compute());
      } catch (e) {
        console.error(e);
      }
      return () => subscribers.delete(cb);
    },
    offChange: (cb) => {
      subscribers.delete(cb);
    },
    destroy: () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("orientationchange", resizeHandler);
      if (ro) {
        try {
          ro.disconnect();
        } catch (e) {}
        ro = null;
      }
      subscribers.clear();
    },
  };
}

// Make a global shortcut available for scripts that don't import the module.
// This is harmless if that script is loaded as a module in the head (it will set the global).
if (typeof window !== "undefined") {
  window.createScreenSizeWatcher = createScreenSizeWatcher;
}
