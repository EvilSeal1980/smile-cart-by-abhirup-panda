import axios from "axios";
import { keysToCamelCase } from "neetocist";

/*
Since Axios response schema is designed that way, we have to
repetitively extract data from the response for all API
requests throughout our codebase. Luckily, we can use Axios
interceptors to automate this process.

Axios interceptors are functions that can be registered
globally with Axios. They allow you to intercept and modify
HTTP requests before they are sent and responses before they
are processed.
*/

const responseInterceptors = () => {
  axios.interceptors.response.use(response => {
    transformResponseKeysToCamelCase(response);

    return response.data;
  });
};

/*
To inform the server about the expected data format Axios
should receive in response, we can include an Accept header
in the HTTP request configuration, specifying the desired
data format. In our case, we expect the response from the
server to be in JSON format. To achieve this, we can set the
Accept header to application/json.

To inform the server about the format of the data being sent
in the request body, we can include Content-Type header in the
HTTP request. Since we are sending request data in JSON format,
we can set the Content-Type header to application/json.
*/

const transformResponseKeysToCamelCase = response => {
  if (response.data) response.data = keysToCamelCase(response.data);
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
}
