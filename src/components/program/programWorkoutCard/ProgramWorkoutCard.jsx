import styles from "./ProgramWorkoutCard.module.css";

const ProgramWorkoutCard = ({ workoutSummaryData, size }) => {
  const { name, type, sets } = workoutSummaryData;
  return (
    <div
      className={
        size === "small"
          ? styles.programWorkoutContainerSmall
          : styles.programWorkoutContainer
      }
    >
      <div>
        <span>{name}</span>
        <br />
        {type}
      </div>
      <ul>
        {sets &&
          sets.map((set, index) => (
            <li key={index}>
              {set.exerciseRepetition} {set.exercise[0].name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProgramWorkoutCard;
