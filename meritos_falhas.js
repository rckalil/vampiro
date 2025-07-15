const meritos = [
  { nome: "Sentidos Aguçados", descricao: "Bônus em testes sensoriais.", custo: 2 },
  { nome: "Memória Eidética", descricao: "Lembra tudo com perfeição.", custo: 3 },
  { nome: "Liderança Natural", descricao: "Bônus em liderança e comando.", custo: 2 }
];

const falhas = [
  { nome: "Inimigo", descricao: "Alguém quer te destruir.", ganho: 2 },
  { nome: "Impulsivo", descricao: "Tem dificuldade em resistir a tentações.", ganho: 1 },
  { nome: "Marca Visível", descricao: "Algum traço que te denuncia como vampiro.", ganho: 2 }
];

let pontosDisponiveis = 5;
let meritosSelecionados = [];
let falhasSelecionadas = [];

function atualizarPontos() {
  const totalMeritos = meritosSelecionados.reduce((acc, m) => acc + m.custo, 0);
  const totalFalhas = falhasSelecionadas.reduce((acc, f) => acc + f.ganho, 0);
  pontosDisponiveis = 5 + totalFalhas - totalMeritos;
  document.getElementById('pontosRestantes').textContent = pontosDisponiveis;
}

function criarLista(opcoes, containerId, tipo, selecionadosSalvos) {
  const lista = document.getElementById(containerId);

  opcoes.forEach((opcao, i) => {
    const isSelecionado = selecionadosSalvos.some(o => o.nome === opcao.nome);
    const li = document.createElement('li');

    li.innerHTML = `
      <label>
        <input type="checkbox" ${isSelecionado ? "checked" : ""} onchange="toggleOpcao('${tipo}', ${i})"/>
        <strong>${opcao.nome}</strong> (${tipo === 'merito' ? `Custo: ${opcao.custo}` : `Ganho: ${opcao.ganho}`})<br/>
        <small>${opcao.descricao}</small>
      </label>
    `;

    lista.appendChild(li);

    // Se for selecionado, adiciona ao array correspondente
    if (isSelecionado) {
      if (tipo === 'merito') meritosSelecionados.push(opcao);
      else falhasSelecionadas.push(opcao);
    }
  });
}

function toggleOpcao(tipo, index) {
  const lista = tipo === 'merito' ? meritos : falhas;
  const selecionados = tipo === 'merito' ? meritosSelecionados : falhasSelecionados;
  const item = lista[index];

  const jaTem = selecionados.includes(item);
  if (jaTem) {
    const pos = selecionados.indexOf(item);
    selecionados.splice(pos, 1);
  } else {
    selecionados.push(item);
  }

  atualizarPontos();
}

function validarMeritosFalhas() {
  atualizarPontos();

  if (pontosDisponiveis !== 0) {
    alert("Você precisa gastar exatamente os 5 pontos antes de continuar.");
    return;
  }

  localStorage.setItem("ficha.meritos", JSON.stringify(meritosSelecionados));
  localStorage.setItem("ficha.falhas", JSON.stringify(falhasSelecionadas));

  alert("Méritos e falhas salvos com sucesso!");
  nextStep(); // ou redirecionamento, se preferir
}

window.addEventListener('DOMContentLoaded', () => {
  const meritosSalvos = JSON.parse(localStorage.getItem("ficha.meritos") || "[]");
  const falhasSalvas = JSON.parse(localStorage.getItem("ficha.falhas") || "[]");

  criarLista(meritos, "listaMeritos", "merito", meritosSalvos);
  criarLista(falhas, "listaFalhas", "falha", falhasSalvas);
  atualizarPontos();
});
