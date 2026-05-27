const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const leadForm = document.getElementById("leadForm");
const formFeedback = document.getElementById("formFeedback");
const calculatorForm = document.getElementById("calculatorForm");

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

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

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

function updateCalculator() {
  const professionals = Number(document.getElementById("professionals")?.value || 0);
  const hours = Number(document.getElementById("hours")?.value || 0);
  const hourCost = Number(document.getElementById("hourCost")?.value || 0);
  const reduction = Number(document.getElementById("reduction")?.value || 0);

  const currentCost = professionals * hours * hourCost;
  const monthlySaving = currentCost * (reduction / 100);
  const newCost = currentCost - monthlySaving;
  const annualSaving = monthlySaving * 12;

  document.getElementById("currentCost").textContent = currency.format(currentCost);
  document.getElementById("newCost").textContent = currency.format(newCost);
  document.getElementById("monthlySaving").textContent = currency.format(monthlySaving);
  document.getElementById("annualSaving").textContent = currency.format(annualSaving);
}

calculatorForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  updateCalculator();
});

["professionals", "hours", "hourCost", "reduction"].forEach((id) => {
  document.getElementById(id)?.addEventListener("input", updateCalculator);
});

updateCalculator();

leadForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!leadForm.checkValidity()) {
    formFeedback.textContent = "Preencha todos os campos obrigatórios corretamente.";
    formFeedback.classList.add("error");
    leadForm.reportValidity();
    return;
  }

  const formData = new FormData(leadForm);

  const lead = {
    nome: formData.get("nome"),
    empresa: formData.get("empresa"),
    cargo: formData.get("cargo"),
    email: formData.get("email"),
    profissionais: formData.get("profissionais"),
    desafio: formData.get("desafio"),
    protocolo: `HSS-${Date.now()}`,
    dataEnvio: new Date().toLocaleString("pt-BR")
  };

  const savedLeads = JSON.parse(localStorage.getItem("hssLeads") || "[]");

  savedLeads.push(lead);

  localStorage.setItem("hssLeads", JSON.stringify(savedLeads));

  console.log("Lead registrado:", lead);
  console.table(savedLeads);

  formFeedback.classList.remove("error");
  formFeedback.textContent = `Obrigado, ${lead.nome}! Seu interesse foi registrado com sucesso. Protocolo: ${lead.protocolo}`;

  leadForm.reset();
});