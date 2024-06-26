import axios from 'axios';

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};
export async function request(url, method = METHOD.GET, data = null) {
    try {
        const config = {
            method,
            url,
            ...(data && { data }) // Include data in the request if provided
        };

        const response = await axios(config);
        return response.data; // Return response data
    } catch (error) {
        console.error(`Error making ${method} request to ${url}:`, error);
        throw error; // Throw error for handling in calling function
    }
}
