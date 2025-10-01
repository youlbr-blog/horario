import { useState, useEffect } from "react";
import { useData } from "../../context/DataContex";
import { X, Check } from "lucide-react";
import { copyMap } from "../../utils/utils";

export function DiasSemana() {
  const [seleccionado, setSeleccionado] = useState("");
  const [seleccionadoPRE, setSeleccionadoPRE] = useState("");
  const { data, updateData, modal, dataArray } = useData();
  const [change, setChange] = useState(false);
  const { closeModal } = modal;
  useEffect(() => {
    const diaLibre = dataArray?.find((ele) => ele.descanso === true);
    console.log(diaLibre);

    setSeleccionado(diaLibre?.nombre || "");
    setSeleccionadoPRE(diaLibre?.nombre || "");
  }, []);

  const changeDiaLibre = (valor) => {
    setSeleccionado(valor);
    if (data.get(valor).verificarSiYAocupado()) {
      setChange(true);
    } else {
      setChange(false);
    }
  };

  const handleSubmit = () => {
    const nuevoMapa = copyMap(data);
    if (!seleccionado || data.get(seleccionado).verificarSiYAocupado()) {
      const horasO = nuevoMapa.get(seleccionado).getHorasOcupdas();
      const actividades = nuevoMapa
        .get(seleccionado)
        .getActividadesNecesarios();
      nuevoMapa.get(seleccionado).deleteAll();
      nuevoMapa.get(seleccionado).marcarDescanso();
      nuevoMapa.get(seleccionadoPRE).desmarcarDescanso();
      nuevoMapa.get(seleccionadoPRE).copyActividadesAll(horasO, actividades);
      updateData(nuevoMapa);

      setChange(false);
      closeModal();

      return;
    }

    // Desmarcar todos
    if (seleccionadoPRE) {
      nuevoMapa.get(seleccionadoPRE).desmarcarDescanso();
    }

    // Marcar el seleccionado
    nuevoMapa.get(seleccionado)?.marcarDescanso();

    updateData(nuevoMapa);
    closeModal();
  };

  if (!data || dataArray.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Selecciona Día Libre
        </h3>
        <button
          onClick={closeModal}
          className="text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-10 h-10" />
        </button>
      </div>

      {/* Opciones */}
      <div className="space-y-2 mb-6">
        {dataArray.map((ele) => {
          const diaDescanso =
            data.get(ele.nombre).verificarSiYAocupado() || false;
          return (
            <label
              key={ele.nombre}
              className={`
              flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer
              transition-all duration-200
              ${
                seleccionado === ele.nombre
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200 hover:border-gray-300"
              }
            `}
            >
              <input
                type="radio"
                name="diaLibre"
                checked={seleccionado === ele.nombre}
                onChange={() => changeDiaLibre(ele.nombre)}
                className="sr-only"
              />
              <div
                className={`
              w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${
                seleccionado === ele.nombre
                  ? "border-yellow-500 bg-yellow-500"
                  : "border-gray-300"
              }
            `}
              >
                {seleccionado === ele.nombre && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-gray-700 font-medium">{ele.nombre}</span>
              {diaDescanso && (
                <span className="text-red-300 font-medium">(con tareas)</span>
              )}
            </label>
          );
        })}
      </div>

      {change && (
        <div className="h-15 bg-red-200 relative flex justify-center items-center rounded-xl p-2 mt-10">
          <span className="absolute -top-6 left-0 text-red-500 font-bold">
            ADVERTENCIA
          </span>
          <span className="text-red-500 text-md">
            seguro quieres intercambiar tareas del dia <strong>LIBRE </strong>
            con <strong>{seleccionado} </strong> ?
          </span>
        </div>
      )}

      {/* Botones */}
      <div className="flex space-x-3 mt-5">
        <button
          onClick={handleSubmit}
          disabled={!seleccionado}
          className="flex-1 bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Check className="w-5 h-5" />
          <span>Aceptar</span>
        </button>

        <button
          onClick={closeModal}
          className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
