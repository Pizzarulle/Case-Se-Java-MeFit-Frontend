import Workout from "../components/workout/Workout";
import { apiFetch } from "../api/api";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { KeyCloakContext } from "../context/KeyCloakContext";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";

const Workouts = (props) => {
    const [workouts, setWorkouts] = useState(null);
    const [keycloak, setKeycloak] = useContext(KeyCloakContext)

    const addWorkoutToProfile = () => {

    }

    const removeWorkoutFromProfile = () => {

    }

    useEffect(() => {
        const asyncWrapper = async () => {
            const [error, { payload }] = await apiFetch("workout");

            if (error) {
                console.error(error);
                return;
            }

            setWorkouts(payload)
        }

        asyncWrapper();
    }, []);

    return (
        <>
            {!workouts ? <Loader /> :
                <div>
                    {props.userWorkout ?
                        <h3>Your workouts</h3>
                        :
                        <h3>Available workouts</h3>
                    }
                    {workouts.map(workout => (
                        // keycloak.authenticated ?
                        //     props.userWorkout ?
                        //         <Workout key={workout.id} workoutData={workout}
                        //             removeWorkoutFromProfile={removeWorkoutFromProfile} />
                        //         :
                        //         <Workout key={workout.id} workoutData={workout}
                        //             addWorkoutToProfile={addWorkoutToProfile} />
                        //     :
                        //     <Workout key={workout.id} workoutData={workout}
                        //     />
                        <ContributorWorkout key={workout.id} workoutData={workout} />

                    ))}
                </div>
            }
        </>
    );
};

export default Workouts;
