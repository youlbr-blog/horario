import { useData } from "../../context/DataContex";
import { copyMap } from "../../utils/utils";

export function BtnTrash({ nombre }) {
  const { actividadAll, setActividadAll, data, updateData } = useData();

  const deleted = (date) => {
    const newDate = actividadAll.filter((e) => e.nombre !== date);
    const miMapa = copyMap(data);
    setActividadAll(newDate);
    for (const [clave, valor] of miMapa) {
      if (!miMapa.get(clave).descanso) {
        miMapa.get(clave).Delete(date);
        updateData(miMapa);
      }
    }
  };
  return (
    <button
      className="transform transition-transform hover:scale-120 cursor-pointer text-red-500"
      onClick={() => deleted(nombre)}
    >
      Eliminar
    </button>
  );
}
