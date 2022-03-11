import { API_URL } from "../constants/api";

export const apiFetch = async (url) => {
    try{
        const response = await fetch(`${API_URL}/${url}`)
        if(!response.ok) {
            return new Error(`Could not fetch ${url}.`);
        }

        const data = await response.json();
        return [null, data];
    } catch(error) {
        return [error.message, null];
    }
}
