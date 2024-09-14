/* eslint-disable prettier/prettier */
import { without } from "ramda";
import { create } from "zustand";

const useCartItemsStore = create(set => ({
  cartItems: [],
  toggleIsInCart: slug => {
    set(({ cartItems }) => {
      if (cartItems.includes(slug)) {
        return { cartItems: without([slug], cartItems) };
      }

      return { cartItems: [slug, ...cartItems] };
    });
  },
}));

/*
The create function returns a hook, which acts as an interface
for retrieving values from the store. Using the
useCartItemsStore hook, you can easily access the latest
cartItems array and the reference to the toggleIsInCart
function to update it.
const { cartItems, toggleIsInCart } = useCartItemsStore();
*/

export default useCartItemsStore;
