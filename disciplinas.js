const totalPermitido = 3;
const clanDisciplinas = {
  "Brujah": ["Rapidez", "Potência", "Presença"],
  "Grangrel": ["Animalismo", "Fortitude", "Metamorfose"],
  "Malkavian": ["Auspícios", "Demência", "Ofuscação"],
  "Nosferatu": ["Animalismo", "Ofuscação", "Potência"],
  "Toreador": ["Auspícios", "Rapidez", "Presença"],
  "Tremere": ["Auspícios", "Dominação", "Taumaturgia"],
  "Ventrue": ["Dominação", "Fortitude", "Presença"],
  "Lasombra": ["Dominação", "Potência", "Tenebrosidade"],
  "Tzimisce": ["Animalismo", "Auspícios", "Vicissitude"],
  "Assamita": ["Ofuscação", "Rapidez", "Quietus"],
  "Setita": ["Ofuscação", "Presença", "Serpentis"],
  "Giovanni": ["Dominação", "Necromancia", "Potência"],
  "Ravnos": ["Animalismo", "Fortitude", "Quimerismo"]
};

const disciplinasList = {
  "Animalismo": ["Sussurros Selvagens", "O Chamado", "Acalmar a Besta", "Dominar o Espírito", "Expulsar a Besta"],
  "Auspícios": ["Sentidos Aguçados", "Percepção da Aura", "O Toque do Espírito", "Telepatia", "Projeção Psíquica"],
  "Rapidez": [],
  "Quimerismo": ["Ignis Fatuus", "Fata Morgana", "Aparição", "Permanência", "Cruel Realidade"],
  "Demência": ["Paixão", "Assombrar a Alma", "Olhos do Caos", "A Voz da Loucura", "Insanidade Total"],
  "Dominação": ["O Comando", "Hipnotizar", "Ordenar Esquecimentos", "Condicionamento", "Possessão"],
  "Fortitude": [],
  "Necromancia": ["Visao Cadavérica", "Invocar o Espírito", "Compelir", "Assombração", "Tormento"],
  "Ofuscação": ["Manto das Sombras", "Presença Invisível", "A Máscara das Mil Faces", "Desaparecimento do Olho da Mente", "Cobrindo o Grupo"],
  "Tenebrosidade": ["Jogo de Sombras", "Mortalha das Trevas", "Braços do Abismo", "Metamorfose Sombria", "Corpo de Sombras"],
  "Potência": [],
  "Presença": ["Fascínio", "Olhar Aterrorizante", "Transe", "Convocação", "Majestade"],
  "Metamorfose": ["Os Olhos da Besta", "Garras da Besta", "Fusão Com a Terra", "A Forma da Besta", "Forma de Névoa"],
  "Quietus": ["Silêncio Mortal", "O Toque do Escorpião", "O Chamado de Dagon", "A Carícia de Baal", "O Gosto da Morte"],
  "Serpentis": ["Os Olhos da Serpente", "A Língua da Serpente", "A Pele da Víbora", "A Forma da Serpente", "O Coração das Trevas"],
  "Taumaturgia": ["Complexo"],
  "Vicissitude": ["Aspecto Maleável", "Moldar a Carne", "Moldar os Ossos", "Forma Horripilante", "Forma Sanguinea"]
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
