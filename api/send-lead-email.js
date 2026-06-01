import { Resend } from "resend";

const resend =

    new Resend(
        process.env.RESEND_API_KEY
    );

export default async function handler(

    req,

    res

) {

    if (
        req.method !== "POST"
    ) {

        return res.status(405).json({

            error:
                "Método não permitido"

        });

    }

    try {

        const {

            nome,

            empresa,

            telefone,

            email,

            plano,

            mensagem

        } = req.body;

        await resend.emails.send({

            from:

                "Guia PlanGO <contato@guiaplango.com.br>",

            to:

                "phtito@gmail.com",

            subject:

                "🚀 Novo Lead - Guia Plango",

            html: `

                <h2>
                    Novo Lead
                </h2>

                <p>

                    <strong>Nome:</strong>

                    ${nome}

                </p>

                <p>

                    <strong>Empresa:</strong>

                    ${empresa}

                </p>

                <p>

                    <strong>Telefone:</strong>

                    ${telefone}

                </p>

                <p>

                    <strong>E-mail:</strong>

                    ${email}

                </p>

                <p>

                    <strong>Plano:</strong>

                    ${plano}

                </p>

                <p>

                    <strong>Mensagem:</strong>

                    ${mensagem}

                </p>

            `

        });

        return res.status(200).json({

            success: true

        });

    } catch (erro) {

        console.error(
            erro
        );

        return res.status(500).json({

            success: false

        });

    }

}