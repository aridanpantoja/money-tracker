import { totaisNoAno, gastos } from "./db.js";
import { formatMoney, getRemoveId, getUpdateId } from "./utils.js";

const mesDropdown = document.querySelector("#mes-dropdown");
const tituloMes = document.querySelector("#titulo-mes");
const estatisticasGastos = document.querySelector("#estatisticas-gastos");
const formularioGastos = document.querySelector("#formulario-gastos");
const orcamento = document.querySelector("#orcamento");
const estatisticaAno = document.querySelector("#estatisticas-ano");
const gastoMensal = document.querySelector("#gasto-mensal");
const gastoAnual = document.querySelector("#gasto-anual");

function atualizarTotaisAnuais(categoria, valor) {
  totaisNoAno[categoria] += valor;
}

function exibirTotaisNoAno() {
  estatisticaAno.innerHTML = "";

  for (let categoria in totaisNoAno) {
    if (totaisNoAno[categoria] !== 0) {
      const cardAno = document.createElement("div");
      cardAno.classList.add("card-total-ano");
      cardAno.innerHTML = `
        <h3 class="card-total-ano__title">${
          categoria.charAt(0).toUpperCase() + categoria.slice(1)
        }</h3>
        <p class="card-total-ano__value">${formatMoney(
          totaisNoAno[categoria]
        )}</p>
      `;

      estatisticaAno.appendChild(cardAno);
    }
  }
}

function atualizaOrcamento(mesEncontrado, valor) {
  const orcamentoRestante = mesEncontrado.orcamento - valor;
  mesEncontrado.orcamento -= valor;
  orcamento.innerText = formatMoney(orcamentoRestante);
}

function criaCardGasto(mesEncontrado, categoriaGasto, valor) {
  const categoriaLabel = document.querySelector(
    `option[value="${categoriaGasto}"]`
  ).innerText;
  const mes = mesEncontrado.mes;
  const removeId = getRemoveId(categoriaGasto, mes);
  const updateId = getUpdateId(categoriaGasto, mes);

  const cardGasto = document.createElement("div");
  cardGasto.classList.add("card-gasto");
  cardGasto.innerHTML = `
    <h3 class="card-gasto__title">${categoriaLabel}</h3>
    <p id="${updateId}" class="card-gasto__value">${formatMoney(valor)}</p>
    <button id="${removeId}" class="card-gasto__remove"><i class="fa-solid fa-trash"></i></button>
    `;

  estatisticasGastos.appendChild(cardGasto);

  document.getElementById(removeId).addEventListener("click", () => {
    removeGasto(mesEncontrado, categoriaGasto, cardGasto);
  });
}

function removeGasto(mesEncontrado, categoriaGasto, cardGasto) {
  const valor = mesEncontrado.categorias[categoriaGasto];
  mesEncontrado.categorias[categoriaGasto] = 0;
  estatisticasGastos.removeChild(cardGasto);

  const orcamentoRestante = (mesEncontrado.orcamento += valor);
  orcamento.innerText = formatMoney(orcamentoRestante);

  totaisNoAno[categoriaGasto] -= valor;

  gastoMensal.innerHTML = gastoMensalTotal();
  gastoAnual.innerHTML = gastoAnualTotal();
  exibirTotaisNoAno();
}

formularioGastos.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputGasto = document.querySelector("#valor-gasto").value;
  const valorGasto = parseFloat(inputGasto);
  const categoriaGasto = document.querySelector("#categoria-gasto").value;

  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);

  if (mesEncontrado.categorias[categoriaGasto] === 0) {
    mesEncontrado.categorias[categoriaGasto] = valorGasto;
    criaCardGasto(mesEncontrado, categoriaGasto, valorGasto);

    atualizaOrcamento(mesEncontrado, valorGasto);
    atualizarTotaisAnuais(categoriaGasto, valorGasto);
    exibirTotaisNoAno();
  } else {
    alert(`O valor de ${categoriaGasto} já está definido!`);
  }

  gastoMensal.innerHTML = gastoMensalTotal();
  gastoAnual.innerHTML = gastoAnualTotal();
  inputGasto = "";
});

mesDropdown.addEventListener("change", (e) => {
  const mesEncontrado = gastos.find((item) => item.mes === mesDropdown.value);
  tituloMes.innerText = mesDropdown.options[mesDropdown.selectedIndex].text;
  orcamento.innerText = formatMoney(mesEncontrado.orcamento);
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

  orcamento.innerText = formatMoney(mesEncontrado.orcamento);

  gastoMensal.innerHTML = gastoMensalTotal();
  gastoAnual.innerHTML = gastoAnualTotal();
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
  return formatMoney(valorMensal);
}

function gastoAnualTotal() {
  let somaTotalAnual = 0;

  for (let categoria in totaisNoAno) {
    somaTotalAnual += totaisNoAno[categoria];
  }
  return formatMoney(somaTotalAnual);
}
