import { apiFetch } from "../api/api";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";
import withAuth from "../components/security/withAuth";

const Workouts = () => {
  const [workouts, setWorkouts] = useState(null);
  const [keyCloak] = useContext(KeyCloakContext);

  useEffect(() => {

    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(
        ModelTypes.WORKOUT,
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
        <>
          <h1>Available workouts</h1>
          {workouts.map((workout) => (
            <ContributorWorkout key={workout.id} workoutData={workout} />
          ))}
        </>
      )}
    </>
  );
};

export default withAuth(Workouts);
