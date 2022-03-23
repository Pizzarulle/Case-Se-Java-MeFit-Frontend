import styles from "./ContributorWorkout.module.css";

const ContributorWorkout = ({ workoutData }) => {
  const { name, type, sets } = workoutData;

  const renderSets = () => {
    return sets.map((set, index) => {
      return (
        <li key={index + ":" + set.id}>
          {set.exercise[0].name}, Reps: {set.exerciseRepetition}
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
