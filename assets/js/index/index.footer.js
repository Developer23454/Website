// assets/js/index/index.footer.js

console.log(
  "✔️ This is inside the index.footer.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

function createFooter() {
  const mount = document.getElementById("mount");

  /** Footer */
  const footer = document.createElement("footer");
  Object.assign(footer.style, {
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
  });

  /** Footer Title */
  const title = document.createElement("h2");
  title.setAttribute("data-i18n", "footerTitle");
  title.textContent = t("footerTitle");
  Object.assign(title.style, {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
  });

  /** Footer Profiles */
  const profiles = document.createElement("div");
  Object.assign(profiles.style, {
    display: "flex",
    gap: "1rem",
  });

  for (let i = 1; i <= 5; i++) {
    const img = document.createElement("img");
    Object.assign(img.style, {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #fff",
    });
    img.src = "assets/images/components/profilepictures/user.svg";
    img.alt = `Profile ${i}`;
    profiles.appendChild(img);
  }

  footer.appendChild(title);
  footer.appendChild(profiles);
  mount.appendChild(footer);

  console.log("✔️ Footer got created!");
}

createFooter();
