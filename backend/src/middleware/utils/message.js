

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

