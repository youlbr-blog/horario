import { useData } from "../../../context/DataContex";
import { BtnAdd } from "../../general/BtnAdd";
import { searchActividad } from "../../../utils/utils";
import { BtnDeleted } from "../../general/BtnDeled";
import { useState } from "react";
import { Delete } from "./DeleteDiaraias";
import { BtnTrash } from "../../general/BtnTrash";

export function CardActividades({ children, cardID, name, sistema }) {
  const { modal, dataArray } = useData();
  const { openModal, closeModal, isModalActive, hasActiveModal } = modal;
  const [modo, setModo] = useState("");
  const isOpen = isModalActive(cardID); //false
  const filter = searchActividad(cardID, dataArray);
  const handleToggle = (valor) => {
    setModo(valor);

    if (isOpen) {
      closeModal();
    } else if (!hasActiveModal()) {
      //false
      openModal(cardID); //activasdo
    }
  };

  // Verificar si este componente debe estar deshabilitado
  const isDisabled = hasActiveModal() && !isOpen; //false
  const sistem = sistema !== true && cardID !== "diaLibre";

  return (
    <div
      className={`min-w-90 h-25 relative flex flex-col justify-center  bg-gray-900 py-2 px-4 border border-gray-700 rounded-lg shadow-lg transition-all duration-300 
          ${
            isDisabled
              ? "opacity-50 cursor-not-allowed border-gray-600"
              : "hover:border-yellow-500 hover:shadow-yellow-500/20 hover:shadow-lg"
          }`}
    >
      <div className=" flex justify-end mb-2">
        {sistem && <BtnTrash nombre={name} />}
      </div>
      <div
        className={`flex items-center justify-between relative z-20
        `}
      >
        <div className="flex flex-col">
          <span className="text-yellow-500 font-extrabold text-xl capitalize">
            {name}
          </span>
          <div className=" flex gap-1">
            {filter?.map((ele, i) => (
              <span key={ele + i} className="text-gray-400 text-md font-medium">
                {ele ? ele : "no seleccionado"}
              </span>
            ))}
            {filter.length == 0 && (
              <span className="text-gray-400 text-md font-medium">
                ningun dia{" "}
              </span>
            )}
          </div>
        </div>
        {/* Botón con lógica simplificada */}
        <div className="flex gap-3">
          <BtnAdd
            cardID={cardID}
            onClick={handleToggle}
            disabled={filter.length === 0}
          />

          {cardID !== "diaLibre" && (
            <BtnDeleted
              cardID={cardID}
              onClick={handleToggle}
              disabled={filter.length === 0}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

          {/* Modal centrado */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {modo ? children : <Delete actividad={cardID} />}
          </div>
        </>
      )}
    </div>
  );
}
