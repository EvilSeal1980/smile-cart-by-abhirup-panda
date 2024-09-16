/* eslint-disable prettier/prettier */
import { isNotEmpty } from "neetocist";
import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      removeCartItem: slug => set(evolve({ cartItems: dissoc(slug) })),
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (quantity <= 0 && isNotEmpty(quantity)) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, String(quantity), cartItems) };
        }),
      clearCart: () => set({ cartItems: {} }),
    }),
    { name: "cart-items-store" }
  )
);

export default useCartItemsStore;
