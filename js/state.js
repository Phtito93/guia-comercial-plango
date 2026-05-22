/*state.js*/
/*
=====================================================
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

        status:
            ESTADO_SALVO.estado?.status || "todos",

        ordenacao:
            ESTADO_SALVO.estado?.ordenacao || "populares"

    };

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

            estado: {

                status:
                    estado.status,

                ordenacao:
                    estado.ordenacao
            }

        })

    );

}