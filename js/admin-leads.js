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

                    onclick="navegar('/admin')"

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