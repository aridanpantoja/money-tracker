const gastos = [
	{ mes: 'janeiro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0, entretenimento: 0 } },
	{ mes: 'fevereiro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'marco ', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'abril', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'maio', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'junho', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'julho', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'agosto', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'setembro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'outubro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'novembro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
	{ mes: 'dezembro', despesas: { energia: 0, agua: 0, aluguel: 0, escola: 0, supermercado: 0 } },
]

const formularioGastos = document.getElementById('formulario');

formularioGastos.addEventListener('submit', (e) => {
    e.preventDefault();

    const valorGasto =  parseFloat(document.getElementById('valor').value);
    const tipoGasto = document.getElementById('tipo').value;
    const mesGasto = document.getElementById('mes').value;
	const removerGasto = document.getElementById('remover').checked;

	

    const mesEncontrado = gastos.find(item => item.mes === mesGasto);

    if (mesEncontrado) {
		if (removerGasto) {
			mesEncontrado.despesas[tipoGasto] = 0;
		} else {
			if (mesEncontrado.despesas[tipoGasto] === 0) {
				mesEncontrado.despesas[tipoGasto] = valorGasto;
				mesEncontrado.despesas['ornitorrinco'] = 0;
			} else {
				mesEncontrado.despesas[tipoGasto] = valorGasto;
				alert("Você está editando o valor");
			}
		}
		

    } else {
        console.log('Mês não encontrado!')
    }

	console.log({ mesEncontrado })
});