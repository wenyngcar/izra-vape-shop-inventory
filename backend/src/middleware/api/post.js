import mongoose from "mongoose";
import Brand from "../../database/models/Brand.js";
import Product from "../../database/models/Product.js";
import Sale from "../../database/models/Sale.js";
import Variant from "../../database/models/Variant.js";

/**
 * Creates a new brand in the database.
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.name 
 * @param {String} options.category 
 * @returns {Brand} The brand object created.
 */
export async function createBrand(options) {
  const brand = new Brand({
    name: options.name,
    category: options.category,
  });

  await brand.save();
  console.log("Created brand:");
  console.log(JSON.stringify(brand));

  return brand;
}

/**
 * Creates a new product in the database.
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.brandName 
 * @param {String} options.brandCategory 
 * @param {String} options.variantName 
 * @param {String} options.name 
 * @param {Number} options.price 
 * @param {Number} options.quantity 
 * @param {Date} options.date The expiration date of the product.
 * @returns {Product} The product object created.
 */
export async function createProduct(options) {
  const brands = await Brand.find({
    name: options.brandName,
    category: options.brandCategory,
  });

  if (brands.length === 0)
    throw new Error("Brand is not found.");

  const variants = await Variant.find({
    name: options.variantName,
  });

  if (variants.length === 0)
    throw new Error("Variant is not found.");

  const brand = brands[0];
  const variant = variants[0];
  const product = new Product({
    brandId: brand._id,
    variantId: variant._id,
    name: options.name,
    price: options.price,
    quantity: options.quantity,
    expiration: options.expiration,
  });

  await product.save();
  console.log("Created product:");
  console.log(JSON.stringify(product));

  return product;
}

/**
 * Creates a new variant in the database.
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.name 
 * @param {String} options.description 
 * @param {String} options.category 
 * @returns {Variant} The variant object created.
 */
export async function createVariant(options) {
  const variant = new Variant({
    name: options.name,
    description: options.description,
    category: options.category,
  });

  await variant.save();
  console.log("Created variant:");
  console.log(JSON.stringify(variant));

  return variant;
}

/**
 * Creates a new sale in the database.
 * @param {Object} options The JSON passed to the server.
 * @param {mongoose.Types.ObjectId} options.brandId
 * @param {mongoose.Types.ObjectId} options.productId 
 * @param {Number} options.sale 
 * @returns {Sale} The sale object created.
 */
export async function createSale(options) {
  const brand = await Brand.findOne({ _id: options.brandId });
  const product = await Product.findOne({ _id: options.productId });

  const totalSale = options.sale * product["price"]

  const sale = new Sale({
    brandId: options.brandId,
    productId: options.productId,
    name: product["name"],
    category: brand["category"],
    quantity: options.sale,
    price: product["price"],
    total: totalSale,
    date: new Date(),
  });

  await sale.save()

  console.log("brand", brand)
  console.log("product", product)

  // await sale.save();
  console.log("Created sale:");
  console.log(JSON.stringify(sale));

  return sale;
}
