/*
=====================================================
BUSCA EMPRESA
=====================================================
*/

function empresaMatchBusca(empresa, termo) {
    return (
        normalizarTexto(empresa.nome || "")
            .includes(termo)

        ||

        normalizarTexto(empresa.descricao || "")
            .includes(termo)

        ||

        normalizarTexto(empresa.local || "")
            .includes(termo)

        ||

        empresa.categorias?.some((categoria) => {

            return normalizarTexto(categoria)
                .includes(termo);

        })

        ||

        empresa.tags?.some((tag) => {

            return normalizarTexto(tag)
                .includes(termo);
        })
    );
}

/*
=====================================================
RENDER FILTROS ATIVOS
=====================================================
*/

function renderizarFiltrosAtivos() {

    /*
    =====================================
    LIMPA
    =====================================
    */

    activeFilters.innerHTML = "";

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (somenteFavoritos) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                💖 Favoritos

            </div>
        `;

    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (estado.filtroHome) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                📂 ${estado.filtroHome}

            </div>
        `;

    }

    /*
    =====================================
    ORDENAÇÃO - MAIS POPULARES
    =====================================
    */

    if (
        estado.ordenacao ===
        "populares"
    ) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                🔥 Mais populares

            </div>
        `;

    }
    
    /*
    =====================================
    ORDENAÇÃO - MAIS ACESSADOS
    =====================================
    */

    if (
        estado.ordenacao ===
        "views"
    ) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                👁️ Mais acessados

            </div>
        `;

    }

    /*
    =====================================
    ORDENAÇÃO - abertos
    =====================================
    */

    if (
        estado.ordenacao ===
        "abertos"
    ) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                🟢 Abertos agora

            </div>
        `;

    }

    /*
    =====================================
    ORDENAÇÃO - A-Z
    =====================================
    */

    if (
        estado.ordenacao ===
        "az"
    ) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                🔤 A-Z

            </div>
        `;

    }
    
    /*
    =====================================
    ORDENAÇÃO - Z-A
    =====================================
    */

    if (
        estado.ordenacao ===
        "za"
    ) {

        activeFilters.innerHTML += `
            <div class="filter-chip">

                🔤 Z-A

            </div>
        `;

    }
}

/*
=====================================================
ATUALIZAR INTERFACE
=====================================================
*/

