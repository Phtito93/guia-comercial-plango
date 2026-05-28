/*
=====================================================
EVENTOS - MENU MOBILE
=====================================================
*/

if (menuBtn && mobileMenu && overlay) {

    menuBtn.addEventListener("click", () => {

        menuBtn.classList.toggle("active");

        mobileMenu.classList.toggle("active");

        overlay.classList.toggle("active");

    });
}

/*
=====================================================
EVENTOS- SUBMENUS
=====================================================
*/

document.addEventListener("click", (e) => {

    const submenuBtn =
        e.target.closest(
            ".submenu-btn"
        );

    /*
    =====================================
    SEM BOTÃO
    =====================================
    */

    if (!submenuBtn) return;

    /*
    =====================================
    EVITAR PROPAGAÇÃO
    =====================================
    */

    e.stopPropagation();

    /*
    =====================================
    SUBMENU
    =====================================
    */

    const submenuAtual =
        submenuBtn.closest(
            ".submenu"
        );

    /*
    =====================================
    FECHAR OUTROS
    =====================================
    */

    document
        .querySelectorAll(".submenu")
        .forEach((submenu) => {

            if (submenu !== submenuAtual) {

                submenu.classList.remove(
                    "active"
                );

            }

        });

    /*
    =====================================
    TOGGLE
    =====================================
    */

    submenuAtual.classList.toggle(
        "active"
    );

});

/*
=====================================================
MENU CATEGORIAS
=====================================================
*/

document.addEventListener("click", (e) => {

    const categoriaBtn =
        e.target.closest(
            ".submenu-categoria-btn"
        );

    /*
    =====================================
    SEM BOTÃO
    =====================================
    */

    if (!categoriaBtn) return;

    /*
    =====================================
    IGNORAR LINKS
    =====================================
    */

    if (
        categoriaBtn.tagName === "A"
    ) return;

    /*
    =====================================
    CATEGORIA
    =====================================
    */

    const categoria =
        categoriaBtn.dataset.categoria;

    estado.modo = "categoria";

    estado.categoriaAtual =
        categoria;

    estado.busca = "";

    searchInput.value = "";

    navegar(
        `/categoria/${encodeURIComponent(categoria)}`
    );

    fecharMenu();

});

/*
=====================================================
EVENTOS - OVERLAY
=====================================================
*/

overlay.addEventListener("click", fecharMenu);

/*
=====================================================
EVENTOS - BUSCA
=====================================================
*/

searchInput.addEventListener("input", () => {

    estado.busca =
        normalizarTexto(
            searchInput.value
        );

    /*
    =====================================
    HOME
    =====================================
    */

    if (
        estado.modo === "home"
        &&
        estado.busca
    ) {

        estado.modo = "busca";

    }

    /*
    =====================================
    LIMPOU
    =====================================
    */

    if (!estado.busca) {

        navegar("/");

        return;

    }

    paginaAtual = 1;

    navegar(
        `/buscar/${encodeURIComponent(
            estado.busca
        )}`
    );

});

/*
=====================================================
EVENTOS - FILTRO STATUS - ORDENAÇÃO
=====================================================
*/

ordenar.addEventListener("change", () => {

    estado.ordenacao = ordenar.value;

    paginaAtual = 1;

    atualizarInterface();

});

/*
=====================================================
FAVORITOS
=====================================================
*/

favoritosBtn?.addEventListener(

    "click",

    () => {

        if (
            somenteFavoritos
        ) {

            somenteFavoritos = false;

            favoritosBtn?.classList.remove(
                "active"
            );

            /*
            =============================
            HOME
            =============================
            */

            if (
                estado.modo === "home"
            ) {

                voltarHome();

                return;

            }

            /*
            =============================
            CATEGORIA
            =============================
            */

            if (
                estado.modo === "categoria"
            ) {

                navegar(

                    `/categoria/${encodeURIComponent(
                        estado.categoriaAtual
                    )}`

                );

                return;

            }

            /*
            =============================
            BUSCA
            =============================
            */

            if (
                estado.modo === "busca"
            ) {

                navegar(

                    `/buscar/${encodeURIComponent(
                        estado.busca
                    )}`

                );

                return;

            }

        }

        /*
        =================================
        ATIVAR FAVORITOS
        =================================
        */

        navegar("/favoritos");

    }

);

/*
=====================================================
EVENTOS - PAGINAÇÃO
=====================================================
*/

