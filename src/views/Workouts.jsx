import { apiFetch } from "../api/api";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";
import withAuth from "../components/security/withAuth";

/**
 * Component that will render all the Available workouts in the database.
 * @returns 
 */
const Workouts = () => {
  const [workouts, setWorkouts] = useState(null);
  const [keyCloak] = useContext(KeyCloakContext);

  /**
   * Method that will run when component first mounts and when keycloak updates
   * Fill fetch all the Available workouts
   */
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
