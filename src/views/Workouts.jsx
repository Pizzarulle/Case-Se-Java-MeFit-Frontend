import { apiFetch } from "../api/api";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import ContributorWorkout from "../components/workout/contributorWorkout/ContributorWorkout";

const Workouts = () => {
    const [workouts, setWorkouts] = useState(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            const [error, {payload}] = await apiFetch("workout");

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
                    <h3>Available workouts</h3>
                    {workouts.map(workout => (
                        <ContributorWorkout key={workout.id} workoutData={workout} />
                    ))}
                </div>
            }
        </>
    );
};

export default Workouts;