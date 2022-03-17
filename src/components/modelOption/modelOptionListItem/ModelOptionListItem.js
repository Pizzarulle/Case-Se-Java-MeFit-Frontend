import styles from "./ModelOptionListItem.module.css";

const ModelOptionListItem = ({ children, onClickEdit, onClickDelete }) => {
  return (
    <div className={styles.manageExercisesListItem}>
      {children}
      <div className={styles.btnContainer}>
        <button className={styles.editBtn} onClick={onClickEdit}>
          Edit
        </button>
        <button className={styles.deleteBtn} onClick={onClickDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModelOptionListItem;
