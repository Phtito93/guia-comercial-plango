/*
=====================================================
LOGIN ADMIN PAGE
=====================================================
*/

function renderizarLoginAdmin() {

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="admin-login">

            <div class="admin-login-card">

                <h2>

                    🔒 Login Administrativo

                </h2>

                <form id="adminLoginForm">

                    <input

                        type="email"

                        id="adminEmail"

                        placeholder="E-mail"

                        required

                    >

                    <input

                        type="password"

                        id="adminSenha"

                        placeholder="Senha"

                        required

                    >

                    <button

                        type="submit"

                        class="anuncie-cta"

                    >

                        Entrar

                    </button>

                </form>

            </div>

        </section>

    `;

    /*
    =====================================
    EVENTO LOGIN
    =====================================
    */

    document

        .getElementById(
            "adminLoginForm"
        )

        ?.addEventListener(

            "submit",

            async (event) => {

                event.preventDefault();

                const email =

                    document
                        .getElementById(
                            "adminEmail"
                        )
                        .value;

                const senha =

                    document
                        .getElementById(
                            "adminSenha"
                        )
                        .value;

                const sucesso =

                    await loginAdmin(

                        email,

                        senha

                    );

                if (
                    sucesso
                ) {

                    mostrarToast(

                        "Login realizado"

                    );

                    navegar(
                        "/admin"
                    );

                }

            }

        );

        console.log(
            "admin-login carregado"
        );

}