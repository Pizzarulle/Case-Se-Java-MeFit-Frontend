import { NavLink, Route, Routes } from "react-router-dom";
import styles from "./ContributorsArea.module.css";
/**
 * Component for displaying different componenets through routers and navlinks. Every path that begins with "/contributor/*" will be shown in this component
 */
const ContributorsArea = () => {
  return (
    <div className={styles.contributorsAreaContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"edit/exercise"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Exercises
          </NavLink>
        </div>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"edit/workout"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Workouts
          </NavLink>
        </div>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"edit/program"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Programs
          </NavLink>
        </div>
      </div>

      {/* Replace the h1-elements with the correct components for creating, editing and deleting exercises/workouts/programs */}
      <div className={styles.manageContainer}>
        <Routes>
          <Route path="/" element={<h1>Manage exercises, workouts and programs!</h1>} />
          <Route path="/edit/exercise" element={<h1>Manage exercises</h1>} />
          <Route path="/edit/workout" element={<h1>Manage workouts</h1>} />
          <Route path="/edit/program" element={<h1>Manage programs</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default ContributorsArea;
