/*
=====================================================
FAVORITOS
=====================================================
*/

function toggleFavorito(id, botao) {

    /*
    =====================================
    EXISTE
    =====================================
    */

    const existe =
        favoritos.includes(id);

    /*
    =====================================
    REMOVE
    =====================================
    */

    if (existe) {

        favoritos =
            favoritos.filter(
                fav => fav !== id
            );

        botao.classList.remove(
            "active"
        );

        mostrarToast(
            "Removido dos favoritos",
            "fa-heart-crack"
        );

    }

    /*
    =====================================
    ADD
    =====================================
    */

    else {

        favoritos.push(id);

        botao.classList.add(
            "active"
        );

        mostrarToast(
            "Adicionado aos favoritos",
            "fa-heart"
        );

    }

    /*
    =====================================
    STORAGE
    =====================================
    */

    localStorage.setItem(
        "favoritos",
        JSON.stringify(
            favoritos
        )
    );

}