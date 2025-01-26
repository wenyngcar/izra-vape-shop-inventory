import Brand from "../../database/models/Brand.js";
import Product from "../../database/models/Product.js";
import Sale from "../../database/models/Sale.js";

/**
 * Find all brands or filters them based on the given criteria.
 * [] For optional
 * @param {Object} [filter] Optional filter criteria for reading brands.
 * @returns {Array<Object>} List of brand documents matching the filter.
 */
export async function readBrands(filter = {}) {
  // Use the Brand model to query the database
  const brands = await Brand.find(filter);
  // console.log("Fetched brands:");
  // console.log(JSON.stringify(brands, null, 2));

  return brands;
}

// Find all products or filters them based on the given criteria.
export async function readProducts(filter = {}) {
  const products = await Product.find(filter);
  return products;
}

// Find all sales or filters them based on the given criteria.
export async function readSales(filter = {}) {
  const sales = await Sale.find(filter);
  return sales;
}
