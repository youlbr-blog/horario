import { Dia } from "./claseDias";
const diasObjet = [
  { nombre: "Lunes", abreviatura: "Lun" },
  { nombre: "Martes", abreviatura: "Mar" },
  { nombre: "Miércoles", abreviatura: "Mie" },
  { nombre: "Jueves", abreviatura: "Jue" },
  { nombre: "Viernes", abreviatura: "Vie" },
  { nombre: "Sábado", abreviatura: "Sab" },
  { nombre: "Domingo", abreviatura: "Dom" },
];

function crearOBjetosDias(nombre, abreviatura) {
  return {
    nombre: nombre,
    descanso: false,
    abreviatura: abreviatura,
    totalHoraLibre: 1440,
    totalHoraOcupada: 0,
    actividadesNecesarios: {},
    actividadesProgramadas: [],
    horasOcupadas: [],
  };
}
function crearBD() {
  const objetoDias = {};
  for (const { nombre, abreviatura } of diasObjet) {
    objetoDias[nombre] = crearOBjetosDias(nombre, abreviatura);
  }
  let date = localStorage.getItem("bdDisciplina");
  if (!date) {
    localStorage.setItem("bdDisciplina", JSON.stringify(objetoDias));
    date = localStorage.getItem("bdDisciplina");
  }
  return JSON.parse(date);
}

const dias = crearBD();
const diasSemana = new Map();

export function crearDias() {
  for (const propiedad in dias) {
    diasSemana.set(propiedad, new Dia(dias[propiedad]));
  }
  return diasSemana;
}

export function guardarDatos(datosMap) {
  const datosParaGuardar = {};

  // 1. Convertir el Map a un objeto plano
  datosMap.forEach((dia, nombreDia) => {
    // 2. Crear un objeto simple con los datos que quieres guardar
    datosParaGuardar[nombreDia] = {
      nombre: dia.nombre,
      descanso: dia.descanso,
      abreviatura: dia.abreviatura,
      totalHoraLibre: dia.totalHoraLibre,
      totalHoraOcupada: dia.totalHoraOcupada,
      actividadesNecesarios: dia.actividadesNecesarios,
      actividadesProgramadas: dia.actividadesProgramadas,
      horasOcupadas: dia.horasOcupadas,
    };
  });

  // 3. Guardar en localStorage
  localStorage.setItem("bdDisciplina", JSON.stringify(datosParaGuardar));
}

export function createActividadALL() {
  const actividadesDiarias = [
    { nombre: "Levantarse", sistema: true },
    { nombre: "Ejercicio", sistema: true },
    { nombre: "Limpieza", sistema: true },
    { nombre: "Leer", sistema: true },
    { nombre: "Desayunar", sistema: true },
    { nombre: "Almorzar", sistema: true },
    { nombre: "Trabajar", sistema: true },
    { nombre: "Dormir", sistema: true },
  ];

  let actividades = localStorage.getItem("actividadesDisciplina");
  if (!actividades) {
    localStorage.setItem(
      "actividadesDisciplina",
      JSON.stringify(actividadesDiarias)
    );
    actividades = localStorage.getItem("actividadesDisciplina");
  }
  return JSON.parse(actividades);
}
