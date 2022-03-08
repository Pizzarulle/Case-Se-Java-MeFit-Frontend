import { Link } from "react-router-dom";
import styles from "./Navlinks.module.css"

const Navlinks = () => {
    return (
        <div className={styles.navlinksContainer}>
            <Link to={"/"}>Home</Link>
            <Link to={"/test"}>Test</Link>
        </div>
    );
}

export default Navlinks;