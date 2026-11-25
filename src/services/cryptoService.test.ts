import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCryptos } from "./cryptoService";

describe("cryptoService - getCryptos", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("devuelve datos tipados y adaptados cuando la respuesta HTTP es exitosa", async () => {
    const mockApiResponse = {
      bitcoin: { usd: 92500 },
      ethereum: { usd: 3150 },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    } as Response);

    const result = await getCryptos();

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      current_price: 92500,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      price_change_percentage_24h: undefined,
    });
  });

  it("lanza un error cuando la respuesta HTTP tiene ok: false", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 429,
    } as Response);

    await expect(getCryptos()).rejects.toThrow("Error HTTP 429");
  });
});