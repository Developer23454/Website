const searchIconWrapper = document.createElement("div");
searchIconWrapper.innerHTML = `
  <svg viewBox="-0.5 0 25 25" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M7.1998 10.8799L3.9998 14.0799L0.799805 10.8799" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Add other paths here -->
  </svg>
`;

const searchIcon = searchIconWrapper.firstElementChild;

Object.assign(searchIcon.style, {
  position: "absolute",
  left: "1rem",
  top: "50%",
  transform: "translateY(-50%)",
  width: "2rem",
  height: "2rem",
  pointerEvents: "none",
  transition: "opacity 0.2s ease",
  color: "var(--color-primary)", // ⬅️ This is the key part
});
