/*
=====================================================
STATUS DE FUNCIONAMENTO
=====================================================
*/

function statusFuncionamento(horario) {

    if (!horario) {

        return {
            texto: "Fechado",
            classe: "fechado",
            aberto: false
        };
    }

    const diasSemana = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado"
    ];

    const agora = new Date();

    const diaAtual = diasSemana[agora.getDay()];

    const horarioHoje = horario[diaAtual];

    if (!horarioHoje) {
        return {
            texto: "Fechado",
            classe: "fechado",
            aberto: false
        };
    }

    const horaAtual = agora.getHours();
    const minutoAtual = agora.getMinutes();

    const atualEmMinutos =
        (horaAtual * 60) + minutoAtual;

    const [abreHora, abreMinuto] =
        horarioHoje.abre
            .split(":")
            .map(Number);

    const abreEmMinutos =
        (abreHora * 60) + abreMinuto;

    const [fechaHora, fechaMinuto] =
        horarioHoje.fecha
            .split(":")
            .map(Number);

    let fechaEmMinutos =
        (fechaHora * 60) + fechaMinuto;

    if (fechaEmMinutos <= abreEmMinutos) {
        fechaEmMinutos += 1440;
    }

    let horarioAtual = atualEmMinutos;

    if (horarioAtual < abreEmMinutos) {
        horarioAtual += 1440;
    }

    if (
        horarioAtual < abreEmMinutos
        ||
        horarioAtual >= fechaEmMinutos
    ) {

        return {
            texto: "Fechado",
            classe: "fechado",
            aberto: false
        };
    }

    if (fechaEmMinutos - horarioAtual <= 60) {

        return {
            texto: "Fecha em breve",
            classe: "quase-fechando",
            aberto: true
        };
    }

    return {
        texto: "Aberto agora",
        classe: "aberto",
        aberto: true
    };
}
