import { useEffect, useState } from "react";
import { fetchExercises } from "../../../api/exercise";
import { useNavigate } from "react-router-dom";
import ManageExerciseListItem from "./manageExerciseListItem/ManageExerciseListItem";

const ManageExercisesList = ({ setSelectedItem }) => {
  const [exercises, setExercises] = useState(null);
  const navigate = useNavigate();

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

  const onClickEdit = (exercise) => {
    setSelectedItem(exercise);
    navigate("edit");
  };
  const onClickCreate = () =>{
    setSelectedItem(null);
    navigate("edit");
  }

  const renderExercises = () =>
    exercises.map((exercise) => (
      <ManageExerciseListItem
        key={exercise.id}
        exercise={exercise}
        onClickEdit={onClickEdit}
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
