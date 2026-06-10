async function carregarCategorias() {

    const {

        data,

        error

    } = await supabaseClient

        .from("categorias")

        .select("*")

        .order(
            "nome"
        );

    if (
        error
    ) {

        console.error(
            error
        );

        return;

    }

    categorias =
        data || [];

}

function renderizarCheckboxCategorias(

    empresa = null

) {

    const selecionadas =

        empresa?.categorias || [];

    return categorias

        .filter(
            categoria => categoria.ativo !== false
        )

        .map(

            categoria => `

                <label class="categoria-checkbox">

                    <input

                        type="checkbox"

                        value="${categoria.nome}"

                        ${

                            selecionadas.includes(

                                categoria.nome

                            )

                            ?

                            "checked"

                            :

                            ""

                        }

                    >

                    ${categoria.nome}

                </label>

            `

        )

        .join("");

}