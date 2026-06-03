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

    window.scrollTo(
        0,
        0
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

async function aplicarRota() {

    /*
    =====================================
    REFRESH DADOS
    =====================================
    */

    await atualizarEmpresas();
    
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

        estado.modo =
            "home";

        atualizarInterface();

        return;

    }

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (
        path !== "/favoritos"
    ) {

        somenteFavoritos = false;

        favoritosBtn?.classList.remove(
            "active"
        );

    }

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

        favoritosBtn?.classList.toggle(
            "active",
            somenteFavoritos
        );

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

        favoritosBtn?.classList.toggle(
            "active",
            somenteFavoritos
        );

        atualizarInterface();

        return;

    }

    /*
    =====================================
    POLÍTICA DE PRIVACIDADE
    =====================================
    */

    if (
        path === "/politica-de-privacidade"
    ) {

        estado.modo =
            "privacidade";

        renderizarPoliticaPrivacidade();

        return;

    }

    /*
    =====================================
    TERMOS DE USO
    =====================================
    */

    if (
        path === "/termos-de-uso"
    ) {

        estado.modo =
            "termos";

        renderizarTermosUso();

        return;

    }

    /*
    =====================================
    ADMIN LOGIN
    =====================================
    */

    if (
        path === "/admin-login"
    ) {

        estado.modo =
            "admin-login";

        renderizarLoginAdmin();

        return;

    }

    /*
    =====================================
    ADMIN
    =====================================
    */

    if (
        path === "/admin"
    ) {

        const {

            data: {

                user

            }

        } = await supabaseClient

            .auth

            .getUser();

        if (
            !user
        ) {

            navegar(
                "/admin-login"
            );

            return;

        }

        await carregarLeads();

        estado.modo =
            "admin";

        renderizarDashboardAdmin();

        return;

    }

    /*
    =====================================
    NOVA EMPRESA
    =====================================
    */


    if (
        path === "/nova-empresa"
    ) {

        renderizarFormularioEmpresa();

        return;

    }

    /*
    =====================================
    ANUNCIE
    =====================================
    */

    if (
        path === "/anuncie"
    ) {

        estado.modo =
            "anuncie";

        renderizarPaginaAnuncie();

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