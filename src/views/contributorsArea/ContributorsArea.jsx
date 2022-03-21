import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import styles from "./ContributorsArea.module.css";
import EditExercise from "../../components/exercise/editExercise/EditExercise";
import ModelOptionList from "../../components/modelOption/ModelOptionList";
import { ModelTypes } from "../../constants/enums";
import EditWorkout from "../../components/workout/editWorkout/EditWorkout";

/**
 * Component for displaying different componenets through routers and navlinks. Every path that begins with "/contributor/*" will be shown in this component
 */
const ContributorsArea = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    // Displays three navlinks as a menu
    <div className={styles.contributorsAreaContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"exercise"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Exercises
          </NavLink>
        </div>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"workout"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Workouts
          </NavLink>
        </div>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"program"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Programs
          </NavLink>
        </div>
      </div>

      {/* Components for each navlink in the menu will be displyed here */}
      <div className={styles.manageContainer}>
        <Routes>
          <Route
            path="/"
            element={<h1>Manage exercises, workouts and programs!</h1>}
          />

          <Route    
            path="/exercise"
            element={<ModelOptionList modelType={ModelTypes.EXERCISE} setSelectedItem={setSelectedItem} />}
          />
          <Route    
            path="/workout"
            element={<ModelOptionList modelType={ModelTypes.WORKOUT} setSelectedItem={setSelectedItem} />}
          />
          <Route    
            path="/program"
            element={<ModelOptionList modelType={ModelTypes.PROGRAM} setSelectedItem={setSelectedItem} />}
          />
            

          <Route
            path="/exercise/edit"
            element={<EditExercise titleText={`${selectedItem ? "Edit" : "Create"} Exercise`} exercise={selectedItem}/>}
          />
           <Route
            path="/workout/edit"
            element={<EditWorkout titleText={`${selectedItem ? "Edit" : "Create"} Workout`} workout={selectedItem}/>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default ContributorsArea;
