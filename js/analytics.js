/*
=====================================================
ANALYTICS
=====================================================
*/

let visualizacoes =
    JSON.parse(
        localStorage.getItem(
            "visualizacoes"
        )
    ) || {};

function registrarVisualizacao(id) {

    /*
    =====================================
    INIT
    =====================================
    */

    if (!visualizacoes[id]) {

        visualizacoes[id] = 0;

    }

    /*
    =====================================
    SOMA
    =====================================
    */

    visualizacoes[id]++;

    /*
    =====================================
    STORAGE
    =====================================
    */

    localStorage.setItem(

        "visualizacoes",

        JSON.stringify(
            visualizacoes
        )

    );

}

function logTopEmpresas() {

    const ranking = empresas.map((empresa) => {

        return {

            nome:
                empresa.nome,

            views:
                visualizacoes[empresa.id] || 0

        };

    });

    ranking.sort((a, b) => {

        return b.views - a.views;

    });
    

}

/*
=====================================================
VISITAS
=====================================================
*/

async function registrarVisita() {

    try {

        const hoje =

            new Date()

                .toISOString()

                .split("T")[0];

        /*
        =====================================
        JÁ REGISTRADA
        =====================================
        */

        const ultimaVisita =

            localStorage.getItem(

                "ultimaVisitaGuia"

            );

        if (

            ultimaVisita === hoje

        ) {

            return;

        }

        /*
        =====================================
        BUSCA DIA
        =====================================
        */

        const {

            data

        } = await supabaseClient

            .from("visitas")

            .select("*")

            .eq(

                "data",

                hoje

            )

            .maybeSingle();

        /*
        =====================================
        UPDATE
        =====================================
        */

        if (

            data

        ) {

            await supabaseClient

                .from("visitas")

                .update({

                    total:

                        data.total + 1

                })

                .eq(

                    "id",

                    data.id

                );

        }

        /*
        =====================================
        INSERT
        =====================================
        */

        else {

            await supabaseClient

                .from("visitas")

                .insert({

                    data: hoje,

                    total: 1

                });

        }

        localStorage.setItem(

            "ultimaVisitaGuia",

            hoje

        );

    }

    catch (

        erro

    ) {

        console.error(

            erro

        );

    }

}

async function carregarMetricasVisitas() {

    try {

        const {

            data,

            error

        } = await supabaseClient

            .from("visitas")

            .select("*");

        if (

            error

        ) {

            console.error(
                error
            );

            return null;

        }

        const totalVisitas =

            (data || []).reduce(

                (soma, item) =>

                    soma +

                    (item.total || 0),

                0

            );

        const hoje =

            new Date()

                .toISOString()

                .split("T")[0];

        const visitasHoje =

            data.find(

                item =>

                    item.data === hoje

            )?.total || 0;
            

        /*
        =====================================
        ÚLTIMOS 7 DIAS
        =====================================
        */

        const seteDiasAtras =

            new Date();

        seteDiasAtras.setDate(

            seteDiasAtras.getDate() - 7

        );

        const visitas7Dias =

            (data || [])

                .filter(

                    item =>

                        new Date(item.data)

                        >=

                        seteDiasAtras

                )

                .reduce(

                    (soma, item) =>

                        soma +

                        (item.total || 0),

                    0

                );
        
        /*
        =====================================
        7 DIAS ANTERIORES
        =====================================
        */

        const quatorzeDiasAtras =

            new Date();

        quatorzeDiasAtras.setDate(

            quatorzeDiasAtras.getDate() - 14

        );

        const visitas7DiasAnterior =

            (data || [])

                .filter(

                    item => {

                        const dataVisita =

                            new Date(item.data);

                        return (

                            dataVisita >=

                            quatorzeDiasAtras

                            &&

                            dataVisita <

                            seteDiasAtras

                        );

                    }

                )

                .reduce(

                    (soma, item) =>

                        soma +

                        (item.total || 0),

                    0

                );

        const mediaDiaria =

            Math.round(

                visitas7Dias / 7

            );

        /*
        =====================================
        CRESCIMENTO
        =====================================
        */

        let crescimento = 0;

        if (

            visitas7DiasAnterior > 0

        ) {

            crescimento =

                Math.round(

                    (

                        (

                            visitas7Dias

                            -

                            visitas7DiasAnterior

                        )

                        /

                        visitas7DiasAnterior

                    )

                    * 100

                );

        }

        return {

            totalVisitas,

            visitasHoje,

            visitas7Dias,

            mediaDiaria,

            crescimento

        };

    }

    catch (

        erro

    ) {

        console.error(
            erro
        );

        return null;

    }

}
