import Workout from "../../views/Workouts";
import Exercises from "../../views/Exercises";
import Programs from "../../views/Programs";
import DashboardCalendar from "./calendar/DashboardCalendar";

import styles from "./Dashboard.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { KeyCloakContext } from "../../context/KeyCloakContext";
import ProfileService from "../../api/profile";
import { apiFetch } from "../../api/api";

const Dashboard = () => {

    const [keycloak, setKeycloak] = useContext(KeyCloakContext)
    const [profile, setProfile] = useState(null)
    const [workouts, setWorkouts] = useState([])
    const [progras, setPrograms] = useState([])

    const editPrograms = (e) => {
        const temp = profile;
        temp.programs = e
        setProfile(temp)
    }


    const removeWorkout = (e) => {
        let index = profile.workouts.findIndex(work => work.id === e.id)
        let temp = profile
        temp.workouts.splice(index, 1)
        setProfile( {...temp} )

        ProfileService.patchProfileWorkout(keycloak,profile)
    }
    const addWorkout = (e) => {
        if (!profile.workouts.some(work => work.id === e.id)) {
            let temp = profile
            temp.workouts.push(e)
            setProfile({...temp})

            ProfileService.patchProfileWorkout(keycloak,profile)
        }
    }

    const getProfile = async () => {
        const profileFetch = await apiFetch("profile")
        const allWokrouts = await asyncWrapper()
        const temp = []
        for (const work of allWokrouts) {
            if (!profileFetch[1].payload[1].workouts.some(w => w.id === work.id)) {
                temp.push(work)
            }
        }
        setProfile(profileFetch[1].payload[1])
        setWorkouts(temp)
        // console.log(workouts);
    }

    const asyncWrapper = async () => {
        const [error, { payload }] = await apiFetch("workout");
        if (error) {
            console.error(error);
            return;
        }
        return payload
    }
    const setWorkoutAsync = async () => {
        const temp = await asyncWrapper()
        setWorkouts(temp)
    }

    useEffect(() => {
        // if (keycloak.authenticated)
        getProfile()
        // else
        setWorkoutAsync()
    }, [])

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dataContainer}>

                {keycloak.authenticated && profile !== null ?
                    <>
                        {/* <Programs editPrograms={editPrograms} programs={profile.programs} userProgram={true} /> */}
                        <Workout removeWorkout={removeWorkout} workouts={profile.workouts} userWorkout={true} />

                        {/* <Programs editPrograms={editPrograms} availableProgram={true} /> */}
                        <Workout addWorkout={addWorkout} workouts={workouts} availableWorkout={true} />
                    </>
                    : <>
                        <Programs /* availableProgram={true} */ />
                        {<Workout />}
                    </>
                }


                <Exercises />
            </div>
            <div className={styles.calendarContainer}>
                <DashboardCalendar />
            </div>
        </div>
    );
};

export default Dashboard;
