import { Link } from "react-router-dom";
import styles from "./Navlinks.module.css"

const Navlinks = (props) => {

    return (
        <div className={styles.navlinksContainer}>
            <Link to={"/dashboard/index"}>Dashboard</Link>
            <Link to={"/dashboard/exercise"}>Exercises</Link>
            <Link to={"/dashboard/workout"}>Workouts</Link>
            <Link to={"/dashboard/program"}>Programs</Link>


            <Link to={"/reg"}>Reg</Link>
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