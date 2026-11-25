import type { CryptoCoin } from "../types/crypto";

const API_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd";

interface CoinGeckoSimplePriceResponse {
  [id: string]: {
    usd: number;
    usd_24h_change?: number;
  };
}

const COIN_METADATA: Record<
  string,
  { name: string; symbol: string; image: string }
> = {
  bitcoin: {
    name: "Bitcoin",
    symbol: "btc",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  },
  ethereum: {
    name: "Ethereum",
    symbol: "eth",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  },
  solana: {
    name: "Solana",
    symbol: "sol",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  },
};

function adaptCoinsResponse(
  rawData: CoinGeckoSimplePriceResponse
): CryptoCoin[] {
  return Object.entries(rawData)
    .filter(
      ([id, values]) =>
        Boolean(COIN_METADATA[id]) && typeof values?.usd === "number"
    )
    .map(([id, values]) => ({
      id,
      name: COIN_METADATA[id].name,
      symbol: COIN_METADATA[id].symbol,
      current_price: values.usd,
      image: COIN_METADATA[id].image,
      price_change_percentage_24h: values.usd_24h_change,
    }));
}

let inFlightRequest: Promise<CryptoCoin[]> | null = null;

export const getCryptos = async (): Promise<CryptoCoin[]> => {
  if (inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = (async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Error HTTP ${response.status} al consultar la API`);
      }

      const rawData = (await response.json()) as CoinGeckoSimplePriceResponse;
      return adaptCoinsResponse(rawData);
    } finally {
      inFlightRequest = null;
    }
  })();

  return inFlightRequest;
};