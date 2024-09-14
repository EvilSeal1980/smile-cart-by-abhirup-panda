const routes = {
  root: "/",
  products: {
    index: "/products",
    show: "/products/:slug",
  },
  cart: "/cart",
  checkout: "/checkout",
};

export default routes;

/*
// Let's imagine you have a URL like this:
// https://www.example.com/users/123/profile?sort=asc&limit=10

// Now, let's see how the `buildUrl` function would process this and a set of parameters to create a final URL.

// Scenario
// You have a route template:
const route = "/users/:userId/profile";

// You have parameters:
const params = { userId: 456, sort: "desc", limit: 20 };

// Steps

// 1. Identify Placeholders:
//    * The `buildUrl` function first scans the `route` template and identifies the placeholder `:userId`.

// 2. Replace Placeholders with Values:
//    * It then looks for a matching key (`userId`) in the `params` object.
//    * It finds the value `456` and replaces `:userId` in the `route` with the URL-encoded value of `456`.
//    * The `route` now becomes `/users/456/profile`.

// 3. Prepare Query Parameters:
//    * The function removes the `userId` key from the `params` object since it was already used as a path parameter.
//    * It converts the remaining keys (`sort` and `limit`) to snake_case, resulting in `sort_by` and `limit`.
//    * It then converts this object into a query string: `sort_by=desc&limit=20`.

// 4. Construct the Final URL:
//    * Since there are query parameters, the function appends them to the modified `route` with a `?`.

// Final Output
// The `buildUrl` function would return the following URL:
// /users/456/profile?sort_by=desc&limit=20

// Key Points
// * The `buildUrl` function intelligently handles both path parameters (embedded in the route) and query parameters (appended at the end).
// * It ensures that values are properly URL-encoded, which is essential for handling special characters or spaces in URLs.
// * It provides a clean and organized way to construct URLs, making your code more maintainable and easier to understand.
*/
