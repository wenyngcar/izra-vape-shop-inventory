import mongoose from "mongoose"
import Brand from "../../database/models/Brand.js"
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
 * @param {mongoose.Types.ObjectId | string} id by sale.
 */
export async function deleteSalesById(id) {

  await Sale.findByIdAndDelete(id)

  console.log(`Sale with ID ${JSON.stringify(id)} successfully deleted.`)
}

/**
 * Delete brand based on brandId
 * @param {mongoose.Types.ObjectId | string} id by brand.
 */
export async function deleteBrandById(id) {

  await Brand.findByIdAndDelete(id)

  console.log(`Brand with ID ${JSON.stringify(id)} successfully deleted.`)
}

/**
 * Delete products based on brandId
 * @param {mongoose.Types.ObjectId | string} id by brand.
 */
export async function deleteProductByBrandId(id) {
  await Product.deleteMany(id)
  console.log(`Products with Brand ID ${JSON.stringify(id)} successfully deleted.`)
}
