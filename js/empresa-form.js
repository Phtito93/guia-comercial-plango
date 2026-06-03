function renderizarFormularioEmpresa() {

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="empresa-form-page">

            <h2>

                ➕ Nova Empresa

            </h2>

            <div class="empresa-form-actions">

                <button

                    type="button"

                    class="voltar-btn"

                    onclick="history.back()"

                >

                    ← Voltar

                </button>

            </div>

            <form id="empresaForm">

                
                <div class="form-grid">
                    <input
                        id="empresaNome"
                        placeholder="Nome da Empresa"
                        required
                    >

                    <input
                        id="empresaSlug"
                        placeholder="Slug"
                    >
                </div>

                <textarea
                    id="empresaDescricao"
                    placeholder="Descrição"
                ></textarea>

                <div class="form-grid">

                    <select
                        id="empresaPlano"
                    >

                        <option value="presenca">

                            Presença

                        </option>

                        <option value="destaque">

                            Destaque

                        </option>

                    </select>

                    <input
                        id="empresaLocal"
                        placeholder="Local"
                    >
                </div>

                <input
                    id="empresaImagem"
                    placeholder="URL da Imagem: empresa.webp"
                >
                
                <input
                    id="empresaCategorias"
                    placeholder="Categorias separadas por vírgula"
                >

                <input
                    id="empresaTags"
                    placeholder="Tags separadas por vírgula"
                >

                <h3>

                    Endereço

                </h3>

                <div class="form-grid">
                    <input id="rua" placeholder="Rua">

                    <input id="numero" placeholder="Número">
                </div>

                <div class="form-grid">
                    <input id="bairro" placeholder="Bairro">

                    <input id="cidade" placeholder="Cidade">
                </div>

                <div class="form-grid">
                    <input id="estado" placeholder="UF">

                    <input id="cep" placeholder="CEP">
                </div>

                <h3>

                    Contatos

                </h3>

                <div class="form-grid">
                    <input id="telefone" placeholder="Telefone">

                    <input id="whatsapp" placeholder="WhatsApp">
                </div>

                <div class="form-grid">
                    <input id="instagram" placeholder="Instagram">

                    <input id="site" placeholder="Site">
                </div>

                <input id="email" placeholder="Email">

                <input id="localizacao" placeholder="Localização">

                <h3>

                    Horário de Funcionamento

                </h3>

                <div class="horario-actions">

                    <button

                        type="button"

                        class="horario-padrao-btn"

                        onclick="preencherHorarioPadrao()"

                    >

                        📋 Aplicar Horário Comercial

                    </button>

                    <button

                        type="button"

                        class="horario-limpar-btn"

                        onclick="limparHorarios()"

                    >

                        🗑 Limpar Horários

                    </button>

                </div>

                <div class="horarios-container">

                    ${renderizarCamposHorario()}

                </div>

                <button

                    type="submit"

                    class="form-submit"

                >

                    💾 Salvar Empresa

                </button>

            </form>

        </section>

    `;

    document

        .getElementById(
            "empresaForm"
        )

        ?.addEventListener(

            "submit",

            salvarEmpresa

        );

}

function renderizarCamposHorario() {

    const dias = [

        "segunda",

        "terca",

        "quarta",

        "quinta",

        "sexta",

        "sabado",

        "domingo"

    ];

    return dias.map(

        (dia) => `

            <div class="horario-dia">

                <label class="horario-label">

                    <input

                        type="checkbox"

                        id="${dia}Ativo"

                        checked

                    >

                    ${dia.charAt(0).toUpperCase() + dia.slice(1)}

                </label>

                <div class="horario-grid">

                    <input

                        type="time"

                        id="${dia}Abre"

                    >

                    <input

                        type="time"

                        id="${dia}Fecha"

                    >

                </div>

            </div>

        `

    ).join("");

}

function preencherHorarioPadrao() {

    const diasSemana = [

        "segunda",

        "terca",

        "quarta",

        "quinta",

        "sexta"

    ];

    diasSemana.forEach(

        (dia) => {

            document.getElementById(
                `${dia}Ativo`
            ).checked = true;

            document.getElementById(
                `${dia}Abre`
            ).value = "08:00";

            document.getElementById(
                `${dia}Fecha`
            ).value = "18:00";

        }

    );

    document.getElementById(
        "sabadoAtivo"
    ).checked = true;

    document.getElementById(
        "sabadoAbre"
    ).value = "08:00";

    document.getElementById(
        "sabadoFecha"
    ).value = "12:00";

    document.getElementById(
        "domingoAtivo"
    ).checked = false;

}

function montarHorario() {

    const horario = {};

    const dias = [

        "segunda",

        "terca",

        "quarta",

        "quinta",

        "sexta",

        "sabado",

        "domingo"

    ];

    dias.forEach(

        (dia) => {

            const ativo =

                document
                    .getElementById(
                        `${dia}Ativo`
                    )
                    .checked;

            if (
                !ativo
            ) {

                return;

            }

            const abre =

                document
                    .getElementById(
                        `${dia}Abre`
                    )
                    .value;

            const fecha =

                document
                    .getElementById(
                        `${dia}Fecha`
                    )
                    .value;

            if (
                !abre ||
                !fecha
            ) {

                return;

            }

            horario[dia] = {

                abre,

                fecha

            };

        }

    );

    return horario;

}

function limparHorarios() {

    const dias = [

        "segunda",

        "terca",

        "quarta",

        "quinta",

        "sexta",

        "sabado",

        "domingo"

    ];

    dias.forEach(

        (dia) => {

            document.getElementById(
                `${dia}Ativo`
            ).checked = false;

            document.getElementById(
                `${dia}Abre`
            ).value = "";

            document.getElementById(
                `${dia}Fecha`
            ).value = "";

        }

    );

}

async function salvarEmpresa(
    event
) {

    event.preventDefault();

    const nome =

        document
            .getElementById(
                "empresaNome"
            )
            .value;

    const slug =

        document
            .getElementById(
                "empresaSlug"
            )
            .value;

    const descricao =

        document
            .getElementById(
                "empresaDescricao"
            )
            .value;

    const plano =

        document
            .getElementById(
                "empresaPlano"
            )
            .value;

    const categorias =

        document
            .getElementById(
                "empresaCategorias"
            )
            .value;

    const tags =

        document
            .getElementById(
                "empresaTags"
            )
            .value;

    const local =

        document
            .getElementById(
                "empresaLocal"
            )
            .value;

    const imagem =

        document
            .getElementById(
                "empresaImagem"
            )
            .value

            .split(",")

            .map(

                item =>

                    item.trim()

            )

            .filter(Boolean);

    const endereco = {

        rua:

            document
                .getElementById(
                    "rua"
                )
                .value,

        numero:

            document
                .getElementById(
                    "numero"
                )
                .value,

        bairro:

            document
                .getElementById(
                    "bairro"
                )
                .value,

        cidade:

            document
                .getElementById(
                    "cidade"
                )
                .value,

        estado:

            document
                .getElementById(
                    "estado"
                )
                .value,

        cep:

            document
                .getElementById(
                    "cep"
                )
                .value

    };

    const contatos = {

        telefone:

            document
                .getElementById(
                    "telefone"
                )
                .value,

        whatsapp:

            document
                .getElementById(
                    "whatsapp"
                )
                .value,

        instagram:

            document
                .getElementById(
                    "instagram"
                )
                .value,

        site:

            document
                .getElementById(
                    "site"
                )
                .value,

        email:

            document
                .getElementById(
                    "email"
                )
                .value,

        localizacao:

            document
                .getElementById(
                    "localizacao"
                )
                .value

    };

    const horario = montarHorario();

    const {

        error

    } = await supabaseClient

        .from(
            "empresas"
        )

        .insert({

            nome,

            slug,

            descricao,

            plano,

            categorias,

            tags,

            local,

            imagem,

            endereco,

            contatos,

            horario,

            views: 0,

            whatsapp_clicks: 0,

            instagram_clicks: 0

        });

    if (
        error
    ) {

        console.error(
            error
        );

        mostrarToast(

            "Erro ao salvar empresa."

        );

        return;

    }

    mostrarToast(

        "✅ Empresa cadastrada."

    );

    navegar(
        "/admin"
    );

}