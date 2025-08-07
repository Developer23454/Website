console.log(
  "✔️ This is inside the index.darkmodebutton.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

function createDarkModeButton() {
  const buttonWrapper = document.getElementById("button-wrapper");

  /** Dark Mode Button */
  const darkModeButton = document.createElement("button");
  darkModeButton.classList.add("theme-text");
  Object.assign(darkModeButton.style, {
    display: "inline-block",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "var(--color-fourth)",
    cursor: "pointer",
    transition: "opacity 0.3s",
  });

  // Set attributes from the <button> tag
  darkModeButton.setAttribute("data-i18n", "darkMode");
  darkModeButton.setAttribute("data-i18n", "lightMode");
  darkModeButton.textContent = t("darkMode");

  // hover effects
  darkModeButton.addEventListener("mouseenter", () => {
    darkModeButton.style.filter = "var(--content-hover-brightness)";
  });
  darkModeButton.addEventListener("mouseleave", () => {
    darkModeButton.style.filter = "";
  });

  // click effects
  let darkMode = false;
  darkModeButton.addEventListener("click", () => {
    darkMode = !darkMode;
    document.documentElement.classList.toggle("dark-mode", darkMode);

    // change button text/icon
    darkModeButton.textContent = darkMode ? t("lightMode") : t("darkMode");

    // update button background color to contrast theme
    /*     darkModeButton.style.backgroundColor = darkMode
      ? "var(--color-secondary)"
      : "var(--color-fourth)";
    darkModeButton.style.color = darkMode
      ? "var(--color-primary)"
      : "var(--color-fifth)"; */
  });

  buttonWrapper.appendChild(darkModeButton);

  console.log("✔️ Dark Mode Button got created!");
}

createDarkModeButton();
