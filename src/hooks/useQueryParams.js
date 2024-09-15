import { keysToCamelCase } from "@bigbinary/neeto-cist";
import { parse } from "qs";
import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const queryParams = parse(location.search, { ignoreQueryPrefix: true });

  return keysToCamelCase(queryParams);
};

export default useQueryParams;

/*
 * URL Parsing and Query Parameters
 *
 * - `useLocation`: Retrieves current URL details from `react-router-dom`.
 * - `search` property: Extracts the query parameters as a string (e.g., "?page=2&page_size=8").
 * - `parse` (from 'qs' library): Processes key-value pairs into an object, ignoring the leading '?'.
 * - `keysToCamelCase`: Converts query parameter keys from snake_case to camelCase for consistency.
 */
