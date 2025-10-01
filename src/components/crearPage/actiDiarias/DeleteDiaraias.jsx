import { useState } from "react";
import { useData } from "../../../context/DataContex";
import { X, Check } from "lucide-react";
import { ShowDiaDelete } from "../../general/ShowDiasDelete";
import { copyMap } from "../../../utils/utils";

export function Delete({ actividad }) {
  const { data, updateData, modal, dataArray } = useData();
  const [info, setInfo] = useState([]);
  const { closeModal } = modal;
  const [error, setError] = useState("");

  const verify = (e) => {
    setInfo(e);
  };

  const aceptar = () => {
    const miMapa = copyMap(data);
    console.log(info);
    for (const ele of info) {
      if (!miMapa.get(ele).descanso) {
        miMapa.get(ele).Delete(actividad);
        console.log(miMapa);
        updateData(miMapa);
      }
    }

    closeModal();
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-xl border border-gray-700 max-w-full mx-auto">
      {/* Encabezado y botón de cerrar */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold   text-gray-900 font-mono">
          Eliminar actividades de {actividad}
        </h2>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-900 transition-colors duration-200"
        >
          <X className="w-10 h-10" />
        </button>
      </div>

      {/* Contenedor para seleccionar horas */}

      <div
        className={`w-1/2 h-4 m-auto flex justify-center items-center p-2 text-red-500 text-md font-bold`}
      >
        <span>{error}</span>
      </div>

      {/* Contenedor de días */}
      <ShowDiaDelete here={actividad} verify={verify} setError={setError} />

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
