import Workout from "../../workout/Workout";

/**
 * Component to rendr the workouts lists when user is autenticated and profile fetched
 * @param {*} props contains the list of workouts and callback function to add or remove
 * @returns 
 */
const DashboardWorkouts = (props) => {
  return (
    <>
      {props.workouts !== undefined && (
        <>
          {props.userWorkout ? <h3>Your Workouts!</h3> : <h3>Available Workouts!</h3>}
          {props.workouts.map((workout) => (
            <div key={workout.id}>
              {props.userWorkout && (
                <Workout
                  key={workout.id}
                  workoutData={workout}
                  removeWorkoutFromProfile={() => props.removeWorkout(workout)}
                />
              )}
              {props.availableWorkout && (
                <Workout
                  key={workout.id}
                  workoutData={workout}
                  addWorkoutToProfile={() => props.addWorkout(workout)}
                />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default DashboardWorkouts;
