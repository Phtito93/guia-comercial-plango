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

            <div class="admin-header-empresas">

                <h2>

                    📂 Categorias

                </h2>

            </div>

            <div class="admin-categorias-lista">

                ${categorias.map(

                    categoria => `

                        <div class="categoria-card">

                            <span>

                                ${categoria.nome}

                            </span>

                        </div>

                    `

                ).join("")}

            </div>

        </section>

    `;

}