import styles from "./ContributorWorkout.module.css";

const ContributorWorkout = ({ workoutData }) => {
  const { name, type, set } = workoutData;

  const placeholderSets = [set, set, set, set, set, set, set, set, set, set, set,];
//   const placeholderSets = [];


  const renderSets = () => {
    return placeholderSets.map((set, index) => {
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
            <ul>{set && renderSets()}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributorWorkout;
