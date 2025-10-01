import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import { crearDias } from "../utils/crearBD";
import { createActividadALL } from "../utils/crearBD";
import { guardarDatos } from "../utils/crearBD";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [dataArray, setDataArray] = useState([]);
  const [data, setData] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [actividadAll, setActividadAll] = useState([]);
  const navigate = useNavigate();
  // ... (tus funciones de modal)
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const isModalActive = (modalId) => {
    return activeModal === modalId;
  };

  const hasActiveModal = () => {
    return activeModal !== null;
  };

  // Efecto que se ejecuta solo una vez al inicio y cuando el "saved" cambia
  useEffect(() => {
    const bd = crearDias();
    setData(bd);
    // Llama a la función de actualización unificada para inicializar los arrays
    updateData(bd);
    const actividades = createActividadALL();
    setActividadAll(actividades);
  }, []);

  // NUEVA FUNCIÓN: Unifica la lógica de actualización y ordenamiento.
  // Es mejor pasar el nuevo mapa como argumento para que sea consistente.
  const updateData = (newMap) => {
    // 1. Actualiza el estado del Map principal
    setData(newMap);

    // 2. Crea un array a partir del nuevo Map
    const nuevoArray = Array.from(newMap?.values() || []);

    // 4. Actualiza los dos arrays al mismo tiempo.
    setDataArray(nuevoArray);
  };

  const updateActividadesAll = (newDates) => {
    const verificar = actividadAll.find(
      (ele) => ele.nombre === newDates.nombre
    );
    if (!verificar) {
      const combinedArray = [...actividadAll, newDates];
      setActividadAll([...combinedArray]);
      return;
    }
    console.log("ya exite");
  };

  const savedAll = () => {
    localStorage.setItem("actividadesDisciplina", JSON.stringify(actividadAll));
    guardarDatos(data);
    alert("se gurado con exito");
    navigate("/");
  };
  const reset = () => {
    const respuesta = confirm("estas seguro se eliminara toda la progrmacion");
    if (respuesta) {
      localStorage.removeItem("bdDisciplina");
      localStorage.removeItem("actividadesDisciplina");
      window.location.reload();
    }
  };

  const provider = {
    actividadAll,
    reset,
    data,
    setActividadAll,
    dataArray,
    savedAll,
    updateActividadesAll,
    modal: { openModal, closeModal, isModalActive, hasActiveModal },
    updateData, // Asegúrate de exponer la nueva función
  };

  return (
    <DataContext.Provider value={provider}>{children}</DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
