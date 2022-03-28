import { useFieldArray, useForm } from "react-hook-form";
import styles from "./EditWorkout.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { apiCreate, apiFetch, apiPatch } from "../../../api/api";
import { ModelTypes } from "../../../constants/enums";
import { KeyCloakContext } from "../../../context/KeyCloakContext";

/**
 * Reformat the form data so its accapatable for the api ednpoint
 * @param {*} data 
 * @returns 
 */
const formatSubmitData = (data) => {
  data = { ...data, complete: false };

  const sets = data.sets.map((set) => {
    return {
      id: set.id ? set.id : 0,
      exerciseRepetition: set.exerciseRepetition,
      exercise: {
        id: set.exerciseId,
      },
    };
  });
  data = { ...data, sets };
  return data;
};

const EditWorkout = ({ titleText, workout }) => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState(null);
  const [keyCloack] = useContext(KeyCloakContext)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: workout && workout.name,
      type: workout && workout.type,
      sets:
        workout && workout.sets
          ? workout.sets.map((set) => {
              return {
                id: set.id,
                exerciseRepetition: set.exerciseRepetition,
                exerciseId: set.exercise.id,
                exerciseName: set.exercise.name,
              };
            })
          : [],
    },
  });

  //Used to dynamically add and remove exercises
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  //Fetches available exercieses
  useEffect(() => {
    const asyncWrapper = async () => {
      const [errorExercise, dataExercise] = await apiFetch(ModelTypes.EXERCISE,keyCloack );
      !errorExercise
        ? setExercises(dataExercise.payload)
        : console.log(errorExercise);
    };
    asyncWrapper();
  }, [keyCloack]);

  const onSubmit = async (data) => {
    data = formatSubmitData(data);
      const [error] = !workout
      ? await apiCreate(keyCloack, ModelTypes.WORKOUT, {...data, id:0})
      : await apiPatch(keyCloack, ModelTypes.WORKOUT, workout.id, data)

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
          placeholder="Bodybuilding"
          {...register("name", { required: true, minLength: 2 })}
        />
        <label>
          Type
          {errors.type?.type === "required" && (
            <span className={styles.validation}>Field is required</span>
          )}
          {errors.type?.type === "minLength" && (
            <span className={styles.validation}>Minimum length is 2</span>
          )}
        </label>
        <input
          type="text"
          placeholder="Strength"
          {...register("type", { required: true, minLength: 2 })}
        />
      </div>

      {/* Displays the current workout exercieses */}
      <h1>Selected Exercises</h1>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className={styles.selectedExercise}>
            <div>
              <label>{item.exerciseName}</label>
              <input
                style={{ display: "none" }}
                {...register(`sets.${index}.exerciseId`)}
              />
              <input
                type={"number"}
                {...register(`sets.${index}.exerciseRepetition`, {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="Repetitions"
              />
            </div>
            <button
              className={styles.fieldArrayBtn}
              type="button"
              onClick={() => remove(index)}
            >
              Delete
            </button>
          </div>
        );
      })}

      {/* Displays every available exercise */}
      <h1>Add Exercises</h1>
      <div className={styles.addExerciseContainer}>
        {exercises &&
          exercises.map((exercise, index) => {
            return (
              <div className={styles.addExercise} key={index}>
                <label>{exercise.name}</label>
                <button
                  className={styles.fieldArrayBtn}
                  type="button"
                  onClick={() =>
                    append({
                      exerciseId: exercise.id,
                      exerciseName: exercise.name,
                      exerciseRepetition: "",
                    })
                  }
                >
                  Add Exercise
                </button>
              </div>
            );
          })}
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

export default EditWorkout;
