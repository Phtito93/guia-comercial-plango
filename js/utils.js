/*
=====================================================
HELPERS
=====================================================
*/

function normalizarTexto(texto = "") {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

/*
=====================================================
TOTAL INTERAÇÕES
=====================================================
*/

function calcularTotalInteracoes(

    empresa

) {

    return (

        (empresa.whatsapp_clicks || 0)

        +

        (empresa.instagram_clicks || 0)

        +

        (empresa.telefone_clicks || 0)

        +

        (empresa.site_clicks || 0)

        +

        (empresa.email_clicks || 0)

        +

        (empresa.localizacao_clicks || 0)

    );

}

/*
=====================================================
SCORE EMPRESA
=====================================================
*/

function calcularScore(

    empresa

) {

    return (

        (empresa.views || 0)

        +

        (calcularTotalInteracoes(empresa) * 5)

    );

}

/*
=====================================================
EMPRESA NOVA
=====================================================
*/

function empresaNova(empresa) {

    if (
        !empresa.createdAt
    ) {

        return false;

    }

    const dataCadastro =

        new Date(
            empresa.createdAt
        );

    const hoje =
        new Date();

    const dias =

        Math.floor(

            (hoje - dataCadastro)

            /

            86400000

        );

    return dias <= 30;

}
