import { Plus, Edit2 } from "lucide-react";
import { useData } from "../../context/DataContex";

export function BtnAdd({ cardID, onClick, disabled }) {
  const { modal } = useData();
  const { isModalActive } = modal;

  const isOpen = isModalActive(cardID);

  return (
    <button
      onClick={() => onClick(true)}
      className={`
        bg-gray-800 border border-gray-600 rounded-lg p-2
        transition-all duration-200 group
        hover:bg-yellow-500 hover:border-yellow-500 hover:text-gray-900
      `}
    >
      {disabled ? (
        <Plus
          className={`
          w-5 h-5 transition-transform duration-300 group-hover:scale-110 text-yellow-500 group-hover:text-gray-900
          ${isOpen ? "rotate-45" : ""}
          
        `}
        />
      ) : (
        <Edit2
          className={`
          w-5 h-5 transition-transform duration-300 group-hover:scale-110
          text-yellow-500 group-hover:text-gray-900
      }
          ${isOpen ? "rotate-45" : ""}
          `}
        />
      )}
    </button>
  );
}
