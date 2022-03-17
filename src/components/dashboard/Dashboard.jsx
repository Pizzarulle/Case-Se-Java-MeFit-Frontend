import Workout from "../../views/Workouts";
import Exercises from "../../views/Exercises";
import Programs from "../../views/Programs";
import DashboardCalendar from "./calendar/DashboardCalendar";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
    return (
        <div className={ styles.dashboardContainer }>
            <div className={ styles.dataContainer }>
                <Programs/>
                <Workout/>
                <Exercises/>
            </div>
            <div className={ styles.calendarContainer }>
                <DashboardCalendar/>
            </div>
        </div>
    );
};

export default Dashboard;
