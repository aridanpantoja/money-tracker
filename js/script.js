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

const mesDropdown = document.querySelector("#mes-dropdown");
const tituloMes = document.querySelector("#titulo-mes");
const estatisticasGastos = document.querySelector("#estatisticas-gastos");
const formularioGastos = document.querySelector("#formulario-gastos");

const orcamento = 8500;

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
  mesEncontrado.categorias[categoriaGasto] = 0;
  estatisticasGastos.removeChild(cardGasto);
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

  // Adiciona despesa
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);

  if (mesEncontrado.categorias[categoriaGasto] === 0) {
    mesEncontrado.categorias[categoriaGasto] = valorGasto;
    criaCardGasto(mesEncontrado, categoriaGasto, valorGasto);
  } else {
    mesEncontrado.categorias[categoriaGasto] = valorGasto;
    atualizaGasto(mesEncontrado, categoriaGasto, valorGasto);
  }

  inputGasto = "";
});

mesDropdown.addEventListener("change", (e) => {
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);
  tituloMes.innerText = mesDropdown.options[mesDropdown.selectedIndex].text;
  estatisticasGastos.innerHTML = "";

  for (let categoria in mesEncontrado.categorias) {
    if (mesEncontrado.categorias[categoria] !== 0) {
      criaCardGasto(
        mesEncontrado,
        categoria,
        mesEncontrado.categorias[categoria]
      );
    }
  }
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
    mesEncontrado.categorias[key];
    valorMensal += mesEncontrado.categorias[key];
  }
  console.log(
    `O gasto total do mês de ${mesEncontrado.mes} é de R$ ${valorMensal.toFixed(2)}.`
  );
}
