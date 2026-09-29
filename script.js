// Configuração: altere aqui para trocar o número ou a mensagem do WhatsApp
const WHATSAPP = "5551993116429";
const MENSAGEM = "Olá! Vim pelo site e gostaria de um orçamento.";

const waUrl = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAGEM)}`;
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waUrl;
  a.target = "_blank";
  a.rel = "noopener";
});

// Menu mobile
const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", false);
}));

// Filtro da galeria
const buttons = document.querySelectorAll(".filters button");
const items = document.querySelectorAll(".gallery figure");
buttons.forEach(btn => btn.addEventListener("click", () => {
  buttons.forEach(b => b.classList.toggle("is-active", b === btn));
  const f = btn.dataset.filter;
  items.forEach(i => { i.hidden = f !== "all" && i.dataset.cat !== f; });
}));

document.getElementById("ano").textContent = new Date().getFullYear();
