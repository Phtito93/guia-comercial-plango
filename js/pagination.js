/*
=====================================================
PAGINAÇÃO
=====================================================
*/

function atualizarPaginacao(lista) {

    const totalPaginas = Math.ceil(lista.length / EMPRESAS_POR_PAGINA);

    paginaInfo.textContent = `Página ${paginaAtual}`;

    btnAnterior.disabled = paginaAtual <= 1;

    btnProximo.disabled = paginaAtual >= totalPaginas
    ||
    totalPaginas === 0;
}
