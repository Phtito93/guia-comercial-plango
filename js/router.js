/*router.js*/
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
    
    /*
    =====================================
    PATH
    =====================================
    */

    const path =
        window.location.pathname;

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

        if (
            estado.modo !== "home"
            ||
            estado.filtroHome
            ||
            somenteFavoritos
        ) {

            voltarHome();

        }

        return;

    }

    const path = window.location.pathname;

    if (
        !somenteFavoritos
    ) {

        favoritosBtn?.classList.remove(
            "active"
        );

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

        estado.filtroHome =
            null;

        paginaAtual = 1;

        /*
        =================================
        DEFINE HOME APENAS
        SE NÃO EXISTIR CONTEXTO
        =================================
        */

        if (

            estado.modo !== "categoria"
            &&
            estado.modo !== "busca"

        ) {

            estado.modo =
                "home";

        }

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
        
        searchInput.value = "";

        estado.categoriaAtual =
            categoria;

        estado.filtroHome =
            null;

        paginaAtual = 1;

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

        estado.categoriaAtual =
            null;

        estado.busca =
            busca;

        estado.filtroHome =
            null;  

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