import mongoose from "mongoose";
import Brand from "../../database/models/Brand.js";
import Product from "../../database/models/Product.js";
import Variant from "../../database/models/Variant.js";

/////////////////////
// CREATING MODELS //
/////////////////////

/**
 * Creates a new brand in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.name The name of the brand.
 * @param {String} options.category The category of the brand.
 * @returns {Brand} The brand object created.
 */
export async function createBrand(options) {
    if (!options.name)
        throw new Error("Brand should have a name");
    else if (!options.category)
        throw new Error("Brand should have a category.");

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
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.brandName The name of the product's brand.
 * @param {String} options.brandCategory The name of the product's category.
 * @param {String} options.variantName The name of the product's variant.
 * @param {String} options.name The name of the product.
 * @param {Number} options.price The price of the product.
 * @param {Number} options.quantity The quantity of the product.
 * @param {Date} options.date The expiration date of the product.
 * @returns {Product} The product object created.
 */
export async function createProduct(options) {
    if (!options.brandName)
        throw new Error("Product's brand name must be specified.");
    else if (!options.brandCategory)
        throw new Error("Product's brand category must be specified.");
    else if (!options.variantName)
        throw new Error("Product's variant name must be specified.");
    else if (!options.name)
        throw new Error("Product's name must be specified.");
    else if (!options.price)
        throw new Error("Product's price must be specified.");
    else if (!options.quantity)
        throw new Error("Product's quantity must be specified.");
    else if (!options.expiration)
        throw new Error("Product's expiration date must be specified.");

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
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.name The name of the variant.
 * @param {String} options.description The description of the variant.
 * @param {String} options.category The category of the variant.
 * @returns {Variant} The variant object created.
 */
export async function createVariant(options) {
    if (!options.name)
        throw new Error("Variant's name should be specified.");
    else if (!options.description)
        throw new Error("Variant's description should be specified.");
    else if (!options.category)
        throw new Error("Variant's category should be specified.");

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
 * Reads all brands or filters them based on the given criteria.
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

/**
 * Reads products based on brandId.
 * [] For optional
 * @param {Object} [filter] Optional filter criteria for reading brands.
 * @param {mongoose.Types.ObjectId} [filter.brandId] Filter by brandID.
 * @returns {Array<Object>} List of product documents matching the filter.
 */
export async function readProducts(filter = {}) {
    const products = await Product.find(filter);
    return products;
}

/**
 * Delete products based on productId
 * @param {Object} [filter] Optional filter criteria for reading brands.
 * @param {mongoose.Types.ObjectId} [filter.productId] Filter by brandID.
 * @returns {Array<Object>} List of product documents matching the filter.
 */
export async function deleteProductById(filter = {}) {
    await Product.deleteOne(filter)
}
