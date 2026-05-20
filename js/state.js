/*
=====================================================
state.js
ESTADO GLOBAL
=====================================================
*/

let estado = {

    modo: "home",

    categoriaAtual: null,

    filtroHome: null,

    busca: "",

    status: "todos",

    ordenacao: "populares"

};

let somenteFavoritos = false;

let paginaAtual = 1;

let empresas = [];

let cardsHTML = "";

/*
=====================================================
FAVORITOS
=====================================================
*/

let favoritos =
    JSON.parse(
        localStorage.getItem(
            "favoritos"
        )
    ) || [];

/*
=====================================================
PERSISTÊNCIA
=====================================================
*/

const ESTADO_SALVO =
    JSON.parse(
        localStorage.getItem(
            "estadoApp"
        )
    );

/*
=====================================================
RESTORE STATE
=====================================================
*/

if (ESTADO_SALVO) {

    estado = {

        ...estado,

        ...ESTADO_SALVO.estado

    };

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    somenteFavoritos =
        ESTADO_SALVO.somenteFavoritos || false;

    /*
    =====================================
    PAGINA
    =====================================
    */

    paginaAtual =
        ESTADO_SALVO.paginaAtual || 1;

}

/*
=====================================================
SALVAR ESTADO
=====================================================
*/

function salvarEstado() {

    localStorage.setItem(

        "estadoApp",

        JSON.stringify({

            estado,
            somenteFavoritos,
            paginaAtual

        })

    );

}







