function preencherFicha() {
  document.getElementById('nome').textContent = localStorage.getItem('ficha.characterName') || "";
  document.getElementById('cla').textContent = localStorage.getItem('ficha.clan') || "";

  const atributos = JSON.parse(localStorage.getItem('ficha.atributos') || "{}");
  document.getElementById('forca').textContent = atributos.forca || "";
  document.getElementById('destreza').textContent = atributos.destreza || "";
  document.getElementById('vigor').textContent = atributos.vigor || "";
  document.getElementById('carisma').textContent = atributos.carisma || "";
  document.getElementById('manipulacao').textContent = atributos.manipulacao || "";
  document.getElementById('autocontrole').textContent = atributos.autocontrole || "";
  document.getElementById('percepcao').textContent = atributos.percepcao || "";
  document.getElementById('inteligencia').textContent = atributos.inteligencia || "";
  document.getElementById('raciocinio').textContent = atributos.raciocinio || "";
}

function exportJSON() {
  const ficha = {
    jogador: localStorage.getItem('ficha.playerName') || "",
    personagem: localStorage.getItem('ficha.characterName') || "",
    clan: localStorage.getItem('ficha.clan') || "",
    atributos: JSON.parse(localStorage.getItem('ficha.atributos') || "{}")
  };

  // Ordenar atributos por nome
  const atributosOrdenados = {};
  Object.keys(ficha.atributos)
    .sort()
    .forEach(key => {
      atributosOrdenados[key] = ficha.atributos[key];
    });

  ficha.atributos = atributosOrdenados;

  const json = JSON.stringify(ficha, null, 2);

  const email = prompt("Digite o email para envio:");
  if (email) {
    const jsonBlob = new Blob([json], { type: "application/json" });
    const jsonFile = new File([jsonBlob], "ficha.json", { type: "application/json" });

    const imagemElement = document.getElementById('fichaImagem');
    let imagemFile = null;

    if (imagemElement && imagemElement.src) {
      fetch(imagemElement.src)
        .then(res => res.blob())
        .then(blob => {
          imagemFile = new File([blob], "ficha.png", { type: blob.type });

          const formData = new FormData();
          formData.append("json", jsonFile);
          formData.append("imagem", imagemFile);
          formData.append("email", email);

          fetch("/api/enviar-ficha", {
            method: "POST",
            body: formData
          })
          .then(response => {
            if (response.ok) {
              alert("Ficha enviada com sucesso!");
            } else {
              alert("Erro ao enviar ficha.");
            }
          })
          .catch(() => alert("Erro ao enviar ficha."));
        });
    } else {
      const formData = new FormData();
      formData.append("json", jsonFile);
      formData.append("email", email);

      fetch("/api/enviar-ficha", {
        method: "POST",
        body: formData
      })
      .then(response => {
        if (response.ok) {
          alert("Ficha enviada com sucesso!");
        } else {
          alert("Erro ao enviar ficha.");
        }
      })
      .catch(() => alert("Erro ao enviar ficha."));
    }
  }
}

preencherFicha();