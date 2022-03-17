import { useEffect, useState } from "react";
import { fetchExercises, deleteExercise } from "../../../api/exercise";
import { useNavigate } from "react-router-dom";
import ManageExerciseListItem from "./manageExerciseListItem/ManageExerciseListItem";

const ManageExercisesList = ({ setSelectedItem }) => {
  const [exercises, setExercises] = useState(null);
  const navigate = useNavigate();

  /**
   * Fetches all available exercises when the pages is first rendered.
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, data] = await fetchExercises();

      if (error !== null) {
        console.log(error);
      } else {
        setExercises(data);
      }
    };
    asyncWrapper();
  }, []);

  /**
   * Sets selectedItem to the clicked exercise and navigates to "contributor/exercise/edit".
   * @param {*} exercise
   */
  const onClickEdit = (exercise) => {
    setSelectedItem(exercise);
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
  const onClickDelete = async (exerciseId) => {
    const [error, responseData] = await deleteExercise(exerciseId);
    
    if (responseData) {
      setExercises(exercises.filter((exercise) => exercise.id !== exerciseId));
    }
  };

  const renderExercises = () =>
    exercises.map((exercise) => (
      <ManageExerciseListItem
        key={exercise.id}
        exercise={exercise}
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
      />
    ));

  return (
    <div>
      <h1>Manage Exercises</h1>
      {!exercises ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <button onClick={onClickCreate}>+</button>
          <div>{renderExercises()}</div>
        </>
      )}
    </div>
  );
};

export default ManageExercisesList;
