const totalPermitido = 3;
const clanDisciplinas = {
  "Brujah": ["Potência", "Rapidez", "Presença"],
  "Toreador": ["Rapidez", "Ofuscação", "Presença"],
  "Gangrel": ["Animalismo", "Fortitude", "Protean"],
  "Nosferatu": ["Ofuscação", "Potência", "Animalismo"]
};

const disciplinasList = {
  "Potência": ["Força Brutal", "Soco Devastador", "Explosão de Poder", "Ruptura Óssea", "Impacto Final"],
  "Rapidez": ["Movimento Ágil", "Desvio Rápido", "Golpes Múltiplos", "Velocidade Relâmpago", "Intangibilidade"],
  "Presença": ["Carisma Hipnótico", "Comando Sutil", "Aura de Influência", "Domínio Emocional", "Controle Total"],
  "Ofuscação": ["Sumir", "Sombra", "Esquiva Visual", "Nada te vê", "Desaparecimento Total"],
  "Animalismo": ["Fera Interior", "Comando Animal", "Ligação Selvagem", "Alcateia", "Forma da Besta"],
  "Fortitude": ["Resistência", "Casca de Pedra", "Carne de Ferro", "Inquebrável", "Eterno"],
  "Protean": ["Visão da Fera", "Garras", "Forma Parcial", "Transformação", "Fusão com a Terra"]
};

const selecionados = {}; // { Potência: 2, Rapidez: 1 }

window.addEventListener('DOMContentLoaded', () => {
  const clan = localStorage.getItem("ficha.clan");
  const container = document.getElementById("disciplinasContainer");
  const totalSpan = document.getElementById("totalSelecionado");
  const salvos = JSON.parse(localStorage.getItem('ficha.disciplinas') || '{}');

  if (!clan || !clanDisciplinas[clan]) {
    container.innerHTML = "<p>Clã não definido ou inválido.</p>";
    return;
  }

  const disciplinas = clanDisciplinas[clan];

  disciplinas.forEach(disciplina => {
    const box = document.createElement("div");
    box.classList.add("disciplina-box");

    const label = document.createElement("label");
    label.textContent = disciplina + ": ";

    const select = document.createElement("select");
    select.name = disciplina;

    for (let i = 0; i <= 5; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }

    // Valor salvo
    const valorSalvo = salvos[disciplina] || 0;
    select.value = valorSalvo;
    selecionados[disciplina] = valorSalvo;

    select.addEventListener("change", () => {
      const novaSelecao = parseInt(select.value);
      const novaSoma = getSomaTotal() - selecionados[disciplina] + novaSelecao;

      if (novaSoma > totalPermitido) {
        alert(`Você só pode distribuir ${totalPermitido} pontos no total.`);
        select.value = selecionados[disciplina];
        return;
      }

      selecionados[disciplina] = novaSelecao;
      totalSpan.textContent = getSomaTotal();
    });

    // Mostrar detalhes ao focar
    select.addEventListener("focus", () => mostrarDetalhes(disciplina));

    label.appendChild(select);
    box.appendChild(label);
    container.appendChild(box);
  });

  totalSpan.textContent = getSomaTotal();
});

function getSomaTotal() {
  return Object.values(selecionados).reduce((a, b) => a + b, 0);
}

function mostrarDetalhes(nome) {
  const detalhes = document.getElementById("detalhesDisciplina");
  detalhes.innerHTML = `<h3>${nome}</h3>`;
  const lista = document.createElement("ul");

  disciplinasList[nome].forEach((nivel, i) => {
    const item = document.createElement("li");
    item.textContent = `Nível ${i + 1}: ${nivel}`;
    lista.appendChild(item);
  });

  detalhes.appendChild(lista);
}

function salvarDisciplinas() {
  localStorage.setItem("ficha.disciplinas", JSON.stringify(selecionados));
  alert("Disciplinas salvas com sucesso!");
  nextStep();
}
