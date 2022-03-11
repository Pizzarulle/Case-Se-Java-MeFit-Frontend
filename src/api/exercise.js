import { API_URL } from "../constants/api"

export const fetchExercises = async () =>{
    try{
        const response = await fetch(`${API_URL}/exercise`)
    
        if(!response.ok){
            throw new Error("Could not fetch exercises.");
        }
        const data = await response.json()
        return [null, data]
    }catch(error){
        return [error.message, null]
    }
}