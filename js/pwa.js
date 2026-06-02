/*
=====================================================
PWA
=====================================================
*/

let deferredPrompt = null;

/*
=====================================================
VERIFICAR INSTALAÇÃO
=====================================================
*/

function verificarInstalacao() {

    const instalado =

        window.matchMedia(

            "(display-mode: standalone)"

        ).matches

        ||

        window.navigator.standalone;

    if (
        instalado
    ) {

        document

            .querySelector(
                ".install-app-btn"
            )

            ?.remove();

    }

}

/*
=====================================================
CAPTURAR PROMPT
=====================================================
*/

window.addEventListener(

    "beforeinstallprompt",

    (event) => {

        event.preventDefault();

        deferredPrompt =
            event;

    }

);

/*
=====================================================
INSTALAR APP
=====================================================
*/

async function instalarApp() {

    if (deferredPrompt) {

        deferredPrompt.prompt();

        await deferredPrompt.userChoice;

        deferredPrompt = null;

        return;

    }

    /*
    =====================================
    FIREFOX
    =====================================
    */

    if (

        navigator.userAgent
            .toLowerCase()
            .includes("firefox")

    ) {

        fecharMenu();

        mostrarToast(

            "📲 No Firefox use o menu do navegador e escolha 'Instalar' ou 'Adicionar à Tela Inicial'."

        );

        return;

    }

    /*
    =====================================
    IOS
    =====================================
    */

    if (

        /iphone|ipad|ipod/i.test(
            navigator.userAgent
        )

    ) {

        fecharMenu();

        mostrarToast(

            "📲 No iPhone toque em Compartilhar → Adicionar à Tela Inicial."

        );

        return;

    }

    /*
    =====================================
    FALLBACK
    =====================================
    */

    mostrarToast(


        "📲 Use o menu do navegador para adicionar o Guia Plango à tela inicial."

    );
    
    fecharMenu();

}

/*
=====================================================
APP INSTALADO
=====================================================
*/

window.addEventListener(

    "appinstalled",

    () => {

        document

            .querySelector(
                ".install-app-btn"
            )

            ?.remove();

        mostrarToast(

            "✅ Guia Plango instalado com sucesso."

        );

    }

);