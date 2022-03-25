import { API_URL } from "../constants/api";


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

export const apiFetch = async (url) => {
  try {
    const response = await fetch(`${API_URL}/${url}`);
    if (!response.ok) {
      return new Error(`Could not fetch ${url}.`);
    }

    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const apiCreate = async (keyCloak, url, newObject) => {
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

