/*render.js*/
/*
=====================================================
SKELETON LOADING
=====================================================
*/

function renderizarSkeleton() {

    let skeletonHTML = "";

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        skeletonHTML += `

            <div class="card skeleton-card">

                <div
                    class="
                        skeleton
                        skeleton-image
                    "
                ></div>

                <div class="card-content">

                    <div
                        class="
                            skeleton
                            skeleton-category
                        "
                    ></div>

                    <div
                        class="
                            skeleton
                            skeleton-title
                        "
                    ></div>

                    <div
                        class="
                            skeleton
                            skeleton-text
                        "
                    ></div>

                    <div
                        class="
                            skeleton
                            skeleton-button
                        "
                    ></div>

                </div>

            </div>

        `;

    }

    empresaGrid.innerHTML = `

        <div class="normal-grid">

            ${skeletonHTML}

        </div>

    `;

}

/*
=====================================================
RENDERIZAR CARD
=====================================================
*/

function renderizarCard(empresa) {
    const status = statusFuncionamento(empresa.horario);

    const favorito = favoritos.includes(empresa.id);

    const score = calcularScore(empresa);

    const nova = empresaNova(empresa);

    return `
        <div class="
            card ${empresa.plano === "destaque"
            ? "card-destaque"
            : ""}"
            data-id="${empresa.id}"
            data-slug="${empresa.slug}"
            role="button"
            tabindex="0"
        >
            <img
                src="/img/${empresa.imagem || '/img/placeholder.jpg'}"
    
                alt="Foto da empresa ${empresa.nome}"

                loading="lazy"

                class="lazy-image"
            >

            <div class="card-content">
                <div class="card-tags">

                    <!-- CATEGORIAS -->
                    <div class="categorias">

                        ${empresa.categorias?.map((categoria) => `
                            <span class="categoria">
                                ${categoria}
                            </span>
                        `).join("")}

                    </div>

                    <div class="badges-wrapper">

                        ${empresa.plano === "destaque" ? `

                            <span
                                class="premium-badge badge-icon"
                                data-tooltip="Empresa Premium"
                            >
                                ⭐
                            </span>

                        ` : ""}

                        ${score >= 150 ? `

                            <span
                                class="top-badge badge-icon"
                                data-tooltip="Top Empresa do Guia"
                            >
                                👑
                            </span>

                        ` : score >= 80 ? `

                            <span
                                class="high-badge badge-icon"
                                data-tooltip="Empresa em Alta"
                            >
                                🚀
                            </span>

                        ` : score >= 30 ? `

                            <span
                                class="popular-badge badge-icon"
                                data-tooltip="Empresa Popular"
                            >
                                🔥
                            </span>

                        ` : ""}

                        ${nova ? `

                            <span
                                class="new-badge badge-icon"
                                data-tooltip="Nova no Guia"
                            >
                                🆕
                            </span>

                        ` : ""}
                    </div>

                </div>

                <div class="card-title">

                    <h3>
                        ${empresa.nome}
                    </h3>

                    <button
                        class="favorite-btn ${favorito ? "active" : ""}"
                        data-id="${empresa.id}"
                        aria-label="Favoritar empresa">
                        <i class="fa-solid fa-heart"></i>
                    </button>

                </div>
                      
                <div class="card-top-info">
                    <span class="local">
                        <i class="fa-solid fa-location-dot"></i>
                        ${empresa.local || "Local não informado"}
                    </span>

                    <span class="status ${status.classe}">
                        ${status.texto}
                    </span>
                </div>
            </div>

            <div class="card-actions">                  
                <div class="contact-menu">
                    <button class="contact-btn">
                        <i class="fa-solid fa-address-book"></i>
                        Contatos
                        <i class="fa-solid fa-chevron-up"></i>
                    </button>

                    <div class="contact-dropdown">
                        ${empresa.contatos?.whatsapp ? `
                            <a 
                                href="https://wa.me/55${(empresa.contatos?.whatsapp || "").replace(/\D/g,'')}"
                                target="_blank"
                                rel="noopener noreferrer"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'whatsapp_clicks')"
                                >
                                <i class="fa-brands fa-whatsapp"></i>
                                WhatsApp
                            </a>
                        ` : ""}

                        ${empresa.contatos?.instagram ? `
                            <a 
                                href="https://instagram.com/${empresa.contatos?.instagram}"
                                target="_blank" 
                                rel="noopener noreferrer"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'instagram_clicks')"
                                >
                                <i class="fa-brands fa-instagram"></i>
                                Instagram
                            </a>
                        ` : ""}

                        ${empresa.contatos?.telefone ? `
                            <a 
                                href="tel:${empresa.contatos?.telefone}"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'telefone_clicks')"
                                >
                                <i class="fa-solid fa-phone"></i>
                                Telefone
                            </a>
                        ` : ""}

                        ${empresa.contatos?.localizacao ? `
                            <a 
                                href="${empresa.contatos?.localizacao}" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'localizacao_clicks')"
                                > 
                                <i class="fa-solid fa-location-dot"></i> 
                                Localização
                            </a>
                        `: ""}
                            
                        ${empresa.contatos?.site ? `
                            <a 
                                href="${normalizarUrl(empresa.contatos.site)}"
                                target="_blank" 
                                rel="noopener noreferrer"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'site_clicks')"
                                > 
                                <i class="fa-solid fa-globe"></i>   
                                Site
                            </a>
                        `: ""}

                        ${empresa.contatos?.email ? `
                            <a 
                                href="mailto:${empresa.contatos?.email}"
                                onclick="incrementarCliqueContato(${empresa.id},
                                'email_clicks')"
                                > 
                                <i class="fa-solid fa-envelope"></i>   
                                E-mail
                            </a>
                        `: ""}
                    </div>
                </div>
            </div> 
        </div>
    `;
}

