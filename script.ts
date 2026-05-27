const menuButton = document.getElementById("menuButton") as HTMLButtonElement | null;
const navLinks = document.getElementById("navLinks") as HTMLElement | null;
const leadForm = document.getElementById("leadForm") as HTMLFormElement | null;
const formFeedback = document.getElementById("formFeedback") as HTMLElement | null;

menuButton?.addEventListener("click", () => {
  const isOpen = navLinks?.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelectorAll<HTMLAnchorElement>(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll<HTMLElement>(".reveal").forEach((element) => observer.observe(element));

leadForm?.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  if (formFeedback) {
    formFeedback.textContent =
      "Lead registrado no protótipo. Em uma versão real, esses dados seriam enviados ao CRM da HSS.";
  }

  leadForm.reset();
});
