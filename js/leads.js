/*
=====================================================
SALVAR LEAD
=====================================================
*/

async function salvarLead(
    event
) {

    event.preventDefault();

    /*
    =====================================
    FORM DATA
    =====================================
    */

    const nome =

        document
            .getElementById(
                "leadNome"
            )
            .value
            .trim();

    const empresa =

        document
            .getElementById(
                "leadEmpresa"
            )
            .value
            .trim();

    const telefone =

        document
            .getElementById(
                "leadTelefone"
            )
            .value
            .trim();

    const email =

        document
            .getElementById(
                "leadEmail"
            )
            .value
            .trim();

    const plano =

        document
            .getElementById(
                "leadPlano"
            )
            .value;

    const mensagem =

        document
            .getElementById(
                "leadMensagem"
            )
            .value
            .trim();

    const origem =

        document
            .getElementById(
                "leadOrigem"
            )
            ?.value ||

        "pagina-anuncie";

    const codigoIndicacao =

        document
            .getElementById(
                "leadIndicacao"
            )
            ?.value
            ?.trim()
            .toUpperCase()

        || null;

    /*
    =====================================
    BOTÃO
    =====================================
    */

    const submitBtn =

        event.target.querySelector(

            'button[type="submit"]'

        );

    submitBtn.disabled =
        true;

    submitBtn.textContent =
        "Enviando...";

    try {

        /*
        =====================================
        VALIDAR CÓDIGO DE INDICAÇÃO
        =====================================
        */

        if (

            codigoIndicacao

        ) {

            const empresaIndicadora =

                empresas.find(

                    empresa =>

                        empresa.codigo_indicacao

                            ?.toUpperCase()

                        ===

                        codigoIndicacao

                );

            if (

                !empresaIndicadora

            ) {

                mostrarToast(

                    "Código de indicação inválido."

                );

                return;

            }

        }

        /*
        =====================================
        SALVAR LEAD
        =====================================
        */

        const {

            error

        } = await supabaseClient

            .from("leads")

            .insert({

                nome,

                empresa,

                telefone,

                email,

                mensagem,

                plano_interesse:
                    plano,

                origem,

                codigo_indicacao:
                    codigoIndicacao

            });

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

                "Erro ao enviar solicitação."

            );

            return;

        }

        /*
        =====================================
        EMAIL
        =====================================
        */

        await fetch(

            "/api/send-lead-email",

            {

                method:
                    "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    nome,

                    empresa,

                    telefone,

                    email,

                    plano,

                    mensagem,

                    codigoIndicacao

                })

            }

        );

        /*
        =====================================
        SUCCESS
        =====================================
        */

        mostrarToast(

            "✅ Recebemos seu interesse. Entraremos em contato em breve."

        );

        document

            .getElementById(
                "leadForm"
            )

            ?.reset();

    } catch (erro) {

        console.error(
            erro
        );

        mostrarToast(

            "Erro inesperado. Tente novamente."

        );

    } finally {

        /*
        =====================================
        REATIVAR BOTÃO
        =====================================
        */

        submitBtn.disabled =
            false;

        submitBtn.textContent =

            "🚀 Quero anunciar minha empresa";

    }

}

/*
=====================================================
CARREGAR LEADS
=====================================================
*/

async function carregarLeads() {

    try {

        const {

            data,

            error

        } = await supabaseClient

            .from("leads")

            .select("*")

            .order(

                "created_at",

                {

                    ascending: false

                }

            );

        if (
            error
        ) {

            console.error(
                error
            );

            return;

        }

        leads =
            data || [];

    } catch (erro) {

        console.error(
            erro
        );

    }

}