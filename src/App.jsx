import { Routes, Route, Link } from "react-router-dom";
import { CrearPage } from "./rutas/Crear";
import { HomePage } from "./rutas/Home";
import { ProgresoPage } from "./rutas/Progreso";
import { Navbar } from "./components/Nabvar";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/crear" element={<CrearPage />} />
        <Route path="/progreso" element={<ProgresoPage />} />
      </Routes>
    </>
  );
}

export default App;
