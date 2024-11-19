
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
    return brand;
}

/**
 * Creates a new product in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.brandName The name of the product's brand.
 * @param {String} options.brandCategory The name of the product's category.
 * @param {String} options.name The name of the product.
 * @param {Number} options.price The price of the product.
 * @param {Number} options.quantity The quantity of the product.
 * @returns {Product} The product object created.
 */
export async function createProduct(options) {
    if (!options.brandName)
        throw new Error("Product's brand name must be specified.");
    else if (!options.brandCategory)
        throw new Error("Product's brand category must be specified.");
    else if (!options.name)
        throw new Error("Product's name must be specified.");
    else if (!options.price)
        throw new Error("Product's price must be specified.");
    else if (!options.quantity)
        throw new Error("Product's quantity must be specified.");
    
    const brands = await Brand.find({ 
        name: optoins.brandName,
        category: options.brandCategory,
    });

    if (brands.length === 0)
        throw new Error("Brand is not found.");

    const brand = brands[0];
    const product = new Product({
        brandId: brand._id,
        name: options.name,
        price: options.price,
        quantity: options.quantity,
    });

    await product.save();
    return product;
}

