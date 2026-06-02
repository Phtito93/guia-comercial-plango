/*
=====================================================
LOGIN ADMIN
=====================================================
*/

async function loginAdmin(

    email,

    senha

) {

    const {

        data,

        error

    } = await supabaseClient.auth

        .signInWithPassword({

            email,

            password:
                senha

        });

    if (
        error
    ) {

        mostrarToast(
            "Login inválido"
        );

        return false;

    }

    return true;

}

/*
=====================================================
LOGOUT
=====================================================
*/

async function logoutAdmin() {

    await supabaseClient.auth

        .signOut();

    voltarHome();

    return;

}