import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./EditExercise.module.css";
import { useNavigate } from "react-router-dom";
import { apiCreate, apiPatch } from "../../../api/api";
import { ModelTypes } from "../../../constants/enums";
import { KeyCloakContext } from "../../../context/KeyCloakContext";

const EditExercise = ({ titleText, exercise }) => {
  const navigate = useNavigate();
  const [keyCloack] = useContext(KeyCloakContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: exercise && exercise.name,
      description: exercise && exercise.description,
      targetMuscleGroup: exercise && exercise.targetMuscleGroup,
      image: exercise && exercise.image,
      videoLink: exercise && exercise.videoLink,
    },
  });

  const onSubmit = async (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const [error] = !exercise
      ? await apiCreate(keyCloack, ModelTypes.EXERCISE, data)
      : await apiPatch(keyCloack, ModelTypes.EXERCISE, exercise.id, data);

    if (error === null) {
      navigate(-1);
    }
  };

  const onDiscard = () => navigate(-1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editExerciseContainer}
    >
      <h1>{titleText}</h1>
      <div className={styles.group}>
        <label>
          Name
          {errors.name?.type === "required" && (
            <span className={styles.validation}>Field is required</span>
          )}
          {errors.name?.type === "minLength" && (
            <span className={styles.validation}>Minimum length is 2</span>
          )}
        </label>

        <input
          type="text"
          placeholder="Push ups"
          {...register("name", { required: true, minLength: 2 })}
        />

        <label>
          Targeted Muscle Group
          {errors.targetMuscleGroup?.type === "required" && (
            <span className={styles.validation}>Field is required</span>
          )}
          {errors.targetMuscleGroup?.type === "maxLength" && (
            <span className={styles.validation}>Maximum length is 100</span>
          )}
        </label>

        <textarea
          placeholder="Chest, Triseps"
          {...register("targetMuscleGroup", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
        />

        <label>
          Descripion
          {errors.description?.type === "required" && (
            <span className={styles.validation}>Field is required</span>
          )}
             {errors.description?.type === "maxLength" && (
            <span className={styles.validation}>Maximum length is 500</span>
          )}
        </label>

        <textarea
          placeholder="During the push-up..."
          {...register("description", {
            required: true,
            minLength: 1,
            maxLength: 500,
          })}
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
