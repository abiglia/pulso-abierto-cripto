import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      // Actualización inmutable: si ya está, lo quita; si no está, lo agrega
      toggleFavorite: (id: string) =>
        set((state) => {
          const exists = state.favorites.includes(id);
          return {
            favorites: exists
              ? state.favorites.filter((favId) => favId !== id)
              : [...state.favorites, id],
          };
        }),
    }),
    {
      name: "pulso-abierto-favorites", // Nombre con el que se guarda en localStorage
    }
  )
);