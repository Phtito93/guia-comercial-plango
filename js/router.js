/*
=====================================================
NAVEGAR
=====================================================
*/

function navegar(url) {

    /*
    =====================================
    HISTORY
    =====================================
    */

    history.pushState(

        {},

        "",

        url

    );

    /*
    =====================================
    APPLY
    =====================================
    */

    aplicarRota();

}

/*
=====================================================
ROUTER
=====================================================
*/

function aplicarRota() {

    console.log(window.location.pathname);
    
    /*
    =====================================
    PATH
    =====================================
    */

    const path =
        window.location.pathname;

    /*
    =====================================
    RESET FAVORITOS
    =====================================
    */

    somenteFavoritos = false;

    favoritosBtn?.classList.remove(
        "active"
    );

    /*
    =====================================
    HOME
    =====================================
    */

    if (
        path === "/"
        ||
        path === "/index.html"
    ) {

        voltarHome();

        return;

    }

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (
        path === "/favoritos"
    ) {

        somenteFavoritos = true;

        favoritosBtn?.classList.add(
            "active"
        );

        atualizarInterface();

        return;

    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (
        path.startsWith(
            "/categoria/"
        )
    ) {

        const categoria =
            decodeURIComponent(

                path.replace(
                    "/categoria/",
                    ""

                )

            );

        estado.modo =
            "categoria";

        estado.busca = "";

        estado.categoriaAtual =
            categoria;

        estado.filtroHome =
            categoria;

        atualizarInterface();

        return;

    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (
        path.startsWith(
            "/buscar/"
        )
    ) {

        const busca =
            decodeURIComponent(

                path.replace(
                    "/buscar/",
                    ""

                )

            );

        estado.modo =
            "busca";

        estado.busca =
            busca;

        searchInput.value =
            busca;

        atualizarInterface();

        return;

    }

}

/*
=====================================================
BACK / FORWARD
=====================================================
*/

window.addEventListener(

    "popstate",

    aplicarRota

);