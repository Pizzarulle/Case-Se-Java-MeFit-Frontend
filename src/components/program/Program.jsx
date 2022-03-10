import styles from "./Program.module.css";
import ProgramWorkoutCard from "./programWorkoutCard/ProgramWorkoutCard";

const Program = ({programData}) => {
  const {id, name, category, workouts} = programData

  return (
    <div className={styles.programContainer}>
      <div className={styles.row}>
        <div className={styles.programNameAndCategory}>
          <h2>{name}</h2>
          <h4>{category}</h4>
        </div>
        <div className={styles.programWorkouts}>
          {workouts && workouts.map(workout => <ProgramWorkoutCard key={workout.id} workoutSummaryData={workout}/>)}          
        </div>
      </div>

      <div className={styles.dividerBorder}></div>
    </div>
  );
};

export default Program;
