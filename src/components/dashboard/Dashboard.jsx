import DashboardCalendar from "./calendar/DashboardCalendar";
import styles from "./Dashboard.module.css";
import { useContext, useEffect, useState } from "react";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import ProfileService from "../../api/profile";
import { apiFetch } from "../../api/api";
import DashboardWorkouts from "./dashboardLists/DashboardWorkouts";
import DashboardPrograms from "./dashboardLists/DashboardPrograms";
import { ModelTypes } from "../../constants/enums";
import Loader from "../loader/Loader";
import Login from "../../views/Login";

/**
 * @returns Component to render the Dashboard the user will be greeted by when logging in. 
 * Contains programs and workouts list. 
 */
const Dashboard = () => {
  const [keycloak] = useContext(KeyCloakContext);
  const [profile, setProfile] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [programs, setPrograms] = useState([]);

  /**
   * Help function to remove items profile state list
   * @param {*} e event object thats been clicked
   * @param {*} listName witch state list to edit
   * @param {*} state current state
   * @param {*} setFunction witch setState function to use
   */
  const removeItem = (e, listName, state, setFunction, modelType) => {
    let index = profile[listName].findIndex((item) => item.id === e.id);
    let temp = profile;
    temp[listName].splice(index, 1);
    setProfile({ ...temp });
    setFunction([...state, e]);
     ProfileService.removed(keycloak, profile.id, e.id, modelType);
  };
  
  /**
   * Help function to add items to profile state list
   * @param {*} e event object thats been clicked
   * @param {*} listName witch state list to edit
   * @param {*} state current state
   * @param {*} setFunction witch setState function to use
   */
  const  addItem = (e, listName, state, setFunction, modelType) => {
    if (!profile[listName].some((item) => item.id === e.id)) {
      let temp = profile;
      temp[listName].push(e);
      setProfile({ ...temp });
      setFunction([...state.filter((item) => item.id !== e.id)]);

     ProfileService.add(keycloak, profile.id, e, modelType);
    }
  };

  /**
   * Method to remove a program from a users profile 
   * @param {*} e event object with program to remove from profile
   */
  const removeProgram = (e) => {
    removeItem(e, "programs", programs, setPrograms, ModelTypes.PROGRAM);
  };

  /**
   * Method to add a program to a users profile
   * @param {*} e event object with program to add
   */
  const addProgram = (e) => {
    addItem(e, "programs", programs, setPrograms, ModelTypes.PROGRAM);
  };

  /**
 * Method to remove a workout to a users profile
 * @param {*} e event object with workout to remove
 */
  const removeWorkout = (e) => {
    removeItem(e, "workouts", workouts, setWorkouts, ModelTypes.WORKOUT);
  };

  /**
 * Method to add a workout to a users profile
 * @param {*} e event object with a workout to add
 */
  const addWorkout = (e) => {
    addItem(e, "workouts", workouts, setWorkouts, ModelTypes.WORKOUT);
  };

  /**
   * Method to fetch a profile from database
   * Will also get all the workouts and programs and set the states of lists and just
   * show the once not added to profile
   */
  const getProfile = async () => {
    const { payload } = await ProfileService.getProfileByUserId(keycloak);
    const allWokrouts = await asyncWrapper(ModelTypes.WORKOUT);
    const temp = [];

    for (const work of allWokrouts) {
      if (!payload.profile.workouts.some((w) => w.id === work.id)) {
        temp.push(work);
      }
    }
    setWorkouts([...temp]);

    const allPrograms = await asyncWrapper(ModelTypes.PROGRAM);
    const tempPrograms = [];
    for (const program of allPrograms) {
      if (!payload.profile.programs.some((w) => w.id === program.id)) {
        tempPrograms.push(program);
      }
    }

    
    setPrograms([...tempPrograms]);

    setProfile(payload.profile);
  };

  /**
   * Method to fetch a profile from database
   * @param {*} modelType defines what to fetch 
   * @returns payload of object from database 
   */
  const asyncWrapper = async (modelType) => {
    const [error, { payload }] = await apiFetch(modelType, keycloak);
    if (error) {
      console.error(error);
      return;
    }
    return payload;
  };

  useEffect(() => {
    if (keycloak.authenticated) getProfile();
  }, [keycloak]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dataContainer}>
        {profile ? (
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
        ) : (
          <>{!keycloak.authenticated ? <Login /> : <Loader />}</>
        )}
      </div>
      <div className={styles.calendarContainer}>
        <DashboardCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
