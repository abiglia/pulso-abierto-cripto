import { useState, useEffect } from "react";
import { getCryptos } from "../services/cryptoService";
import type { CryptoCoin } from "../types/crypto";
import QueryControls from "../components/QueryControls";
import CryptoList from "../components/CryptoList";
import StatusMessage from "../components/StatusMessage";

export default function HomePage() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para almacenar el filtro aplicado desde el formulario
  const [searchFilter, setSearchFilter] = useState<{ text: string; category: string }>({
    text: "",
    category: "all",
  });

  // Función para consultar la API (Consigna 7)
  const fetchCoins = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCryptos();
      setCoins(data);
    } catch {
      setError("No se pudieron consultar las criptomonedas. Verificá tu conexión o intentá nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Consulta inicial con useEffect (Consigna 7.B)
  useEffect(() => {
    fetchCoins();
  }, []);

  // DATOS DERIVADOS (Consigna 3): La lista visible se calcula a partir de la original y el filtro
  const filteredCoins = coins.filter((coin) => {
    const textMatch =
      coin.name.toLowerCase().includes(searchFilter.text.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchFilter.text.toLowerCase());

    return textMatch;
  });

  // DATO DERIVADO (Consigna 3): Cantidad total de resultados
  const totalResults = filteredCoins.length;

  return (
    <main className="container">
      <h2>Consulta de Criptomonedas</h2>

      {/* Formulario controlado */}
      <QueryControls onSearch={(data) => setSearchFilter(data)} />

      {/* Renderizado condicional de estados */}
      {loading && <StatusMessage type="loading" />}

      {!loading && error && (
        <StatusMessage type="error" message={error} onRetry={fetchCoins} />
      )}

      {!loading && !error && coins.length > 0 && totalResults === 0 && (
        <StatusMessage type="empty" />
      )}

      {!loading && !error && totalResults > 0 && (
        <>
          <p className="results-count">Resultados encontrados: {totalResults}</p>
          <CryptoList coins={filteredCoins} />
        </>
      )}
    </main>
  );
}