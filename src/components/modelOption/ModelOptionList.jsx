import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExercise, fetchExercises } from "../../api/exercise";
import { fetchWorkouts } from "../../api/workouts";
import { ModelTypes } from "../../constants/enums";
import Exercise from "../exercise/Exercise";
import Loader from "../loader/Loader";
import ModelOptionListItem from "./modelOptionListItem/ModelOptionListItem";
import ContributorWorkout from "../workout/contributorWorkout/ContributorWorkout";

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
          !errorExercise ? setItems(dataExercise) : console.log(errorExercise);
          break;

        case ModelTypes.WORKOUT:
          const [errorWorkouts, dataWorkouts] = await fetchWorkouts();
          !errorWorkouts ? setItems(dataWorkouts) : console.log(errorWorkouts);
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
        responseData && setItems(items.filter((item) => item.id !== itemId));

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
        
        {/*Replace h1 with new component */}
        {modelType === ModelTypes.PROGRAM && <h1>Manage programs</h1>}

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
