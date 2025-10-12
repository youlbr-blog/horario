import { Info } from "../components/general/Info";
import { CardActividades } from "../components/crearPage/actiDiarias/CardActividades";
import { DiasSemana } from "../components/crearPage/DiasSelect";
import { Actvidad } from "../components/crearPage/actiDiarias/Actvidad";
import { useData } from "../context/DataContex";
import { CardAddActividades } from "../components/general/CardAddActi";
import { Save, Calendar, Target, Trash2Icon } from "lucide-react";

export function CrearPage() {
  const { actividadAll, savedAll, reset } = useData();

  return (
    <section className="min-h-screen w-full bg-[#323437] px-4 py-8 md:px-8">
      {/* Header Section */}
      <div className="max-w-7xl  mb-10">
        <div className="  p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#e2b714] p-3 rounded-lg">
              <Target className="w-6 h-6 text-[#323437]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#e2b714]">
              Programa tus metas
            </h1>
          </div>

          <div className="space-y-3 text-[#d1d0c5]">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#e2b714] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base">
                <span className="text-[#e2b714] font-semibold">
                  Instrucciones:
                </span>{" "}
                Cada actividad se habilita en cuanto se active el día de
                descanso.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#e2b714] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base">
                Programa como desees y agrega nuevas actividades según tus
                necesidades.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-[#e2b714] rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm md:text-base">
                Cuando estés seguro de tu programación,{" "}
                <span className="text-[#e2b714] font-semibold">
                  guarda los cambios
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto">
        {/* Sección de actividades diarias */}
        <article className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-[#e2b714]" />
            <h2 className="text-2xl font-bold text-[#d1d0c5]">
              Actividades Diarias
            </h2>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
            {/* Día Libre Card */}
            <CardActividades cardID="diaLibre" name="Día Libre">
              <DiasSemana />
            </CardActividades>

            {/* Actividades Cards */}
            {(actividadAll || []).map((ele, i) => (
              <CardActividades
                key={i}
                cardID={ele.nombre.toLowerCase()}
                name={ele.nombre}
                sistema={ele.sistema}
              >
                <Actvidad actividad={ele.nombre.toLowerCase()} />
              </CardActividades>
            ))}

            {/* Add Card */}
            <CardAddActividades />
          </section>
        </article>

        {/* Información Detallada */}
        <section className="mb-10">
          <div className="bg-[#2c2e31] rounded-lg border border-[#646669] p-2 md:p-6">
            <h2 className="text-2xl font-bold text-[#e2b714] mb-2 md:mb-6">
              Información detallada de las actividades programadas
            </h2>
            <Info />
          </div>
        </section>

        {/* Botón Guardar */}
        <div className="flex justify-center md:justify-end  gap-5 md:gap-10 px-2">
          <button
            onClick={savedAll}
            className="group bg-[#e2b714] hover:bg-[#c9a212] text-[#323437] font-bold py-2 md:py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Save className="w-10  h-10 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className=" text-sm md:text-lg">Guardar Cambios</span>
          </button>
          <button
            onClick={reset}
            className="group bg-[#e2b714] hover:bg-[#c9a212] text-[#323437] font-bold py-2 md:py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Trash2Icon className="w-10  h-10 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm md:text-lg">Resetear Todo</span>
          </button>
        </div>
      </div>
    </section>
  );
}
