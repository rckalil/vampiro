let convictionCount = 0;
const maxConvictions = 3;

function addConviction(convictionText = '', modelText = '') {
  if (convictionCount >= maxConvictions) return;

  convictionCount++;
  const container = document.getElementById("convictions");

  const div = document.createElement("div");
  div.className = "conviction-block";
  div.innerHTML = `
    <label>Convicção ${convictionCount}: 
      <input type="text" name="conviction${convictionCount}" maxlength="100" value="${convictionText}"/>
    </label><br>
    <label>Pessoa Modelo: 
      <input type="text" name="modelo${convictionCount}" maxlength="100" value="${modelText}"/>
    </label><hr>
  `;
  container.appendChild(div);
}

function saveHistoryInfo() {
  const birthYear = document.getElementById('birthYear').value;
  const ambition = document.getElementById('ambition').value.trim();
  const desire = document.getElementById('desire').value.trim();

  localStorage.setItem('historia.birthYear', birthYear);
  localStorage.setItem('historia.ambition', ambition);
  localStorage.setItem('historia.desire', desire);

  const convictions = [];
  for (let i = 1; i <= convictionCount; i++) {
    const conv = document.querySelector(`input[name="conviction${i}"]`);
    const model = document.querySelector(`input[name="modelo${i}"]`);
    if (conv && model) {
      convictions.push({
        conviction: conv.value.trim(),
        model: model.value.trim()
      });
    }
  }

  localStorage.setItem('historia.convictions', JSON.stringify(convictions));

  alert("Histórico salvo com sucesso!");
  nextStep();
}

window.addEventListener('DOMContentLoaded', () => {
  const birthYear = localStorage.getItem('historia.birthYear');
  const ambition = localStorage.getItem('historia.ambition');
  const desire = localStorage.getItem('historia.desire');
  const convictions = JSON.parse(localStorage.getItem('historia.convictions') || '[]');

  if (birthYear) document.getElementById('birthYear').value = birthYear;
  if (ambition) document.getElementById('ambition').value = ambition;
  if (desire) document.getElementById('desire').value = desire;

  // Adiciona convicções salvas ou uma inicial vazia
  if (convictions.length > 0) {
    convictions.forEach(c => addConviction(c.conviction, c.model));
  } else {
    addConviction();
  }
});
