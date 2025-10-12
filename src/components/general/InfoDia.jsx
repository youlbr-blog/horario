import { calcularHoraFinal } from "../../utils/utils";

export function InfoDia({ dateDia, bgColor, home }) {
  const horasL = calcularHoraFinal(dateDia?.totalHoraLibre);
  const horasO = calcularHoraFinal(dateDia?.totalHoraOcupada);

  const ordenadas = dateDia.horasOcupadas?.sort((a, b) => {
    // a.desde y b.desde son las cadenas de tiempo (ej. "07:00", "13:30")
    if (a.desde < b.desde) {
      return -1; // 'a' debe ir antes que 'b'
    }
    if (a.desde > b.desde) {
      return 1; // 'b' debe ir antes que 'a'
    }
    return 0; // Son iguales, mantener el orden relativo
  });

  if (dateDia.descanso) {
    return (
      <div className="p-2 min-w-60 bg-gradient-to-br from-red-200 to-red-100 rounded-xl shadow-lg flex flex-col justify-center items-center border-2 border-blue-200">
        <div className="bg-white rounded-full p-4 mb-4 shadow-md">
          <svg
            className="w-8 h-8 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {dateDia.nombre}
        </h2>
        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-full shadow-md">
          <h1 className="text-lg font-bold">DÍA LIBRE</h1>
        </div>
      </div>
    );
  }

  if (dateDia.horasOcupadas?.length <= 0) {
    return (
      <div
        className={`p-2 md:p-6 min-w-60 ${bgColor} rounded-xl shadow-lg border border-gray-200`}
      >
        <div className="text-center">
          <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            {dateDia.nombre}
          </h2>
          <p className="text-gray-500 font-medium">Sin actividad programada</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden   ${bgColor} ${
        home == true ? " md:w-1/2 " : "min-w-60 "
      } rounded-xl shadow-lg border border-gray-200`}
    >
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
        <h2 className="text-xl font-bold mb-3">{dateDia.nombre}</h2>

        {/* Stats cards */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
            <div className="flex items-center ">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium opacity-90">
                Tiempo Libre
              </span>
            </div>
            <p className="text-lg font-bold">
              {horasL.horas}h {horasL.minutos}m
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-white/30">
            <div className="flex items-center ">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="text-xs font-medium opacity-90">
                Tiempo Ocupado
              </span>
            </div>
            <p className="text-lg font-bold">
              {horasO.horas}h {horasO.minutos}m
            </p>
          </div>
        </div>
      </div>

      {/* Tabla mejorada */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white">
            <tr>
              <th className="px-2 md:px-4 py-3 text-left text-sm font-bold text-gray-800 tracking-wider">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  HORARIO
                </div>
              </th>
              <th className="px-2 md:px-4 py-3 text-left text-sm font-bold text-gray-800 tracking-wider">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  ACTIVIDAD
                </div>
              </th>
              <th className="px-2 md:px-4 py-3 text-left text-sm font-bold text-gray-800 tracking-wider">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  TOTAL
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {ordenadas.map((element, index) => {
              const { horas: horatotal, minutos: minutoTotal } =
                calcularHoraFinal(element.horas);
              const { horas: horaInicio, minutos: minutosInicio } =
                calcularHoraFinal(element.desde);
              const { horas: horaFinal, minutos: minutosFinal } =
                calcularHoraFinal(element.hasta);

              return (
                <tr
                  key={index}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                >
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg px-1 md:px-3 py-1 group-hover:bg-blue-200 transition-colors">
                        <span className="text-sm font-bold text-blue-800">
                          {horaInicio}:{minutosInicio} - {horaFinal}:
                          {minutosFinal}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 group-hover:bg-indigo-600 transition-colors"></div>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                        {element.actividad}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3 group-hover:bg-indigo-600 transition-colors"></div>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">
                        {horatotal}h {minutoTotal}m
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
