import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "./DashboardCalendar.module.css";

/**
 * Component to render the initiate the calender
 * @returns 
 */
const DashboardCalendar = () => {
	const [dateState, setDateState] = useState(new Date())
	const changeDate = (e) => {
		setDateState(e)
	}

	return (
		<div className={ styles.calendarContainer }>
			<Calendar value={dateState} onChange={changeDate} />
		</div>
	)
}

export default DashboardCalendar;
