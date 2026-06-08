function renderizarDetalheEmpresa(
    empresaId
) {

    const empresa =

        empresas.find(

            item =>

                item.id ===

                empresaId

        );

    if (
        !empresa
    ) {

        mostrarToast(
            "Empresa não encontrada"
        );

        navegar(
            "/admin/empresas"
        );

        return;

    }

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="admin-detalhe-empresa">

            <div class="empresa-form-actions">

                <button

                    class="voltar-btn"

                    onclick="voltarPagina()"

                >

                    ← Voltar

                </button>

            </div>

            <div class="admin-detalhe-topo">

                <div class="admin-detalhe-imagem">

                    <img

                        src="/img/${empresa.imagem || 'placeholder.jpg'}"

                        alt="${empresa.nome}"

                    >

                </div>

                <div class="admin-title">

                    <h2>

                        ${empresa.nome}

                    </h2>

                    <p class="empresa-meta">

                        EMP-${String(
                            empresa.id
                        ).padStart(
                            3,
                            "0"
                        )}
                    </p>

                </div>

            </div>

            <div class="admin-detalhe-actions">

                <button

                    class="admin-edit-btn"

                    onclick="
                        window.rotaVoltarEmpresa='/admin/empresa/${empresa.id}';
                        editarEmpresa(${empresa.id});
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

            <div class="admin-detalhe-grid">

                ${renderizarBlocosEmpresa(
                    empresa
                )}

            </div>

        </section>

    `;

}

function renderizarBlocosEmpresa(
    empresa
) {

    return `

        <div class="admin-info-card">

            <h3>

                📋 Dados da Empresa

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Plano

                </span>

                <strong class="info-value">

                    ⭐ ${empresa.plano}
                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Local

                </span>

                <strong class="info-value">

                    📍 ${empresa.local || "-"}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Categorias

                </span>

                <strong class="info-value">

                    🏷 ${(empresa.categorias || []).join(", ") || "-"}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Tags

                </span>

                <strong class="info-value">

                    ${(empresa.tags || [])

                        .map(tag => `#${tag}`)

                        .join(" ") || "-"}

                </strong>

            </div>

        </div>

        <div class="admin-info-card">

            <h3>

                📞 Contatos

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Telefone

                </span>

                <strong class="info-value">

                    ☎️ ${empresa.contatos?.telefone || "-"}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    WhatsApp

                </span>

                <strong class="info-value">

                    ${empresa.contatos?.whatsapp

                        ? `

                            <a

                                href="https://wa.me/${empresa.contatos.whatsapp.replace(/\D/g,'')}"

                                target="_blank"

                                class="info-link"

                            >

                                📲 ${empresa.contatos.whatsapp}

                            </a>

                        `

                        : "-"

                    }

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Instagram

                </span>

                <strong class="info-value">

                    ${empresa.contatos?.instagram

                        ? `

                            <a

                                href="https://instagram.com/${empresa.contatos.instagram.replace('@','')}"

                                target="_blank"

                                class="info-link"

                            >

                                📸 ${empresa.contatos.instagram}

                            </a>

                        `

                        : "-"

                    }

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Site

                </span>

                <strong class="info-value">

                    ${empresa.contatos?.site

                        ? `

                            <a

                                href="${empresa.contatos.site}"

                                target="_blank"

                                class="info-link"

                            >

                                🌐 ${empresa.contatos.site}

                            </a>

                        `

                        : "-"

                    }

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    E-mail

                </span>

                <strong class="info-value">

                    ${empresa.contatos?.email

                        ? `

                            <a

                                href="mailto:${empresa.contatos.email}"

                                class="info-link"

                            >

                                ✉️ ${empresa.contatos.email}

                            </a>

                        `

                        : "-"

                    }

                </strong>

            </div>

        </div>

        <div class="admin-info-card">

            <h3>

                📍 Endereço

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Rua

                </span>

                <strong class="info-value">

                    🛣️

                    ${empresa.endereco?.rua || "-"}

                    ${empresa.endereco?.numero || ""}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Bairro

                </span>

                <strong class="info-value">

                    🏘️ ${empresa.endereco?.bairro || "-"}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Cidade / Estado

                </span>

                <strong class="info-value">

                    📍

                    ${empresa.endereco?.cidade || "-"}

                    ${empresa.endereco?.estado
                        ? ` - ${empresa.endereco.estado}`
                        : ""
                    }

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    CEP

                </span>

                <strong class="info-value">

                    📮 ${empresa.endereco?.cep || "-"}

                </strong>

            </div>

            ${empresa.contatos?.localizacao ? `

                <div class="info-item">

                    <span class="info-label">

                        Localização

                    </span>

                    <strong class="info-value">

                        <a

                            href="${empresa.contatos.localizacao}"

                            target="_blank"

                            class="info-link"

                        >

                            🗺️ Abrir no mapa

                        </a>

                    </strong>

                </div>

            ` : ""}

        </div>

        <div class="admin-info-card">

            <h3>

                📊 Estatísticas

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Visualizações

                </span>

                <strong class="info-value">

                    👁️ ${empresa.views || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Cliques WhatsApp

                </span>

                <strong class="info-value">

                    📲 ${empresa.whatsappClicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Cliques Instagram

                </span>

                <strong class="info-value">

                    📸 ${empresa.instagramClicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Score

                </span>

                <strong class="info-value">

                    🏆 ${calcularScore(empresa)}

                </strong>

            </div>

        </div>

    `;

}