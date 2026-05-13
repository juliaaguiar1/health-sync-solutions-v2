const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const leadForm = document.getElementById("leadForm");
const formFeedback = document.getElementById("formFeedback");

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (formFeedback) {
    formFeedback.textContent =
      "Lead registrado no protótipo. Em uma versão real, esses dados seriam enviados ao CRM da HSS.";
  }

  leadForm.reset();
});
