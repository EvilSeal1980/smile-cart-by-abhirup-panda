import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { isEmpty, toPairs, omit, pipe } from "ramda";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};

/*
import { keysToSnakeCase } from "neetocist"; // Import function to convert object keys to snake_case
import { stringify } from "qs"; // Import function to convert an object into a query string format
import { isEmpty, toPairs, omit, pipe } from "ramda"; // Import utility functions from the Ramda library

/**
 * Builds a URL by replacing placeholders with values and adding query parameters.
 *
 * @param {string} route - The base route with placeholders (e.g., '/users/:userId/posts/:postId').
 * @param {object} params - An object containing parameters (e.g., { userId: 123, postId: 456, filter: 'recent', sort_by: 'date' }).
 * @returns {string} The constructed URL with placeholders replaced and query parameters appended.

export const buildUrl = (route, params) => {
  const placeHolders = []; // Initialize an array to store keys that correspond to placeholders

  // Loop through each key-value pair in the params object
  toPairs(params).forEach(([key, value]) => {
    // Check if the route contains a placeholder for the current key
    if (route.includes(`:${key}`)) {
      placeHolders.push(key); // Add the key to the placeHolders array
      // Replace the placeholder with the URL-encoded value
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  // Build query parameters by processing the remaining parameters
  const queryParams = pipe(
    omit(placeHolders), // Remove keys that were replaced from the params object
    keysToSnakeCase, // Convert the remaining keys to snake_case
    stringify // Convert the object into a query string format (e.g., key1=value1&key2=value2)
  )(params);

  // Return the final constructed URL
  return isEmpty(queryParams) ? route : `${route}?${queryParams}`; // If there are no query parameters, return just the route
};

// Example Usage
const route = '/users/:userId/posts/:postId'; // Define the route with placeholders
const params = {
  userId: 123, // User ID to replace the :userId placeholder
  postId: 456, // Post ID to replace the :postId placeholder
  filter: 'recent', // Additional query parameter for filtering
  sort_by: 'date' // Additional query parameter for sorting
};

// Calling the function to build the URL
const url = buildUrl(route, params);
// Result: '/users/123/posts/456?filter=recent&sort_by=date'

*/
