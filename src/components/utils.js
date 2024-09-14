/* eslint-disable prettier/prettier */
import { sum } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

/*
Zustand provides us APIs to access state outside components
and hooks. The Zustand hooks come with two methods, getState
and setState, to access state outside the components. We
will use the getState method on the useCartItemsStore hook
to access the cart items inside our utility function:
*/
export const cartTotalOf = (products, priceKey) => {
  const { cartItems } = useCartItemsStore.getState();

  // const cartItems = useCartItemsStore.pickFrom();
  //   Here is how the above code will get transpiled:
  //   const cartItems = useCartItemsStore(store => store.cartItems);

  return sum(
    products.map(product => product[priceKey] * cartItems[product.slug])
  );
};
