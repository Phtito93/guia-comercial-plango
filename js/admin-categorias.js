function renderizarAdminCategorias() {

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="admin-categorias">

            <div class="empresa-form-actions">

                <button

                    class="voltar-btn-admin"

                    onclick="voltarPagina()"

                >

                    ← Voltar

                </button>

            </div>

            <div class="admin-header-categorias">

                <div>

                    <h2>

                        📂 Categorias

                    </h2>

                    <p>

                        ${categorias.length}
                        categorias cadastradas

                    </p>

                </div>

                <button

                    class="admin-action-btn"

                    onclick="abrirNovaCategoria()"

                >

                    ➕ Nova Categoria

                </button>

            </div>

            <div class="admin-categorias-lista">

                ${categorias.map(

                    categoria => `

                        <div class="categoria-card">

                            <div class="categoria-info">

                                <h3>

                                    ${categoria.nome}

                                </h3>

                                <span>

                                    ${

                                        categoria.ativo

                                            ? "🟢 Ativa"

                                            : "🔴 Inativa"

                                    }

                                </span>

                            </div>

                            <div class="categoria-actions">

                                <button

                                    class="categoria-btn categoria-btn-edit"

                                    title="Editar"

                                    onclick="
                                        editarCategoria(
                                            ${categoria.id}
                                        )
                                    "

                                >

                                    <i class="fa-solid fa-pen"></i>

                                </button>

                                <button

                                    class="categoria-btn categoria-btn-status"

                                    title="${categoria.ativo ? 'Desativar' : 'Ativar'}"

                                    onclick="
                                        alterarStatusCategoria(
                                            ${categoria.id},
                                            ${!categoria.ativo}
                                        )
                                    "

                                >

                                    <i class="fa-solid fa-power-off"></i>

                                </button>

                                <button

                                    class="categoria-btn categoria-btn-delete"

                                    title="Excluir"

                                    onclick="
                                        excluirCategoria(
                                            ${categoria.id}
                                        )
                                    "

                                >

                                    <i class="fa-solid fa-trash"></i>

                                </button>

                            </div>

                        </div>

                    `

                ).join("")}

            </div>

        </section>

    `;

}

async function abrirNovaCategoria() {

    const nome =

        prompt(

            "Nome da categoria"
        );

    if (
        !nome
    ) {

        return;

    }

    const {

        error

    } = await supabaseClient

        .from("categorias")

        .insert({

            nome:

                nome.trim()

        });

    if (
        error
    ) {

        console.error(
            error
        );

        mostrarToast(

            "Erro ao criar categoria"

        );

        return;

    }

    await carregarCategorias();

    renderizarAdminCategorias();

}

async function editarCategoria(

    categoriaId

) {

    const categoria =

        categorias.find(

            item =>

                item.id === categoriaId

        );

    if (
        !categoria
    ) {

        return;

    }

    const novoNome =

        prompt(

            "Editar categoria",

            categoria.nome

        );

    if (
        !novoNome
    ) {

        return;

    }

    await supabaseClient

        .from("categorias")

        .update({

            nome:

                novoNome.trim()

        })

        .eq(
            "id",
            categoriaId
        );

    await carregarCategorias();

    renderizarAdminCategorias();

}

async function alterarStatusCategoria(

    categoriaId,

    ativo

) {

    await supabaseClient

        .from("categorias")

        .update({

            ativo

        })

        .eq(
            "id",
            categoriaId
        );

    await carregarCategorias();

    renderizarAdminCategorias();

}

async function excluirCategoria(

    categoriaId

) {

    const categoria =

        categorias.find(

            item =>

                item.id === categoriaId

        );

    if (
        !categoria
    ) {

        return;

    }

    abrirModalConfirmacao({

        titulo:

            "⚠ Excluir Categoria",

        mensagem:

            categoria.nome,

        onConfirm:

            async () => {

                await supabaseClient

                    .from("categorias")

                    .delete()

                    .eq(
                        "id",
                        categoriaId
                    );

                await carregarCategorias();

                renderizarAdminCategorias();

            }

    });

}