import { post, get, deleteSingleProduct, deleteSingleSales, put, patch, remove } from "./helper-functions";

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

export async function readBrands(filter) {
    const response = await get("brands", filter);
    const brands = await response.json();  // Parse the response as JSON
    return brands;
}

export async function readProducts(filter) {
    const response = await get("products", filter);
    const products = await response.json();  // Parse the response as JSON
    return products;
}

export async function readSales(filter) {
    const response = await get("sales", filter);
    const sales = await response.json();  // Parse the response as JSON
    return sales;
}

export async function deleteOneItem(filter) {
    await deleteSingleProduct("delete-product", filter)
}
export async function deleteOneSales(filter) {
    await remove("delete-sales", filter)
}


export async function editOneItem(filter) {
    await put("edit-product", filter)
}

export async function createSale(filter) {
    return post("create-sale", filter);
}

export async function subtractQuantity(filter) {
    await patch("subtract-quantity", filter)
}