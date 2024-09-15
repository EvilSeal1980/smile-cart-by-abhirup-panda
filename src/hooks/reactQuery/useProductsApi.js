/* eslint-disable prettier/prettier */
/*
* Explanation of `useQuery` hook usage with specific options and custom hook implementation:

**useQuery Hook**

* Main Options:
    * `queryKey`: A unique identifier for caching and refetching query results.
        * Can be a string or an array (for more complex scenarios).
        * Example: `["products", "mens-cotton-jacket"]` targets a specific product.
    * `queryFn`: The function responsible for fetching the actual data.
        * Example: `() => productsApi.show("mens-cotton-jacket")`

* Key Properties Returned:
    * `data`: The successful API response data.
    * `isLoading`: True during the initial data fetch, false otherwise.
    * `isError`: True if an error occurred during fetching, false otherwise.
    * `isFetching`: True whenever a query is being fetched (initial or refetch), false otherwise.

**Custom Hook: `useProductsApi.js`**

* Encapsulates `useQuery` logic for better organization and reusability.
* Naming convention: `use*Api` for React Query hooks related to a specific API.
* File location: `src/hooks/reactQuery/useProductsApi.js`

* Example Usage (within `ProductList/index.jsx`):
    * `import useDebounce from "hooks/useDebounce";`
    * `const debouncedSearchKey = useDebounce(searchKey);`
    * Pass `debouncedSearchKey` to the `searchTerm` parameter of the `productsApi.fetch` call within `fetchProducts`.
    * Change the `useEffect` dependency from `searchKey` to `debouncedSearchKey` to trigger fetching only when the debounced value changes.

* Benefits:
    * Prevents unnecessary API requests on every keystroke.
    * Ensures users interact with the most up-to-date data by waiting for a short delay before fetching.
*/

import { QUERY_KEYS } from "constants/query";

import productsApi from "apis/products";
import { existsBy } from "neetocist";
import { Toastr } from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useQueries, useQuery } from "react-query";
import useCartItemsStore from "stores/useCartItemsStore";

// here struck as I put curly {} and didn't use return
export const useShowProduct = slug =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
    keepPreviousData: true,
  });

export const useFetchCartProducts = slugs => {
  const { t } = useTranslation();
  const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const responses = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEYS.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),
      onSuccess: ({ availableQuantity, name }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      },
    }))
  );

  /*
   * Handling `useQueries` Results
   *
   * - Extracts the `data` property from each query result object.
   * - Filters out objects where `data` is `undefined` or `null`
   *   (unresolved queries or fetch errors).
   * - Provides an array of valid data results for further processing.
   */
  const data = responses.map(prop("data")).filter(Boolean);

  /*
   * Checking for In-Progress Requests
   *
   * - Utilizes `existsBy` from 'neetocist' to efficiently check if any query in the `responses` array
   *   is still loading (`isLoading: true`).
   * - Returns `true` if at least one query is loading, `false` otherwise.
   */
  const isLoading = existsBy({ isLoading: true }, responses);

  return { data, isLoading };
};
