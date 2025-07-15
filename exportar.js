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
  const habilidadesList = [
    'prontidao', 'esportes', 'briga', 'esquiva', 'empatia', 'expressao', 'intimidacao', 'lideranca', 'manha', 'labia',
    'empatia-animais', 'oficios', 'conducao', 'etiqueta', 'armas-fogo', 'armas-brancas', 'performance', 'seguranca', 'furtividade', 'sobrevivencia',
    'academicos', 'computador', 'financas', 'investigacao', 'direito', 'linguistica', 'medicina', 'ocultismo', 'politica', 'ciencia'
  ];

  habilidadesList.forEach(hab => {
    document.getElementById(hab).textContent = habilidades[hab] ? habilidades[hab] : 0;
  });

  const especializacoes = JSON.parse(localStorage.getItem('ficha.especializacoes') || "{}");
  Object.entries(especializacoes).forEach(([chave, valor]) => {
    document.getElementById(chave + '-especial').textContent = valor;
  });

  const disciplinas = JSON.parse(localStorage.getItem('ficha.disciplinas') || "{}");
  const nomes = Object.keys(disciplinas);
  document.getElementById('d1').textContent = nomes[0] ? `${nomes[0]} (${disciplinas[nomes[0]]})` : "";
  document.getElementById('d2').textContent = nomes[1] ? `${nomes[1]} (${disciplinas[nomes[1]]})` : "";
  document.getElementById('d3').textContent = nomes[2] ? `${nomes[2]} (${disciplinas[nomes[2]]})` : "";

  // 🔽 Informações da história
  const historiaDiv = document.querySelector('.historia');
  if (historiaDiv) {
    const birthYear = localStorage.getItem('historia.birthYear');
    const ambition = localStorage.getItem('historia.ambition');
    const desire = localStorage.getItem('historia.desire');
    const convictions = JSON.parse(localStorage.getItem('historia.convictions') || '[]');

    let html = '';
    if (birthYear) html += `<p><strong>Ano de Nascimento:</strong> ${birthYear}</p>`;
    if (ambition) html += `<p><strong>Ambição:</strong> ${ambition}</p>`;
    if (desire) html += `<p><strong>Desejo:</strong> ${desire}</p>`;
    if (convictions.length > 0) {
      html += `<p><strong>Convicções e Modelos:</strong></p><ul>`;
      convictions.forEach(c => {
        html += `<li><strong>${c.conviction}</strong> — Modelo: ${c.model}</li>`;
      });
      html += `</ul>`;
    }

    historiaDiv.innerHTML = html;
  }

  // 🔽 Informações de méritos
  const meritosDiv = document.querySelector('.meritos');
  const meritos = JSON.parse(localStorage.getItem('ficha.meritos') || '[]');
  if (meritosDiv && meritos.length > 0) {
    let html = '<ul>';
    meritos.forEach(m => {
      html += `<li><strong>${m.nome}</strong> (Custo: ${m.custo}) — ${m.descricao}</li>`;
    });
    html += '</ul>';
    meritosDiv.innerHTML = html;
  }

  // 🔽 Informações de falhas
  const falhasDiv = document.querySelector('.falhas');
  const falhas = JSON.parse(localStorage.getItem('ficha.falhas') || '[]');
  if (falhasDiv && falhas.length > 0) {
    let html = '<ul>';
    falhas.forEach(f => {
      html += `<li><strong>${f.nome}</strong> (Ganho: ${f.ganho}) — ${f.descricao}</li>`;
    });
    html += '</ul>';
    falhasDiv.innerHTML = html;
  }
}


