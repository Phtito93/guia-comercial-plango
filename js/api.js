/*
=====================================================
FETCH INICIAL
=====================================================
*/

async function carregarEmpresas() {

    try {

        /*
        =====================================
        SKELETON
        =====================================
        */

        renderizarSkeleton();

        /*
        =====================================
        FETCH
        =====================================
        */

        const response = await fetch(API_EMPRESAS);

        await new Promise((resolve) => {
            setTimeout(resolve, 1200);
        }); 

        empresas = await response.json();

        /*
        =====================================
        URL
        =====================================
        */

        carregarEstadoDaURL();

        /*
        =====================================
        HOME INICIAL
        =====================================
        */

        estado.modo = "home";

        atualizarInterface();

    } catch (erro) {

        console.error(erro);
    }
}
