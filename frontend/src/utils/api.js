

/**
 * Creates a POST request object to be sent using fetch API.
 * 
 * @param {Object} body The body of the request object.
 * @returns {Object} The request object.
 */
function createPOSTRequest(body) {
    const request = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    return request;
}


/**
 * 
 * @param {String} api The path for interacting with the backend's API.
 * @param {Object} body The request object to be send using the fetch API.
 * @param {Object} object The optional details.
 * @param {Number} object.port The port of the backend server.
 * @param {String} object.path The path of the API in the backend.
 * @returns {Object} The response to the fetch API.
 */
async function post(api, body, {
    port = 3000,
    path = "api"
} = {}) {
    if (!api)
        throw new Error("Provide an API to use.");
    else if (!body)
        throw new Error("Provide a body for the POST request.");

    const baseUrl = `http://localhost:${port}/${path}`;
    const url = `${baseUrl}/${api}`;
    
    const request = createPOSTRequest(body);
    const response = await fetch(url, request);
    return response;
}


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

