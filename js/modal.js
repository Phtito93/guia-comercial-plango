/*
=====================================================
MODAL
=====================================================
*/

const empresaModal =
    document.getElementById(
        "empresaModal"
    );

const modalBody =
    document.getElementById(
        "modalBody"
    );

const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );

/*
=====================================================
ABRIR MODAL
=====================================================
*/

function abrirModal(empresa) {

    /*
    =====================================
    HTML
    =====================================
    */

    modalBody.innerHTML = `

        <img
            src="${empresa.imagem}"
            alt="${empresa.nome}"
            style="
                width:100%;
                border-radius:20px;
                margin-bottom:20px;
            "
        >

        <h2>
            ${empresa.nome}
        </h2>

        <p>
            ${empresa.descricao || ""}
        </p>

    `;

    /*
    =====================================
    OPEN
    =====================================
    */

    empresaModal.classList.add(
        "active"
    );

    /*
    =====================================
    BODY LOCK
    =====================================
    */

    document.body.style.overflow =
        "hidden";

}

/*
=====================================================
FECHAR
=====================================================
*/

function fecharModal() {

    empresaModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}

/*
=====================================================
EVENTOS
=====================================================
*/

closeModalBtn.addEventListener(
    "click",
    fecharModal
);

empresaModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        fecharModal
    );

/*
=====================================================
ESC
=====================================================
*/

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            fecharModal();

        }

    }
);