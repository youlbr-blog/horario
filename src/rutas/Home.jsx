import Calendario from "../components/homePage/Calendar";
import { InfoDia } from "../components/general/InfoDia";
import { diaDeHoy } from "../utils/utils";
import { useData } from "../context/DataContex";
import { Cronometro } from "../components/homePage/Cronometro";
export function HomePage() {
  const diaHoy = diaDeHoy();
  const { data } = useData();
  const date = data?.get(diaHoy);

  if (!date) {
    return <p>cargando</p>;
  }

  return (
    <section className="bg-[#2c2e31] h-screen flex flex-col gap-20 pt-20 items-center w-full">
      <div className=" flex gap-10 w-full px-8 ">
        <Calendario />
        <Cronometro info={date} />
      </div>

      <div className="w-full flex   flex-col gap-10 p-4 ">
        <h2 className="text-4xl text-gray-100  ">Actividades para el DIA</h2>
        <InfoDia dateDia={date} home={true} />
      </div>
    </section>
  );
}
