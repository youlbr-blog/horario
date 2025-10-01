import { Trash2 } from "lucide-react";
import { useData } from "../../context/DataContex";

export function BtnDeleted({ cardID, onClick, disabled = false }) {
  const { modal } = useData();
  const { isModalActive } = modal;

  const isOpen = isModalActive(cardID);

  return (
    <button
      onClick={() => onClick(false)}
      disabled={disabled}
      className={`
        bg-gray-800 border border-gray-600 rounded-lg p-2
        transition-all duration-200 group
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-yellow-500 hover:border-yellow-500 hover:text-gray-900"
        }
      `}
    >
      <Trash2
        className={`
          w-5 h-5 transition-transform duration-300 group-hover:scale-110
          ${
            disabled
              ? "text-gray-600"
              : "text-yellow-500 group-hover:text-gray-900"
          }
        `}
      />
    </button>
  );
}
