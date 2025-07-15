const meritos = {
  fisicos: [
    { nome: "Ambidestro", descricao: "Você pode usar ambas as mãos com igual destreza.", custo: 1 },
    { nome: "Corpo Grande", descricao: "Você possui um corpo maior que o normal e ganha um nível extra de vitalidade.", custo: 4 },
    { nome: "Ingerir Comida", descricao: "Você pode comer comida normalmente sem penalidades, uma raridade entre os vampiros.", custo: 1 },
    { nome: "Sentido Aguçado", descricao: "Um dos seus sentidos é muito mais aguçado que o normal.", custo: 1 },
    { nome: "Voz Encantadora", descricao: "Você recebe bônus em testes envolvendo sua voz.", custo: 2 }
  ],
  mentais: [
    { nome: "Bom Senso", descricao: "O narrador pode ajudá-lo com dicas em situações arriscadas.", custo: 1 },
    { nome: "Concentração", descricao: "Você não sofre penalidades por distrações leves enquanto estiver focado.", custo: 1 },
    { nome: "Memória Eidética", descricao: "Você se lembra de tudo com perfeição.", custo: 2 },
    { nome: "Temperamento Calmo", descricao: "Você recebe bônus para resistir ao frenesi.", custo: 3 }
  ],
  sociais: [
    { nome: "Líder Nato", descricao: "Bônus em testes de Liderança.", custo: 1 },
    { nome: "Prestígio do Senhor", descricao: "Seu senhor é influente.", custo: 1 },
    { nome: "Recurso", descricao: "Você tem acesso a fontes de renda estáveis.", custo: 3 },
    { nome: "Dívida de Gratidão", descricao: "Um ancião está em dívida com você.", custo: 1 }
  ],
  sobrenaturais: [
    { nome: "Médium", descricao: "Você pode sentir e interagir com espíritos.", custo: 2 },
    { nome: "Resistência à Magia", descricao: "Dificuldade para afetá-lo com magia aumenta.", custo: 2 },
    { nome: "Habilidade Oracular", descricao: "Você tem visões e pressentimentos verdadeiros.", custo: 3 },
    { nome: "Fé Verdadeira", descricao: "Sua fé afeta seres sobrenaturais.", custo: 7 }
  ]
};

const falhas = {
  fisicos: [
    { nome: "Aleijado", descricao: "Mobilidade extremamente reduzida.", ganho: 3 },
    { nome: "Cegueira", descricao: "Você é completamente cego.", ganho: 6 },
    { nome: "Deficiência Visual", descricao: "Penalidades em tarefas visuais.", ganho: 1 },
    { nome: "Sono Pesado", descricao: "É muito difícil acordar durante o dia.", ganho: 1 }
  ],
  mentais: [
    { nome: "Amnésia", descricao: "Você não lembra do seu passado.", ganho: 1 },
    { nome: "Cabeça Quente", descricao: "Irrita-se facilmente. Frenesi frequente.", ganho: 2 },
    { nome: "Lunático", descricao: "Mudanças de humor com a lua.", ganho: 2 },
    { nome: "Vontade Fraca", descricao: "Penalidades contra intimidação e compulsões.", ganho: 3 }
  ],
  sociais: [
    { nome: "Segredo Sombrio", descricao: "Se descoberto, pode arruinar sua não-vida.", ganho: 1 },
    { nome: "Identidade Trocada", descricao: "É confundido com outra pessoa.", ganho: 1 },
    { nome: "Inimigo", descricao: "Alguém quer te destruir.", ganho: 1 },
    { nome: "Má Reputação", descricao: "Você é malvisto pelos outros.", ganho: 2 }
  ],
  sobrenaturais: [
    { nome: "Assombrado", descricao: "Você é atormentado por um espírito.", ganho: 3 },
    { nome: "Futuro Negro", descricao: "Destino trágico inevitável.", ganho: 5 },
    { nome: "Presença Sinistra", descricao: "Perturba humanos e vampiros socialmente.", ganho: 2 },
    { nome: "Amaldiçoado", descricao: "Você carrega uma maldição.", ganho: 1 }
  ]
};

let pontosDisponiveis = 5;
let meritosSelecionados = [];
let falhasSelecionadas = [];

function atualizarPontos() {
  const totalMeritos = meritosSelecionados.reduce((acc, m) => acc + m.custo, 0);
  const totalFalhas = falhasSelecionadas.reduce((acc, f) => acc + f.ganho, 0);
  pontosDisponiveis = 5 + totalFalhas - totalMeritos;
  document.getElementById('pontosRestantes').textContent = pontosDisponiveis;
}

function criarListaCategoria(lista, containerId, tipo, selecionadosSalvos) {
  const container = document.getElementById(containerId);

  lista.forEach((opcao, i) => {
    const isSelecionado = selecionadosSalvos.some(o => o.nome === opcao.nome);
    const li = document.createElement('li');
    li.innerHTML = `
      <label>
        <input type="checkbox" ${isSelecionado ? "checked" : ""} onchange="toggleOpcao('${tipo}', '${containerId}', ${i})"/>
        <strong>${opcao.nome}</strong> (${tipo === 'merito' ? `Custo: ${opcao.custo}` : `Ganho: ${opcao.ganho}`})<br/>
        <small>${opcao.descricao}</small>
      </label>
    `;
    container.appendChild(li);

    if (isSelecionado) {
      if (tipo === 'merito') meritosSelecionados.push(opcao);
      else falhasSelecionadas.push(opcao);
    }
  });
}

function toggleOpcao(tipo, categoriaId, index) {
  const base = tipo === 'merito' ? meritos : falhas;
  const selecionados = tipo === 'merito' ? meritosSelecionados : falhasSelecionadas;

  const categoria = categoriaId.replace(/^.*(Fisicos|Mentais|Sociais|Sobrenaturais)$/, (m, p) => p.toLowerCase());
  const lista = base[categoria];

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

  nextStep();
}

window.addEventListener('DOMContentLoaded', () => {
  const salvosMeritos = JSON.parse(localStorage.getItem("ficha.meritos") || "[]");
  const salvosFalhas = JSON.parse(localStorage.getItem("ficha.falhas") || "[]");

  criarListaCategoria(meritos.fisicos, "meritosFisicos", "merito", salvosMeritos);
  criarListaCategoria(meritos.mentais, "meritosMentais", "merito", salvosMeritos);
  criarListaCategoria(meritos.sociais, "meritosSociais", "merito", salvosMeritos);
  criarListaCategoria(meritos.sobrenaturais, "meritosSobrenaturais", "merito", salvosMeritos);

  criarListaCategoria(falhas.fisicos, "falhasFisicos", "falha", salvosFalhas);
  criarListaCategoria(falhas.mentais, "falhasMentais", "falha", salvosFalhas);
  criarListaCategoria(falhas.sociais, "falhasSociais", "falha", salvosFalhas);
  criarListaCategoria(falhas.sobrenaturais, "falhasSobrenaturais", "falha", salvosFalhas);

  atualizarPontos();
});
