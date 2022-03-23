import { API_URL } from "../constants/api";


const createMethodHeaderBody = (methodType, body)=>{
    return {
        method: methodType,
        headers: {
          "Content-Type": "application/json",
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

export const apiCreate = async (url, newObject) => {
    try {
        const response = await fetch(`${API_URL}/${url}`, createMethodHeaderBody("POST", newObject));
    
        if (!response.ok) {
          throw new Error("Could not POST to db.");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, null];
      }
};

export const apiPatch = async (url, id, updatedObject) => {
    try {
        const response = await fetch(`${API_URL}/${url}/${id}`, createMethodHeaderBody("PATCH", updatedObject));
    
        if (!response.ok) {
          throw new Error("Could not PATCH to db.");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, null];
      }
};
export const apiDelete = async (url, id) => {
    try {
      const response = await fetch(`${API_URL}/${url}/${id}`, {
        method: "DELETE",
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

