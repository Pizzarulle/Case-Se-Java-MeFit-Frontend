import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteExercise, fetchExercises } from "../../api/exercise";
import { ModelTypes } from "../../constants/enums";
import Exercise from "../exercise/Exercise";
import Loader from "../loader/Loader";
import ModelOptionListItem from "./modelOptionListItem/ModelOptionListItem";

const ModelOptionList = ({ modelType, setSelectedItem }) => {
  const [items, setItems] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all available exercises when the pages is first rendered.
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      switch (modelType) {
        case ModelTypes.EXERCISE:

          const [error, data] = await fetchExercises();
          !error ? setItems(data) : console.log(error);

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

  const renderExercises = () =>
    items.map((item) => (
      <ModelOptionListItem
        key={item.id}
        onClickEdit={() => onClickEdit(item)}
        onClickDelete={() => onClickDelete(item.id)}
      >
        {modelType === ModelTypes.EXERCISE && <Exercise exerciseData={item} />}
        {modelType === ModelTypes.WORKOUT && <h1>Manage workouts</h1>}
        {modelType === ModelTypes.PROGRAM && <h1>Manage programs</h1>}



        {/* två till en för workout och en för program */}
      </ModelOptionListItem>
    ));

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
