let currentStep = 0;

const pages = [
  "index.html",
  "historia.html",
  "atributos.html",
  "habilidades.html",
  "especialidades.html",
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
    window.location.href = nextPage;
  }
}

function prevStep() {
  const currentPage = window.location.pathname.split("/").pop();
  const currentIndex = pages.indexOf(currentPage);

  if (currentIndex > 0) {
    const prevPage = pages[currentIndex - 1];
    window.location.href = prevPage;
  }
}