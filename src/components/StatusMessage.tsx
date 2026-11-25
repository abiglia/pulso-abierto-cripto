interface StatusMessageProps {
  type: "initial" | "loading" | "empty" | "error";
  message?: string;
  onRetry?: () => void;
}

export default function StatusMessage({ type, message, onRetry }: StatusMessageProps) {
  if (type === "initial") {
    return (
      <div className="status-box status-initial">
        <p>{message || "Utilizá el buscador para consultar las criptomonedas."}</p>
      </div>
    );
  }

  if (type === "loading") {
    return (
      <div className="status-box status-loading" role="status">
        <p>Cargando datos de la API...</p>
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="status-box status-empty">
        <p>{message || "No se encontraron criptomonedas que coincidan con la búsqueda."}</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="status-box status-error" role="alert">
        <p>{message || "Ocurrió un error al cargar la información."}</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn-retry">
            Volver a intentar
          </button>
        )}
      </div>
    );
  }

  return null;
}