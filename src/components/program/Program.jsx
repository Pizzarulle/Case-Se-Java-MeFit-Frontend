import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import styles from "./Program.module.css";
import ProgramWorkoutCard from "./programWorkoutCard/ProgramWorkoutCard";

const Program = ({ programData }) => {
  const { id, name, category, workouts } = programData;

  const [isCollapsed, setCollapsed] = useState(true);

  const workoutTypes = workouts.map((workout) => workout.name + ", ");

  const onHandleClick = () => {
    setCollapsed(!isCollapsed);
  };
  
  return (
    <div className={styles.programContainer} onClick={onHandleClick}>
      <div className={styles.row}>

        <div className={isCollapsed ? styles.collapsedNameAndCategory: styles.programNameAndCategory}>
          <h2>{name}</h2>
          <h4>{category}</h4>
        </div>

        {isCollapsed ? <div className={styles.collapsedProgramWorkouts}>{workoutTypes}</div>
         : (workouts && (
            <div className={styles.programWorkouts}>
              {workouts.map((workout) => (
                <ProgramWorkoutCard
                  key={workout.id}
                  workoutSummaryData={workout}
                />
              ))}
            </div>
          )
        )}

      </div>
      <div className={styles.dividerBorder}></div>
    </div>
  );
};

export default Program;
