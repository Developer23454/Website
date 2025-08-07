// assets/js/index/index.loader.js
console.log("✔️ index.loader.js loaded!");

const modules = [
  "./index.layout.js",
  "./index.pane.js",
  "./index.banner.js",
  "./index.buttonwrapper.js",
  "./index.selectlanguagebutton.js",
  "./index.darkmodebutton.js",
  "./index.settingsbutton.js",
  "./index.searchbar.js",
  "./index.footer.js",
];

document.addEventListener("DOMContentLoaded", async () => {
  for (const path of modules) {
    try {
      await import(path);
      console.log(`✔️ ${path} loaded`);
    } catch (err) {
      console.error(`❌ failed to load ${path}`, err);
    }
  }
});
