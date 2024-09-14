import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageLoader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import ProductListItem from "./ProductListItem";

/*
Making an API request for every keystroke can overload the
server and slow down the application. Additionally, another
issue arises when multiple API requests are triggered one
after the other with each keystroke. If the first request
takes longer to process and is served after the second one,
the user might end up interacting with inaccurate or outdated data.

To fix this issue we will use a debouncing. Debouncing is a
technique where frequent execution of a function is prevented
by delaying it for some time. All invocations except the last
one will be ignored.

In our case, we can use debouncing to ensure that the search
request to a server is only sent after a certain time interval
has passed after the user stops typing. This prevents sending
a request for each keystroke.
*/
const ProductList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  /*
** React Component Structure and Data Flow **

**Component Tree**

* ProductList
    * Header
    * ProductListItem
        * AddToCart

**Description**

* This structure represents the hierarchy of components in our application.
* `ProductList` is the parent component, containing both `Header` and `ProductListItem`.
* `ProductListItem` further contains the `AddToCart` component.

* The challenge here is sharing data between `Header` and `AddToCart`, which are not directly related (parent-child).

* Solution: We'll use "lifting state up".
    * The shared state (`cartItems`) will be moved to their closest common ancestor, `ProductList`.
    * `cartItems` will store the slugs of items added to the cart.
    * This allows both `Header` (to display cart count) and `AddToCart` (to add items) to access and update the cart data efficiently.
*/
  const [cartItems, setCartItems] = useState([]);
  const debouncedSearchKey = useDebounce(searchKey);

  /*
   * Toggles the presence of an item (identified by `slug`) in the cart.
   *
   * - `setCartItems` is used to update the cart state (presumably from React's `useState`).
   * - The functional form of `setCartItems` ensures updates are based on the latest state.
   * - A ternary operator checks if `slug` is in the cart.
   *   - If present: `without([slug], cartItems)` removes the item.
   *     - without -> create a new array by removing the slug from the cartItems array.
   *   - If not present: `[slug, ...cartItems]` adds the item to the beginning of the cart.
   */

  /*
** React Component Structure with State and Props **

**Component Hierarchy**

* ProductList
    * State:
        * cartItems: Array to store slugs of items in the cart.
        * setCartItems: Function to update the `cartItems` state.
    * Props passed down:
        * cartItemsCount:  Number of items currently in the cart (derived from `cartItems`).
        * isInCart: Function to check if a specific item (by slug) is in the cart.
        * toggleIsInCart: Function to add/remove an item from the cart.

    * Header
        * Receives props from `ProductList`:
            * cartItemsCount

    * ProductListItem
        * Receives props from `ProductList`:
            * isInCart
            * toggleIsInCart

        * AddToCart
            * Receives props from `ProductListItem`:
                * isInCart
                * toggleIsInCart
*/
  const toggleIsInCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], cartItems)
        : [slug, ...cartItems]
    );

  const fetchProducts = async () => {
    try {
      const data = await productsApi.fetch({ searchTerm: debouncedSearchKey });
      setProducts(data.products);
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="flex h-screen flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem
              key={product.slug}
              {...product}
              isInCart={cartItems.includes(product.slug)}
              toggleIsInCart={() => toggleIsInCart(product.slug)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
