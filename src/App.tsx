import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      {/* Encabezado fijo para toda la app */}
      <header className="app-header">
        <h1>Pulso Abierto - Mercado Cripto</h1>
      </header>

      {/* Declaración de las rutas (Consigna 6) */}
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />
        
        {/* Ruta dinámica para el detalle */}
        <Route path="/criptomonedas/:id" element={<DetailPage />} />
        
        {/* Ruta comodín para direcciones inexistentes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;