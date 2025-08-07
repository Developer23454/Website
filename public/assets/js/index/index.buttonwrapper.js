function createButtonWrapper(minGap = 16) {
  let wrapper = document.getElementById("button-wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "button-wrapper";
    Object.assign(wrapper.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      display: "flex",
      alignItems: "center",
      gap: `${minGap}px`,
      zIndex: "9999",
      /* optionally: backgroundColor:"rgba(255,255,255,0.8)" for contrast */
    });
    document.getElementById("mount").appendChild(wrapper);
    console.log("✔️ Button Wrapper got created!");
  } else {
    wrapper.style.gap = `${minGap}px`;
  }
  return wrapper;
}

// Call this once at startup:
createButtonWrapper(20);
