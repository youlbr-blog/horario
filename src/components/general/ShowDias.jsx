import { useState, useEffect } from "react";
import { useData } from "../../context/DataContex";
import { calcularHoraFinal } from "../../utils/utils";

export function ShowDias({
  here,
  verify,
  empiezoActividad,
  tiempoActividad,
  setError,
}) {
  const { dataArray } = useData();
  const [selected, setSelected] = useState([]);
  const [todos, setTodos] = useState(false);
  const diasDeLaSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // **NUEVA FUNCIÓN DE VERIFICACIÓN**
  const verificarSiHayDiaLibre = () => {
    const diaLibre = dataArray.find((ele) => ele.descanso === true);
    // Retorna true si hay un día de descanso, false si no
    return diaLibre !== undefined;
  };

  const addSelecte = (all, e) => {
    setTodos(all);
    if (all) {
      setSelected(diasDeLaSemana);
    } else {
      setSelected([]);
    }

    if (e) {
      const miSet = new Set(selected);
      if (miSet.has(e)) {
        miSet.delete(e);
      } else {
        miSet.add(e);
      }
      const nuevoArray = [...miSet];
      setSelected(nuevoArray);
    }
  };

  // **CORRECCIÓN DEL ERROR**
  // La lógica para deshabilitar botones y establecer errores va aquí
  useEffect(() => {
    verify(selected);

    if (selected.length === diasDeLaSemana.length) {
      setTodos(true);
    }

    // Llama a la función de verificación aquí, en un useEffect
    if (!verificarSiHayDiaLibre()) {
      setError("deve selecionar el dia de descanso");
    }
  }, [selected, dataArray, setError, verify]); // Dependencias para re-ejecutar el efecto
  // Una variable para simplificar la lógica del `disabled`
  const isDisabled =
    !tiempoActividad || !empiezoActividad || !verificarSiHayDiaLibre();

  return (
    <div className="flex flex-col items-center space-y-2 gap-2 md:gap-5">
      <div className="flex gap-5 justify-center items-center">
        <label
          htmlFor="select-all-free"
          className="text-lg font-medium text-gray-400 font-mono"
        >
          aplicar a Todos
        </label>
        <input
          id="select-all-free"
          type="checkbox"
          checked={todos}
          disabled={isDisabled}
          className="form-checkbox h-7 w-7 text-yellow-500 bg-gray-800 border-gray-700 rounded-full
               focus:ring-2 focus:ring-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onChange={(e) => addSelecte(e.target.checked, false)}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-5">
        {dataArray.map((dia) => {
          const { horas: inicio, minutos: iniMinutes } = calcularHoraFinal(
            dia.actividadesNecesarios[here]?.desde
          );
          const { horas: final, minutos: finaMInutes } = calcularHoraFinal(
            dia.actividadesNecesarios[here]?.hasta
          );
          return (
            <button
              key={dia.nombre}
              disabled={isDisabled || dia.descanso}
              className={`
            border rounded-xl md:rounded-3xl p-2 md:p-4 w-38  md:h-16 font-mono md:font-bold text-sm md:text-lg
            transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
            ${
              dia.descanso
                ? "bg-red-950 border-red-500 text-red-400 "
                : selected.includes(dia.nombre)
                ? "bg-blue-300 border-transparent"
                : dia.actividadesNecesarios[here]
                ? "bg-green-300 border-transparent"
                : "bg-gray-200  text-yellow-500 hover:bg-white"
            }
          hover:shadow-lg flex flex-col justify-center items-center
        `}
              onClick={() => addSelecte(false, dia.nombre)}
            >
              <span>{dia.abreviatura}</span>

              {!dia.descanso && dia.actividadesNecesarios[here] && (
                <span className="text-sm">
                  {inicio}:{iniMinutes} - {final}:{finaMInutes}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
