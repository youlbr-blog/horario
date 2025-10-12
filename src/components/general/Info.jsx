import { useData } from "../../context/DataContex";
import { InfoDia } from "./InfoDia";

export function Info() {
  const { dataArray } = useData();
  // Definimos una paleta de colores. Puedes añadir más o cambiar estos.
  const colors = [
    "bg-blue-300", // Color para el primer InfoDia
    "bg-green-300", // Color para el segundo
    "bg-yellow-300", // Color para el tercero (si usas Tailwind, el 200 puede ser suficiente)
    "bg-red-300",
    "bg-purple-300",
    "bg-indigo-300",
    "bg-pink-300",
  ];

  return (
    <section className=" flex flex-col md:flex-row  w-full gap-2 ">
      {dataArray.map(
        (
          ele,
          index // Añadimos 'index' para obtener la posición
        ) => (
          <InfoDia
            key={ele.nombre} // Usar ele.nombre para la key, ya que ele.name no existe
            dateDia={ele}
            bgColor={colors[index % colors.length]} // Asignamos un color cíclicamente
          />
        )
      )}
    </section>
  );
}
