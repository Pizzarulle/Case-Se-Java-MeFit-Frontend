import Workout from "../components/workout/Workout";
import { apiFetch } from "../api/api";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

const Workouts = (props) => {
    const [workouts, setWorkouts] = useState(null);


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
                        props.userWorkout ?
                            <Workout key={workout.id} workoutData={workout}
                                removeWorkoutFromProfile={removeWorkoutFromProfile} />
                            :
                            <Workout key={workout.id} workoutData={workout}
                                addWorkoutToProfile={addWorkoutToProfile} />

                    ))}
                </div>
            }
        </>
    );
};

export default Workouts;
