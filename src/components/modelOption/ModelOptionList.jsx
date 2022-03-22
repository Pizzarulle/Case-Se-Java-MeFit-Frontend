import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModelTypes } from "../../constants/enums";
import Exercise from "../exercise/Exercise";
import Loader from "../loader/Loader";
import ModelOptionListItem from "./modelOptionListItem/ModelOptionListItem";
import ContributorWorkout from "../workout/contributorWorkout/ContributorWorkout";
import Program from "../program/Program";
import { apiDelete, apiFetch } from "../../api/api";

const ModelOptionList = ({ modelType, setSelectedItem }) => {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all available exercises, workouts or programs  when the page is first rendered.
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      const [errorExercise, dataExercise] = await apiFetch(modelType);
      !errorExercise ? setItems(dataExercise.payload) : console.log(errorExercise);
    };
    asyncWrapper();
  }, [modelType]);

  /**
   * Sets selectedItem to the clicked item and navigates to "contributor/{@link ModelTypes}/edit".
   * @param {*} item
   */
  const onClickEdit = (item) => {
    setSelectedItem(item);
    navigate("edit");
  };

  /**
   * Sets selectedItem to null and navigates to "contributor/{@link ModelTypes}/edit". The null value indicates that a new item is supposed to be created.
   */
  const onClickCreate = () => {
    setSelectedItem(null);
    navigate("edit");
  };

  /**
   * Makes a DELETE request. If the response is true, the item is also removed from the state.
   * @param {*} exerciseId
   */
  const onClickDelete = async (itemId) => {
    const [error] = await apiDelete(modelType, itemId)
    error && setItems(items.filter((item) => item.id !== itemId));
  };

  const renderItems = () => {
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
      <h1>Manage {modelType}s </h1>

      {!items ? (
        <Loader />
      ) : (
        <>
          <button onClick={onClickCreate}>+</button>
          <div>{renderItems()}</div>
        </>
      )}
    </div>
  );
};

export default ModelOptionList;
