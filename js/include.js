document.addEventListener("DOMContentLoaded", async function () {
  const includes = document.querySelectorAll("[data-include]");
  
  for (const el of includes) {
    const file = el.getAttribute("data-include");
    if (file) {
      try {
        const response = await fetch(file);
        if (response.ok) {
          el.innerHTML = await response.text();
        } else {
          console.error(`Failed to load ${file}: ${response.statusText}`);
        }
      } catch (err) {
        console.error(`Fetch error for ${file}:`, err);
      }
    }
  }

  // Tell main.js that all HTML components are successfully loaded into the DOM
  document.dispatchEvent(new Event("componentsLoaded"));
});