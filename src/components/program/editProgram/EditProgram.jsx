import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchWorkouts } from "../../../api/workouts";
import ProgramWorkoutCard from "../programWorkoutCard/ProgramWorkoutCard";
import styles from "./EditProgram.module.css";

//REMOVE when backend is ready
const workoutDummyData = [
  {
    id: 1,
    name: "Abdominal",
    type: "Agility",
    complete: false,
    sets: [
      {
        id: 1,
        exerciseRepetition: 4,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Bodybuilding",
    type: "Strength",
    complete: true,
    sets: [
      {
        id: 1,
        exerciseRepetition: 4,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 2,
        exerciseRepetition: 4,
        exercise: {
          id: 2,
          name: "Push-Up",
          description:
            "The abdominal muscles used to hold the body rigid during the push-up are the rectus abdominis and the internal and external obliques.",
          targetMuscleGroup: "Chest,Shoulders,Core,Back,Legs,Arms",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic2.therichestimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F02%2FPush-Up.jpg&f=1&nofb=1",
          videoLink: "https://www.youtube.com/watch?v=eFOSh8vpd6I",
        },
      },
      {
        id: 3,
        exerciseRepetition: 4,
        exercise: {
          id: 3,
          name: "Dumbbell Side Bend",
          description:
            "Hold a dumbbell with one hand along the side of your body.",
          targetMuscleGroup: "Core",
          image:
            "https://dumbbell-exercises.com/wp-content/uploads/2016/12/3.gif",
          videoLink: "https://www.youtube.com/watch?v=GXM-iYXhQfY",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Legs",
    type: "Strength",
    complete: false,
    sets: [
      {
        id: 1,
        exerciseRepetition: 4,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 10,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 30,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 10,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 30,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 10,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
      {
        id: 1,
        exerciseRepetition: 30,
        exercise: {
          id: 1,
          name: "Squats",
          description:
            "Squats are a functional exercise that benefit your joint and muscle health, as well as your posture",
          targetMuscleGroup:
            "Glutes,Hamstrings,Quadriceps,Adductors,Calves,Core",
          image:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rw-april-jess-squat-1589233072.jpg?crop=0.667xw:1.00xh;0.148xw,0&resize=980:*",
          videoLink: "https://youtu.be/aclHkVaku9U",
        },
      },
    ],
  },
];

const EditProgram = ({ titleText, program }) => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState(null);
  const {register, handleSubmit, control, formState: { errors }} = useForm({
    defaultValues: {
      name: program && program.name,
      category: program && program.category,
      workouts: program ? program.workouts : [],
    },
  });

  const { fields, append, remove } = useFieldArray({control, name: "workouts"});

  useEffect(() => {
    const asyncWrapper = async () => {
      const [errorExercise, dataExercise] = await fetchWorkouts();
      //REPLACE with real api data
      !errorExercise
        ? setWorkouts(workoutDummyData)
        : console.log(errorExercise);
    };
    asyncWrapper();
  }, []);

  //IMPLEMENT when backend is ready
  const onSubmit = (data) => {
    console.log(data);
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
