/*
=====================================================
RENDERIZAR LEADS
=====================================================
*/

function renderizarLeadsAdmin(
    status = null
) {

    let leadsFiltrados =

        [...leads];

    /*
    =====================================
    FILTRO STATUS
    =====================================
    */

    if (
        status
    ) {

        leadsFiltrados =

            leadsFiltrados.filter(

                lead =>

                    (
                        lead.status

                        ||

                        "novo"

                    ) === status

            );

    }

    /*
    =====================================
    EMPTY STATE
    =====================================
    */

    if (
        !leadsFiltrados.length
    ) {

        return `

            <p>

                Nenhum lead encontrado.

            </p>

        `;

    }

    /*
    =====================================
    ORDENAÇÃO
    =====================================
    */

    leadsFiltrados.sort(

        (a, b) =>

            new Date(
                b.created_at
            )

            -

            new Date(
                a.created_at
            )

    );

    /*
    =====================================
    RENDER
    =====================================
    */

    return leadsFiltrados

        .slice(0, 50)

        .map((lead) => `

            <div class="lead-card">

                <h3>

                    ${lead.nome}

                </h3>

                <p>

                    🏢 ${lead.empresa}

                </p>

                <p>

                    📲 ${lead.telefone}

                </p>

                <p>

                    ⭐ ${lead.plano_interesse}

                </p>

                <p>

                    Status:

                    ${obterBadgeStatus(
                        lead.status || "novo"
                    )}

                </p>

                <p>

                    📅 ${new Date(

                        lead.created_at

                    ).toLocaleDateString(

                        "pt-BR"

                    )}

                </p>

                <p>

                    🎁 Indicação:

                    ${lead.codigo_indicacao || "-"}

                </p>

                <p class="lead-next-step">

                    Alterar para:

                </p>

                <div class="lead-actions">

                    ${(lead.status || "novo") !== "contatado" ? `

                        <button

                            onclick="
                                atualizarStatusLead(
                                    '${lead.id}',
                                    'contatado'
                                )
                            "

                        >

                            Contatado

                        </button>

                    ` : ""}

                    ${(lead.status || "novo") !== "negociando" ? `

                        <button

                            onclick="
                                atualizarStatusLead(
                                    '${lead.id}',
                                    'negociando'
                                )
                            "

                        >

                            Negociando

                        </button>

                    ` : ""}

                    ${(lead.status || "novo") !== "cliente" ? `

                        <button

                            onclick="
                                atualizarStatusLead(
                                    '${lead.id}',
                                    'cliente'
                                )
                            "

                        >

                            Cliente

                        </button>

                    ` : ""}

                    ${(lead.status || "novo") !== "perdido" ? `

                        <button

                            onclick="
                                atualizarStatusLead(
                                    '${lead.id}',
                                    'perdido'
                                )
                            "

                        >

                            Perdido

                        </button>

                    ` : ""}

                </div>

                <a

                    href="https://wa.me/${(lead.telefone || "").replace(/\D/g,'')}"

                    target="_blank"

                    class="lead-contact-btn"

                >

                    Contatar

                </a>

            </div>

        `)

        .join("");

}

function renderizarLeadsPorStatus(
    status
) {

    aplicarModoLandingPage();

    const leadsFiltrados =

        leads.filter(

            lead =>

                lead.status ===

                status

        );

    empresaGrid.innerHTML = `

        <section class="admin-leads-page">

            <div class="empresa-form-actions">

                <button

                    type="button"

                    class="voltar-btn"

                    onclick="voltarPagina()"

                >

                    ← Voltar

                </button>

            </div>

            <div class="admin-header-empresas">

                <div class="admin-title">

                    <h2>

                        ${obterTituloStatus(status)}

                    </h2>

                    <p>

                        ${leadsFiltrados.length}
                        leads

                    </p>

                </div>

            </div>

            <div class="admin-leads-grid">

                ${renderizarLeadsAdmin(
                    status
                )}

            </div>

        </section>

    `;

}

function obterTituloStatus(
    status
) {

    const titulos = {

        novo:
            "🆕 Leads Novos",

        contatado:
            "📞 Leads Contatados",

        negociando:
            "🤝 Leads Negociando",

        cliente:
            "✅ Clientes",

        perdido:
            "❌ Leads Perdidos"

    };

    return (

        titulos[status]

        ||

        "Leads"

    );

}