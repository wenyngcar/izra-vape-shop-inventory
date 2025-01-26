import mongoose from "mongoose";
import Product from "../../database/models/Product.js";

/**
 * Edit products based on productId
 * @param {Object} [filter] Optional filter criteria for reading brands.
 * @param {mongoose.Types.ObjectId | string} filter.id by product.
 * @param {String}
 */
export async function editProductById(filter) {
  const { id, ...filterWithoutId } = filter;
  await Product.findOneAndUpdate({ _id: filter.id },
    { $set: { ...filterWithoutId } }, // Update: Change the email
    { returnDocument: "after" })
}

/**
 * Creates a new sale in the database.
 * 
 * @param {Object} filter The JSON passed to the server.
 * @param {String} filter.brandId 
 * @param {String} filter.productId.
*/
