import Workout from "../components/workout/Workout";
import { apiFetch } from "../api/api";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";

const Workouts = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            const [error, data] = await apiFetch("workout");

            if (error) {
                console.error(error);
                return;
            }

            setWorkouts(data)
        }

        asyncWrapper();
    }, []);

    return (
        <>
            {!workouts ? <Loader /> :
                <div>
                    <h3>Available workouts</h3>
                    {workouts.map(workout => (
                        <Workout key={workout.id} workoutData={workout} />
                    ))}
                </div>
            }
        </>
    );
};

export default Workouts;
