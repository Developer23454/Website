// assets/js/index/index.searchbar.js

console.log(
  "✔️ This is inside the index.searchbar.js script! Therefore is has loaded!"
);

// Pull in the translator function from your i18n.js
import { t } from "../i18n.js";

const placeholderStyle = document.createElement("style");
placeholderStyle.textContent = `
  .searchbar::placeholder {
    color: var(--color-primary);
    opacity: 1;
  }
`;
document.head.appendChild(placeholderStyle);

function createSearchbar(side) {
  const leftPaneContent = document.getElementById("left-pane-content");
  const rightPaneContent = document.getElementById("right-pane-content");

  let content;
  if (side === "left") {
    content = leftPaneContent;
  } else if (side === "right") {
    content = rightPaneContent;
  } else {
    console.error("createSearchbar: invalid side:", side);
    return;
  }

  if (!content) {
    console.error("createSearchbar: required element for", side, "not found");
    return;
  }

  /** Searchbar Wrapper */
  const searchbarWrapper = document.createElement("div");
  Object.assign(searchbarWrapper.style, {
    position: "relative",
    width: "80%",
    maxWidth: "400px",
    transition: "transform var(--transition-fast)",
  });

  /** Searchbar Input */
  const searchbar = document.createElement("input");
  searchbar.classList.add("searchbar");
  searchbar.type = "text";
  searchbar.setAttribute("data-i18n", "searchbarPlaceholder");
  searchbar.placeholder = t("searchbarPlaceholder");
  Object.assign(searchbar.style, {
    width: "100%",
    padding: "1rem 1rem 1rem 3rem",
    fontSize: "2rem",
    border: "1px solid var(--color-primary)",
    borderRadius: "2rem",
    background: "inherit",
    color: "var(--color-primary)",
    transition: "border-color 0.2s ease",
  });

  /** Search Icon */
  const searchIcon = document.createElement("img");
  searchIcon.src = "assets/images/components/searchbars/search.svg";
  searchIcon.alt = "";
  searchIcon.className = "search-icon";
  searchIcon.setAttribute("aria-hidden", "true");
  Object.assign(searchIcon.style, {
    position: "absolute",
    left: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    width: "2rem",
    height: "2rem",
    pointerEvents: "none",
    transition: "opacity 0.2s ease",
  });

  // hover effects
  searchbarWrapper.addEventListener("mouseenter", () => {
    searchbarWrapper.style.transform = "scale(1.08)";
  });
  searchbarWrapper.addEventListener("mouseleave", () => {
    searchbarWrapper.style.transform = "scale(1)";
  });

  // focus effect
  searchbar.addEventListener("focus", () => {
    searchbar.style.outline = "none";
    searchbar.style.boxShadow = "0 0 0 2px var(--color-primary)";
    searchbar.style.borderColor = "var(--color-primary)";
  });

  // blur effect
  searchbar.addEventListener("blur", () => {
    searchbar.style.boxShadow = ""; // remove on blur
  });

  searchbarWrapper.append(searchbar, searchIcon);
  content.appendChild(searchbarWrapper);

  console.log(`✔️ Searchbar got created in the ${side} pane`);
}

createSearchbar("left");
createSearchbar("right");