/*
=====================================================
RENDERIZAR EMPRESAS
=====================================================
*/

function renderizarEmpresas(lista) {

    cardsHTML = "";

    const inicio =

        (paginaAtual - 1)

        * EMPRESAS_POR_PAGINA;

    const fim =

        inicio

        + EMPRESAS_POR_PAGINA;

    /*
    =====================================
    ORDENAÇÃO
    =====================================
    */

    const empresasDestaque =

        lista.filter(

            empresa =>

                empresa.plano ===

                "destaque"

        );

    const empresasNormais =

        lista.filter(

            empresa =>

                empresa.plano !==

                "destaque"

        );

    const listaOrdenada = [

        ...empresasDestaque,

        ...empresasNormais

    ];

    /*
    =====================================
    PAGINAÇÃO
    =====================================
    */

    const empresasPaginadas =

        listaOrdenada.slice(

            inicio,

            fim

        );

    /*
    =====================================
    SEPARAÇÃO VISUAL
    =====================================
    */

    const empresasDestaquePagina =

        empresasPaginadas.filter(

            empresa =>

                empresa.plano ===

                "destaque"

        );

    const empresasNormaisPagina =

        empresasPaginadas.filter(

            empresa =>

                empresa.plano !==

                "destaque"

        );

    /*
    =====================================
    DESTAQUES
    =====================================
    */

    if (

        empresasDestaquePagina.length

    ) {

        cardsHTML += `

            <section class="premium-section">

                <div class="premium-header">

                    <span>

                        ⭐ Empresas Destaque

                    </span>

                </div>

                <div class="premium-grid">

        `;

        empresasDestaquePagina.forEach(

            empresa => {

                cardsHTML +=

                    renderizarCard(
                        empresa
                    );

            }

        );

        cardsHTML += `

                </div>

            </section>

        `;
    }

    /*
    =====================================
    TODOS NEGÓCIOS
    =====================================
    */

    if (

        empresasNormaisPagina.length

    ) {

        cardsHTML += `

            <section class="normal-section">

                <div class="normal-header">

                    <span>

                        📍 Todos os Negócios

                    </span>

                </div>

                <div class="normal-grid">

        `;

        empresasNormaisPagina.forEach(

            empresa => {

                cardsHTML +=

                    renderizarCard(
                        empresa
                    );

            }

        );

        cardsHTML += `

                </div>

            </section>

        `;
    }

    empresaGrid.innerHTML = cardsHTML;

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    document

        .querySelectorAll(
            ".favorite-btn"
        )

        .forEach(

            btn => {

                btn.addEventListener(

                    "click",

                    event => {

                        event.stopPropagation();

                        const id =

                            Number(

                                btn.dataset.id

                            );

                        toggleFavorito(

                            id,

                            btn

                        );

                    }

                );

            }

        );

    atualizarPaginacao(

        listaOrdenada

    );

}

