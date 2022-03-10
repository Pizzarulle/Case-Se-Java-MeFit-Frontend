import { useState } from "react";
import Exercise from "../components/exercise/Exercise";

const Exercises = () => {
  //Fetch data and set
  const [exercises, setExercises] = useState(null)
  
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
