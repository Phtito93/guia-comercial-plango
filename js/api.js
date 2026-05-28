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
        SUPABASE
        =====================================
        */

        const {

            data,

            error

        } = await supabaseClient

            .from("empresas")

            .select("*");

        /*
        =====================================
        ERROR
        =====================================
        */

        if (
            error
        ) {

            console.error(error);

            mostrarToast(
                "Erro ao carregar empresas"
            );

            return;

        }

        /*
        =====================================
        DATA
        =====================================
        */

        empresas = data || [];

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
