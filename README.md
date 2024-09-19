# Smile Cart

Smile Cart is a dynamic e-commerce web application that allows users to browse products, add items to their shopping cart, and proceed to checkout to place orders. The app offers a smooth and intuitive shopping experience, with optimized performance and seamless interaction.

## Features

- **Product Browsing**: Explore a wide range of products, complete with pagination for easy navigation.
- **Shopping Cart**: Add products to your cart and manage them before proceeding to checkout.
- **Checkout**: Users can place their orders via the checkout page with proper form validation.
- **Search Functionality**: Search for products with debouncing to minimize unnecessary API calls.
- **State Management**: Global state managed using Zustand for a predictable and scalable application.
- **Optimized Performance**: Enhanced performance through memoization, preventing unnecessary re-renders and eliminating bottlenecks.

## Tech Stack

- **React.js**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests, with interceptors for handling responses and errors.
- **React Router**: Declarative routing for navigating between pages.
- **Zustand**: Lightweight state management solution for handling application state.
- **Yup**: Form validation schema used in the checkout process to ensure data integrity.
- **React Query**: Data fetching and caching library used for efficient API requests.
- **Pagination**: Implemented via query parameters for efficient browsing.
- **Debouncing**: Search input is optimized to prevent frequent API calls by using debouncing.
- **Memoization**: Used memoization to remove performance bottlenecks.

# Live Demo

Check out the live version of SmileCart [here](https://ecart-theta-one.vercel.app)
