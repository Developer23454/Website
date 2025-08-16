// assets/js/index/index.banner.js
console.log("✔️ index.banner.js loaded (script-driven banner positioning).");

function createBanner() {
  const paneWrapper = document.getElementById("pane-wrapper");
  if (!paneWrapper) {
    console.error("createBanner: pane-wrapper not found");
    return;
  }

  // create banner container (absolute positioned)
  const banner = document.createElement("div");
  banner.id = "site-banner";

  banner.style.position = "absolute";
  banner.style.left = "50%";
  banner.style.top = "50%";
  banner.style.transform = "translate(-50%, -50%)";
  banner.style.zIndex = "1000";
  banner.style.display = "flex";
  banner.style.justifyContent = "center";
  banner.style.alignItems = "center";
  banner.style.pointerEvents = "auto";
  banner.style.transition =
    "left 0.18s ease, top 0.18s ease, transform 0.18s ease";

  const bannerImage = document.createElement("img");
  bannerImage.className = "banner-img";
  bannerImage.src = "assets/images/logo/refresh.svg";
  bannerImage.alt = "Banner";
  bannerImage.style.maxWidth = "90%";
  bannerImage.style.display = "block";
  bannerImage.style.transformOrigin = "center";
  bannerImage.style.transition = "transform 1.2s ease-in-out";
  bannerImage.style.cursor = "pointer";

  // click/tap rotates (touch-friendly)
  let rotated = false;
  bannerImage.addEventListener("click", () => {
    rotated = !rotated;
    bannerImage.style.transform = rotated ? "rotate(180deg)" : "rotate(0deg)";
  });

  banner.appendChild(bannerImage);
  paneWrapper.appendChild(banner);

  // Function to position the banner
  window.__POSITION_BANNER__ = function positionBanner() {
    const leftPane = document.getElementById("left-pane");
    const rightPane = document.getElementById("right-pane");
    const wrapperRect = paneWrapper.getBoundingClientRect();

    if (!leftPane || !rightPane) {
      // fallback: center in wrapper
      banner.style.left = `${wrapperRect.width / 2}px`;
      banner.style.top = `${wrapperRect.height / 2}px`;
      banner.style.transform = "translate(-50%, -50%)";
      return;
    }

    const leftRect = leftPane.getBoundingClientRect();
    const rightRect = rightPane.getBoundingClientRect();
    const screenInfo = window.__SCREEN_INFO__ || { isDesktop: true };

    let targetX, targetY;

    if (screenInfo.isDesktop) {
      // Desktop: horizontally center between panes
      const midX = (leftRect.right + rightRect.left) / 2;
      targetX = midX - wrapperRect.left;

      // Vertical: slightly above center
      targetY = Math.round(wrapperRect.height * 0.35);

      bannerImage.style.height = "7.5rem";
    } else {
      // Stacked: vertical midpoint between panes
      const seamY_abs = (leftRect.bottom + rightRect.top) / 2;
      targetX = wrapperRect.width / 2;
      targetY = seamY_abs - wrapperRect.top;

      bannerImage.style.height = "5rem";
    }

    banner.style.left = `${targetX}px`;
    banner.style.top = `${targetY}px`;
    banner.style.transform = "translate(-50%, -50%)";
  };

  // Call once immediately
  window.__POSITION_BANNER__();

  // Watch screen size changes
  if (typeof window.createScreenSizeWatcher === "function") {
    const watcher = window.createScreenSizeWatcher();
    watcher.onChange(() => {
      try {
        window.__POSITION_BANNER__();
      } catch (e) {}
    });
  }

  // Watch wrapper resize
  const ro = new ResizeObserver(() => {
    try {
      window.__POSITION_BANNER__();
    } catch (e) {}
  });
  ro.observe(paneWrapper);

  bannerImage.addEventListener("pointerenter", (e) => {
    bannerImage.style.transform = "rotate(180deg)";
  });
  bannerImage.addEventListener("pointerleave", (e) => {
    bannerImage.style.transform = "rotate(0deg)";
  });

  console.log("✔️ Banner created");
}

createBanner();
