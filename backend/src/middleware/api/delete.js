import mongoose from "mongoose"
import Product from "../../database/models/Product.js"
import Sale from "../../database/models/Sale.js"

/**
 * Delete products based on productId
 * @param {mongoose.Types.ObjectId | string} id by product.
 */
export async function deleteProductById(id) {

  await Product.findByIdAndDelete(id)

  console.log(`Product with ID ${JSON.stringify(id)} successfully deleted.`)
}

/**
 * Delete sales based on salesId
 * @param {mongoose.Types.ObjectId | string} id by product.
 */
export async function deleteSalesById(id) {

  await Sale.findByIdAndDelete(id)

  console.log(`Sale with ID ${JSON.stringify(id)} successfully deleted.`)
}
