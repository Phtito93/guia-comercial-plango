/*
=====================================================
LER URL
=====================================================
*/

function carregarEstadoDaURL() {

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

        return;

    }

    /*
    =====================================
    PARTES
    =====================================
    */

    const partes =
        path.split("/");

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (
        partes[1] === "categoria"
    ) {

        estado.modo =
            "categoria";

        estado.categoriaAtual =
            decodeURIComponent(
                partes[2]
            );

    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (
        partes[1] === "buscar"
    ) {

        estado.modo =
            "busca";

        estado.busca =
            decodeURIComponent(
                partes[2]
            );

        searchInput.value =
            estado.busca;

    }

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (
        partes[1] === "favoritos"
    ) {

        somenteFavoritos =
            true;

    }

}

/*
=====================================================
ATUALIZAR TITLE
=====================================================
*/

function atualizarTitle() {

    /*
    =====================================
    HOME
    =====================================
    */

    if (estado.modo === "home") {
        document.title =
            "Guia Comercial • Empresas em Destaque";
    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (
        estado.modo === "categoria"
        &&
        estado.categoriaAtual
    ) {

        document.title =
            `${estado.categoriaAtual} • Guia Comercial`;
    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (
        estado.modo === "busca"
        &&
        estado.busca
    ) {

        document.title =
            `Busca: ${estado.busca} • Guia Comercial`;
    }
}

/*
=====================================================
SEO
=====================================================
*/

function atualizarSEO() {

    /*
    =====================================
    TITLE
    =====================================
    */

    let titulo =
        "Guia Comercial de Planaltina GO";

    /*
    =====================================
    DESCRIPTION
    =====================================
    */

    let descricao =
        "Encontre empresas, lojas, serviços e comércios em Planaltina GO.";

    /*
    =====================================
    HOME
    =====================================
    */

    if (estado.modo === "home") {

        titulo =
            "Guia Comercial de Planaltina GO";

        descricao =
            "Empresas em destaque em Planaltina GO.";

    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (
        estado.modo === "categoria"
        &&
        estado.categoriaAtual
    ) {

        titulo = `
            ${estado.categoriaAtual}
            em Planaltina GO
        `;

        descricao = `
            Confira as melhores opções de
            ${estado.categoriaAtual}
            em Planaltina GO.
        `;

    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (
        estado.modo === "busca"
        &&
        estado.busca
    ) {

        titulo = `
            Resultado para
            ${estado.busca}
        `;

        descricao = `
            Empresas encontradas para
            ${estado.busca}
            em Planaltina GO.
        `;

    }

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (somenteFavoritos) {

        titulo =
            "Meus Favoritos";

        descricao =
            "Empresas favoritadas no guia comercial.";

    }

    /*
    =====================================
    TITLE
    =====================================
    */

    document.title =
        titulo;

    /*
    =====================================
    META DESCRIPTION
    =====================================
    */

    const metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );

    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            descricao
        );

    }

}