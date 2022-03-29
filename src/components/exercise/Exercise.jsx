import { useState } from "react";
import styles from "./Exercise.module.css";

/**
 * Component to render an Exercise when user clickes a Exercise it will expand and show mere info
 * @param {*} param0 contains all the info about the Exercise to show
 * @returns 
 */
const Exercise = ({ exerciseData }) => {
  const { name, description, targetMuscleGroup, image, videoLink } = exerciseData
  const target_muscles = targetMuscleGroup && targetMuscleGroup.replaceAll(",", ", ");

  const [isCollapsed, setCollapsed] = useState(true);

  /**
   * Toggle expand / collapse
   */
  const onHandleClick = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.exerciseContainer} onClick={onHandleClick}>
      <div className={styles.row}>
        <img src={image} alt={name} />
        <div>
          <h2>{name}</h2>
          <h4>{target_muscles}</h4>
             <h4>
          {(videoLink ) && 
             <a href={videoLink} target="_blank" rel="noreferrer">Video link</a>
            }</h4>
        </div>
      </div>
      <div className={styles.dividerBorder}></div>
      {!isCollapsed && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default Exercise;
