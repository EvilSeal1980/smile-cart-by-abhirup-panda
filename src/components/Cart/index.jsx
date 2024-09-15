/* eslint-disable prettier/prettier */
import { PageLoader, Header } from "components/commons";
import { cartTotalOf } from "components/utils";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import i18n from "i18next";
import { NoData } from "neetoui";
import { isEmpty, keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

import { MRP, OFFER_PRICE } from "../constants";

const Cart = () => {
  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { t } = useTranslation();

  // const { cartItems, setSelectedQuantity } = useCartItemsStore.pick();

  // const slugs = keys(cartItems);

  /*
   * Refactoring Cart Data Fetching
   *
   * - Replaces `useEffect`, `fetchCartProducts`, and associated `useState` with the `useFetchCartProducts` hook.
   * - `slugs` are passed as an argument to the hook to initiate parallel queries for cart items.
   * - `useCartItemsStore` is now used solely to extract `slugs` from the store.
   * - Aliases the `data` property returned by `useFetchCartProducts` to `products` for better readability.
   * - Sets a default value of an empty array for `products` to handle cases where data is not yet available.
   */

  const slugs = useCartItemsStore(store => keys(store.cartItems));

  const { data: products = [], isLoading } = useFetchCartProducts(slugs);

  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  /*
  const fetchCartProducts = async () => {
    // Since we are persisting the cart items to local storage,
    // the already added product may no longer be available, or
    // the current number of available stocks may be less than
    // the already selected quantity. Therefore, we should
    // validate these conditions before displaying the cart items
    // to ensure the accuracy of the data.

    // We will compare the selected quantity of each product in
    // the store with the available quantity from the response.
    // If the available quantity is less than the selected quantity,
    // we will update the selected quantity in the store. For this
    // purpose, we will need both cartItems and setSelectedQuantity
    // from the store. We were only extracting the slugs from the
    // cartItems object. We will replace the previous usage of
    // useCartItemsStore to access the entire store.

    try {
      const responses = await Promise.all(
        slugs.map((slug) => productsApi.show(slug))
      );

      setProducts(responses);
      responses.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      });
    } catch (error) {
      console.log(t("error.genericError", { error }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [cartItems]);
  */

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title={t("cart.title")} />
        <div className="flex h-screen items-center justify-center">
          <NoData title={t("cart.empty")} />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title={t("cart.title")} />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default withTitle(Cart, i18n.t("cart.title"));
