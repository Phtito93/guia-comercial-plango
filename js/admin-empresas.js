/*
=====================================================
ADMIN EMPRESAS
=====================================================
*/

function renderizarAdminEmpresas() {

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="admin-empresas">

            <div class="empresa-form-actions">

                <button

                    type="button"

                    class="voltar-btn"

                    onclick="navegar('/admin')"

                >

                    ← Voltar

                </button>

            </div>

            <div class="admin-header-empresas">

                <div class="admin-title">

                    <h2>

                        🏢 Empresas

                    </h2>

                    <p>

                        ${empresas.length}
                        empresas cadastradas

                    </p>

                </div>

                <button

                    class="admin-action-btn"

                    onclick="
                        navegar('/nova-empresa')
                    "

                >

                    ➕ Cadastrar Empresa

                </button>

            </div>

            <input

                type="text"

                id="empresaBusca"

                class="empresa-busca"

                placeholder="Buscar empresa..."

            >

            <div

                id="adminEmpresasLista"

                class="admin-empresas-lista"

            >

                ${renderizarListaEmpresasAdmin(
                    empresas
                )}

            </div>

        </section>

    `;

    document

        .getElementById(
            "empresaBusca"
        )

        ?.addEventListener(

            "input",

            filtrarEmpresasAdmin

        );

}

function renderizarListaEmpresasAdmin(
    lista
) {

    const empresasOrdenadas =

        [...lista]

            .sort(

                (a, b) =>

                    a.nome.localeCompare(

                        b.nome,

                        "pt-BR"

                    )

            );

    return empresasOrdenadas

        .map(

            empresa => `

                <div class="empresa-admin-card">

                    <div class="empresa-admin-info">

                        <h3>

                            <span class="empresa-id">

                                #${empresa.id}

                            </span>

                            ${empresa.nome}

                        </h3>

                        <div class="empresa-admin-stats">

                            <span>

                                👁️
                                ${empresa.views || 0}

                            </span>

                            <span>

                                📲
                                ${empresa.whatsapp_clicks || 0}

                            </span>

                            <span>

                                ⭐
                                ${empresa.plano}

                            </span>

                        </div>

                        <p>

                            📍
                            ${empresa.local || "-"}

                        </p>

                    </div>

                    <div class="empresa-admin-actions">

                        <button

                            class="
                                admin-edit-btn
                            "

                        >

                            ✏ Editar

                        </button>

                        <button

                            class="
                                admin-delete-btn
                            "

                        >

                            🗑 Excluir

                        </button>

                    </div>

                </div>

            `

        ).join("");

}

function filtrarEmpresasAdmin() {

    const termo =

        document

            .getElementById(
                "empresaBusca"
            )

            .value

            .toLowerCase();

    const resultado =

        empresas.filter(

            empresa =>

                empresa.nome

                    .toLowerCase()

                    .includes(

                        termo

                    )

        );

    document

        .getElementById(
            "adminEmpresasLista"
        )

        .innerHTML =

            renderizarListaEmpresasAdmin(

                resultado

            );

}