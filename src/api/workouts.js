import { API_URL } from "../constants/api";

export const fetchWorkouts = async () => {
  try {
    const response = await fetch(`${API_URL}/workout`);

    if (!response.ok) {
      throw new Error("Could not fetch workouts.");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, null];
  }
};