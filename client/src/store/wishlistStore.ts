// client/src/store/wishlistStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Movie } from "@/types/movie";

interface WishlistStore {
  wishlist: Movie[];
  addToWishlist: (movie: Movie) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],

      addToWishlist: (movie) =>
        set((state) => ({
          wishlist: [...state.wishlist, movie],
        })),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((m) => m.id !== id),
        })),

      isInWishlist: (id) => get().wishlist.some((m) => m.id === id),
    }),
    {
      name: "reel-wishlist", // localStorage key
    },
  ),
);
