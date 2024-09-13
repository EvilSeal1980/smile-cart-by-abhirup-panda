import axios from "axios";

const show = slug => axios.get(`products/${slug}`);

const fetch = () => axios.get("products");

const productsApi = { show, fetch };
export default productsApi;

/*
Encapsulating the functions within an object is beneficial,
when you have multiple functions related to products
(e.g., show, create, update, delete), you can include all
of them within the productsApi object, making it a convenient
and logical container for all product-related functionality.
*/
