/*
=====================================================
TOAST
=====================================================
*/

function mostrarToast(
    mensagem,
    icone = "fa-circle-info"
) {

    /*
    =====================================
    CONTAINER
    =====================================
    */

    const toastContainer =
        document.getElementById(
            "toastContainer"
        );

    /*
    =====================================
    TOAST
    =====================================
    */

    const toast =
        document.createElement(
            "div"
        );

    toast.className = "toast";

    /*
    =====================================
    HTML
    =====================================
    */

    toast.innerHTML = `

        <i class="fa-solid ${icone}"></i>

        <span>
            ${mensagem}
        </span>

    `;

    /*
    =====================================
    APPEND
    =====================================
    */

    toastContainer.appendChild(
        toast
    );

    /*
    =====================================
    REMOVE
    =====================================
    */

    setTimeout(() => {

        toast.classList.add(
            "hide"
        );

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, TOAST_DURATION);

}