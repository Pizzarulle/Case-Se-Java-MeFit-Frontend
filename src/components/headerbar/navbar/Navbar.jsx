import Navlinks from "../navlinks/Navlinks";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbarContainer}>

      <h1>MeFit</h1>

      <Navlinks />

      <div className={styles.navbarUserContainer}>
        <h3>User placeholder</h3>
        <button>Login</button>
      </div>
      
    </nav>
  );
};

export default Navbar;