function exportJSON() {
  const ficha = {
    jogador: localStorage.getItem('ficha.playerName') || "",
    personagem: localStorage.getItem('ficha.characterName') || "",
    clan: localStorage.getItem('ficha.clan') || "",
    atributos: JSON.parse(localStorage.getItem('ficha.atributos') || "{}"),
    habilidades: JSON.parse(localStorage.getItem('ficha.habilidades') || "{}"),
    distribution: localStorage.getItem('ficha.distribution') || "jack",
    especializacoes: JSON.parse(localStorage.getItem('ficha.especializacoes') || "{}"),
    disciplinas: JSON.parse(localStorage.getItem('ficha.disciplinas') || "{}")
  };

  // Ordenar atributos
  const atributosOrdenados = {};
  Object.keys(ficha.atributos).sort().forEach(key => {
    atributosOrdenados[key] = ficha.atributos[key];
  });
  ficha.atributos = atributosOrdenados;

  const mensagem = `
    Jogador: ${ficha.jogador}
    Personagem: ${ficha.personagem}
    Clã: ${ficha.clan}
    Atributos:
    ${Object.entries(ficha.atributos).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}
    Habilidades:
    ${Object.entries(ficha.habilidades).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}
    Distribuição: ${ficha.distribution}
    Especializações:
    ${Object.entries(ficha.especializacoes).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}
    Disciplinas:
    ${Object.entries(ficha.disciplinas).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}
  `;

  const formData = new FormData();
  formData.append("message", mensagem);

  fetch("https://formspree.io/f/mdkdngen", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
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

async function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const ficha = {
    jogador: localStorage.getItem('ficha.playerName') || "",
    personagem: localStorage.getItem('ficha.characterName') || "",
    clan: localStorage.getItem('ficha.clan') || "",
    atributos: JSON.parse(localStorage.getItem('ficha.atributos') || "{}"),
    habilidades: JSON.parse(localStorage.getItem('ficha.habilidades') || "{}"),
    distribution: localStorage.getItem('ficha.distribution') || "jack",
    especializacoes: JSON.parse(localStorage.getItem('ficha.especializacoes') || "{}"),
    disciplinas: JSON.parse(localStorage.getItem('ficha.disciplinas') || "{}")
  };

  // Conteúdo do PDF
  let y = 10;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Ficha de Personagem - Vampiro: A Máscara", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text(`Jogador: ${ficha.jogador}`, 10, y); y += 7;
  doc.text(`Personagem: ${ficha.personagem}`, 10, y); y += 7;
  doc.text(`Clã: ${ficha.clan}`, 10, y); y += 10;

  doc.setFont("Helvetica", "bold");
  doc.text("Atributos:", 10, y); y += 7;
  doc.setFont("Helvetica", "normal");
  Object.entries(ficha.atributos).sort().forEach(([key, val]) => {
    doc.text(`- ${key}: ${val}`, 12, y);
    y += 6;
  });

  y += 6;
  doc.setFont("Helvetica", "bold");
  doc.text("Habilidades:", 10, y); y += 7;
  doc.setFont("Helvetica", "normal");
  Object.entries(ficha.habilidades).forEach(([key, val]) => {
    doc.text(`- ${key}: ${val}`, 12, y);
    y += 6;
  });

  doc.addPage();

  y = 10

  y += 8;
  doc.text(`Distribuição: ${ficha.distribution}`, 10, y);

  y += 6;
  doc.setFont("Helvetica", "bold");
  doc.text("Especializações:", 10, y); y += 7;
  doc.setFont("Helvetica", "normal");
  Object.entries(ficha.especializacoes).forEach(([key, val]) => {
    doc.text(`- ${key}: ${val}`, 12, y);
    y += 6;
  });

  y += 6;
  doc.setFont("Helvetica", "bold");
  doc.text("Disciplinas:", 10, y); y += 7;
  doc.setFont("Helvetica", "normal");
  Object.entries(ficha.disciplinas).forEach(([key, val]) => {
    doc.text(`- ${key}: ${val}`, 12, y);
    y += 6;
  });

  // Salva o arquivo
  doc.save(`Ficha_${ficha.personagem || 'personagem'}.pdf`);
}


preencherFicha();