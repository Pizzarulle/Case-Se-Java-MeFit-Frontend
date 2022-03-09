import styles from "./Exercise.module.css";

const Exercise = ({ exerciseData }) => {
  const { name, description, target_muscle_group, image, vid_link } = exerciseData

  return (
    <div className={styles.exerciseContainer}>
      <div className={styles.row}>
          <img src={image} alt={name}/>
        <div>
          <h2>{name}</h2>
          <h4>{target_muscle_group}</h4>
          <h4>
            <a href={vid_link}>Video link</a>
          </h4>
        </div>
      <p>{description}</p>
      </div>


      <div className={styles.dividerBorder}></div> 
    </div>
  );
};

export default Exercise;
