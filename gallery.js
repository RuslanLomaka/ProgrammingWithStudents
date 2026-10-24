document.querySelectorAll(".student-toggle").forEach((toggle) => {
  const projects = document.getElementById(toggle.getAttribute("aria-controls"));
  if (!projects) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    projects.hidden = expanded;
  });
});
