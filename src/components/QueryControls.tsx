import { useState, type FormEvent } from "react";
import { z } from "zod";

// 1. Esquema de validación con Zod (Consigna 5)
const searchSchema = z.object({
  text: z
    .string()
    .trim()
    .min(2, { message: "Ingresá al menos 2 caracteres para buscar." }),
  category: z
    .string()
    .min(1, { message: "Seleccioná un criterio válido." }),
});

// Tipo derivado del esquema
type SearchFormData = z.infer<typeof searchSchema>;

interface QueryControlsProps {
  onSearch: (data: SearchFormData) => void;
}

export default function QueryControls({ onSearch }: QueryControlsProps) {
  // Estados controlados para los inputs (Consigna 4)
  const [text, setText] = useState("");
  const [category, setCategory] = useState("all");
  
  // Estado para capturar posibles errores de validación
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validamos el formulario usando safeParse (Consigna 5)
    const result = searchSchema.safeParse({ text, category });

    if (!result.success) {
      // Extraemos el primer error desde 'issues'
      const firstError = result.error.issues[0]?.message || "Datos inválidos.";
      setErrorMessage(firstError);
      return;
    }

    // Si los datos son válidos, enviamos los datos a la página principal
    onSearch(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="search-text">Buscar criptomoneda:</label>
        <input
          id="search-text"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ej: Bitcoin, Solana..."
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="search-category">Filtrar por tipo:</label>
        <select
          id="search-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
        >
          <option value="all">Todas las categorías</option>
          <option value="top">Top Mercado</option>
          <option value="stable">Estables</option>
        </select>
      </div>

      {/* Mensaje de error visible y accesible */}
      {errorMessage && (
        <p className="error-message" role="alert">
          {errorMessage}
        </p>
      )}

      <button type="submit" className="btn-submit">
        Buscar
      </button>
    </form>
  );
}