
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
        headers: { "Content-Type": "application/json" },
    }
    
    return request;
}


/**
 * Sends a POST request to the API.
 * 
 * @param {String} api The API name for creating a model.
 * @param {Object} body The request object to be sent using the fetch API.
 * @returns {Object} The response of the fetch API.
 */
async function post(api, body) {
    if (!api)
        throw new Error("Provide an API to use.");

    // TODO: Replace this hardcoded value.
    const baseUrl = "http://localhost:3000/api/inventory";
    const url = `${baseUrl}/${api}`;
    
    const request = createPOSTRequest(body);
    const response = await fetch(url, request);
    return response;
}


/**
 * Creates a brand using the API.
 * 
 * @param {Object} options The options for creating a brand.
 * @param {String} options.name The name of the brand.
 * @param {String} options.category The category of the brand.
 * @returns {Object} The response of the fetch API.
 */
export async function createBrand(options) {
    if (!options.name)
        throw new Error("Provide a name for the brand.");
    else if (!options.category)
        throw new Error("Provide a category for the brand.");

    return post("create-brand", options);
}
