import { deleteExercise } from "../../../../api/exercise";
import Exercise from "../../Exercise";
import styles from "./ManageExerciseListItem.module.css";

const ManageExerciseListItem = ({ exercise, onClickEdit, onClickDelete }) => {
  return (
    <div className={styles.manageExercisesListItem}>
      <Exercise exerciseData={exercise} />
      <div className={styles.btnContainer}>
        <button
          className={styles.editBtn}
          onClick={() => onClickEdit(exercise)}
        >
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={() => onClickDelete(exercise.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManageExerciseListItem;
