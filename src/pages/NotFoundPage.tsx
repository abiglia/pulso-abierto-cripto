import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="container">
      <h2>Error 404 - Página no encontrada</h2>
      <p>La dirección a la que intentas acceder no existe.</p>
      <Link to="/" className="btn-volver">Volver al inicio</Link>
    </main>
  );
}