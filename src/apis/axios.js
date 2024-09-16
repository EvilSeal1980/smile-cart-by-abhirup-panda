/* eslint-disable prettier/prettier */
import {
  keysToCamelCase,
  serializeKeysToSnakeCase,
} from "@bigbinary/neeto-cist";
import axios from "axios";
import { t } from "i18next";
import { Toastr } from "neetoui";
import { evolve } from "ramda";

const shouldShowToastr = response =>
  typeof response === "object" && response?.noticeCode;

const showSuccessToastr = response => {
  if (shouldShowToastr(response.data)) Toastr.success(response.data);
};

const showErrorToastr = error => {
  if (error.message === t("error.networkError")) {
    Toastr.error(t("error.noInternetConnection"));
  } else if (error.response?.status !== 404) {
    Toastr.error(error);
  }
};

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
};

const responseInterceptors = () => {
  axios.interceptors.response.use(
    response => {
      transformResponseKeysToCamelCase(response);
      showSuccessToastr(response);

      return response.data;
    },
    error => {
      showErrorToastr(error);

      return Promise.reject(error);
    }
  );
};

/*
 * This comment explains a refactoring suggestion for an Axios request interceptor,
 * specifically focusing on leveraging Ramda's currying feature for conciseness.
 *
 * Original Code (Before Refactoring):
 * ```javascript
 * axios.interceptors.request.use(
 *   (request) => evolve({
 *     data: serializeKeysToSnakeCase,
 *     params: serializeKeysToSnakeCase
 *   }, request), // Explicitly passing 'request'
 *   (error) => Promise.reject(error)
 * );
 * ```
 *
 * Refactored Code (After Applying Currying):
 * ```javascript
 * axios.interceptors.request.use(
 *   evolve({
 *     data: serializeKeysToSnakeCase,
 *     params: serializeKeysToSnakeCase
 *   }), // No need to pass 'request' explicitly
 *   (error) => Promise.reject(error)
 * );
 * ```
 *
 * Explanation:
 * - In the refactored code, `evolve` is called with only one argument (the transformation object).
 * - Due to currying, `evolve` returns a new function that expects the `request` object.
 * - Axios's interceptor automatically provides the `request` to this new function.
 *
 * Benefit:
 * - Eliminates the need for the explicit wrapper function, leading to cleaner code.
 */

const requestInterceptors = () => {
  axios.interceptors.request.use(
    evolve({ data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase })
  );
};

const setHttpHeaders = () => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export default function initializeAxios() {
  axios.defaults.baseURL =
    "https://smile-cart-backend-staging.neetodeployapp.com/";
  setHttpHeaders();
  responseInterceptors();
  requestInterceptors();
}
