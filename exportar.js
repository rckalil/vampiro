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

  const habilidades = JSON.parse(localStorage.getItem('ficha.habilidades') || "{}");
  console.log("Habilidades carregadas:", habilidades);
  const habilidadesList = [
    'prontidao', 'esportes', 'briga', 'esquiva', 'impulso', 'luta', 'armas', 'conducao', 'furtividade', 'sobrevivencia',
    'academicos', 'investigacao', 'medicina', 'ocultismo', 'politica', 'tecnologia', 'empatia', 'expressao', 'intimidacao',
    'lideranca', 'manipulacao', 'persuasao', 'subterfugio', 'animais', 'financas', 'seguranca', 'religiao', 'arte', 'musica',
    'ciencia', 'linguas'
  ];

  habilidadesList.forEach(hab => {
    document.getElementById(hab).textContent = habilidades[hab] ? habilidades[hab] : 0;
  });
}

function exportJSON() {
  const ficha = {
    jogador: localStorage.getItem('ficha.playerName') || "",
    personagem: localStorage.getItem('ficha.characterName') || "",
    clan: localStorage.getItem('ficha.clan') || "",
    atributos: JSON.parse(localStorage.getItem('ficha.atributos') || "{}")
  };

//   // Ordenar atributos
//   const atributosOrdenados = {};
//   Object.keys(ficha.atributos).sort().forEach(key => {
//     atributosOrdenados[key] = ficha.atributos[key];
//   });
//   ficha.atributos = atributosOrdenados;

//   const mensagem = `
//     Jogador: ${ficha.jogador}
//     Personagem: ${ficha.personagem}
//     Clã: ${ficha.clan}
//     Atributos:
//     ${Object.entries(ficha.atributos).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}
//   `;

//   const formData = new FormData();
//   formData.append("message", mensagem);

//   fetch("https://formspree.io/f/mdkdngen", {
//     method: "POST",
//     body: formData,
//     headers: {
//       'Accept': 'application/json'
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         alert("Ficha enviada com sucesso!");
//       } else {
//         alert("Erro ao enviar ficha.");
//       }
//     })
//     .catch(() => alert("Erro ao enviar ficha."));
}



preencherFicha();