import { apiFetch } from "../api/api";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

const Workouts = () => {
  const [workouts, setWorkouts] = useState(null);
  const [keyCloak] = useContext(KeyCloakContext);

  useEffect(() => {
    console.log("Workouts");

    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(
        ModelTypes.EXERCISE,
        keyCloak
      );

      if (error) {
        console.error(error);
        return;
      }

      setWorkouts(payload);
    };
    asyncWrapper();
  }, [keyCloak]);

  return (
    <>
      {!workouts ? (
        <Loader />
      ) : (
        <div>
          <h3>Available workouts</h3>
          {workouts.map((workout) => (
            <ContributorWorkout key={workout.id} workoutData={workout} />
          ))}
        </div>
      )}
    </>
  );
};

export default Workouts;
