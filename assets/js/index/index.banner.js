console.log(
  "✔️ This is inside the index.banner.js script! Therefore is has loaded!"
);

function createBanner() {
  const paneWrapper = document.getElementById("pane-wrapper");

  // Banner Divider
  const banner = document.createElement("div");
  Object.assign(banner.style, {
    position: "absolute",
    zIndex: 1000,
    top: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
  });

  // Banner Image
  const bannerImage = document.createElement("img");
  Object.assign(bannerImage.style, {
    transformOrigin: "center",
    display: "block",
    height: "7.5rem",
    transition: "transform 1.5s ease-in-out",
  });

  // Set attributes from the <img> tag
  bannerImage.src = "assets/images/logo/refresh.svg";
  bannerImage.alt = "Banner";
  bannerImage.className = "banner-img";

  // hover effects
  bannerImage.addEventListener("mouseenter", () => {
    bannerImage.style.transform = "rotate(180deg)";
  });
  bannerImage.addEventListener("mouseleave", () => {
    bannerImage.style.transform = "rotate(0deg)";
  });

  banner.appendChild(bannerImage);
  paneWrapper.appendChild(banner);

  console.log("✔️ Banner got created!");
}

createBanner();
