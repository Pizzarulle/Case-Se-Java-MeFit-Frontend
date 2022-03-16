import React from "react";
import { useForm } from "react-hook-form";
import styles from "./EditExercise.module.css";
import { useNavigate } from "react-router-dom";

const EditExercise = ({titleText, exercise }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: exercise && exercise.name,
      description: exercise && exercise.description,
      targetMuscleGroup: exercise && exercise.targetMuscleGroup,
      image: exercise && exercise.image,
      videoLink: exercise && exercise.videoLink,
    },
  });
  const navigate = useNavigate();

  //Add functionality for updating
  const onSubmit = (data) => {
    console.log(data);
  };
  const onDiscard = () => {
    navigate(-1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editExerciseContainer}
    >
      <h1>{titleText}</h1>
      <div className={styles.group}>
        <label>Name</label>
        <input type="text" placeholder="Push ups" {...register("name")} />

        <label>Targeted Muscle Group</label>
        <textarea
          placeholder="The abdominal musclee..."
          {...register("targetMuscleGroup")}
        />
        <label>Descripion</label>
        <textarea
          placeholder="Arthritis, High blood pressure"
          {...register("description")}
        />

        <label>Image url</label>
        <input type="url" placeholder="http://..." {...register("image")} />
        <label>Video Link</label>
        <input type="url" placeholder="http://..." {...register("videoLink")} />
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
