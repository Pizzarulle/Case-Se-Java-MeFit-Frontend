import DashboardCalendar from "./calendar/DashboardCalendar";
import styles from "./Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import ProfileService from "../../api/profile";
import { apiFetch } from "../../api/api";
import DashboardWorkouts from "./dashboardLists/DashboardWorkouts";
import DashboardPrograms from "./dashboardLists/DashboardPrograms";
import { ModelTypes } from "../../constants/enums";

const Dashboard = () => {
  const [keycloak, setKeycloak] = useContext(KeyCloakContext);
  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [programs, setPrograms] = useState([]);

  const removeItem = (e, listName, state, setFunction) => {
    let index = profile[listName].findIndex((item) => item.id === e.id);
    let temp = profile;
    temp[listName].splice(index, 1);
    setProfile({ ...temp });
    setFunction([...state, e]);
  };

  const addItem = (e, listName, state, setFunction) => {
    if (!profile[listName].some((item) => item.id === e.id)) {
      let temp = profile;
      temp[listName].push(e);
      setProfile({ ...temp });
      setFunction([...state.filter((item) => item.id !== e.id)]);
    }
  };

  const removeProgram = (e) => {
    removeItem(e, "programs", programs, setPrograms);
    // ProfileService.patchProfileWorkout(keycloak, profile);
  };

  const addProgram = (e) => {
    addItem(e, "programs", programs, setPrograms);
  };

  const removeWorkout = (e) => {
    removeItem(e, "workouts", workouts, setWorkouts);
    // ProfileService.patchProfileWorkout(keycloak, profile);
  };

  const addWorkout = (e) => {
    addItem(e, "workouts", workouts, setWorkouts);
  };

  const getProfile = async () => {
    const profileFetch = await apiFetch("profile");

    const allWokrouts = await asyncWrapper(ModelTypes.WORKOUT);
    const temp = [];
    for (const work of allWokrouts) {
      if (!profileFetch[1].payload[1].workouts.some((w) => w.id === work.id)) {
        temp.push(work);
      }
    }
    setWorkouts([...temp]);

    const allPrograms = await asyncWrapper(ModelTypes.PROGRAM);
    const tempPrograms = [];
    for (const program of allPrograms) {
      if (
        !profileFetch[1].payload[1].programs.some((w) => w.id === program.id)
      ) {
        tempPrograms.push(program);
      }
    }
    setPrograms([...tempPrograms]);

    setProfile(profileFetch[1].payload[1]);
  };

  const asyncWrapper = async (modelType) => {
    const [error, { payload }] = await apiFetch(modelType);
    if (error) {
      console.error(error);
      return;
    }
    return payload;
  };
  const setWorkoutAsync = async () => {
    const temp = await asyncWrapper();
    setWorkouts(temp);
  };

  useEffect(() => {
    // if (keycloak.authenticated)
    getProfile();
    // else
    // setWorkoutAsync()
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dataContainer}>
        {keycloak.authenticated && profile !== null && (
          <>
            <DashboardPrograms
              removeProgram={removeProgram}
              programs={profile.programs}
              userProgram={true}
            />
            <DashboardWorkouts
              removeWorkout={removeWorkout}
              workouts={profile.workouts}
              userWorkout={true}
            />

            <DashboardPrograms
              addProgram={addProgram}
              availableProgram={true}
              programs={programs}
            />
            <DashboardWorkouts
              addWorkout={addWorkout}
              workouts={workouts}
              availableWorkout={true}
            />
          </>
        )}
      </div>
      <div className={styles.calendarContainer}>
        <DashboardCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
