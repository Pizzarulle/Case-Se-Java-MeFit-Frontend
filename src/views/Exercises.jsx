import { useEffect, useState } from "react";
import { fetchExercises } from "../api/exercise";
import Exercise from "../components/exercise/Exercise";

const Exercises = () => {
  
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const asyncWrapper = async () =>{
      const [error, data] = await fetchExercises();

      if(error !== null){
        console.log(error);
      }else{
        setExercises(data)
      }
    }
    asyncWrapper()
  }, []);

  return (
    <>
      <h1>Available exercises!</h1>

      {exercises &&
        exercises.map((exercise) => (
          <Exercise key={exercise.id} exerciseData={exercise} />
        ))}
    </>
  );
};

export default Exercises;
