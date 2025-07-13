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
  document.getElementById('jsonOutput').textContent = json;
}
