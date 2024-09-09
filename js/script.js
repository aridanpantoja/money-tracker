const totaisNoAno = {
  energia: 0,
  agua: 0,
  aluguel: 0,
  escola: 0,
  supermercado: 0,
};

const gastos = [
  {
    mes: "janeiro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "fevereiro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "marco",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "abril",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "maio",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "junho",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "julho",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "agosto",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "setembro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "outubro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "novembro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
  {
    mes: "dezembro",
    categorias: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 },
  },
];

let orcamentoTotal = 8500;
let orcamentoRestante = orcamentoTotal;

const mesDropdown = document.querySelector("#mes-dropdown");
const tituloMes = document.querySelector("#titulo-mes");
const estatisticasGastos = document.querySelector("#estatisticas-gastos");
const formularioGastos = document.querySelector("#formulario-gastos");
const orcamentoRestanteElement = document.querySelector("#orcamento-restante");
const estatisticaAno = document.querySelector("#estatisticas-ano");

function atualizarTotaisAnuais(categoria, valor) {
  totaisNoAno[categoria] += valor;
}

function exibirTotaisNoAno() {
  estatisticaAno.innerHTML = "<h2>Total Anual</h2>";

  let somaTotalAnual = 0;

  for (let categoria in totaisNoAno) {
    const cardAno = document.createElement("div");
    cardAno.classList.add("card-total-ano");
    cardAno.innerHTML = `
      <h3>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}</h3>
      <p> Total do Ano: R$${totaisNoAno[categoria].toFixed(2)}</p>
  `;
    estatisticaAno.appendChild(cardAno);

    somaTotalAnual += totaisNoAno[categoria];
  }
  const totalGeralCard = document.createElement("div");
  totalGeralCard.classList.add("card-total-ano");
  totalGeralCard.innerHTML = `
    <h3>Total Geral Anual</h3>
    <p> R$ ${somaTotalAnual.toFixed(2)}</p>
  `;
  estatisticaAno.appendChild(totalGeralCard);
}

function atualizarOrcamentoRestante(valor) {
  orcamentoRestante -= valor;
  orcamentoRestanteElement.innerText = orcamentoRestante.toFixed(2);
}

function getRemoveId(categoria, mes) {
  return `remove-${categoria}-${mes}`;
}

function getUpdateId(categoria, mes) {
  return `update-${categoria}-${mes}`;
}

function criaCardGasto(mesEncontrado, categoriaGasto, valor) {
  const categoriaLabel = document.querySelector(
    `option[value="${categoriaGasto}"]`
  ).innerText;
  const mes = mesEncontrado.mes;
  const removeId = getRemoveId(categoriaGasto, mes);
  const updateId = getUpdateId(categoriaGasto, mes);

  const cardGasto = document.createElement("div");
  cardGasto.innerHTML = `
    <h3>${categoriaLabel}</h3>
    <p>R$<span id="${updateId}">${valor.toFixed(2)}</span></p>
    <button id="${removeId}">X</button>
    `;

  estatisticasGastos.appendChild(cardGasto);

  document.getElementById(removeId).addEventListener("click", () => {
    removeGasto(mesEncontrado, categoriaGasto, cardGasto);
    console.log(gastos);
  });
}

function removeGasto(mesEncontrado, categoriaGasto, cardGasto) {
  const valor = mesEncontrado.categorias[categoriaGasto];
  mesEncontrado.categorias[categoriaGasto] = 0;
  estatisticasGastos.removeChild(cardGasto);

  orcamentoRestante += valor;
  orcamentoRestanteElement.innerText = orcamentoRestante.toFixed(2);

  totaisNoAno[categoriaGasto] -= valor;
  exibirTotaisNoAno();
}

function atualizaGasto(mesEncontrado, categoriaGasto, valor) {
  alert("Você está atualizando um gasto");
  const updateId = getUpdateId(categoriaGasto, mesEncontrado.mes);
  const valorGasto = document.getElementById(updateId);
  console.log(valorGasto);

  mesEncontrado.categorias[categoriaGasto] = valor;
  valorGasto.innerText = valor.toFixed(2);
}

formularioGastos.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputGasto = document.querySelector("#valor-gasto").value;
  const valorGasto = parseFloat(inputGasto);
  const categoriaGasto = document.querySelector("#categoria-gasto").value;
  const gastoMensal = document.querySelector("#gasto-mensal");
  const gastoAnual = document.querySelector("#gasto-anual");
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);

  if (mesEncontrado.categorias[categoriaGasto] === 0) {
    mesEncontrado.categorias[categoriaGasto] = valorGasto;
    criaCardGasto(mesEncontrado, categoriaGasto, valorGasto);

    atualizarOrcamentoRestante(valorGasto);
    atualizarTotaisAnuais(categoriaGasto, valorGasto);
    exibirTotaisNoAno();
  } else {
    alert(
      "Já existe um gasto para essa categoria nesse mês. Atualize o valor se necessário"
    );

    document.querySelector("#valor-gasto").value = "";
  }
  gastoMensal.innerHTML = gastoMensalTotal();
  gastoAnual.innerHTML = gastoAnualTotal();
});

inputGasto = "";

mesDropdown.addEventListener("change", (e) => {
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);
  tituloMes.innerText = mesDropdown.options[mesDropdown.selectedIndex].text;
  estatisticasGastos.innerHTML = "";

  let totalGasto = 0;

  for (let categoria in mesEncontrado.categorias) {
    if (mesEncontrado.categorias[categoria] !== 0) {
      criaCardGasto(
        mesEncontrado,
        categoria,
        mesEncontrado.categorias[categoria]
      );
      totalGasto += mesEncontrado.categorias[categoria];
    }
  }

  orcamentoRestante = orcamentoTotal - totalGasto;
  orcamentoRestanteElement.innerText = orcamentoRestante.toFixed(2);
});

function listarGastoDetalhado() {
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);
  console.log(
    `No mês de ${
      mesEncontrado.mes
    }, foi gasto com energia R$ ${mesEncontrado.categorias.energia.toFixed(
      2
    )}, com água R$ ${mesEncontrado.categorias.agua.toFixed(
      2
    )}, com aluguel R$ ${mesEncontrado.categorias.aluguel.toFixed(
      2
    )}, com escola R$ ${mesEncontrado.categorias.escola.toFixed(
      2
    )} e com supermercado R$ ${mesEncontrado.categorias.supermercado.toFixed(
      2
    )}.`
  );
}

function gastoMensalTotal() {
  let valorMensal = 0;
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);
  for (let key in mesEncontrado.categorias) {
    valorMensal += mesEncontrado.categorias[key];
  }
  return valorMensal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function gastoAnualTotal() {
  let somaTotalAnual = 0;

  for (let categoria in totaisNoAno) {
    somaTotalAnual += totaisNoAno[categoria];
  }
  return somaTotalAnual.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
