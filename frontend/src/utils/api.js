import { post, get } from "./helper-functions";

/**
 * Creates a brand using the backend API.
 * 
 * @param {Object} options The options for creating a brand.
 * @returns {Object} The response of the fetch API.
 */
export async function createBrand(options) {
    return post("create-brand", options);
}


/**
 * Creates a product using the backend API.
 * 
 * @param {Object} options The options for creating a product.
 * @returns {Object} The response of the fetch API.
 */
export async function createProduct(options) {
    return post("create-product", options);
}


/**
 * Creates a variant using the backend API.
 * 
 * @param {Object} options The options for creating a variant.
 * @returns {Object} The response of the fetch API.
 */
export async function createVariant(options) {
    return post("create-variant", options);
}

export async function readBrands(filter = {}) {
    const response = await get("brands", filter);
    const brands = await response.json();  // Parse the response as JSON
    return brands;
}

export async function readProducts(filter = {}) {
    const response = await get("products", filter);
    const products = await response.json();  // Parse the response as JSON
    return products;
}