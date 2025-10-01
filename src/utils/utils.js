export function copyMap(data) {
  const miMapa = new Map(data.entries());
  return miMapa;
}

export function calcularHoraFinal(minutosTotales) {
  const minutosFinalesEn24H = minutosTotales % 1440;

  const nuevaHora = Math.floor(minutosFinalesEn24H / 60);
  const nuevosMinutos = minutosFinalesEn24H % 60;

  const horaFormateada = nuevaHora.toString().padStart(2, "0");
  const minutosFormateados = nuevosMinutos.toString().padStart(2, "0");

  return { horas: horaFormateada, minutos: minutosFormateados };
}

export function searchActividad(actividad, data) {
  if (actividad == "diaLibre") {
    const filter = data?.filter((ele) => ele?.descanso == true);
    return filter[0] ? [filter[0].abreviatura] : [];
  } else {
    const filter = data?.filter((ele) => ele?.actividadesNecesarios[actividad]);
    return filter.map((ele) => ele.abreviatura);
  }
}

/**
 * Convierte una cadena de hora "HH:MM" a minutos totales desde la medianoche.
 * Ejemplo: "01:00" -> 60, "13:30" -> 810
 */
export function horaAMinutosTotales(horaString) {
  const [horas, minutos] = horaString.split(":").map(Number);
  return horas * 60 + minutos;
}

export function diaDeHoy() {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const hoy = new Date();
  return dias[hoy.getDay()];
}
