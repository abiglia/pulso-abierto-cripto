import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCryptos } from "../services/cryptoService";
import type { CryptoCoin } from "../types/crypto";
import StatusMessage from "../components/StatusMessage";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { formatPriceChange } from "../utils/formatters";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [coin, setCoin] = useState<CryptoCoin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = useFavoritesStore((state) =>
    coin ? state.favorites.includes(coin.id) : false
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const allCoins = await getCryptos();
        const found = allCoins.find(
          (c) => c.id.toLowerCase() === id?.toLowerCase()
        );
        setCoin(found || null);
      } catch {
        setError("No se pudo obtener la información de la criptomoneda.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCoinDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="container">
        <StatusMessage type="loading" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="container">
        <StatusMessage type="error" message={error} />
        <Link to="/" className="btn-volver">
          Volver al inicio
        </Link>
      </main>
    );
  }

  if (!coin) {
    return (
      <main className="container">
        <StatusMessage
          type="empty"
          message={`La criptomoneda con el identificador "${id}" no existe en el catálogo.`}
        />
        <Link to="/" className="btn-volver">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  const changeInfo = formatPriceChange(coin.price_change_percentage_24h);

  return (
    <main className="container detail-container">
      <Link to="/" className="btn-back">
        ← Volver al listado
      </Link>

      <article className="crypto-detail-card">
        <header className="detail-header">
          <img src={coin.image} alt={coin.name} width="64" height="64" />
          <div>
            <h2>{coin.name}</h2>
            <span className="crypto-symbol">{coin.symbol.toUpperCase()}</span>
          </div>
        </header>

        <section className="detail-body">
          <div className="detail-item">
            <span>Precio actual:</span>
            <strong>${coin.current_price.toLocaleString()} USD</strong>
          </div>
          {changeInfo && (
            <div className="detail-item">
              <span>Variación 24h:</span>
              <strong className={changeInfo.className}>
                {changeInfo.formatted}
              </strong>
            </div>
          )}
        </section>

        <div className="detail-actions">
          <button
            type="button"
            onClick={() => toggleFavorite(coin.id)}
            aria-pressed={isFavorite}
            className={`btn-fav ${isFavorite ? "active" : ""}`}
          >
            {isFavorite ? "★ En favoritos" : "☆ Agregar a favoritos"}
          </button>
        </div>
      </article>
    </main>
  );
}