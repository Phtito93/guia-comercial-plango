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

                    <p class="empresa-meta">

                        Cliente desde - ${formatarData(empresa.created_at)}
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

                <button

                    class="admin-status-btn"

                    onclick="
                        alterarStatusEmpresa(
                            ${empresa.id},
                            ${empresa.ativo !== false ? false : true}
                        )
                    "

                >

                    ${

                        empresa.ativo !== false

                            ? "🔴 Desativar"

                            : "🟢 Ativar"

                    }

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

    const statusPagamento =

        obterStatusPagamento(
            empresa
        );

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

                    Status

                </span>

                <strong class="info-value">

                    ${

                        empresa.ativo !== false

                            ? "🟢 Ativa"

                            : "🔴 Inativa"

                    }

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

                    WhatsApp

                </span>

                <strong class="info-value">

                    📲 ${empresa.whatsapp_clicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Instagram

                </span>

                <strong class="info-value">

                    📸 ${empresa.instagram_clicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Telefone

                </span>

                <strong class="info-value">

                    ☎️ ${empresa.telefone_clicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Site

                </span>

                <strong class="info-value">

                    🌐 ${empresa.site_clicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    E-mail

                </span>

                <strong class="info-value">

                    ✉️ ${empresa.email_clicks || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Localização

                </span>

                <strong class="info-value">

                    📍 ${empresa.localizacao_clicks || 0}

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

        <div class="admin-info-card">

            <h3>

                💰 Financeiro

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Valor

                </span>

                <strong class="info-value">

                    R$ ${(empresa.valor_mensal || 0).toFixed(2)}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Vencimento

                </span>

                <strong class="info-value">

                    ${formatarData(empresa.vencimento)}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Último Pagamento

                </span>

                <strong class="info-value">

                    ${formatarData(empresa.ultimo_pagamento)}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Status

                </span>

                <strong class="info-value">

                    ${statusPagamento.emoji}

                    ${statusPagamento.texto}

                </strong>

            </div>

            <button

                class="admin-action-btn"

                onclick="marcarPagamento(${empresa.id})"

            >

                ✅ Marcar como Pago

            </button>

            <a

                class="admin-action-btn"

                target="_blank"

                href="https://wa.me/55${(empresa.contatos?.whatsapp || '').replace(/\D/g,'')}?text=${gerarMensagemCobranca(empresa)}"

            >

                📲 Cobrar via WhatsApp

            </a>

        </div>

        <div class="admin-info-card">

            <h3>

                🎁 Programa de Indicação

            </h3>

            <div class="info-item">

                <span class="info-label">

                    Código

                </span>

                <strong class="info-value">

                    ${empresa.codigo_indicacao || "-"}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Indicações

                </span>

                <strong class="info-value">

                    ${empresa.indicacoes || 0}

                </strong>

            </div>

            <div class="info-item">

                <span class="info-label">

                    Bônus

                </span>

                <strong class="info-value">

                    🎉 ${empresa.meses_bonus || 0}

                    mês(es)

                </strong>

            </div>

        </div>

    `;

}



/*
=====================================================
MARCAR PAGAMENTO
=====================================================
*/

/*
=====================================================
MARCAR PAGAMENTO
=====================================================
*/

async function marcarPagamento(

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

            "Empresa não encontrada."

        );

        return;

    }

    abrirModalConfirmacao({

        titulo:

            "💰 Confirmar Pagamento",

        mensagem:

            `${empresa.nome}`,

        onConfirm:

            async () => {

                try {

                    /*
                    =====================================
                    DATA ATUAL
                    =====================================
                    */

                    const hoje =

                        new Date()

                            .toISOString()

                            .split("T")[0];

                    /*
                    =====================================
                    NOVO VENCIMENTO
                    =====================================
                    */

                    let novoVencimento =

                        empresa.vencimento;

                    if (

                        empresa.vencimento

                    ) {

                        const vencimento =

                            new Date(

                                empresa.vencimento

                            );

                        vencimento.setMonth(

                            vencimento.getMonth() + 1

                        );

                        novoVencimento =

                            vencimento

                                .toISOString()

                                .split("T")[0];

                    }

                    /*
                    =====================================
                    UPDATE
                    =====================================
                    */

                    const {

                        error

                    } = await supabaseClient

                        .from("empresas")

                        .update({

                            ultimo_pagamento:
                                hoje,

                            vencimento:
                                novoVencimento

                        })

                        .eq(

                            "id",

                            empresaId

                        );

                    /*
                    =====================================
                    ERROR
                    =====================================
                    */

                    if (

                        error

                    ) {

                        console.error(

                            error

                        );

                        mostrarToast(

                            "Erro ao registrar pagamento."

                        );

                        return;

                    }

                    /*
                    =====================================
                    REFRESH
                    =====================================
                    */

                    await carregarEmpresas();

                    mostrarToast(

                        "✅ Pagamento registrado"

                    );

                    aplicarRota();

                }

                catch (

                    erro

                ) {

                    console.error(

                        erro

                    );

                    mostrarToast(

                        "Erro ao registrar pagamento."

                    );

                }

            }

    });

}