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

// Tipos de pedra: abre painel com exemplos
const STONES = {
  granitos: {
    titulo: "Granitos",
    desc: "Rocha natural muito resistente a riscos, calor e uso intenso. Ideal para bancadas de cozinha, pias e escadas.",
    itens: [["Preto São Gabriel","#151515"],["Verde Ubatuba","#1f3a2e"],["Branco Siena","#ddd9d0"],["Cinza Andorinha","#8b8b88"],["Amarelo Ornamental","#c9a566"],["Vermelho Capão Bonito","#7a2a2a"]]
  },
  marmores: {
    titulo: "Mármores",
    desc: "Rocha natural de veios marcantes e visual sofisticado. Indicado para banheiros, lavabos, revestimentos e peças decorativas.",
    itens: [["Carrara","#e7e6e3"],["Calacatta","#f1efe9"],["Travertino","#d8c7a5"],["Nero Marquina","#1a1a1a"],["Bege Bahia","#d9c9a8"],["Branco Piguês","#eeece6"]]
  },
  basaltos: {
    titulo: "Basaltos",
    desc: "Pedra vulcânica de tom escuro e grande durabilidade, típica da nossa região. Ótima para pisos, revestimentos e áreas externas.",
    itens: [["Basalto preto","#2a2a2b"],["Basalto cinza","#6d6f70"],["Basalto flameado","#4a4b4c"],["Basalto escovado","#38393a"]]
  },
  quartzos: {
    titulo: "Quartzos",
    desc: "Material industrializado com alta resistência e baixa porosidade, com padrões uniformes. Muito usado em cozinhas e banheiros.",
    itens: [["Branco","#f4f3f0"],["Cinza","#9a9a9a"],["Preto estelar","#1c1c1e"],["Bege","#d9cdb8"],["Efeito mármore","#e9e7e2"]]
  },
  quartzitos: {
    titulo: "Quartzitos",
    desc: "Pedra natural com dureza superior à do granito e aparência que lembra o mármore. Perfeito para projetos de alto padrão.",
    itens: [["Taj Mahal","#e6dcc6"],["Cristallo","#eef0f0"],["Dolce Vita","#d6c9b0"],["Fusion","#b8975a"],["Sea Pearl","#cfd3d0"]]
  }
};
const stoneTabs = document.querySelectorAll("[data-stone]");
const panel = document.getElementById("painel-pedras");

// Convenção de arquivos (basta colocar a foto com o nome certo, sem mexer no código):
//   img/pedras/<nome-da-pedra>.jpg    -> foto da pedra
//   img/servicos/<nome-da-pedra>.jpg  -> foto de um serviço feito com ela
// <nome-da-pedra> = nome em minúsculas, sem acento, com hífen. Ex: "Preto São Gabriel" -> preto-sao-gabriel.jpg
// Para ver o exemplo de serviço, o campo USOS abaixo define o texto (por tipo de pedra).
const USOS = {
  granitos: "Bancada de cozinha",
  marmores: "Bancada de banheiro",
  basaltos: "Revestimento / piso",
  quartzos: "Bancada de cozinha",
  quartzitos: "Ilha / bancada gourmet"
};
const slug = n => n.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function photo(src, alt, fallback){
  const wrap = document.createElement("div");
  wrap.className = "stone-photo";
  if (fallback) wrap.style.background = fallback;
  const img = new Image();
  img.alt = alt; img.loading = "lazy";
  img.onload = () => wrap.appendChild(img);   // só mostra se o arquivo existir
  img.src = src;
  return wrap;
}

function showStone(key){
  const st = STONES[key];
  stoneTabs.forEach(t => t.setAttribute("aria-selected", t.dataset.stone === key));
  document.getElementById("stone-title").textContent = st.titulo;
  document.getElementById("stone-desc").textContent = st.desc;
  const ul = document.getElementById("stone-list");
  ul.innerHTML = "";
  st.itens.forEach(([nome, cor]) => {
    const s = slug(nome);
    const li = document.createElement("li");
    const pedra = photo(`img/pedras/${s}.jpg`, nome, cor);
    const servico = photo(`img/servicos/${s}.jpg`, `${USOS[key]} em ${nome}`, "");
    servico.classList.add("stone-photo--uso");
    const label = document.createElement("strong");
    label.textContent = nome;
    const uso = document.createElement("small");
    uso.textContent = "Exemplo: " + USOS[key];
    li.append(pedra, label, uso, servico);
    ul.appendChild(li);
  });
  panel.setAttribute("aria-labelledby", "tab-" + key);
  panel.hidden = false;
}
function closeStone(){
  panel.hidden = true;
  stoneTabs.forEach(t => t.setAttribute("aria-selected", false));
}
stoneTabs.forEach(t => t.addEventListener("click", () => {
  t.getAttribute("aria-selected") === "true" ? closeStone() : showStone(t.dataset.stone);
}));
panel.querySelector(".stone-panel__close").addEventListener("click", closeStone);
