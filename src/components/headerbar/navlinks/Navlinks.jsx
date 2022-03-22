import { Link } from "react-router-dom";
import styles from "./Navlinks.module.css"

const Navlinks = (props) => {

    return (
        <div className={styles.navlinksContainer}>
            {/* <Link to={"/"}>Home</Link> */}
            {/* <Link to={"/dashboard"}>Dashboard</Link> */}
            <Link to={"/test"}>Test</Link>
            <Link to={"/exercises"}>Exercises</Link>
            <Link to={"/workouts"}>Workouts</Link>
            <Link to={"/programs"}>Programs</Link>


            <Link to={"/reg"}>Reg</Link>
            {props.keyCloak.tokenParsed !== undefined ?
                <>
                    {props.keyCloak.tokenParsed.roles.includes("MeFitt_Admin") ?
                        <Link to={"/admin"}>Admin</Link>
                        : null}

                    {props.keyCloak.tokenParsed.roles.some(role => ["MeFitt_Admin", "MeFitt_Contributer"].includes(role)) ?
                        <Link to={"/contributor"}>Contributor’s Area</Link>
                        : null}
                </>
                : null
            }

        </div>
    );
}

export default Navlinks;