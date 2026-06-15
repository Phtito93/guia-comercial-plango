/*
=====================================================
HELPERS
=====================================================
*/

function normalizarTexto(texto = "") {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}

/*
=====================================================
TOTAL INTERAÇÕES
=====================================================
*/

function calcularTotalInteracoes(

    empresa

) {

    return (

        (empresa.whatsapp_clicks || 0)

        +

        (empresa.instagram_clicks || 0)

        +

        (empresa.telefone_clicks || 0)

        +

        (empresa.site_clicks || 0)

        +

        (empresa.email_clicks || 0)

        +

        (empresa.localizacao_clicks || 0)

    );

}

/*
=====================================================
SCORE EMPRESA
=====================================================
*/

function calcularScore(

    empresa

) {

    return (

        (empresa.views || 0)

        +

        (calcularTotalInteracoes(empresa) * 5)

    );

}

/*
=====================================================
EMPRESA NOVA
=====================================================
*/

function empresaNova(empresa) {

    if (
        !empresa.createdAt
    ) {

        return false;

    }

    const dataCadastro =

        new Date(
            empresa.createdAt
        );

    const hoje =
        new Date();

    const dias =

        Math.floor(

            (hoje - dataCadastro)

            /

            86400000

        );

    return dias <= 30;

}

/*
=====================================================
CÓDIGO INDICAÇÃO
=====================================================
*/

function gerarCodigoIndicacao() {

    const letras =

        "ABCDEFGHJKLMNPQRSTUVWXYZ";

    let codigo = "";

    for (

        let i = 0;

        i < 3;

        i++

    ) {

        codigo +=

            letras.charAt(

                Math.floor(

                    Math.random()

                    * letras.length

                )

            );

    }

    codigo +=

        Math.floor(

            100 +

            Math.random() * 900

        );

    return codigo;

}

/*
=====================================================
STATUS PAGAMENTO
=====================================================
*/

function obterStatusPagamento(

    empresa

) {

    if (

        !empresa.vencimento

    ) {

        return {

            texto:

                "Sem configuração",

            emoji:

                "⚪"

        };

    }

    const hoje =

        new Date();

    const vencimento =

        new Date(

            empresa.vencimento

        );

    if (

        empresa.ultimo_pagamento

        &&

        new Date(

            empresa.ultimo_pagamento

        ) >= vencimento

    ) {

        return {

            texto:

                "Pago",

            emoji:

                "🟢"

        };

    }

    if (

        vencimento < hoje

    ) {

        return {

            texto:

                "Vencida",

            emoji:

                "🔴"

        };

    }

    return {

        texto:

            "A vencer",

        emoji:

            "🟡"

    };

}

/*
=====================================================
MENSAGEM COBRANÇA
=====================================================
*/

function gerarMensagemCobranca(

    empresa

) {

    return encodeURIComponent(

`Olá ${empresa.nome}.

Passando para lembrar da mensalidade do Guia Plango.

*Plano:* ${empresa.plano}

*Valor:* R$ ${empresa.valor_mensal || 0}

*Vencimento:* ${formatarData(empresa.vencimento)}

Obrigado!`

    );

}

/*
=====================================================
FORMATAR DATA
=====================================================
*/

function formatarData(data) {

    if (!data) {

        return "-";

    }

    const dataLimpa =

        data.split("T")[0];

    const [ano, mes, dia] =

        dataLimpa.split("-");

    return `${dia}/${mes}/${ano}`;

}

function formatarDataHora(data) {

    if (!data) {

        return "-";

    }

    return new Date(data)

        .toLocaleString("pt-BR");

}