import { useState, useEffect } from "react";

export function Cronometro({ info }) {
  const [actividadActual, setActividadActual] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  // Función para obtener segundos desde medianoche
  const getSegundosActuales = () => {
    const ahora = new Date();
    return (
      ahora.getHours() * 3600 + ahora.getMinutes() * 60 + ahora.getSeconds()
    );
  };

  // Función para convertir segundos a formato HH:MM:SS
  const formatearTiempo = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const mins = Math.floor((segundos % 3600) / 60);
    const segs = Math.floor(segundos % 60);
    return `${String(horas).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(segs).padStart(2, "0")}`;
  };

  // Buscar actividad actual y calcular tiempo restante
  useEffect(() => {
    const buscarActividadActual = () => {
      const segundosActuales = getSegundosActuales();

      // Buscar en el array la actividad que corresponde a la hora actual
      const actividad = info.horasOcupadas.find((item) => {
        const desdeSegundos = item.desde * 60;
        const hastaSegundos = item.hasta * 60;
        return (
          segundosActuales >= desdeSegundos && segundosActuales < hastaSegundos
        );
      });

      if (actividad) {
        setActividadActual(actividad);
        const hastaSegundos = actividad.hasta * 60;
        const restante = hastaSegundos - segundosActuales;
        setTiempoRestante(restante);
      } else {
        setActividadActual(null);
        setTiempoRestante(0);
      }
    };

    buscarActividadActual();
    const intervalo = setInterval(() => {
      buscarActividadActual();
    }, 1000);

    return () => clearInterval(intervalo);
  }, [info]);

  if (!actividadActual) {
    return (
      <div className=" w-full bg-[#323437] flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-[#646669] text-3xl font-mono">
            sin actividad programada para esta hora
          </div>
        </div>
      </div>
    );
  }

  const porcentajeCompletado =
    ((actividadActual.horas * 60 - tiempoRestante) /
      (actividadActual.horas * 60)) *
    100;

  return (
    <div className="w-90 md:flex-[2] flex items-center justify-center gap-5 md:gap-30 flex-col md:flex-row p-2">
      <div className="text-center  flex flex-col ">
        <div className="text-[#646669] text-sm md:text-2xl font-mono md:mb-4 uppercase tracking-wider">
          tiempo restante
        </div>
        <div>
          <div className="text-[#e2b714] text-5xl md:text-9xl font-bold font-mono tracking-tight mb-2 transition-all duration-300 hover:text-[#f5c842]">
            {formatearTiempo(tiempoRestante)}
          </div>

          <div className="h-3 bg-[#2c2e31] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e2b714] transition-all duration-1000 ease-linear rounded-full "
              style={{ width: `${porcentajeCompletado}%` }}
            />
          </div>
        </div>
      </div>

      {/* Información de la Actividad */}
      <div className="flex flex-col gap-4 md:gap-5 items-center ">
        <div className="flex gap-2 md:gap-5">
          <div className="bg-[#2c2e31] rounded-2xl p-2 md:p-8 border-2 border-[#646669] hover:border-[#e2b714] transition-all duration-300">
            <div className="text-[#646669]  text-sm md:text-xl font-mono mb-3 uppercase tracking-wide">
              actividad
            </div>
            <div className="text-[#d1d0c5] text-md md:text-5xl font-bold font-mono capitalize">
              {actividadActual.actividad}
            </div>
          </div>

          <div className="bg-[#2c2e31] rounded-2xl p-2 md:p-8 border-2 border-[#646669] hover:border-[#e2b714] transition-all duration-300">
            <div className="text-[#646669]  text-sm md:text-xl font-mono mb-3 uppercase tracking-wide">
              duración total
            </div>
            <div className="text-[#d1d0c5]  text-md md:text-5xl font-bold font-mono">
              {(actividadActual.horas / 60).toFixed(1)}
              <span className=" text-md md:text-3xl text-[#646669] ml-2">
                horas
              </span>
            </div>
          </div>
        </div>
        {/* Información Adicional */}

        <div className="inline-flex items-center gap-4 bg-[#2c2e31] rounded-full px-2 md:px-8 py-4 border border-[#646669]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#e2b714] rounded-full animate-pulse"></div>
            <span className="text-[#646669] font-mono text-lg">
              en progreso
            </span>
          </div>
          <div className="w-px h-6 bg-[#646669]"></div>
          <span className="text-[#d1d0c5] font-mono text-lg">
            {Math.floor(porcentajeCompletado)}% completado
          </span>
        </div>
      </div>
    </div>
  );
}
