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
  // Call create()() twice to apply middleware
  persist(
    // persist: middleware for auto-sync with localStorage
    (set, get) => ({
      // define store state and actions
      wishlist: [],

      addToWishlist: (movie) =>
        set((state) => ({
          wishlist: [...state.wishlist, movie],
        })),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter((m) => m.id !== id),
        })),

      isInWishlist: (id) => get().wishlist.some((m) => m.id === id), // some: return true if any movie in wishlist has the given id, otherwise false
    }),
    {
      name: "reel-wishlist", // localStorage key, persist setup with this key, so wishlist data is saved under "reel-wishlist" in localStorage
    },
  ),
);
