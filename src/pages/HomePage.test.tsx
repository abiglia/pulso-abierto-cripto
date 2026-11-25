import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";
import { getCryptos } from "../services/cryptoService";
import { useFavoritesStore } from "../store/useFavoritesStore";
import type { CryptoCoin } from "../types/crypto";

vi.mock("../services/cryptoService", () => ({
  getCryptos: vi.fn(),
}));

const mockCoins: CryptoCoin[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    current_price: 90000,
    image: "https://example.com/btc.png",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "sol",
    current_price: 180,
    image: "https://example.com/sol.png",
  },
];

describe("HomePage - Flujos principales y favoritos", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useFavoritesStore.setState({ favorites: [] });
  });

  it("muestra el estado de carga y luego renderiza los resultados exitosos", async () => {
    vi.mocked(getCryptos).mockResolvedValueOnce(mockCoins);

    const { getByRole, findByText, getByText } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(getByRole("status")).toHaveTextContent(/cargando datos/i);

    expect(await findByText("Bitcoin")).toBeInTheDocument();
    expect(getByText("Solana")).toBeInTheDocument();
  });

  it("permite marcar y desmarcar una criptomoneda como favorita desde la interfaz", async () => {
    const user = userEvent.setup();
    vi.mocked(getCryptos).mockResolvedValueOnce([mockCoins[0]]);

    const { findByRole } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const favButton = await findByRole("button", {
      name: /agregar a favoritos/i,
    });
    expect(favButton).toHaveAttribute("aria-pressed", "false");

    await user.click(favButton);
    expect(favButton).toHaveTextContent(/en favoritos/i);
    expect(favButton).toHaveAttribute("aria-pressed", "true");

    await user.click(favButton);
    expect(favButton).toHaveTextContent(/agregar a favoritos/i);
    expect(favButton).toHaveAttribute("aria-pressed", "false");
  });

  it("muestra un mensaje de error cuando falla la consulta y permite reintentar", async () => {
    const user = userEvent.setup();
    vi.mocked(getCryptos)
      .mockRejectedValueOnce(new Error("Fallo de red"))
      .mockResolvedValueOnce(mockCoins);

    const { findByRole, getByRole, findByText } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const alert = await findByRole("alert");
    expect(alert).toHaveTextContent(
      /no se pudieron consultar las criptomonedas/i
    );

    const retryButton = getByRole("button", {
      name: /volver a intentar/i,
    });
    await user.click(retryButton);

    expect(await findByText("Bitcoin")).toBeInTheDocument();
  });
});