import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditExercise.module.css";

const EditExercise = () => {
  const { register, handleSubmit } = useForm();

  //Add functionality for updating
  const onSubmit = (data) => {
    console.log(data);
  };
  //Add functionality for discarding and returning to previous screen
  const onDiscard = () => {
    console.log("return to previous screen");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editExerciseContainer}
    >
      <h1>Edit Exercise</h1>
      <div className={styles.group}>
        <label>Name</label>
        <input type="text" placeholder="Push ups" {...register("name")} />

        <label>Targeted Muscle Group</label>
        <textarea
          placeholder="The abdominal musclee..."
          {...register("targetMuscleGroup", {})}
        />
        <label>Descripion</label>
        <textarea
          placeholder="Arthritis, High blood pressure"
          {...register("description", {})}
        />

        <label>Image url</label>
        <input type="url" placeholder="http://..." {...register("image", {})} />
        <label>Video Link</label>
        <input
          type="url"
          placeholder="http://..."
          {...register("videoLink", {})}
        />
      </div>

      <div className={styles.btnContainer}>
        <input type="submit" value="Save" />
        <button type="button" onClick={onDiscard}>
          Discard
        </button>
      </div>
    </form>
  );
};
export default EditExercise;
