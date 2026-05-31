/*
=====================================================
COOKIE BANNER
=====================================================
*/

const cookieBanner =

    document.getElementById(
        "cookieBanner"
    );

/*
=====================================================
SHOW
=====================================================
*/

if (

    !localStorage.getItem(
        "cookieConsent"
    )

    &&

    !sessionStorage.getItem(
        "cookieBannerClosed"
    )

) {

    cookieBanner.style.display =
        "block";

}

/*
=====================================================
ACEITAR
=====================================================
*/

document

    .getElementById(
        "acceptCookies"
    )

    ?.addEventListener(

        "click",

        () => {

            localStorage.setItem(

                "cookieConsent",

                "accepted"

            );

            cookieBanner.style.display =
                "none";

        }

    );

/*
=====================================================
RECUSAR
=====================================================
*/

document

    .getElementById(
        "rejectCookies"
    )

    ?.addEventListener(

        "click",

        () => {

            localStorage.setItem(

                "cookieConsent",

                "rejected"

            );

            cookieBanner.style.display =
                "none";

        }

    );

/*
=====================================================
FECHAR
=====================================================
*/

document

    .getElementById(
        "closeCookies"
    )

    ?.addEventListener(

        "click",

        () => {

            sessionStorage.setItem(

                "cookieBannerClosed",

                "true"

            );

            cookieBanner.style.display =
                "none";

        }

    );