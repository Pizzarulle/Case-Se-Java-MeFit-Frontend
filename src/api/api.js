import { API_URL } from "../constants/api";


/**
 * Help method to create and make request header with a body
 * @param {*} keyCloak 
 * @param {*} methodType 
 * @param {*} body 
 * @returns 
 */
const createMethodHeaderBody = (keyCloak, methodType, body)=>{
    return {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${keyCloak.token}`
        },
        body: JSON.stringify({
          ...body,
        }),
    }
}

/**
 * Method to make a GET request
 * @param {*} url to the ndpoint
 * @param {*} keyCloak instance with valid token
 * @returns body as json or error
 */
export const apiFetch = async (url,keyCloak) => {
  try {
    const response = await fetch(`${API_URL}/${url}`,{method: "GET",headers: {
      "Authorization": `Bearer ${keyCloak.token}`
    },
    });
    if (!response.ok) {
      return new Error(`Could not fetch ${url}.`);
    }

    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

/**
 * Method to make POST request
 * @param {*} keyCloak instance with valid token
 * @param {*} url to endpoint
 * @param {*} newObject object to POST as a stringify version
 * @returns body or error
 */
export const apiCreate = async (keyCloak, url, newObject) => {
  console.log(keyCloak.token);
    try {
        const response = await fetch(`${API_URL}/${url}`, createMethodHeaderBody(keyCloak, "POST", newObject));
    
        if (!response.ok) {
          throw new Error("Could not POST to db.");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, null];
      }
};

/**
 * Method to make PATCH requests
 * @param {*} keyCloak instance with valid token 
 * @param {*} url to endpoint to call
 * @param {*} id of object in database tp PATCH
 * @param {*} updatedObject object with new values to PATCH in database
 * @returns body or error 
 */
export const apiPatch = async (keyCloak, url, id, updatedObject) => {
    try {
        const response = await fetch(`${API_URL}/${url}/${id}`, createMethodHeaderBody(keyCloak, "PATCH", updatedObject));
    
        if (!response.ok) {
          throw new Error("Could not PATCH to db.");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, null];
      }
};
/**
 * Method to make DELETE requests
 * @param {*} keyCloak instance with valid token
 * @param {*} url to endpoint to call
 * @param {*} id of object to delete
 * @returns body or error
 */
export const apiDelete = async (keyCloak, url, id) => {
    try {
      const response = await fetch(`${API_URL}/${url}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${keyCloak.token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Could not DELETE.");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  };

