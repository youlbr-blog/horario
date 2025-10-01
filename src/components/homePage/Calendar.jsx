import { useState } from "react";

export default function Calendario() {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  // Calcular días del mes
  const primerDia = new Date(anio, mes, 1).getDay(); // 0=Domingo
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();

  // Ajustar para que empiece en Lunes
  const offset = primerDia === 0 ? 6 : primerDia - 1;

  // Generar celdas del calendario
  const dias = [];
  for (let i = 0; i < offset; i++) {
    dias.push(null);
  }
  for (let d = 1; d <= diasEnMes; d++) {
    dias.push(d);
  }

  return (
    <div className="min-w-90  p-4 text-center">
      {/* Encabezado */}
      <h2 className="text-xl text-[#646669] font-bold mb-4">
        {meses[mes]} {anio}
      </h2>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 text-gray-400 mb-2">
        {diasSemana.map((dia, i) => (
          <div key={i} className="font-medium">
            {dia}
          </div>
        ))}
      </div>

      {/* Días */}
      <div className="grid grid-cols-7 gap-1 text-lg">
        {dias.map((d, i) => {
          const esHoy =
            d === hoy.getDate() &&
            mes === hoy.getMonth() &&
            anio === hoy.getFullYear();
          return (
            <div
              key={i}
              className={`py-1 rounded-xl 
                ${d ? "text-white" : ""}
                ${esHoy ? "bg-yellow-500 font-bold" : "text-gray-500"}
              `}
            >
              {d || ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
