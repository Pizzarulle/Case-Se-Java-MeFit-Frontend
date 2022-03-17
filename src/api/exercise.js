import { API_URL } from "../constants/api";

export const fetchExercises = async () => {
  try {
    const response = await fetch(`${API_URL}/exercise`);

    if (!response.ok) {
      throw new Error("Could not fetch exercises.");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};

export const patchExercise = async (id, updatedExercise) => {
    try {
        const response = await fetch(`${API_URL}/exercise/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...updatedExercise,
          }),
        });
    
        if (!response.ok) {
          throw new Error("Could not post exercises to db.");
        }
        const data = await response.json();
        return [null, data];
      } catch (error) {
        return [error.message, null];
      }
}

export const createExercise = async (newExercise) => {
  try {
    const response = await fetch(`${API_URL}/exercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newExercise,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not post exercises to db.");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};
