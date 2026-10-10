(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  const triggers = document.querySelectorAll<HTMLElement>(".js-accordion");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isExpanded));
    });
  });
})();
