import { NavLink, Route, Routes } from "react-router-dom";
import Dashboard from "../../components/dashboard/Dashboard";
import withAuth from "../../components/security/withAuth";
import Exercises from "../Exercises";
import Programs from "../Programs";
import Workouts from "../Workouts";
import styles from "./DashboardArea.module.css";

const DasboardArea = () => {
  return (
    // Displays four navlinks as a menu
    <div className={styles.contributorsAreaContainer}>
      <div className={styles.menuContainer}>
        <h2>Dashboard:</h2>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={""}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Dashoard
          </NavLink>
        </div>
        <h2>Show available:</h2>
        <div className={styles.menuItemContainer}>
          <NavLink
            to={"exercise"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Exercises
          </NavLink>
          <NavLink
            to={"workout"}
            className={({ isActive }) =>
              isActive ? styles.active : styles.inactive
            }
          >
            Workouts
          </NavLink>
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercise" element={<Exercises />} />
          <Route path="/workout" element={<Workouts />} />
          <Route path="/program" element={<Programs />} />
        </Routes>
      </div>
    </div>
  );
};

export default DasboardArea;
