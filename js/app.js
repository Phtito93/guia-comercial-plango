/*
=====================================================
GUIA COMERCIAL PREMIUM
=====================================================

Desenvolvido por:
Paulo Henrique Tito

Frontend Architecture:
HTML5 • CSS3 • JavaScript

Ano:
2026

=====================================================
*/

/*
=====================================================
INICIAR APP
=====================================================
*/

carregarEmpresas();

renderizarContatosUteis();

mostrarToast(
    "🚀 Sistema iniciado"
);

/*
=====================================================
INIT ROUTER
=====================================================
*/

aplicarRota();

searchInput.value = estado.busca || "";

/*
=====================================================
SERVICE WORKER
=====================================================
*/

if (
    "serviceWorker"
    in navigator
) {

    navigator.serviceWorker.register(

        "/service-worker.js"

    )
}