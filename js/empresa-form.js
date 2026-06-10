function renderizarFormularioEmpresa(empresa = null) {

    const empresaId = empresa?.id || null;

    window.empresaEditandoId = empresaId;

    const CIDADE_PADRAO = "Planaltina";

    const ESTADO_PADRAO = "GO";

    const CEP_PADRAO = "73750-000";

    const rotaVoltar =

        window.rotaVoltarEmpresa

        ||

        "/admin";

    aplicarModoLandingPage();

    empresaGrid.innerHTML = `

        <section class="empresa-form-page">

            <h2>

                ${

                    empresaId

                        ? "✏ Editar Empresa"

                        : "➕ Nova Empresa"

                }

            </h2>

            <div class="empresa-form-actions">

                <button

                    type="button"

                    class="voltar-btn"

                    onclick="
                        navegar('${rotaVoltar}')
                    "

                >

                    ← Voltar

                </button>

            </div>

            <form id="empresaForm">

                
                <div class="form-grid">
                    <input

                        id="empresaNome"
                        placeholder="Nome da Empresa"
                        value="${empresa?.nome || ""}"
                        required
                    >

                    <input
                        id="empresaSlug"
                        placeholder="(gerado automaticamente)"
                        value="${empresa?.slug || ""}"
                    >
                </div>

                <textarea
                    id="empresaDescricao"
                    placeholder="Descrição"
                >${(empresa?.descricao || "").trim()}</textarea>

                <div class="form-grid">

                    <select
                        id="empresaPlano"
                    >

                        <option

                            value="presenca"

                            ${

                                empresa?.plano === "presenca"

                                    ? "selected"

                                    : ""

                            }

                        >

                            Presença

                        </option>

                        <option

                            value="destaque"

                            ${

                                empresa?.plano === "destaque"

                                    ? "selected"

                                    : ""

                            }

                        >

                            Destaque

                        </option>

                    </select>

                    <input

                        id="empresaLocal"
                        placeholder="Local"
                        value="${empresa?.local || ""}"
                    >
                </div>

                <input

                    id="empresaImagem"

                    placeholder="(gerado automaticamente)"

                    value="${empresa?.imagem || ""}"

                >

                <div class="imagem-upload-area">

                    <input

                        type="file"

                        id="empresaImagemArquivo"

                        accept=".jpg,.jpeg,.png,.webp"

                    >

                </div>

                <div

                    id="empresaImagemPreview"

                    class="empresa-imagem-preview"

                >

                    ${empresa?.imagem

                        ? `

                            <img

                                src="/img/${empresa.imagem}"

                                alt="${empresa.nome || 'Preview'}"

                            >

                        `

                        : `

                            <div class="preview-placeholder">

                                🖼️ Preview da imagem

                            </div>

                        `
                    }

                </div>

                <div

                    id="imagemStatus"

                    class="imagem-status"

                >

                </div>
                
                <h3>

                    Categorias

                </h3>

                <div

                    id="categoriasCheckbox"

                    class="categorias-checkbox-grid"

                >

                    ${renderizarCheckboxCategorias(empresa)}

                </div>

                <input
                    id="empresaTags"
                    placeholder="Tags separadas por vírgula"
                    value="${empresa?.tags?.map(item => item.trim()).join(', ') || ''}"
                >

                <h3>

                    Endereço

                </h3>

                <div class="form-grid">
                    <input 
                        id="rua"
                        placeholder="Rua"
                        value="${empresa?.endereco?.rua || ''}"
                    >

                    <input 
                        id="numero"
                        placeholder="Número"
                        value="${empresa?.endereco?.numero || ''}"
                    >
                </div>

                <div class="form-grid">
                    <input 
                        id="bairro" 
                        placeholder="Bairro" 
                        value="${empresa?.endereco?.bairro || ''}"
                    >

                    <input 
                        id="cidade" 
                        placeholder="Cidade" 
                        value="${empresa?.endereco?.cidade || CIDADE_PADRAO}"
                    >
                </div>

                <div class="form-grid">
                    <input 
                        id="estado"
                        placeholder="UF"
                        value="${empresa?.endereco?.estado || ESTADO_PADRAO}"
                    >

                    <input 
                        id="cep" 
                        placeholder="CEP"
                        value="${empresa?.endereco?.cep || CEP_PADRAO}"
                    >
                </div>

                <h3>

                    Contatos

                </h3>

                <div class="form-grid">
                    <input 
                        id="telefone" 
                        placeholder="Telefone" 
                        value="${empresa?.contatos?.telefone || ''}"
                    >

                    <input 
                        id="whatsapp" 
                        placeholder="WhatsApp" 
                        value="${empresa?.contatos?.whatsapp || ''}"
                    >
                </div>

                <div class="form-grid">
                    <input 
                        id="instagram" 
                        placeholder="Instagram" 
                        value="${empresa?.contatos?.instagram || ''}"
                    >

                    <input 
                        id="site" 
                        placeholder="Site" 
                        value="${empresa?.contatos?.site || ''}"
                    >
                </div>

                <input 
                    id="email" 
                    placeholder="Email" 
                    value="${empresa?.contatos?.email || ''}"
                >

                <input 
                    id="localizacao" 
                    placeholder="Localização" 
                    value="${empresa?.contatos?.localizacao || ''}"
                >

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

                    ${renderizarCamposHorario(empresa)}

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

    const campoNome =

        document.getElementById(
            "empresaNome"
        );

    const campoSlug =

        document.getElementById(
            "empresaSlug"
        );

    const campoImagem =

        document.getElementById(
            "empresaImagem"
        );

    const campoArquivoImagem =

        document.getElementById(
            "empresaImagemArquivo"
        );

    const previewImagem =

        document.getElementById(
            "empresaImagemPreview"
        );

    const statusImagem =

        document.getElementById(
            "imagemStatus"
        );

    campoNome?.addEventListener(

        "input",

        () => {

            campoSlug.value =

                gerarSlug(

                    campoNome.value

                );
        }

    );

    campoArquivoImagem?.addEventListener(

        "change",

        (event) => {

            const arquivo =

                event.target.files?.[0];

            if (
                !arquivo
            ) {

                return;

            }

            campoImagem.value =
                arquivo.name;

            campoImagem.dispatchEvent(

                new Event(
                    "input"
                )

            );

        }

    );

    campoImagem?.addEventListener(

        "input",

        () => {

            const imagem =

                campoImagem.value.trim();

            if (
                !imagem
            ) {

                previewImagem.innerHTML = `

                    <div class="preview-placeholder">

                        🖼️ Preview da imagem

                    </div>

                `;

                return;

            }

            const img =

                new Image();

            img.onload = () => {

                previewImagem.innerHTML = `

                    <img

                        src="/img/${imagem}"

                        alt="Preview"

                    >

                `;

                statusImagem.innerHTML = `

                    <span class="imagem-ok">

                        ✅ Imagem encontrada

                    </span>

                `;

            };

            img.onerror = () => {

                previewImagem.innerHTML = `

                    <div class="preview-placeholder">

                        ❌ Imagem não encontrada

                    </div>

                `;

                statusImagem.innerHTML = `

                    <span class="imagem-erro">

                        ⚠️ Verifique o nome do arquivo

                    </span>

                `;

            };

            img.src = `/img/${imagem}`;

        }

    );
}

function renderizarCamposHorario(empresa = null) {

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

        (dia) => {

            const horarioDia =

                empresa?.horario?.[dia];

            return `

                <div class="horario-dia">

                    <label class="horario-label">

                        <input

                            type="checkbox"

                            id="${dia}Ativo"

                            ${horarioDia ? "checked" : ""}

                        >

                        ${dia.charAt(0).toUpperCase() + dia.slice(1)}

                    </label>

                    <div class="horario-grid">

                        <input

                            type="time"

                            id="${dia}Abre"

                            value="${horarioDia?.abre || ""}"

                        >

                        <input

                            type="time"

                            id="${dia}Fecha"

                            value="${horarioDia?.fecha || ""}"

                        >

                    </div>

                </div>

            `;

        }

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
    
    const empresaId = window.empresaEditandoId || null;

    event.preventDefault();

    const nome =
        document
            .getElementById(
                "empresaNome"
            )
            .value
            .trim();

    const slugDigitado =
        document
            .getElementById(
                "empresaSlug"
            )
            .value
            .trim();

    const slug =

        slugDigitado ||

        gerarSlug(
            nome
        );

    const descricao =
        document
            .getElementById(
                "empresaDescricao"
            )
            .value
            .trim();

    const plano =

        document
            .getElementById(
                "empresaPlano"
            )
            .value;

    const categorias =

        [

            ...document.querySelectorAll(

                '#categoriasCheckbox input:checked'

            )

        ]

        .map(

            checkbox =>

                checkbox.value

        );

    const tags =

        document
            .getElementById(
                "empresaTags"
            )
            .value

            .split(",")

            .map(

                tag =>

                    tag.trim()

            )

            .filter(Boolean);

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
            .value;

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

    const contatos = {};

        const telefone =

            document
                .getElementById(
                    "telefone"
                )
                .value
                .trim();

        if (
            telefone
        ) {
            contatos.telefone = telefone;
        }

        const whatsapp =

            document
                .getElementById(
                    "whatsapp"
                )
                .value
                .trim();

        if (
            whatsapp
        ) {
            contatos.whatsapp = whatsapp;
        }

        const instagram =

            document
                .getElementById(
                    "instagram"
                )
                .value
                .trim();

        if (
            instagram
        ) {
            contatos.instagram = instagram;
        }

        const site =

            document
                .getElementById(
                    "site"
                )
                .value
                .trim();

        if (
            site
        ) {
            contatos.site = site;
        }

        const email =

            document
                .getElementById(
                    "email"
                )
                .value
                .trim();

        if (
            email
        ) {
            contatos.email = email;
        }

        const localizacao =

            document
                .getElementById(
                    "localizacao"
                )
                .value
                .trim();

        if (
            localizacao
        ) {
            contatos.localizacao = localizacao;

    };

    const horario = montarHorario();

    const empresaData = {
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
        horario
    };

    let resultado;

    if (

        empresaId

    ) {

        resultado =

            await supabaseClient

                .from(
                    "empresas"
                )

                .update(empresaData)

                .eq(
                    "id",

                    empresaId
                );

    }

    else {

        resultado =

            await supabaseClient

                .from(
                    "empresas"
                )

                .insert({

                    ...empresaData,

                    views: 0,

                });
    }

    const {

        error

    } = resultado;

    if (

        error

    ) {

        if (

            error.message

                ?.includes(
                    "slug"
                )

        ) {

            mostrarToast(

                "Slug já existe. Ajuste o slug manualmente."

            );

            return;

        }

        console.error(
            error
        );

        mostrarToast(

            "Erro ao salvar empresa."

        );

        return;

    }

    if (

        categorias.length === 0

    ) {

        mostrarToast(

            "Selecione ao menos uma categoria."

        );

        return;

    }

    mostrarToast(

        empresaId

            ?

            "✅ Empresa atualizada"

            :

            "✅ Empresa cadastrada"

    );

    const rotaVoltar =

        window.rotaVoltarEmpresa

        ||

        "/admin/empresas";

    await carregarEmpresas();

    navegar(
        rotaVoltar
    );

    window.rotaVoltarEmpresa = null;

}

function abrirNovaEmpresa(
    rotaOrigem
) {

    window.rotaVoltarEmpresa =

        rotaOrigem;

    renderizarFormularioEmpresa();

}

function gerarSlug(
    texto
) {

    return texto

        .toLowerCase()

        .normalize(
            "NFD"
        )

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[^a-z0-9\s-]/g,
            ""
        )

        .trim()

        .replace(
            /\s+/g,
            "-"
        );

}