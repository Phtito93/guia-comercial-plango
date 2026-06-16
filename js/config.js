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

const EMPRESAS_POR_PAGINA = 10;

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

document.addEventListener(

    "DOMContentLoaded",

    () => {

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

                `https://wa.me/${SITE_CONFIG.whatsapp}?text=${obterMensagemAnunciante()}`;

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

                `https://wa.me/${SITE_CONFIG.whatsapp}?text=${obterMensagemAnunciante()}`;

        }
    }
); 
