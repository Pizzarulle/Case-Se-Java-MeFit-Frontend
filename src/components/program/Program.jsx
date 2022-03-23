import { useState } from "react";
import styles from "./Program.module.css";
import ProgramWorkoutCard from "./programWorkoutCard/ProgramWorkoutCard";

const Program = (props) => {
  const { name, category, workouts } = props.programData;

  const [isCollapsed, setCollapsed] = useState(true);

  const workoutTypes = workouts && workouts.map((workout) => workout.name + ", ");

  const onHandleClick = () => {
    setCollapsed(!isCollapsed);
  };
  return (
    <div className={styles.programContainer} onClick={onHandleClick}>
      <div className={styles.row}>
        <div
          className={
            isCollapsed
              ? styles.collapsedNameAndCategory
              : styles.programNameAndCategory
          }>
          <h2>{name}</h2>
          <h4>{category}</h4>
        </div>

        {isCollapsed ? (
          <div className={styles.collapsedProgramWorkouts}>{workoutTypes}</div>
        ) : (
          workouts && (
            <div className={styles.programWorkouts}>
              {workouts.map((workout, index) => (
                <ProgramWorkoutCard
                  size={"small"}
                  key={`${workout.id} : ${index}`}
                  workoutSummaryData={workout}
                />
              ))}
            </div>
          )
        )}

        {props.removeProgramFromProfile !== undefined &&
          <button onClick={() => props.removeProgramFromProfile(props.programData)} >Remove</button>
        }{
          props.addProgramToProfile !== undefined &&
          <button onClick={() => props.addProgramToProfile(props.programData)} >Add</button>
        }

      </div>
      <div className={styles.dividerBorder}></div>
    </div>
  );
};

export default Program;
