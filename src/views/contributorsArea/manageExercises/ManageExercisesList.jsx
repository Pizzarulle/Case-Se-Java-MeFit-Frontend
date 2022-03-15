import { useEffect, useState } from "react";
import { fetchExercises } from "../../../api/exercise";
import Exercise from "../../../components/exercise/Exercise";
import styles from "./ManageExercisesList.module.css";

const ManageExercisesList = () => {
  const [exercises, setExercises] = useState(null);

  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, data] = await fetchExercises();

      if (error !== null) {
        console.log(error);
      } else {
        setExercises(data);
      }
    };
    asyncWrapper();
  }, []);

  const renderExercises = () => {
    return exercises.map((exercise) => {
      return (
        <div className={styles.manageExercisesListItem}>
          <Exercise exerciseData={exercise} />
          <div className={styles.btnContainer}>
            <button className={styles.editBtn}>Edit</button>
            <button className={styles.deleteBtn}>Delete</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>Manage Exercises</h1>
      {!exercises ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <h1>+</h1>
          <div>{renderExercises()}</div>
        </>
      )}
    </div>
  );
};

export default ManageExercisesList;