function atualizarInterface() {

    /*
    =====================================
    LOADING
    =====================================
    */

    mostrarSkeleton();

    /*
    =====================================
    BASE
    =====================================
    */

    let lista = [...empresas];

        /*
        =====================================
        HOME
        =====================================
        */

        if (estado.modo === "home") {

            /*
            =================================
            FAVORITOS
            =================================
            */

            if (somenteFavoritos) {

                lista = empresas.filter(
                    (empresa) =>
                        favoritos.includes(
                            empresa.id
                        )
                );

            }

            /*
            =================================
            HOME NORMAL
            =================================
            */

            else {

                /*
                =============================
                APENAS DESTAQUES
                =============================
                */

                lista = lista.filter(
                    (empresa) =>
                        empresa.destaque === true
                );

                /*
                =============================
                LIMITA
                =============================
                */

                lista = lista.slice(0, 10);

            }

        }

        /*
        =================================
        FILTRO HOME
        =================================
        */

        if (
            estado.modo === "home"
            &&
            estado.filtroHome
        ) {

            lista = lista.filter((empresa) => {

                return empresa.categorias?.includes(
                    estado.filtroHome
                );

            });

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

            lista = lista.filter((empresa) => {

                return empresa.categorias?.includes(
                    estado.categoriaAtual
                );
            });
        }

        /*
        =================================
        BUSCA GLOBAL
        =================================
        */

        if (
            estado.modo === "busca"
            &&
            estado.busca
        ) {

            lista = empresas.filter((empresa) => {

                return empresaMatchBusca(
                    empresa,
                    estado.busca
                );

            });
        }

        /*
        =================================
        BUSCA CATEGORIA
        =================================
        */

        if (
            estado.modo === "categoria"
            &&
            estado.busca
        ) {

            lista = lista.filter((empresa) => {

                return empresaMatchBusca(
                    empresa,
                    estado.busca
                );

            });
        }

    /*
    =====================================
    STATUS
    =====================================
    */

    if (estado.status === "abertos") {

        lista = lista.filter((empresa) => {

            return statusFuncionamento(
                empresa.horario
            ).aberto;

        });

    }

    /*
    =====================================
    FECHADOS
    =====================================
    */

    if (estado.status === "fechados") {

        lista = lista.filter((empresa) => {

            return !statusFuncionamento(
                empresa.horario
            ).aberto;

        });

    }

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (
        somenteFavoritos
        &&
        estado.modo !== "home"
    ) {

        lista = lista.filter((empresa) => {

            return favoritos.includes(
                empresa.id
            );

        });

    }

    /*
    =====================================
    ORDENAÇÃO
    =====================================
    */

    lista.sort((a, b) => {

        /*
        =================================
        POPULARES
        =================================
        */

        if (
            estado.ordenacao ===
            "populares"
        ) {

            const viewsA =
                visualizacoes[a.id] || 0;

            const viewsB =
                visualizacoes[b.id] || 0;

            /*
            =============================
            MAIS ACESSADOS
            =============================
            */

            if (viewsB !== viewsA) {

                return viewsB - viewsA;

            }

        }

        /*
        =================================
        VIEWS
        =================================
        */

        if (
            estado.ordenacao ===
            "views"
        ) {

            return (
                (visualizacoes[b.id] || 0)
                -
                (visualizacoes[a.id] || 0)
            );

        }

        /*
        =================================
        ABERTOS
        =================================
        */

        if (
            estado.ordenacao ===
            "abertos"
        ) {

            const abertoA =
                statusFuncionamento(
                    a.horario
                ).aberto;

            const abertoB =
                statusFuncionamento(
                    b.horario
                ).aberto;

            if (
                abertoA
                &&
                !abertoB
            ) {

                return -1;

            }

            if (
                !abertoA
                &&
                abertoB
            ) {

                return 1;

            }

        }

        /*
        =================================
        A-Z
        =================================
        */

        if (
            estado.ordenacao ===
            "az"
        ) {

            return a.nome.localeCompare(
                b.nome
            );

        }

        /*
        =================================
        Z-A
        =================================
        */

        if (
            estado.ordenacao ===
            "za"
        ) {

            return b.nome.localeCompare(
                a.nome
            );

        }


        /*
        =================================
        FALLBACK
        =================================
        */

        return a.nome.localeCompare(
            b.nome
        );

    });

    

    /*
    =====================================
    RENDER
    =====================================
    */

    atualizarTituloSecao();

    atualizarTitle();

    renderizarFiltros(lista);

    renderizarMenuCategorias(empresas);

    atualizarSEO();

    renderizarFiltrosAtivos();

    /*
    =====================================
    EMPTY
    =====================================
    */

    if (lista.length === 0) {

        renderizarEmptyState();

        return;

    }

    /*
    =====================================
    RENDER EMPRESAS
    =====================================
    */

    setTimeout(() => {

        renderizarEmpresas(lista);

    }, SKELETON_DELAY);

    /*
    =====================================
    SAVE STATE
    =====================================
    */

    salvarEstado();

}

/*
=====================================================
VOLTAR HOME
=====================================================
*/

function voltarHome() {

    /*
    =====================================
    RESET ESTADO
    =====================================
    */

    estado.modo = "home";

    estado.categoriaAtual = null;

    estado.filtroHome = null;

    estado.busca = "";

    searchInput.value = "";

    paginaAtual = 1;

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    somenteFavoritos = false;

    /*
    =====================================
    BOTÃO FAVORITOS
    =====================================
    */

    favoritosBtn?.classList.remove(
        "active"
    );

    /*
    =====================================
    UPDATE
    =====================================
    */

    atualizarInterface();

}
