/*
=====================================================
LAZY LOAD
=====================================================
*/

let lazyObserver;

/*
=====================================================
INIT
=====================================================
*/

function iniciarLazyLoad() {

    /*
    =====================================
    LIMPA OBSERVER ANTIGO
    =====================================
    */

    if (lazyObserver) {

        lazyObserver.disconnect();

    }

    /*
    =====================================
    IMAGENS
    =====================================
    */

    const imagens =
        document.querySelectorAll(
            ".lazy-image"
        );

    /*
    =====================================
    OBSERVER
    =====================================
    */

    lazyObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        /*
                        =========================
                        VISÍVEL
                        =========================
                        */

                        if (
                            entry.isIntersecting
                        ) {

                            const img =
                                entry.target;

                            /*
                            =========================
                            DATA SRC
                            =========================
                            */

                            const realSrc =
                                img.dataset.src;

                            /*
                            =========================
                            SRC
                            =========================
                            */

                            if (realSrc) {

                                img.src =
                                    realSrc;

                            }

                            /*
                            =========================
                            LOAD
                            =========================
                            */

                            img.onload = () => {

                                img.classList.add(
                                    "loaded"
                                );

                            };

                            /*
                            =========================
                            UNOBSERVE
                            =========================
                            */

                            lazyObserver.unobserve(
                                img
                            );

                        }

                    }
                );

            },

            {
                rootMargin: "100px"
            }

        );

    /*
    =====================================
    OBSERVE
    =====================================
    */

    imagens.forEach((img) => {

        lazyObserver.observe(img);

    });

}