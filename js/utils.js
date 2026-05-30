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
SCORE EMPRESA
=====================================================
*/

function calcularScore(

    empresa

) {

    return (

        (empresa.views || 0)

        +

        (

            (empresa.whatsapp_clicks || 0)

            * 5

        )

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
