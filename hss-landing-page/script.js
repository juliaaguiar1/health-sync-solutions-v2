console.log("VERSAO NOVA ROI");

const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const leadForm = document.getElementById("leadForm");
const formFeedback = document.getElementById("formFeedback");
const calculatorForm = document.getElementById("calculatorForm");

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

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
  const investment = Number(document.getElementById("investment")?.value || 0);

  const currentCost = professionals * hours * hourCost;
  const monthlySaving = currentCost * (reduction / 100);
  const annualSaving = monthlySaving * 12;
  const hoursSaved = professionals * hours * (reduction / 100);

  const roi = investment > 0
    ? ((monthlySaving - investment) / investment) * 100
    : 0;

  const payback = monthlySaving > 0
    ? investment / monthlySaving
    : 0;

  const currentCostElement = document.getElementById("currentCost");
  const monthlySavingElement = document.getElementById("monthlySaving");
  const annualSavingElement = document.getElementById("annualSaving");
  const roiValueElement = document.getElementById("roiValue");
  const paybackValueElement = document.getElementById("paybackValue");
  const hoursSavedElement = document.getElementById("hoursSaved");
  const roiSummaryElement = document.getElementById("roiSummary");

  if (currentCostElement) {
    currentCostElement.textContent = currency.format(currentCost);
  }

  if (monthlySavingElement) {
    monthlySavingElement.textContent = currency.format(monthlySaving);
  }

  if (annualSavingElement) {
    annualSavingElement.textContent = currency.format(annualSaving);
  }

  if (roiValueElement) {
    roiValueElement.textContent = `${roi.toFixed(1)}%`;
  }

  if (paybackValueElement) {
    paybackValueElement.textContent = `${payback.toFixed(1)} meses`;
  }

  if (hoursSavedElement) {
    hoursSavedElement.textContent = `${hoursSaved.toFixed(0)}h/mês`;
  }

  if (roiSummaryElement) {
    roiSummaryElement.textContent =
      `Com base nos dados informados, a Health Sync Solutions pode gerar uma economia anual estimada de ${currency.format(annualSaving)}. O retorno sobre o investimento é de ${roi.toFixed(1)}% e o payback estimado é de ${payback.toFixed(1)} meses.`;
  }
}

if (calculatorForm) {
  calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateCalculator();
  });

  ["professionals", "hours", "hourCost", "reduction", "investment"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", updateCalculator);
  });

  updateCalculator();
}

if (leadForm && formFeedback) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!leadForm.checkValidity()) {
      formFeedback.textContent = "Preencha todos os campos obrigatórios corretamente.";
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

    formFeedback.textContent =
      `Obrigado, ${lead.nome}! Sua demonstração foi solicitada com sucesso. Protocolo: ${lead.protocolo}`;

    leadForm.reset();
  });
}