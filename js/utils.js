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
