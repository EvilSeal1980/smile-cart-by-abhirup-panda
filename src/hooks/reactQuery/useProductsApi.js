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
import { useQuery } from "react-query";

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
  });
