import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExercise, fetchExercises } from "../../api/exercise";
import { fetchWorkouts } from "../../api/workouts";
import { ModelTypes } from "../../constants/enums";
import Exercise from "../exercise/Exercise";
import Loader from "../loader/Loader";
import ModelOptionListItem from "./modelOptionListItem/ModelOptionListItem";
import ContributorWorkout from "../workout/contributorWorkout/ContributorWorkout";
import Program from "../program/Program";

const test = [
  {
    id: 1,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
      {
        id: 1,
        name: "Abdominal",
        type: "Agility",
        complete: false,
        sets:[ {
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
        },]
      },
      {
        id: 2,
        name: "Bodybuilding",
        type: "Strength",
        complete: true,
        sets: [{
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
        },]
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
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
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
    ],
  },
  {
    id: 3,
    name: "Dumbbell",
    category: "Muscle building",
    workouts: [
      {
        id: 2,
        name: "Bodybuilding",
        type: "Strength",
        complete: true,
        sets: [{
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
        },]
      },
      {
        id: 3,
        name: "Legs",
        type: "Strength",
        complete: false,
        sets: [{
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
        },]
      },
    ],
  },
];

const ModelOptionList = ({ modelType, setSelectedItem }) => {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all available exercises or workouts when the page is first rendered.
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      switch (modelType) {
        case ModelTypes.EXERCISE:
          const [errorExercise, dataExercise] = await fetchExercises();
          !errorExercise ? setItems(dataExercise.payload) : console.log(errorExercise);
          break;

        case ModelTypes.WORKOUT:
          const [errorWorkouts, dataWorkouts] = await fetchWorkouts();
          !errorWorkouts ? setItems(dataWorkouts.payload) : console.log(errorWorkouts);
          break;

        case ModelTypes.PROGRAM:
          //implement when backend is ready
          //remove dummy data from the top
          setItems(test);
          break;
        default:
          break;
      }
    };
    asyncWrapper();
  }, [modelType]);

  /**
   * Sets selectedItem to the clicked exercise and navigates to "contributor/exercise/edit".
   * @param {*} item
   */
  const onClickEdit = (item) => {
    setSelectedItem(item);
    navigate("edit");
  };

  /**
   * Sets selectedItem to null and navigates to "contributor/exercise/edit". The null value indicates that a new exercise is supposed to be created.
   */
  const onClickCreate = () => {
    setSelectedItem(null);
    navigate("edit");
  };

  /**
   * Makes a DELETE request. If the response is true, the exericise is also removed from the state.
   * @param {*} exerciseId
   */
  const onClickDelete = async (itemId) => {
    switch (modelType) {
      case ModelTypes.EXERCISE:
        const [error, responseData] = await deleteExercise(itemId);
        error && setItems(items.filter((item) => item.id !== itemId));
        break;
      case ModelTypes.WORKOUT:
        //implement api call when backend is ready
        break;
      case ModelTypes.PROGRAM:
        //implement api call when backend is ready
        break;
      default:
        break;
    }
  };

  const renderExercises = () => {
    return items.map((item) => (
      <ModelOptionListItem
        key={item.id}
        onClickEdit={() => onClickEdit(item)}
        onClickDelete={() => onClickDelete(item.id)}
      >
        {modelType === ModelTypes.EXERCISE && <Exercise exerciseData={item} />}
        {modelType === ModelTypes.WORKOUT && <ContributorWorkout workoutData={item} />}
        {modelType === ModelTypes.PROGRAM && <Program programData={item}  />}
      </ModelOptionListItem>
    ));
  };
  return (
    <div>
      <h1>Manage Exercises</h1>

      {!items ? (
        <Loader />
      ) : (
        <>
          <button onClick={onClickCreate}>+</button>
          <div>{renderExercises()}</div>
        </>
      )}
    </div>
  );
};

export default ModelOptionList;
