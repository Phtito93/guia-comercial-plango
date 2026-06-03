/*
=====================================================
ANALYTICS
=====================================================
*/

let visualizacoes =
    JSON.parse(
        localStorage.getItem(
            "visualizacoes"
        )
    ) || {};

function registrarVisualizacao(id) {

    /*
    =====================================
    INIT
    =====================================
    */

    if (!visualizacoes[id]) {

        visualizacoes[id] = 0;

    }

    /*
    =====================================
    SOMA
    =====================================
    */

    visualizacoes[id]++;

    /*
    =====================================
    STORAGE
    =====================================
    */

    localStorage.setItem(

        "visualizacoes",

        JSON.stringify(
            visualizacoes
        )

    );

}

function logTopEmpresas() {

    const ranking = empresas.map((empresa) => {

        return {

            nome:
                empresa.nome,

            views:
                visualizacoes[empresa.id] || 0

        };

    });

    ranking.sort((a, b) => {

        return b.views - a.views;

    });
    

}