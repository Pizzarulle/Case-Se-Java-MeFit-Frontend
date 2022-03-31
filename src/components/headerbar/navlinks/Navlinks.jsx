import { Link } from "react-router-dom";
import styles from "./Navlinks.module.css"

/**
 * Component to render all the links in the navbar
 * @param {*} props to get keycloak to the navlinks and decide if Admin and Contributor link will show
 * @returns 
 */
const Navlinks = (props) => {
    return (
        <div className={styles.navlinksContainer}>
            <Link to={"/"}>Dashboard</Link>
            <Link to={"/exercise"}>Exercises</Link>
            <Link to={"/workout"}>Workouts</Link>
            <Link to={"/program"}>Programs</Link>

            {props.keyCloak.tokenParsed !== undefined &&
                <>
                    {props.keyCloak.tokenParsed.roles.includes("MeFitt_Admin") &&
                        <Link to={"/admin"}>Admin</Link>
                    }
                    {props.keyCloak.tokenParsed.roles.some(role => ["MeFitt_Admin", "MeFitt_Contributer"].includes(role)) &&
                        <Link to={"/contributor/exercise"}>Contributor’s Area</Link>
                    }
                </>
            }

        </div>
    );
}

export default Navlinks;