import Workouts from "../../views/Workouts";
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
    const [programs, setPrograms] = useState([])

    const removeProgram = (e) => {
        let index = profile.programs.findIndex(program => program.id === e.id)
        let temp = profile
        temp.programs.splice(index, 1)
        setProfile({ ...temp })
        console.log("Remove")
        ProfileService.pathProfileProgram(keycloak, profile)
    }

    const addProgram = (e) => {
        if (!profile.programs.some(program => program.id === e.id)) {
            let temp = profile
            temp.programs.push(e)
            console.log(temp);
            setProfile({ ...temp })

            // let tempArray = [...workouts]

            
            console.log("ADD");
            ProfileService.pathProfileProgram(keycloak, profile)
        }
    }

    const removeWorkout = (e) => {
        let index = profile.workouts.findIndex(work => work.id === e.id)
        let temp = profile
        console.log(temp);
        temp.workouts.splice(index, 1)
        console.log(temp);
        setProfile( {...temp} )

        setWorkouts([...workouts,e])
        //ProfileService.patchProfileWorkout(keycloak,profile)
    }
    const addWorkout = (e) => {
        if (!profile.workouts.some(work => work.id === e.id)) {
            let temp = profile
            temp.workouts.push(e)
            setProfile({ ...temp })
            const array = workouts.filter(Workout => Workout.id !== e.id)
            console.log(array);
            setWorkouts([...array])

            // ProfileService.patchProfileWorkout(keycloak, profile)
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
        setWorkouts([ ...temp ])
         console.log(profile);
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
        console.log("UseEffect");
        // else
        // setWorkoutAsync()
    }, [])

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dataContainer}>

                {keycloak.authenticated && profile !== null ?
                    <>
                        <Programs removeProgram={removeProgram} programs={profile.programs} userProgram={true} />
                        <Workouts removeWorkout={removeWorkout} workouts={profile.workouts} userWorkout={true} />
                        
                        
                        <Programs addProgram={addProgram} availableProgram={true} />
                        <Workouts addWorkout={addWorkout} workouts={workouts} availableWorkout={true} />
                    </>
                    : <>
                        {/* <Programs />
                        {<Workout />} */}
                    </>
                }


                {/* <Exercises /> */}
            </div>
            <div className={styles.calendarContainer}>
                <DashboardCalendar />
            </div>
        </div>
    );
};

export default Dashboard;
