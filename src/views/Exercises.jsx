import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Exercise from "../components/exercise/Exercise";
import Loader from "../components/loader/Loader";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

const Exercises = () => {
  const [exercises, setExercises] = useState(null);
  const [keyCloak] = useContext(KeyCloakContext);

  useEffect(() => {
    console.log("Exercise");
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(
        ModelTypes.EXERCISE,
        keyCloak
      );

      if (error !== null) {
        console.log(error);
      } else {
        setExercises(payload);
      }
    };
    asyncWrapper();
  }, [keyCloak]);

  return (
    <>
      {!exercises ? (
        <Loader />
      ) : (
        <>
          <h1>Available exercises!</h1>
         { exercises.map((exercise) => (
          <Exercise key={exercise.id} exerciseData={exercise} />
          ))}
        </>
      )}
    </>
  );
};

export default Exercises;
