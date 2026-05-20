/*
=====================================================
DARK MODE
=====================================================
*/

function aplicarTema(tema) {

    /*
    =====================================
    DARK
    =====================================
    */

    if (tema === "dark") {
        document.body.classList.add("dark");
        darkModeBtn.innerHTML = `
            <i class="fa-solid fa-sun"></i>
        `;
    } else {

        /*
        =====================================
        LIGHT
        =====================================
        */

        document.body.classList.remove("dark");
        darkModeBtn.innerHTML = `
            <i class="fa-solid fa-moon"></i>
        `;
    }

    /*
    =====================================
    SALVAR
    =====================================
    */

    localStorage.setItem(
        "theme",
        tema
    );

}

/*
=====================================================
INICIAR TEMA
=====================================================
*/

const temaSalvo =
    localStorage.getItem("theme")
    || "dark";

aplicarTema(temaSalvo);
