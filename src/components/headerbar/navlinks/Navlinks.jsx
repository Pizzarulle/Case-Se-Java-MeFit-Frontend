import { Link } from "react-router-dom";
import styles from "./Navlinks.module.css"

const Navlinks = () => {
    return (
        <div className={styles.navlinksContainer}>
            <Link to={"/"}>Home</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/test"}>Test</Link>
            <Link to={"/exercises"}>Exercises</Link> 
            <Link to={"/workouts"}>Workouts</Link>
            <Link to={"/programs"}>Programs</Link>
            <Link to={"/admin"}>Admin</Link>
            <Link to={"/contributor"}>Contributor’s Area</Link>
        </div>
    );
}

export default Navlinks;