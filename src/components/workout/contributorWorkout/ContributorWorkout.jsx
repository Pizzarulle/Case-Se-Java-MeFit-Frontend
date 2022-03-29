import styles from "./ContributorWorkout.module.css";

/**
 * Component to render the page for contributor's to show Workouts 
 * @param {*} param0 
 * @returns 
 */
const ContributorWorkout = ({ workoutData }) => {
  const { name, type, sets } = workoutData;

  const renderSets = () => {
    return sets.map((set, index) => {
      return (
        <li key={index + ":" + set.id}>
          {set.exercise.name}, Reps: {set.exerciseRepetition}
        </li>
      );
    });
  };

  return (
    <div>
      <div className={styles.contributorWorkoutContainer}>
        <div className={styles.row}>
          <div>
            <h2>{name}</h2>
            <h4>{type}</h4>
          </div>
          <div>
            <h2>Exercises</h2>
            <ul>{sets && renderSets()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorWorkout;
