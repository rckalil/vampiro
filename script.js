let currentStep = 1;

function nextStep() {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep++;
  document.getElementById(`step${currentStep}`).classList.add('active');
}

function prevStep() {
  document.getElementById(`step${currentStep}`).classList.remove('active');
  currentStep--;
  document.getElementById(`step${currentStep}`).classList.add('active');
}

function validateAttributes() {
  const prim = document.getElementById("primaryGroup").value;
  const sec = document.getElementById("secondaryGroup").value;
  const ter = document.getElementById("tertiaryGroup").value;

  // Checar se todas as prioridades são diferentes
  if (new Set([prim, sec, ter]).size !== 3) {
    alert("Cada grupo deve ter uma prioridade diferente.");
    return;
  }

  const grupos = {
    fisicos: ["forca", "destreza", "vigor"],
    sociais: ["carisma", "manipulacao", "aparencia"],
    mentais: ["percepcao", "inteligencia", "raciocinio"]
  };

  const limites = {
    [prim]: 7,
    [sec]: 5,
    [ter]: 3
  };

  // Corrigir Aparência para Nosferatu
  const clan = document.getElementById("clan").value.toLowerCase();
  if (clan === "nosferatu") {
    document.getElementById("aparencia").value = 0;
  }

  for (let grupo in grupos) {
    let total = 0;
    grupos[grupo].forEach(attrId => {
      const val = parseInt(document.getElementById(attrId).value || 1);
      total += (val - 1); // Subtrai o ponto base
    });
    if (total !== limites[grupo]) {
      alert(`Você deve distribuir exatamente ${limites[grupo]} pontos adicionais no grupo ${grupo.toUpperCase()}.`);
      return;
    }
  }

  nextStep();
}


function exportJSON() {
  const ficha = {
    jogador: document.getElementById('playerName').value,
    personagem: document.getElementById('characterName').value,
    clan: document.getElementById('clan').value,
    atributos: window.finalAtributos,

  };

  const json = JSON.stringify(ficha, null, 2);
  document.getElementById('jsonOutput').textContent = json;
}

// Valores fixos para drag
const values = [4, 3, 3, 3, 2, 2, 2, 2, 1];

window.addEventListener('DOMContentLoaded', () => {
  const pool = document.getElementById("valuesPool");

  values.forEach((val, idx) => {
    const span = document.createElement("div");
    span.className = "draggable";
    span.draggable = true;
    span.textContent = val;
    span.id = `val-${idx}`;
    span.addEventListener("dragstart", dragStart);
    pool.appendChild(span);
  });

  document.querySelectorAll('.dropzone').forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());
    zone.addEventListener("drop", dropValue);
  });
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dropValue(e) {
  const data = e.dataTransfer.getData("text/plain");
  const dragged = document.getElementById(data);

  if (!dragged) return;

  const dropzone = e.currentTarget;

  // Se já tem um valor, devolve ao pool
  const existing = dropzone.querySelector(".draggable");
  if (existing) {
    document.getElementById("valuesPool").appendChild(existing);
  }

  dropzone.innerHTML = dropzone.dataset.attr + "<br/>";
  dropzone.appendChild(dragged);
  dropzone.classList.add("filled");
}

// Validação final
function validateDraggedAttributes() {
  const used = [];
  const atributos = {};

  document.querySelectorAll(".dropzone").forEach(zone => {
    const valBox = zone.querySelector(".draggable");
    const attr = zone.dataset.attr;
    if (!valBox) {
      alert("Todos os atributos devem receber um valor.");
      return;
    }

    const val = parseInt(valBox.textContent);
    if (used.includes(valBox.id)) {
      alert("Valor duplicado detectado. Cada número deve ser usado apenas uma vez.");
      return;
    }

    used.push(valBox.id);
    atributos[attr] = val;
  });

  // Armazena os atributos para exportação
  window.finalAtributos = atributos;
  nextStep();
}
