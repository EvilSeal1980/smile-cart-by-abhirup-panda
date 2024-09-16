import { QUERY_KEYS } from "constants/query";

import { QueryClient, QueryCache } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

/*
 * Caching API Data with React Query
 *
 * Problem:
 *   - Country/state data is fetched on every checkout page visit or reload,
 *     even though it rarely changes.
 *   - This leads to unnecessary API requests.
 *
 * Solution:
 *   - Cache the fetched data using React Query's experimental `persistQueryClient` plugin.
 *   - This persists the query client state and its cache to local storage,
 *     allowing data to be restored on subsequent visits or reloads.
 *
 * Implementation:
 *   - Import `persistQueryClient` and `createWebStoragePersistor`.
 *   - Create a `localStoragePersistor` using `createWebStoragePersistor` with `window.localStorage`.
 *   - Call `persistQueryClient`, passing:
 *     - `queryClient`: The QueryClient instance to persist.
 *     - `persistor`: The localStoragePersistor for storage.
 *     - `maxAge`: Set to `Infinity` for long-term caching (data changes infrequently).
 *     - `dehydrateOptions`:  Configure which queries to persist using `shouldDehydrateQuery`.
 *
 * Benefits:
 *   - Reduces API calls and improves performance by reusing cached data.
 *   - Provides a smoother user experience by avoiding unnecessary loading times.
 */

const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) =>
      [QUERY_KEYS.COUNTRIES, QUERY_KEYS.STATES].some(key =>
        queryKey.includes(key)
      ),
  },
});

export default queryClient;
