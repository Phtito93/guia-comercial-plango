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

        empresas =

            (data || []).map(

                empresa => ({

                    ...empresa,

                    createdAt:
                        empresa.created_at,

                    whatsappClicks:
                        empresa.whatsapp_clicks,

                    instagramClicks:
                        empresa.instagram_clicks,

                    telefoneClicks:
                        empresa.telefone_clicks,

                    siteClicks:
                        empresa.site_clicks,

                    localizacaoClicks:
                        empresa.localizacao_clicks,

                    emailClicks:
                        empresa.email_clicks

                })

            );

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
    

        estado.modo = "home";

        atualizarInterface();*/

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

/*
=====================================================
INCREMENTAR CLIQUES
=====================================================
*/

async function incrementarCliqueContato(

    empresaId,

    campo

) {

    try {

        const {

            data,

            error: erroBusca

        } = await supabaseClient

            .from("empresas")

            .select(campo)

            .eq(
                "id",
                empresaId
            )

            .single();

        if (
            erroBusca
        ) {

            console.error(
                erroBusca
            );

            return;

        }

        const novoTotal =

            (data[campo] || 0)

            + 1;

        const {

            error

        } = await supabaseClient

            .from("empresas")

            .update({

                [campo]:
                    novoTotal

            })

            .eq(
                "id",
                empresaId
            );

        if (
            error
        ) {

            console.error(
                error
            );

        }

    } catch (erro) {

        console.error(
            erro
        );

    }

}

/*
=====================================================
ATUALIZAR EMPRESAS
=====================================================
*/

async function atualizarEmpresas() {

    try {

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

            return;

        }

        /*
        =====================================
        UPDATE MEMORY
        =====================================
        */

        empresas =

            (data || []).map(

                empresa => ({

                    ...empresa,

                    createdAt:
                        empresa.created_at,

                    whatsappClicks:
                        empresa.whatsapp_clicks,

                    instagramClicks:
                        empresa.instagram_clicks,

                    telefoneClicks:
                        empresa.telefone_clicks,

                    siteClicks:
                        empresa.site_clicks,

                    localizacaoClicks:
                        empresa.localizacao_clicks,

                    emailClicks:
                        empresa.email_clicks

                })

            );

    } catch (erro) {

        console.error(erro);

    }

}