btnAnterior.addEventListener("click", () => {

    if (paginaAtual > 1) {

        paginaAtual--;

        atualizarInterface();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

btnProximo.addEventListener("click", () => {

    paginaAtual++;

    atualizarInterface();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/*
=====================================================
EVENTOS - DARK MODE
=====================================================
*/

darkModeBtn.addEventListener("click", () => {

    const darkAtivo =
        document.body.classList.contains(
            "dark"
        );

    aplicarTema(
        darkAtivo
            ? "light"
            : "dark"
    );

});

/*
=====================================================
EVENTOS - HOME
=====================================================
*/

homeBtn.addEventListener("click", () => {navegar("/");});

/*
=====================================================
EVENTOS - HOME MOBILE
=====================================================
*/

mobileHomeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        
        navegar("/");

        fecharMenu();
    }
);

/*
=====================================================
EVENTOS - CONTACT MENU
=====================================================
*/

document.addEventListener("click", (e) => {

    const contactMenu =
        e.target.closest(
            ".contact-menu"
        );

    const allMenus =
        document.querySelectorAll(
            ".contact-menu"
        );

    allMenus.forEach((menu) => {

        if (menu !== contactMenu) {

            menu.classList.remove("active");

        }

    });

    if (!contactMenu) return;

    contactMenu.classList.toggle("active");

});

/*
=====================================================
EVENTOS - TOUCH MOBILE MENU
=====================================================
*/

let startX = 0;

mobileMenu.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

});

mobileMenu.addEventListener("touchend", (e) => {

    let endX =
        e.changedTouches[0].clientX;

    if (startX - endX > 50) {

        fecharMenu();

    }
});

/*
=====================================================
ANUNCIE
=====================================================
*/

mobileAnuncieBtn?.addEventListener(

    "click",

    (event) => {

        event.preventDefault();

        fecharMenu();

        navegar("/anuncie");

    }

);

anuncieBtn?.addEventListener(

    "click",

    (event) => {

        event.preventDefault();

        fecharMenu();
        
        navegar("/anuncie");

    }

);

/*
=====================================================
TRACKING VIEWS
=====================================================
*/

empresaGrid?.addEventListener(

    "click",

    (event) => {

        /*
        =====================================
        CARD
        =====================================
        */

        const card =

            event.target.closest(
                ".card"
            );

        if (
            !card
        ) {

            return;

        }

        /*
        =====================================
        IGNORA BOTÕES
        =====================================
        */

        if (

            event.target.closest(

                ".favorite-btn, .contact-btn, .contact-dropdown, .contact-dropdown *"

            )

        ) {

            return;

        }

        /*
        =====================================
        VIEW
        =====================================
        */

        registrarView(

            Number(
                card.dataset.id
            )

        );

    }

);

/*
=====================================================
BADGE TOOLTIP
=====================================================
*/

const badgeTooltip =

    document.getElementById(
        "badgeTooltip"
    );

/*
=====================================================
MOSTRAR TOOLTIP
=====================================================
*/

function mostrarTooltipBadge(

    event

) {

    /*
    =====================================
    BADGE
    =====================================
    */

    const badge =

        event.target.closest(
            ".badge-icon"
        );

    if (
        !badge
    ) {

        return;

    }

    /*
    =====================================
    EVITA DUPLO TOUCH
    =====================================
    */

    event.preventDefault();

    /*
    =====================================
    TEXTO
    =====================================
    */

    badgeTooltip.textContent =

        badge.dataset.tooltip;

    /*
    =====================================
    POSIÇÃO BASE
    =====================================
    */

    const rect =

        badge.getBoundingClientRect();

    let left =

        rect.left + rect.width / 2;

    /*
    =====================================
    LIMITES VIEWPORT
    =====================================
    */

    const tooltipWidth = 140;

    const margin = 16;

    /*
    =====================================
    LIMITE ESQUERDA
    =====================================
    */

    if (
        left < tooltipWidth / 2 + margin
    ) {

        left =
            tooltipWidth / 2 + margin;

    }

    /*
    =====================================
    LIMITE DIREITA
    =====================================
    */

    if (

        left >

        window.innerWidth -

        tooltipWidth / 2 -

        margin

    ) {

        left =

            window.innerWidth -

            tooltipWidth / 2 -

            margin;

    }

    /*
    =====================================
    APLICA POSIÇÃO
    =====================================
    */

    badgeTooltip.style.left =

        `${left}px`;

    const top =

        rect.top - 45 < 16

            ? rect.bottom + 12

            : rect.top - 45;

    badgeTooltip.style.top =

        `${top}px`;

    /*
    =====================================
    SHOW
    =====================================
    */

    badgeTooltip.classList.add(
        "show"
    );

    /*
    =====================================
    RESET TIMER
    =====================================
    */

    clearTimeout(
        window.badgeTooltipTimeout
    );

    /*
    =====================================
    AUTO HIDE
    =====================================
    */

    window.badgeTooltipTimeout =

        setTimeout(() => {

            badgeTooltip.classList.remove(
                "show"
            );

        }, 1800);

}

/*
=====================================================
CLICK DESKTOP
=====================================================
*/

empresaGrid?.addEventListener(

    "click",

    mostrarTooltipBadge

);

/*
=====================================================
TOUCH MOBILE
=====================================================
*/

empresaGrid?.addEventListener(

    "touchstart",

    mostrarTooltipBadge,

    {
        passive: true
    }

);

/*
=====================================================
OCULTAR TOOLTIP NO SCROLL
=====================================================
*/

window.addEventListener(

    "scroll",

    () => {

        badgeTooltip.classList.remove(
            "show"
        );

    }

);

/*
=====================================================
OCULTAR AO CLICAR FORA
=====================================================
*/

document.addEventListener(

    "click",

    (event) => {

        if (

            !event.target.closest(
                ".badge-icon"
            )

        ) {

            badgeTooltip.classList.remove(
                "show"
            );

        }

    }

);