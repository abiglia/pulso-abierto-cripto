import type { CryptoCoin } from "../types/crypto";
import CryptoCard from "./CryptoCard";

interface CryptoListProps {
  coins: CryptoCoin[];
}

export default function CryptoList({ coins }: CryptoListProps) {
  return (
    <section className="crypto-grid">
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </section>
  );
}