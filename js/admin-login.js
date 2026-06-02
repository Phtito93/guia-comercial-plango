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

                    <div class="password-field">

                        <input

                            type="password"

                            id="adminSenha"

                            placeholder="Senha"

                            required

                        >

                        <button

                            type="button"

                            id="togglePassword"

                            class="password-toggle"

                            aria-label="Mostrar senha"

                        >

                            <i class="fa-regular fa-eye"></i>

                        </button>

                    </div>

                    <button

                        type="submit"

                        class="admin-login-btn"

                    >

                        Entrar

                    </button>

                </form>

            </div>

        </section>

    `;

    /*
    =====================================
    MOSTRAR / OCULTAR SENHA
    =====================================
    */

    const togglePassword =

        document.getElementById(
            "togglePassword"
        );

    const passwordInput =

        document.getElementById(
            "adminSenha"
        );

    togglePassword?.addEventListener(

        "click",

        () => {

            const visivel =

                passwordInput.type ===
                "text";

            passwordInput.type =

                visivel

                    ? "password"

                    : "text";

            togglePassword.innerHTML =

                visivel

                    ? '<i class="fa-regular fa-eye"></i>'

                    : '<i class="fa-regular fa-eye-slash"></i>';

        }

    );

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

}