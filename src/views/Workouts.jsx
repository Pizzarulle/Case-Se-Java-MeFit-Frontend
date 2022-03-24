import Workout from "../components/workout/Workout";
import { apiFetch } from "../api/api";
import { useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { KeyCloakContext } from "../context/KeyCloakContext";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";

const Workouts = (props) => {
    const [workouts, setWorkouts] = useState(props.workouts);
    const [keycloak, setKeycloak] = useContext(KeyCloakContext)


    const asyncWrapper = async () => {
        const [error, { payload }] = await apiFetch("workout");
        if (error) {
            console.error(error);
            return;
        }
        setWorkouts(payload)
    }


    useEffect(() => {
        // if (props.workouts === undefined) {
        //     console.log("getting");
        //     asyncWrapper();
        // }

    }, []);

    return (
        <>
            {workouts === undefined /* || workouts.length === 0 */ ? <Loader /> :
                <div>
                    {props.userWorkout ?
                        <h3>Your workouts</h3>
                        :
                        <h3>Available workouts</h3>
                    }

                    {workouts.map(workout => (<div key={workout.id}>
                        {
                            props.userWorkout && <Workout key={workout.id} workoutData={workout} removeWorkoutFromProfile={() => props.removeWorkout(workout)} />}
                        {
                            props.availableWorkout && <Workout key={workout.id} workoutData={workout} addWorkoutToProfile={() => props.addWorkout(workout)} />
                        }
                        {
                            props.workouts === undefined && <ContributorWorkout key={workout.id} workoutData={workout} />
                        }
                    </div>
                        // <ContributorWorkout key={workout.id} workoutData={workout} />
                    ))}

                    {/* {workouts.map(workout => { <Workout key={workout.id} workoutData={workout} />
                    })} */}

                </div>
            }
        </>
    );
};

export default Workouts;
