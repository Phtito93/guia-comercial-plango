/*
=====================================================
ADMIN EMPRESAS
=====================================================
*/

function renderizarAdminEmpresas() {

    const totalEmpresas = empresas.length;
    
    const totalDestaque =

        empresas.filter(

            empresa =>

                empresa.plano ===

                "destaque"

        ).length;

    const totalPresenca =

        empresas.filter(

            empresa =>

                empresa.plano ===

                "presenca"

        ).length;
    
    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="admin-empresas">

            <div class="empresa-form-actions">

                <button

                    type="button"

                    class="voltar-btn-admin"

                    onclick= "navegar('/admin')"

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

                        ${totalEmpresas}
                        empresas cadastradas

                    </p>

                    <div class="admin-resumo">

                        <span>

                            ⭐
                            ${totalDestaque}

                        </span>

                        <span>

                            📌
                            ${totalPresenca}

                        </span>

                    </div>

                </div>

                <button

                    class="admin-action-btn"

                    onclick="
                        window.rotaVoltarEmpresa='/admin/empresas';
                        navegar('/nova-empresa');
                    "

                >

                    <i class="fa-solid fa-plus"></i>

                    Cadastrar Empresa

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

                                EMP-${String(
                                    empresa.id
                                ).padStart(
                                    3,
                                    "0"
                                )}

                            </span>

                            ${empresa.nome}

                        </h3>

                        <div class="empresa-admin-stats">

                            <span>

                                👁️ ${empresa.views || 0}

                            </span>

                            <span>

                                📲 ${empresa.whatsapp_clicks || 0}

                            </span>

                            <span>

                                ⭐ ${empresa.plano}

                            </span>

                        </div>

                        <p class="empresa-admin-local">

                            📍 ${empresa.local || "-"}

                        </p>

                    </div>

                    <div class="empresa-admin-actions">

                        <button

                            class="admin-view-btn"

                            onclick="
                                navegar('/admin/empresa/${empresa.id}')
                            "

                        >

                            👁 Ver

                        </button>

                        <button

                            class="admin-edit-btn"

                            onclick="
                                editarEmpresa(
                                    ${empresa.id}
                                )
                            "

                        >

                            ✏ Editar

                        </button>

                        <button

                            class="admin-delete-btn"

                            onclick="
                                excluirEmpresa(
                                    ${empresa.id}
                                )
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

/*
=====================================================
EDITAR EMPRESA
=====================================================
*/

function editarEmpresa(
    empresaId
) {

    const empresa =

        empresas.find(

            item =>

                item.id ==

                empresaId

        );

    if (

        !empresa

    ) {

        mostrarToast(

            "Empresa não encontrada"

        );

        return;

    }

    renderizarFormularioEmpresa(

        empresa

    );

}

/*
=====================================================
EXCLUIR EMPRESA
=====================================================
*/

async function excluirEmpresa(
    empresaId
) {

    const empresa =

        empresas.find(

            item =>

                item.id ==

                empresaId

        );

    if (

        !empresa

    ) {

        mostrarToast(

            "Empresa não encontrada"

        );

        return;

    }

    abrirModalConfirmacao({

        titulo:

            "⚠ Excluir Empresa",

        mensagem:

            empresa.nome,

        onConfirm:

            async () => {

                const {

                    error

                } = await supabaseClient

                    .from(
                        "empresas"
                    )

                    .delete()

                    .eq(
                        "id",
                        empresaId
                    );

                if (
                    error
                ) {

                    console.error(
                        error
                    );

                    mostrarToast(

                        "Erro ao excluir"

                    );

                    return;

                }

                mostrarToast(

                    "Empresa excluída"

                );

                await carregarEmpresas();

                renderizarAdminEmpresas();

            }

    });

}

/*
=====================================================
MODAL CONFIRMAÇÃO
=====================================================
*/

function abrirModalConfirmacao({

    titulo,

    mensagem,

    onConfirm

}) {

    const modal =

        document.getElementById(
            "confirmModal"
        );

    document.getElementById(
        "confirmModalTitulo"
    ).textContent = titulo;

    document.getElementById(
        "confirmModalMensagem"
    ).textContent = mensagem;

    modal.classList.add(
        "active"
    );

    document.getElementById(
        "confirmCancelBtn"
    ).onclick = () => {

        modal.classList.remove(
            "active"
        );

    };

    document.getElementById(
        "confirmOkBtn"
    ).onclick = () => {

        modal.classList.remove(
            "active"
        );

        onConfirm();

    };

}