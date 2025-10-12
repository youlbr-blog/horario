import { useState } from "react";
import { useData } from "../../context/DataContex";
import { Plus } from "lucide-react";

export function CardAddActividades() {
  const { updateActividadesAll } = useData();
  const [nombreActividad, setNombreActividad] = useState("");

  const handleAceptar = () => {
    if (
      nombreActividad.trim() === "" ||
      nombreActividad.trim().length < 4 ||
      nombreActividad.trim().length > 15
    ) {
      alert("Por favor ingresa el nombre  valido y directo ");
      return;
    }
    const date = { nombre: nombreActividad.trim(), sistema: false };
    updateActividadesAll(date);
    setNombreActividad(""); // Limpiar el input después de agregar
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAceptar();
    }
  };

  const isDisabled =
    nombreActividad.trim() === "" ||
    nombreActividad.trim().length < 4 ||
    nombreActividad.trim().length > 15;

  return (
    <div className="bg-gray-900 md:min-w-90 h-20 flex items-center gap-2 rounded-2xl p-4">
      <input
        id="actividad"
        type="text"
        value={nombreActividad}
        onChange={(e) => setNombreActividad(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Crear Nueva actividad..."
        className="flex-1 px-2 py-3 text-sm md:text-lg font-bold border border-transparent bg-gray-700 text-gray-100 placeholder-gray-400 rounded focus:outline-none focus:transparent focus:transparent "
      />
      <button
        onClick={handleAceptar}
        disabled={isDisabled}
        className={`
          bg-gray-800 border border-gray-600 rounded-lg p-2
          transition-all duration-200 group
          ${
            isDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-yellow-500 hover:border-yellow-500 hover:text-gray-900"
          }
        `}
      >
        <Plus
          className={`
            w-5 h-5 transition-transform duration-300 group-hover:scale-110
            ${
              isDisabled
                ? "text-gray-600"
                : "text-yellow-500 group-hover:text-gray-900"
            }
          `}
        />
      </button>
    </div>
  );
}
