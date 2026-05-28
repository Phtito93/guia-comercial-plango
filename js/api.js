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

/*
=====================================================
INCREMENTAR VIEWS
=====================================================
*/

async function incrementarViews(

    empresaId

) {

    try {

        /*
        =====================================
        BUSCA VIEWS ATUAIS
        =====================================
        */

        const {

            data,

            error: erroBusca

        } = await supabaseClient

            .from("empresas")

            .select("views")

            .eq(
                "id",
                empresaId
            )

            .single();

        /*
        =====================================
        ERROR
        =====================================
        */

        if (
            erroBusca
        ) {

            console.error(
                erroBusca
            );

            return;

        }

        /*
        =====================================
        NOVO TOTAL
        =====================================
        */

        const novoTotal =

            (data.views || 0) + 1;

        /*
        =====================================
        UPDATE
        =====================================
        */

        const {

            error

        } = await supabaseClient

            .from("empresas")

            .update({

                views:
                    novoTotal

            })

            .eq(
                "id",
                empresaId
            );

        /*
        =====================================
        ERROR UPDATE
        =====================================
        */

        if (
            error
        ) {

            console.error(error);

        }

    } catch (erro) {

        console.error(erro);

    }

}

/*
=====================================================
REGISTRAR VIEW
=====================================================
*/

function registrarView(

    empresaId

) {

    incrementarViews(
        empresaId
    );

}