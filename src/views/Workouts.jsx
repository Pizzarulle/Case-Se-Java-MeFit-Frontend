import Workout from "../components/workout/Workout";
import { apiFetch } from "../api/api";
import { useEffect, useState } from "react";

const Workouts = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            const [error, data] = await apiFetch("workout");

            if(error) {
                console.error(error);
                return;
            }

            setWorkouts(data)
        }

        asyncWrapper();
    }, []);

    return (
        <div>
            <h1>Available workouts</h1>
            { !workouts
                ? <h2>Loading...</h2>
                : workouts.map(workout => (
                    <Workout key={ workout.id } workoutData={ workout }/>
                ))
            }
        </div>
    );
};

export default Workouts;
