import { useState } from "react";
import { useData } from "../../../context/DataContex";
import { X, Check } from "lucide-react";
import { ShowDias } from "../../general/ShowDias";
import { calcularHoraFinal, copyMap } from "../../../utils/utils";

export function Actvidad({ actividad }) {
  const { data, updateData, modal, dataArray } = useData();
  const [info, setInfo] = useState([]);
  const { closeModal } = modal;
  const [horaActivdadEmpezar, setHoraActivdadEmpezar] = useState("");
  const [tiempoActividad, setTiempoActividad] = useState("");
  const [tiempoHoras, setTiempoHoras] = useState("");
  const [tiempoMinutos, setTiempoMinutos] = useState("");
  const [error, setError] = useState("");

  const verify = (e) => {
    setInfo(e);
  };

  // Función para calcular el tiempo total en minutos
  const calcularTiempoTotal = (horas, minutos) => {
    const horasNum =
      horas === ""
        ? 0
        : parseInt(horas.replace(" horas", "").replace(" hora", ""));
    const minutosNum =
      minutos === "" ? 0 : parseInt(minutos.replace(" minutos", ""));
    return horasNum * 60 + minutosNum;
  };

  // Función para validar y actualizar el tiempo total
  const actualizarTiempoTotal = (
    nuevasHoras = tiempoHoras,
    nuevosMinutos = tiempoMinutos
  ) => {
    const tiempoTotalMinutos = calcularTiempoTotal(nuevasHoras, nuevosMinutos);

    // Validaciones
    const duracionMinima = 10; // 10 minutos mínimo
    const duracionMaxima = 12 * 60; // 12 horas máximo

    if (
      tiempoTotalMinutos < duracionMinima &&
      (nuevasHoras !== "" || nuevosMinutos !== "")
    ) {
      setError("La duración mínima debe ser 10 minutos.");
      setTiempoActividad("");
    } else if (tiempoTotalMinutos > duracionMaxima) {
      setError("La duración máxima debe ser 12 horas.");
      setTiempoActividad("");
    } else if (nuevasHoras === "" && nuevosMinutos === "") {
      setError("");
      setTiempoActividad("");
    } else {
      setError("");
      setTiempoActividad(tiempoTotalMinutos);
    }
  };

  const verifyHora = (e, tipo) => {
    const valor = e.target.value;

    if (tipo === "horas") {
      // Mapeo para horas
      const horasMap = {
        "1 hora": "1 hora",
        "2 horas": "2 horas",
        "3 horas": "3 horas",
        "4 horas": "4 horas",
        "5 horas": "5 horas",
        "6 horas": "6 horas",
        "7 horas": "7 horas",
        "8 horas": "8 horas",
        "9 horas": "9 horas",
        "10 horas": "10 horas",
        "11 horas": "11 horas",
        "12 horas": "12 horas",
      };

      // Si es una opción válida del datalist o está vacío
      if (horasMap[valor] || valor === "") {
        setTiempoHoras(valor);
        actualizarTiempoTotal(valor, tiempoMinutos);
      } else {
        setError("Las horas deben estar entre 0 y 12.");
        setTiempoHoras("");
        setTiempoActividad("");
      }
    } else if (tipo === "minutos") {
      // Mapeo para minutos
      const minutosMap = {
        "10 minutos": "10 minutos",
        "15 minutos": "15 minutos",
        "20 minutos": "20 minutos",
        "25 minutos": "25 minutos",
        "30 minutos": "30 minutos",
        "35 minutos": "35 minutos",
        "40 minutos": "40 minutos",
        "45 minutos": "45 minutos",
      };

      // Si es una opción válida del datalist o está vacío
      if (minutosMap[valor] || valor === "") {
        setTiempoMinutos(valor);
        actualizarTiempoTotal(tiempoHoras, valor);
      } else {
        setError("Los minutos deben estar entre 0 y 55.");
        setTiempoMinutos("");
        setTiempoActividad("");
      }
    }
  };

  const aceptar = () => {
    if (!info.length > 0 || !horaActivdadEmpezar || !tiempoActividad) return;

    const miMapa = copyMap(data);
    for (const ele of info) {
      if (!miMapa.get(ele).descanso) {
        const evalue = miMapa
          .get(ele)
          .addActividad(horaActivdadEmpezar, tiempoActividad, actividad);
        console.log(evalue);
        if (evalue) {
          const date = miMapa.get(ele).actividadesNecesarios[evalue];
          const inicio = calcularHoraFinal(date.desde);
          const final = calcularHoraFinal(date.hasta);
          setError(
            `Ya existe una actividad ${evalue.toUpperCase()} en el horario: ` +
              `${inicio.horas}:${inicio.minutos} - ${final.horas}:${final.minutos}.`
          );
          return;
        }
      }
    }
    updateData(miMapa);

    closeModal();
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-xl border border-gray-700 max-w-full mx-auto">
      {/* Encabezado y botón de cerrar */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold   text-gray-900 font-mono">
          Horas para {actividad}
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
        >
          <X className="w-10 h-10" />
        </button>
      </div>

      {/* Contenedor para seleccionar horas */}
      <div className="flex  justify-center gap-6">
        {/* Campo 'Desde' */}
        <div className="flex flex-col">
          <label
            htmlFor="desde"
            className="mb-2 text-lg font-medium text-gray-400 font-mono"
          >
            Hora de {actividad}
          </label>
          <input
            id="desde"
            type="time"
            list="horas-exactas"
            name={horaActivdadEmpezar}
            onChange={(e) => setHoraActivdadEmpezar(e.target.value)}
            className="w-full p-3 bg-gray-300 text-gray-900 rounded-lg shadow-inner border border-none
                       focus:outline-none focus:ring-0 focus:ring-none font-mono text-2xl"
          />
          <datalist id="horas-exactas">
            <option value="00:00"></option>
            <option value="01:00"></option>
            <option value="02:00"></option>
            <option value="03:00"></option>
            <option value="04:00"></option>
            <option value="05:00"></option>
            <option value="06:00"></option>
            <option value="07:00"></option>
            <option value="08:00"></option>
            <option value="09:00"></option>
            <option value="10:00"></option>
            <option value="11:00"></option>
            <option value="12:00"></option>
            <option value="13:00"></option>
            <option value="14:00"></option>
            <option value="15:00"></option>
            <option value="16:00"></option>
            <option value="17:00"></option>
            <option value="18:00"></option>
            <option value="19:00"></option>
            <option value="20:00"></option>
            <option value="21:00"></option>
            <option value="22:00"></option>
            <option value="23:00"></option>
          </datalist>
        </div>

        {/* Campo para Horas */}
        <div className="flex flex-col">
          <label
            htmlFor="hasta-horas"
            className="mb-2 text-lg font-medium text-gray-400 font-mono"
          >
            Horas
          </label>
          <input
            id="hasta-horas"
            type="text"
            placeholder="Horas "
            list="horas-duracion"
            value={tiempoHoras}
            onChange={(e) => verifyHora(e, "horas")}
            className="w-full p-3 bg-gray-300 text-gray-900 rounded-lg shadow-inner border border-none
       focus:outline-none focus:ring-2 focus:ring-white font-mono text-2xl"
          />
          <datalist id="horas-duracion">
            <option value="1 hora">1 hora</option>
            <option value="2 horas">2 horas</option>
            <option value="3 horas">3 horas</option>
            <option value="4 horas">4 horas</option>
            <option value="5 horas">5 horas</option>
            <option value="6 horas">6 horas</option>
            <option value="7 horas">7 horas</option>
            <option value="8 horas">8 horas</option>
            <option value="9 horas">9 horas</option>
            <option value="10 horas">10 horas</option>
            <option value="11 horas">11 horas</option>
            <option value="12 horas">12 horas</option>
          </datalist>
        </div>

        {/* Campo para Minutos */}
        <div className="flex flex-col">
          <label
            htmlFor="hasta-minutes"
            className="mb-2 text-lg font-medium text-gray-400 font-mono"
          >
            Minutos
          </label>
          <input
            id="hasta-minutes"
            type="text"
            placeholder="Minutos "
            list="horas-duracion-minutes"
            value={tiempoMinutos}
            onChange={(e) => verifyHora(e, "minutos")}
            className="w-full p-3 bg-gray-300 text-gray-900 rounded-lg shadow-inner border border-none
       focus:outline-none focus:ring-2 focus:ring-white font-mono text-2xl"
          />
          <datalist id="horas-duracion-minutes">
            <option value="10 minutos">10 minutos</option>
            <option value="15 minutos">15 minutos</option>
            <option value="20 minutos">20 minutos</option>
            <option value="25 minutos">25 minutos</option>
            <option value="30 minutos">30 minutos</option>
            <option value="35 minutos">35 minutos</option>
            <option value="40 minutos">40 minutos</option>
            <option value="45 minutos">45 minutos</option>
            <option value="50 minutos">50 minutos</option>
            <option value="55 minutos">55 minutos</option>
          </datalist>
        </div>
      </div>

      <div
        className={`w-1/2 h-4 m-auto flex justify-center items-center p-2 text-red-500 text-md font-bold`}
      >
        <span>{error}</span>
      </div>

      {/* Mostrar tiempo total calculado */}
      {tiempoActividad && (
        <div className="text-center">
          <span className="text-gray-600 font-mono">
            Tiempo total: {Math.floor(tiempoActividad / 60)}h{" "}
            {tiempoActividad % 60}min
          </span>
        </div>
      )}

      {/* Contenedor de días */}
      <ShowDias
        here={actividad}
        verify={verify}
        empiezoActividad={horaActivdadEmpezar}
        tiempoActividad={tiempoActividad}
        setError={setError}
      />

      {/* Contenedor de botones de acción */}
      <div className="flex space-x-4">
        <button
          disabled={!info.length > 0}
          onClick={aceptar}
          className="flex-1 bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Check className="w-5 h-5" />
          <span>Aceptar</span>
        </button>
        <button
          onClick={closeModal}
          className="flex-1 bg-gray-700 text-gray-200 font-medium py-3 px-4 rounded-lg
                     hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center space-x-2
                     shadow-lg transform hover:scale-105"
        >
          <X className="w-5 h-5" />
          <span>Cancelar</span>
        </button>
      </div>
    </div>
  );
}
