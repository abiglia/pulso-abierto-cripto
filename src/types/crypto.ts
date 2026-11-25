// Representa la estructura de cada Criptomoneda que vamos a usar en la app
export interface CryptoCoin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h?: number;
}