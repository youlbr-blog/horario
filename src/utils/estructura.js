const diasSemana = new Map();

class Dia {
  constructor(nombre, abreviatura) {
    this.nombre = nombre;
    this.descanso = false;
    this.abreviatura = abreviatura;
    this.horaLibre = 24;
    this.actividadesNecesarios = new Map();
    this.actividadesProgramadas = [];
    this.horasOcupadas = [
      { desde: 7, hasta: 9 },
      { desde: 9, hasta: 10 },
    ];
  }

  // Cambiado para que modifique la propiedad 'descanso'
  marcarDescanso() {
    this.descanso = true;
  }
  dormir(horaInicio, horas) {
    if (this.verificarHoras(horaInicio, horas)) {
      return;
    }
    const horaDormir = { desde: horaInicio, hasta: horaInicio + horas };
    this.actividadesNecesarios.set("dormir", { ...horaDormir });
    this.horaLibre -= horas;
  }

  verificarHoras(horaInicio, horas) {
    const horaFin = horaInicio + horas;
    for (const { desde, hasta } of this.horasOcupadas) {
      if (
        (horaInicio >= desde && horaInicio < hasta) ||
        (horaFin > desde && horaFin <= hasta) ||
        (desde >= horaInicio && desde < horaFin)
      ) {
        console.log(
          `❌ No se puede programar. Horario ocupado de ${desde} a ${hasta}.`
        );
        return true; // Detiene la ejecución del método si hay superposición
      }
    }
    return false;
  }

  static fromJSON(obj) {
    return new Dia(obj.nombre, obj.abreviatura, obj.descanso);
  }
}

function crearDias(arrayDias) {
  for (const ele of arrayDias) {
    diasSemana.set(ele.nombre, new Dia(ele.nombre, ele.abreviatura));
  }
}

// Llama a la función para llenar el Map
// crearDias(dias);

console.log(diasSemana.get("Lunes").descanso); // Salida: false

// La función ahora recibe el nombre del día
function asignarDescanso(nombreDia) {
  const diaParaModificar = diasSemana.get(nombreDia);

  // Si el día existe en el Map, llama a su método
  if (diaParaModificar) {
    diaParaModificar.marcarDescanso();
  }
}
const diasDormir = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

function programarDormir(dias, horaInicio, horas) {
  for (const dia of dias) {
    const diaObj = diasSemana.get(dia);
    if (diaObj) {
      diaObj.dormir(horaInicio, horas); // Añade 8 horas de sueño
    }
  }
}

asignarDescanso("Lunes");
programarDormir(diasDormir, 10, 2);
// console.log(diasSemana); // Salida: true

for (const [clave, valor] of diasSemana) {
  const horas = valor.actividadesNecesarios;
  console.log("DIA -->" + clave);
  console.log("Horas Disponibles-->" + valor.horaLibre);
  for (const [clave, valor] of horas) {
    console.log(valor.desde, valor.hasta, clave);
  }
}
