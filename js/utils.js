export function formatMoney(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function getRemoveId(categoria, mes) {
  return `remove-${categoria}-${mes}`;
}

export function getUpdateId(categoria, mes) {
  return `update-${categoria}-${mes}`;
}