function obterCategoriasVisiveis() {

    return categorias

        .filter(

            categoria =>

                categoria.ativo !== false

                &&

                empresas.some(

                    empresa =>

                        empresa.ativo !== false

                        &&

                        empresa.categorias?.includes(

                            categoria.nome

                        )

                )

        )

        .map(

            categoria =>

                categoria.nome

        )

        .sort();

}

/*
=====================================================
RENDERIZAR FILTROS
=====================================================
*/

function renderizarFiltros(lista) {

    /*
    =====================================
    CATEGORIAS VISÍVEIS
    =====================================
    */

    const categoriasUnicas =

        obterCategoriasVisiveis();

    /*
    =====================================
    FILTRO ATIVO
    =====================================
    */

    let filtroAtivo = null;

    /*
    =====================================
    HOME
    =====================================
    */

    if (
        estado.modo === "home"
    ) {

        filtroAtivo =
            estado.filtroHome;

    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (
        estado.modo === "categoria"
    ) {

        filtroAtivo =
            estado.categoriaAtual;

    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (
        estado.modo === "busca"
    ) {

        filtroAtivo =
            estado.filtroHome;

    }

    /*
    =====================================
    LIMPA
    =====================================
    */

    filtrosContainer.innerHTML = "";

    /*
    =====================================
    BOTÃO TODOS
    =====================================
    */

    const textoTodos =

        estado.modo === "categoria"

            ? "← Home"

            : "Todos";

    filtrosContainer.innerHTML = `
        <button
            class="
                filtro-btn
                ${filtroAtivo === null ? "active" : ""}
            "

            data-categoria="todos"

            aria-label="
                Selecionar todos os filtros
            "

            aria-pressed="
                ${filtroAtivo === null ? "true" : "false"}
            "
        >

            ${textoTodos}

        </button>
    `;

    /*
    =====================================
    BOTÕES CATEGORIAS
    =====================================
    */

    categoriasUnicas.forEach((categoria) => {

        filtrosContainer.innerHTML += `
            <button
                class="
                    filtro-btn
                    ${
                        filtroAtivo === categoria
                            ? "active"
                            : ""
                    }
                "

                data-categoria="${categoria}"

                aria-pressed="
                    ${
                        filtroAtivo === categoria
                            ? "true"
                            : "false"
                    }
                "
            >

                ${categoria}

            </button>
        `;

    });

    /*
    =====================================
    EVENTOS
    =====================================
    */

    const filtroBtns =
        document.querySelectorAll(
            ".filtro-btn"
        );

    filtroBtns.forEach((btn) => {

        btn.addEventListener(
            "click",
            () => {

                const categoria =
                    btn.dataset.categoria;

                /*
                =================================
                TODOS
                =================================
                */

                if (
                    categoria === "todos"
                ) {

                    /*
                    =================================
                    CATEGORIA
                    =================================
                    */

                    if (
                        estado.modo === "categoria"
                    ) {

                        voltarHome();

                        return;

                    }

                    /*
                    =================================
                    HOME / BUSCA
                    =================================
                    */

                    estado.filtroHome = null;

                    paginaAtual = 1;

                    atualizarInterface();

                    return;

                }

                /*
                =================================
                HOME
                =================================
                */

                if (
                    estado.modo === "home"
                ) {

                    estado.filtroHome =
                        categoria;

                    paginaAtual = 1;

                    atualizarInterface();

                    return;

                }

                /*
                =================================
                BUSCA
                =================================
                */

                if (
                    estado.modo === "busca"
                ) {

                    estado.filtroHome =
                        categoria;

                    paginaAtual = 1;

                    atualizarInterface();

                    return;

                }

                /*
                =================================
                CATEGORIA
                =================================
                */

                if (
                    estado.modo === "categoria"
                ) {

                    navegar(

                        `/categoria/${encodeURIComponent(categoria)}`

                    );

                    return;

                }

            }
        );

    });

}

/*
=====================================================
RENDERIZAR MENU CATEGORIAS
=====================================================
*/

function renderizarMenuCategorias() {

    /*
    =====================================
    CATEGORIAS VISÍVEIS
    =====================================
    */

    const categoriasVisiveis =

        obterCategoriasVisiveis();

    /*
    =====================================
    LIMPAR
    =====================================
    */

    submenuCategorias.innerHTML = "";

    /*
    =====================================
    RENDER
    =====================================
    */

    categoriasVisiveis.forEach((categoria) => {

        submenuCategorias.innerHTML += `

            <button

                class="
                    submenu-categoria-btn
                    ${estado.categoriaAtual === categoria ? "active" : ""}
                "

                data-categoria="${categoria}"

            >

                <i class="fa-solid fa-tag"></i>

                ${categoria}

            </button>

        `;

    });

}

/*
=====================================================
RENDERIZAR CONTATOS ÚTEIS
=====================================================
*/

function renderizarContatosUteis() {

    const submenuContatos =
        document.getElementById(
            "submenuContatos"
        );

    /*
    =====================================
    SEM ELEMENTO
    =====================================
    */

    if (!submenuContatos) return;

    /*
    =====================================
    LIMPAR
    =====================================
    */

    submenuContatos.innerHTML = "";

    /*
    =====================================
    RENDER
    =====================================
    */

    contatosUteis.forEach((contato) => {

        submenuContatos.innerHTML += `

            <a
                href="${contato.link}"
                class="submenu-categoria-btn"
                target="_blank"
            >

                <i class="fa-solid ${contato.icone}"></i>

                ${contato.nome}

            </a>

        `;

    });

}

/*
=====================================================
DASHBOARD ADMIN
=====================================================
*/

async function renderizarDashboardAdmin() {

    aplicarModoLandingPage();

    const metricas =

        await carregarMetricasVisitas()

        ||

        {

            totalVisitas: 0,

            visitasHoje: 0

        };

    const topEmpresas =

        [...empresas]

            .sort(

                (a, b) =>

                    calcularScore(b)

                    -

                    calcularScore(a)

            )

            .slice(0, 10);

    const totalViews =

        empresas.reduce(

            (total, empresa) =>

                total +

                (empresa.views || 0),

            0

        );

    const totalWhatsapp =

        empresas.reduce(

            (total, empresa) =>

                total +

                (

                    empresa.whatsappClicks

                    ||

                    0

                ),

            0

        );

    const totalPremium =

        empresas.filter(

            (empresa) =>

                empresa.plano ===
                "destaque"

        ).length;

    const leadsNovos =

        leads.filter(

            lead =>

                (lead.status || "novo") === "novo"

        ).length;

    const leadsContatados =

        leads.filter(

            lead =>

                lead.status ===
                "contatado"

        ).length;

    const leadsClientes =

        leads.filter(

            lead =>

                lead.status ===
                "cliente"

        ).length;

    const leadsNegociando =

        leads.filter(

            lead =>

                lead.status ===
                "negociando"

        ).length;

    const leadsPerdidos =

        leads.filter(

            lead =>

                lead.status ===
                "perdido"

        ).length;

    empresaGrid.innerHTML = `

        <section class="admin-dashboard">

            <div class="admin-header">

                <h2>

                    📊 Dashboard Admin

                </h2>

                <button

                    onclick="logoutAdmin()"

                    class="logout-btn"

                >

                    Sair

                </button>

            </div>

            <div class="admin-actions">

                <button

                    class="admin-action-btn"

                    onclick="
                        window.rotaVoltarEmpresa='/admin';
                        navegar('/nova-empresa');
                    "

                >

                    <i class="fa-solid fa-plus"></i>

                    Cadastrar Empresa

                </button>

            </div>

            <section class="admin-analytics">

                <h2>

                    📈 Tráfego do Guia

                </h2>

                <div class="admin-cards">

                    <div class="admin-stat">

                        <span>

                            👁️ Visitas Totais

                        </span>

                        <strong>

                            ${metricas.totalVisitas}

                        </strong>

                    </div>

                    <div class="admin-stat">

                        <span>

                            📅 Hoje

                        </span>

                        <strong>

                            ${metricas.visitasHoje || 0}

                        </strong>

                    </div>

                    <div class="admin-stat">

                        <span>

                            📆 Últimos 7 dias

                        </span>

                        <strong>

                            ${metricas.visitas7Dias || 0}

                        </strong>

                    </div>

                    <div class="admin-stat">

                        <span>

                            📊 Média diária

                        </span>

                        <strong>

                            ${metricas.mediaDiaria || 0}

                        </strong>

                    </div>

                </div>

            </section>

            <section class="admin-analytics">

                <h2>

                    🏢 Indicadores

                </h2>

                <div class="admin-cards">

                    <div class="admin-stat">

                        <span>
                            👁️ Views
                        </span>

                        <strong>
                            ${totalViews}
                        </strong>

                    </div>

                    <div class="admin-stat">

                        <span>
                            📲 WhatsApp
                        </span>

                        <strong>
                            ${totalWhatsapp}
                        </strong>

                    </div>

                    <div class="admin-stat">

                        <span>
                            ⭐ Premium
                        </span>

                        <strong>
                            ${totalPremium}
                        </strong>

                    </div>

                    <div

                        class="
                            admin-stat
                            admin-stat-clickable
                        "

                        onclick="
                            navegar('/admin/empresas')
                        "

                    >

                        <span>

                            🏢 Empresas

                        </span>

                        <strong>

                            ${empresas.length}

                        </strong>

                    </div>

                    <div

                        class="
                            admin-stat
                            admin-stat-clickable
                        "

                        onclick="
                            navegar('/admin/categorias')
                        "

                    >

                        <span>

                            📂 Categorias

                        </span>

                        <strong>

                            ${categorias.length}

                        </strong>

                    </div>

                </div>

            </section>

            <section class="admin-analytics">
                <h2>

                    🏆 Top 10 Empresas

                </h2>
            

                <div class="admin-ranking">

                    ${topEmpresas

                        .slice(0, 10)

                        .map(

                            (empresa, index) => `

                                <div class="admin-ranking-card">

                                    <h3>

                                        🏆 #${index + 1}

                                        ${empresa.nome}

                                    </h3>

                                    <p>

                                        👁️ Views:
                                        ${empresa.views || 0}

                                    </p>

                                    <p>

                                        📲 WhatsApp:
                                        ${empresa.whatsappClicks || 0}

                                    </p>

                                    <p>

                                        ⭐ Plano:
                                        ${empresa.plano}

                                    </p>

                                    <div class="admin-score">

                                        Score:
                                        ${calcularScore(
                                            empresa
                                        )}

                                    </div>

                                </div>

                            `

                        )

                    .join("")}

                </div>
            </section>

            <section class="admin-analytics">

                <h2>

                    📩 Status Leads

                </h2>
            
                <div class="admin-cards">

                    <div 
                        class="admin-stat admin-stat-clickable"
                        onclick="navegar('/admin/leads/novos')"
                    >

                        <span>

                            🆕 Novos

                        </span>

                        <strong>

                            ${leadsNovos}

                        </strong>

                    </div>

                    <div 
                        class="admin-stat admin-stat-clickable"
                        onclick="navegar('/admin/leads/contatados')"
                    >

                        <span>

                            📞 Contatados

                        </span>

                        <strong>

                            ${leadsContatados}

                        </strong>

                    </div>

                    <div 
                        class="admin-stat admin-stat-clickable"
                        onclick="navegar('/admin/leads/negociando')"
                    >

                        <span>

                            🤝 Negociando

                        </span>

                        <strong>

                            ${leadsNegociando}

                        </strong>

                    </div>

                    <div 
                        class="admin-stat admin-stat-clickable"
                        onclick="navegar('/admin/leads/clientes')"
                    >

                        <span>

                            ✅ Clientes

                        </span>

                        <strong>

                            ${leadsClientes}

                        </strong>

                    </div>

                    <div 
                        class="admin-stat admin-stat-clickable"
                        onclick="navegar('/admin/leads/perdidos')"
                    >

                        <span>

                            ❌ Perdidos

                        </span>

                        <strong>

                            ${leadsPerdidos}

                        </strong>

                    </div>

                </div>
            </section>

            <section class="admin-analytics">

                <h2>

                    🆕 Novos Leads

                </h2>

                <div class="admin-leads-grid">

                    ${renderizarLeadsAdmin(
                        "novo"
                    )}

                </div>

            </section>

        </section>
    `;
}

/*
=====================================================
PÁGINA ANUNCIE
=====================================================
*/

function renderizarPaginaAnuncie() {

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="anuncie-page">

            <!-- HERO -->
            <section class="anuncie-hero">

                <span class="hero-badge">
                    🚀 Destaque seu negócio
                </span>

                <h1>
                    Coloque sua empresa
                    no Guia Plango
                </h1>

                <p>
                    Apareça para milhares de pessoas
                    em Planaltina-GO e aumente
                    suas vendas locais.
                </p>

                <a
                    href="https://wa.me/${SITE_CONFIG.whatsapp}?text=Olá,%20quero%20anunciar%20no%20Guia%20Plango"
                    target="_blank"
                    class="anuncie-cta"
                >
                    📲 Quero anunciar agora
                </a>

            </section>

            <!-- BENEFÍCIOS -->
            <section class="beneficios-section">

                <div class="section-title">
                    <h2>
                        Por que anunciar?
                    </h2>
                </div>

                <div class="beneficios-grid">

                    <div class="beneficio-card">
                        <i class="fa-solid fa-eye"></i>
                        <h3>
                            Mais Visibilidade
                        </h3>
                        <p>
                            Sua empresa encontrada
                            por mais pessoas.
                        </p>
                    </div>

                    <div class="beneficio-card">
                        <i class="fa-solid fa-location-dot"></i>
                        <h3>
                            Clientes Locais
                        </h3>
                        <p>
                            Alcance clientes próximos
                            da sua região.
                        </p>
                    </div>

                    <div class="beneficio-card">
                        <i class="fa-solid fa-crown"></i>
                        <h3>
                            Destaque Premium
                        </h3>
                        <p>
                            Fique no topo das buscas
                            e categorias.
                        </p>
                    </div>

                </div>

            </section>
            
            <!-- COMO FUNCIONA -->
            <section class="como-funciona-section">

                <div class="section-title">
                    <h2>
                        Como funciona
                    </h2>
                </div>

                <div class="steps-grid">

                    <div class="step-card">
                        <span>
                            1
                        </span>

                        <h3>
                            Envie seus dados
                        </h3>
                    </div>

                    <div class="step-card">
                        <span>
                            2
                        </span>

                        <h3>
                            Criamos seu anúncio
                        </h3>
                    </div>

                    <div class="step-card">
                        <span>
                            3
                        </span>

                        <h3>
                            Sua empresa entra no ar
                        </h3>
                    </div>

                </div>

            </section>
            
            <!-- PLANOS -->
            <section class="planos-section">

                <div class="section-title">
                    <h2>
                        Planos
                    </h2>
                </div>

                <div class="planos-grid">

                    <!-- PRESENÇA -->
                    <div class="plano-card">

                        <span class="plano-badge">
                            📍 Plano Presença
                        </span>

                        <h3>
                            R$ 35/mês
                        </h3>

                        <ul>
                            <li>
                                ✔ Perfil da empresa
                            </li>

                            <li>
                                ✔ WhatsApp direto
                            </li>

                            <li>
                                ✔ Redes sociais
                            </li>

                            <li>
                                ✔ Exibição nas categorias
                            </li>

                            <li>
                                ✔ Participação nas buscas
                            </li>
                        </ul>

                    </div>

                    <!-- DESTAQUE -->
                    <div class="plano-card destaque">

                        <span class="plano-badge premium">
                            ⭐ Plano Destaque
                        </span>

                        <h3>
                            R$ 50/mês
                        </h3>

                        <ul>

                            <li>
                                ⭐ Tudo do Plano Presença
                            </li>

                            <li>
                                ⭐ Destaque visual exclusivo
                            </li>

                            <li>
                                ⭐ Badge Premium
                            </li>

                            <li>
                                ⭐ Prioridade nas pesquisas
                            </li>

                            <li>
                                ⭐ Maior visibilidade local
                            </li>
                        </ul>

                    </div>

                </div>

            </section>

            <!-- FORMULÁRIO -->

            <section class="lead-section">

                <div class="section-title">

                    <h2>
                        Solicite seu cadastro
                    </h2>

                    <p>
                        Preencha os dados abaixo
                        e entraremos em contato.
                    </p>

                </div>

                <form id="leadForm">

                    <input
                        type="hidden"
                        id="leadOrigem"
                        value="pagina-anuncie"
                    >

                    <input
                        type="text"
                        id="leadNome"
                        placeholder="Seu nome"
                        required
                    >

                    <input
                        type="text"
                        id="leadEmpresa"
                        placeholder="Nome da empresa"
                        required
                    >

                    <input
                        type="tel"
                        id="leadTelefone"
                        placeholder="WhatsApp - 61999999999"
                        minlength="10"
                        maxlength="15"
                        required
                    >

                    <input
                        type="email"
                        id="leadEmail"
                        placeholder="E-mail (opcional)"
                    >

                    <select
                        id="leadPlano"
                        required
                    >

                        <option value="">
                            Qual plano deseja?
                        </option>

                        <option value="presenca">
                            Plano Presença
                        </option>

                        <option value="destaque">
                            Plano Destaque
                        </option>

                    </select>

                    <textarea
                        id="leadMensagem"
                        rows="4"
                        placeholder="Conte um pouco sobre sua empresa..."
                    ></textarea>

                    <input

                        type="text"

                        id="leadIndicacao"

                        maxlength="6"

                        placeholder="Código de indicação (opcional)"

                    >

                    <label class="lead-consent">

                        <input
                            type="checkbox"
                            id="leadConsent"
                            required
                        >

                        <span>
                            Li e concordo com a

                            <a
                                href="#"
                                onclick="
                                    navegar(
                                        '/politica-de-privacidade'
                                    )
                                "
                            >
                                Política de Privacidade
                            </a>

                        </span>

                    </label>

                    <button
                        type="submit"
                        class="anuncie-cta"
                    >

                        📩 Solicitar Contato

                    </button>

                </form>

            </section>
            
            <!-- CTA FINAL -->
            <section class="cta-final">

                <h2>
                    Quer destacar sua empresa?
                </h2>

                <a
                    href="https://wa.me/${SITE_CONFIG.whatsapp}?text=Olá,%20quero%20destacar%20minha%20empresa"
                    target="_blank"
                    class="anuncie-cta"
                >
                    🚀 Quero anunciar agora
                </a>

            </section>

        </section>
    `;

    document

        .getElementById(
            "leadForm"
        )

        ?.addEventListener(

            "submit",

            salvarLead

        );
}     

/*
=====================================================
EMPTY STATE
=====================================================
*/

function renderizarEmptyState() {
    empresaGrid.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">
                🔍
            </div>

            <h2>
                Nenhuma empresa encontrada
            </h2>

            <p>
                Tente pesquisar outro termo
                <br>
                ou volte para a página inicial.
            </p>

            <button
                class="empty-btn"
                id="emptyHomeBtn"
            >
                Voltar para Home
            </button>
        </div>
    `;

    /*
    =====================================
    BOTÃO HOME
    =====================================
    */

    document
        .getElementById("emptyHomeBtn")
        .addEventListener("click", () => {
            voltarHome();
            /*navegar("/");*/
        });
}

/*
=====================================================
ATUALIZAR TÍTULO SEÇÃO
=====================================================
*/

function atualizarTituloSecao() {

    /*
    =====================================
    FAVORITOS
    =====================================
    */

    if (somenteFavoritos) {

        /*
        =================================
        HOME
        =================================
        */

        if (estado.modo === "home") {

            sectionTitle.innerHTML = `
                ❤️ Meus Favoritos
            `;

            return;

        }

        /*
        =================================
        CATEGORIA
        =================================
        */

        if (estado.modo === "categoria") {

            sectionTitle.innerHTML = `
                ❤️ Favoritos em
                <span class="category-highlight">
                    ${estado.categoriaAtual}
                </span>
            `;

            return;

        }

        /*
        =================================
        BUSCA
        =================================
        */

        if (estado.modo === "busca") {

            sectionTitle.innerHTML = `
                ❤️ Favoritos da busca:
                <span class="category-highlight">
                    "${searchInput.value}"
                </span>
            `;

            return;

        }

    }

    /*
    =====================================
    HOME
    =====================================
    */

    if (estado.modo === "home") {

        sectionTitle.innerHTML = `
            <span class="category-highlight">
        
            </span>
        `;
    }

    /*
    =====================================
    BUSCA
    =====================================
    */

    if (estado.modo === "busca") {

        sectionTitle.innerHTML = `
            🔎 Resultado da busca:
            <span class="category-highlight">
                "${searchInput.value}"
            </span>
        `;

    }

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    if (estado.modo === "categoria") {

        sectionTitle.innerHTML = `
            📂
            <span class="category-highlight">
                ${estado.categoriaAtual}
            </span>
        `;

    }

}

function normalizarUrl(url) {

    if (

        !url.startsWith("http")

    ) {

        return `https://${url}`;

    }

    return url;

}