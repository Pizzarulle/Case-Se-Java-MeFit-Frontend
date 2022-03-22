import { API_URL } from "../constants/api";

export const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_URL}/program`);
  
      if (!response.ok) {
        throw new Error("Could not FETCH programs.");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  };

  export const createProgram = async (newProgram) => {
    try {
      const response = await fetch(`${API_URL}/program`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newProgram,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Could not POST program to db.");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  };

  export const patchProgram = async (id, updatedProgram) => {
    try {
      const response = await fetch(`${API_URL}/program/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...updatedProgram,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Could not PATCH program.");
      }
      const data = await response.json();
      return [null, data];
    } catch (error) {
      return [error.message, null];
    }
  };
  
export const deleteProgram = async (exerciseId) => {
  try {
    const response = await fetch(`${API_URL}/program/${exerciseId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Could not DELETE program.");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};