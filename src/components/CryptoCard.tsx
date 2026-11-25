import { Link } from "react-router-dom";
import type { CryptoCoin } from "../types/crypto";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { formatPriceChange } from "../utils/formatters";

interface CryptoCardProps {
  coin: CryptoCoin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const changeInfo = formatPriceChange(coin.price_change_percentage_24h);

  const isFavorite = useFavoritesStore((state) =>
    state.favorites.includes(coin.id)
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <article className="crypto-card">
      <img
        src={coin.image}
        alt={coin.name}
        className="crypto-icon"
        width="48"
        height="48"
      />
      <div className="crypto-info">
        <h3>
          {coin.name}{" "}
          <span className="crypto-symbol">({coin.symbol.toUpperCase()})</span>
        </h3>
        <p className="crypto-price">${coin.current_price.toLocaleString()}</p>
        {changeInfo && (
          <p className={`crypto-change ${changeInfo.className}`}>
            24h: {changeInfo.formatted}
          </p>
        )}
      </div>

      <div className="card-actions">
        <button
          type="button"
          onClick={() => toggleFavorite(coin.id)}
          aria-pressed={isFavorite}
          className={`btn-fav ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "★ En favoritos" : "☆ Agregar a favoritos"}
        </button>

        <Link to={`/criptomonedas/${coin.id}`} className="btn-detail">
          Ver Detalle
        </Link>
      </div>
    </article>
  );
}