import { useContext } from "react";
import { KeyCloakContext } from "../../../context/KeyCloakContext";
import { initKeycloak,usertest } from "../../security/KeyCloak";
import Navlinks from "../navlinks/Navlinks";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const [keyCloak,setKeyCloak] = useContext(KeyCloakContext)

  return (
    <nav className={styles.navbarContainer}>

      <h1>MeFit</h1>

      <Navlinks />

      <div className={styles.navbarUserContainer}>
        <h3>User placeholder</h3>
        <button onClick={() => initKeycloak(keyCloak)}>Login</button>
      </div>
      
    </nav>
  );
};

export default Navbar;
