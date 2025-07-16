const basePath = "/vampiro/"; // Caminho do repositório no GitHub Pages

const pages = [
  "index.html",
  "perfil.html",
  "atributos.html",
  "habilidades.html",
  "especialidades.html",
  "disciplinas.html",
  "meritos_falhas.html",
  "historia.html",
  "biografia.html",
  "exportar.html"
];

function nextStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex >= 0 && currentIndex < pages.length - 1) {
    if (currentIndex === 0) {
      localStorage.clear();
    }
    const nextPage = pages[currentIndex + 1];
    window.location.href = basePath + nextPage;
  }
}

function prevStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex > 0) {
    const prevPage = pages[currentIndex - 1];
    window.location.href = basePath + prevPage;
  }
}
