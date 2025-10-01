export function BtnInfo({ date, view, name }) {
  const { abreviatura, descanso, horaLibre, nombre } = date;

  // Determinar las clases de forma condicional
  let buttonClasses = `
    border rounded-3xl p-4 w-32 h-16 font-mono font-bold text-lg
    transition-all duration-300 cursor-pointer hover:shadow-lg  transform hover:scale-110
  `;

  if (name === nombre && descanso) {
    // Caso 1: Botón seleccionado (name === nombre)
    buttonClasses += " bg-white border-red-500 text-red-500";
  } else if (name === nombre && !descanso) {
    buttonClasses += " bg-white  text-yellow-500";
  } else if (descanso) {
    // Caso 2: Día de descanso (descanso es true)
    buttonClasses += " bg-red-950 border-red-500 text-red-400 hover:bg-red-200";
  } else {
    // Caso 3: Día normal
    buttonClasses += " bg-gray-800  text-yellow-500";
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <button className={buttonClasses} onClick={view}>
        {abreviatura}
      </button>

      {descanso ? (
        <span className="text-red-400 font-mono text-sm font-medium">
          DIA LIBRE
        </span>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <span className="text-gray-400 font-mono text-sm">Tiempo Libre</span>
          <span className="text-gray-700">{horaLibre}</span>
        </div>
      )}
    </div>
  );
}
