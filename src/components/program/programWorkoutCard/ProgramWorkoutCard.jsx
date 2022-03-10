import styles from "./ProgramWorkoutCard.module.css";

const ProgramWorkoutCard = ({ workoutSummaryData }) => {
  const { id, name, type } = workoutSummaryData;

  return (
    <div className={styles.workoutTypeSummaryContainer}>
      <p>
        {name}
        <br />
        {type}
      </p>
      {/* replace wiht a map to render the name and maybe link to the exercises */}
      <ul>
        <li>Extercise 1</li>
        <li>Extercise 2</li>
      </ul>
    </div>
  );
};

export default ProgramWorkoutCard;
