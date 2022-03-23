import Workout from "../../views/Workouts";
import Exercises from "../../views/Exercises";
import Programs from "../../views/Programs";
import DashboardCalendar from "./calendar/DashboardCalendar";

import styles from "./Dashboard.module.css";
import { useContext } from "react";
import { KeyCloakContext } from "../../context/KeyCloakContext";


const Dashboard = () => {

    const [keycloak, setKeycloak] = useContext(KeyCloakContext)

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.dataContainer}>

                {keycloak.authenticated &&
                   <>
                   <Programs userProgram={true} />
                   <Workout userWorkout={true}/>
                   </>
                }

                <Programs availableProgram={true} />
                <Workout  availableWorkout={true}/>
                <Exercises />
            </div>
            <div className={styles.calendarContainer}>
                <DashboardCalendar />
            </div>
        </div>
    );
};

export default Dashboard;
