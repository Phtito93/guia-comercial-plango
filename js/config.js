/*
=====================================================
API
=====================================================
*/

const API_EMPRESAS = "/data/empresas.json";

/*
=====================================================
PAGINAÇÃO
=====================================================
*/

const EMPRESAS_POR_PAGINA = 6;

/*
=====================================================
SKELETON
=====================================================
*/

const SKELETON_DELAY = 350;

/*
=====================================================
TOAST
=====================================================
*/

const TOAST_DURATION = 2500;

/*
=====================================================
SITE
=====================================================
*/

const SITE_CONFIG = {

    nome:
        "Guia Comercial",

    cidade:
        "Planaltina-GO",

    whatsapp:
        "5561994243316",

    instagram:
        "https://instagram.com/guiaplango",

    url:
        "https://www.guiaplango.com.br",

};

/*
=====================================================
SOCIAL LINKS
=====================================================
*/

const instagramLink =
    document.getElementById(
        "instagramLink"
    );

if (instagramLink) {

    instagramLink.href =
        SITE_CONFIG.instagram;

}

const whatsappLink =
    document.getElementById(
        "whatsappLink"
    );

if (whatsappLink) {

    whatsappLink.href =

        `https://wa.me/5561994243316?text=Olá%20acessei%20o%20seu%20guia%20e%20gostaria%20de%20mais%20informações.`;

}

const footerInstagramLink =
    document.getElementById(
        "footerInstagramLink"
    );

if (footerInstagramLink) {

    footerInstagramLink.href =
        SITE_CONFIG.instagram;

}

const footerWhatsappLink =
    document.getElementById(
        "footerWhatsappLink"
    );

if (footerWhatsappLink) {

    footerWhatsappLink.href =

        `https://wa.me/5561994243316?text=Olá%20acessei%20o%20seu%20guia%20e%20gostaria%20de%20mais%20informações.`;

}