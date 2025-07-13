let clanData = {};

const clans = {
  "Brujah": "Rebeldes apaixonados, guerreiros por natureza, com forte impulso por liberdade.",
  "Gangrel": "Sobreviventes ferozes, ligados à natureza e com instintos animalescos.",
  "Malkaviano": "Portadores de uma loucura profética, com uma visão distorcida e profunda do mundo.",
  "Nosferato": "Horrendamente deformados, mestres do segredo e da espionagem.",
  "Toreador": "Apaixonados pela arte, beleza e emoção — verdadeiros estetas imortais.",
  "Tremere": "Feiticeiros do sangue, estruturados, hierárquicos e misteriosos.",
  "Ventrue": "Líderes natos, nobres, seletivos e obcecados por controle.",
  "Banu haquim": "Juízes e assassinos, leais a antigos códigos de honra.",
  "Lasombra": "Controladores das sombras, ambiciosos, frios e manipuladores.",
  "O Ministério": "Sedutores e corruptores, mestres da tentação e da transgressão.",
  "Ravnos": "Viajantes enganadores, com poderes de ilusão e liberdade extrema.",
  "Giovanni": "Necromantes poderosos, ligados à morte, riquezas e à própria família.",
  "Tzimisce": "Modeladores de carne e osso, obcecados por controle e território."
}

window.addEventListener('DOMContentLoaded', () => {
    // CLÃ – manter como está
  const clanSelect = document.getElementById('clan');
  const descBox = document.getElementById('clanDescription');
  clanSelect.innerHTML = '<option value="">Selecione um clã</option>';
  for (const clan in clans) {
    clanSelect.innerHTML += `<option value="${clan}">${clan}</option>`;
    clanData[clan] = clans[clan];
  }

  clanSelect.addEventListener('change', function () {
    const selectedClan = this.value;
    descBox.textContent = clanData[selectedClan] || '';
  });

  const initialClan = clanSelect.value;
  descBox.textContent = clanData[initialClan] || '';

  // Preenche os campos da página de história com dados do localStorage, se existirem
  if (window.location.pathname.endsWith("historia.html")) {
    const playerName = localStorage.getItem('ficha.playerName') || "";
    const characterName = localStorage.getItem('ficha.characterName') || "";
    const clan = localStorage.getItem('ficha.clan') || "";

    const playerNameInput = document.getElementById('playerName');
    const characterNameInput = document.getElementById('characterName');
    const clanSelect = document.getElementById('clan');

    if (playerNameInput) playerNameInput.value = playerName;
    if (characterNameInput) characterNameInput.value = characterName;
    if (clanSelect) clanSelect.value = clan;
  }
});

document.getElementById('clan').addEventListener('change', function () {
  const selectedClan = this.value;
  const descBox = document.getElementById('clanDescription');
  descBox.textContent = clanData[selectedClan] || '';
});

function saveBasicInfo() {
  const playerName = document.getElementById('playerName').value;
  const characterName = document.getElementById('characterName').value;
  const clan = document.getElementById('clan').value;

  localStorage.setItem('ficha.playerName', playerName);
  localStorage.setItem('ficha.characterName', characterName);
  localStorage.setItem('ficha.clan', clan);

  nextStep();
}
