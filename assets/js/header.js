function createHeader() {
  const head = document.head;

  const title = document.createElement("title");
  title.setAttribute("data-i18n", "brand");
  title.textContent = "brand";
  head.appendChild(title);

  const icons = [
    { rel: "icon", href: "/assets/images/logo/refresh-black.svg" },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/assets/images/logo/refresh-black.svg",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/assets/images/logo/refresh-black.svg",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/assets/images/logo/refresh-black.svg",
    },
  ];

  icons.forEach((icon) => {
    const link = document.createElement("link");
    Object.entries(icon).forEach(([key, value]) =>
      link.setAttribute(key, value)
    );
    head.appendChild(link);
  });

  const metaColor = document.createElement("meta");
  metaColor.setAttribute("name", "msapplication-TileColor");
  metaColor.setAttribute("content", "#ffffff");

  const metaImage = document.createElement("meta");
  metaImage.setAttribute("name", "msapplication-TileImage");
  metaImage.setAttribute(
    "content",
    "../public/assets/images/logo/refresh-black.svg"
  );

  head.appendChild(metaColor);
  head.appendChild(metaImage);
}

document.addEventListener("DOMContentLoaded", createHeader);

