import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { KeyCloakContext } from "../../../context/KeyCloakContext";

import Navlinks from "../navlinks/Navlinks";
import styles from "./Navbar.module.css";

/**
 * Component to render the navbar shown on top of site, with links to different path and session handle
 * @returns 
 */
const Navbar = () => {

  const [keyCloak] = useContext(KeyCloakContext)

  const navigate = useNavigate()

  return (
    <nav className={styles.navbarContainer}>

      <h1 className={styles.bigText} onClick={() => navigate("/")} >MeFit</h1>

      <Navlinks keyCloak={keyCloak} />

      <div className={styles.navbarUserContainer}>
        {keyCloak.authenticated ?
          <>
            <h3 onClick={() => navigate("/profile")}
            className={styles.pointer}
            >{keyCloak.idTokenParsed['name']}</h3>
            <button onClick={() => keyCloak.logout({ redirectUri: 'https://java-se-mefit-frontend-develop.herokuapp.com' })}>Logout</button>
          </>
          : <>
            <button onClick={() =>
              keyCloak.login({ redirectUri: 'https://java-se-mefit-frontend-develop.herokuapp.com' })
            }
            >Login</button>
            <button onClick={() => keyCloak.register({ redirectUri: 'https://java-se-mefit-frontend-develop.herokuapp.com/reg' })}>Register</button>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;