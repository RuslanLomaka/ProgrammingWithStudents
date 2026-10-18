const toggle = document.querySelector("#billyToggle");
const projects = document.querySelector("#billyProjects");

toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!expanded));
  projects.hidden = expanded;
});