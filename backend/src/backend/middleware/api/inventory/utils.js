
import Brand from "../../../database/models/Brand.js";
import ClosedPod from "../../../database/models/ClosedPod.js";
import DisposableVape from "../../../database/models/DisposableVape.js"
import Pod from "../../../database/models/Pod.js";
import Product from "../../../database/models/Product.js";

/////////////////////////////////
// HELPER METHODS FOR MESSAGES //
/////////////////////////////////

/**
 * This returns an object containing the message in the 'message' key.
 * This is for sending a success message to the user through JSON.
 *
 * @param {String} message 
 * @returns 
 */
export function success(message) {
    return { message };
}

/**
 * This returns an object containing the message in the 'error' key.
 * This is for sending a failure message to the user through JSON.
 *
 * @param {String} message 
 * @returns 
 */
export function failure(message) {
    return { error: message };
}

////////////////////////////////////////
// HELPER METHODS FOR CREATING MODELS //
////////////////////////////////////////

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

/**
 * Creates a new closed pod in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @see createProduct for the required properties of the options object.
 * @returns {ClosedPod} The closed pod object created.
 */
export async function createClosedPod(options) {
    const product = await createProduct(options);
    const closedPod = new ClosedPod({ productId: product._id });
    await closedPod.save();
    return closedPod;
}

/**
 * Creates a new disposable vape in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.flavor The flavor of the disposable vape.
 * @see createProduct for more required properties of the options object.
 * @returns {DisposableVape} The disposable vape object created.
 */
export async function createDisposableVape(options) {
    const product = await createProduct(options);

    if (!options.flavor)
        throw new Error("Disposable Vape should have a flavor.");

    const disposableVape = new DisposableVape({
        productId: product._id,
        flavor: options.flavor,
    });
    await disposableVape.save();
    return disposableVape;
}

/**
 * Creates a new pod in the database.
 * 
 * @param {Object} options The JSON passed to the server.
 * @param {String} options.flavor The flavor of the pod.
 * @see createProduct for more required properties of the options object.
 * @see createClosedPod for more required properties of the options object.
 * @returns {Pod} The pod object created.
 */
export async function createPod(options) {
    const product = await createProduct(options);
    const closedPod = await createClosedPod(options);

    if (!options.flavor)
        throw new Error("Pod should have a flavor.");
    else if (!options.expirationDate)
        throw new Error("Pod should have an expiration date.");
    
    const pod = new Pod({
        productId: product._id,
        closedPodId: closedPod._id,
        flavor: options.flavor,
        expirationDate: options.expirationDate,
    });
    await pod.save();
    return pod;
}
