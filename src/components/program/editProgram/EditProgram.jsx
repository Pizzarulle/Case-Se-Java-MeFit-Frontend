import { useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { apiCreate, apiFetch, apiPatch } from "../../../api/api";
import { ModelTypes } from "../../../constants/enums";
import { KeyCloakContext } from "../../../context/KeyCloakContext";
import ProgramWorkoutCard from "../programWorkoutCard/ProgramWorkoutCard";
import styles from "./EditProgram.module.css";

const EditProgram = ({ titleText, program }) => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const [keyCloack] = useContext(KeyCloakContext)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: program && program.name,
      category: program && program.category,
      workouts: program ? program.workouts : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  useEffect(() => {
    const asyncWrapper = async () => {
      const [errorWorkouts, dataWorkouts] = await apiFetch(ModelTypes.WORKOUT);
      !errorWorkouts
        ? setWorkouts(dataWorkouts.payload)
        : console.log(errorWorkouts);
    };
    asyncWrapper();
  }, []);

  const onSubmit = async (data) => {
    const [error] = !program
      ? await apiCreate(keyCloack,ModelTypes.PROGRAM, { ...data, id: 0 })
      : await apiPatch(keyCloack, ModelTypes.PROGRAM, program.id, data);

    if (error === null) {
      navigate(-1);
    }
  };
  const onDiscard = () => navigate(-1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.editProgramContainer}
    >
      <h1>{titleText}</h1>

      <div className={styles.group}>
        <label>Name</label>
        {errors.name?.type === "required" && (
          <span className={styles.validation}>Field is required</span>
        )}
        <input
          type={"text"}
          placeholder={"Program Name"}
          {...register("name", { required: true })}
        />

        <label>Category</label>
        {errors.category?.type === "required" && (
          <span className={styles.validation}>Field is required</span>
        )}

        <input
          type={"text"}
          placeholder={"Program Category"}
          {...register("category", { required: true })}
        />
      </div>

      <div>
        <h1>Selected workouts</h1>
        {fields.length === 0 ? (
          <h3>No workouts selected</h3>
        ) : (
          fields.map((item, index) => {
            return (
              <div className={styles.workoutsContainer} key={index}>
                <ProgramWorkoutCard workoutSummaryData={item} />
                <button
                  className={styles.fieldArrayBtn}
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>

      <div>
        <h1>Available workouts</h1>
        {workouts &&
          workouts.map((workout, index) => {
            return (
              <div className={styles.workoutsContainer} key={index}>
                <ProgramWorkoutCard workoutSummaryData={workout} />
                <button
                  className={`${styles.fieldArrayBtn} ${styles.greenBtn}`}
                  type="button"
                  onClick={() =>
                    append({
                      id: workout.id,
                      name: workout.name,
                      type: workout.type,
                      sets: workout.sets,
                    })
                  }
                >
                  Add
                </button>
              </div>
            );
          })}
      </div>

      <hr />
      <div className={styles.btnContainer}>
        <input type="submit" value="Save" />
        <button
          type="button"
          onClick={onDiscard}
          className={styles.fieldArrayBtn}
        >
          Discard
        </button>
      </div>
    </form>
  );
};

export default EditProgram;
