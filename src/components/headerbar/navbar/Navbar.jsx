import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { KeyCloakContext } from "../../../context/KeyCloakContext";

import Navlinks from "../navlinks/Navlinks";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

  const navigate = useNavigate()

  return (
    <nav className={styles.navbarContainer}>

      <h1 onClick={() => navigate("/")} >MeFit</h1>

      <Navlinks keyCloak={keyCloak} />

      <div className={styles.navbarUserContainer}>
        {keyCloak.authenticated ?
          <>
            <h3 onClick={() => navigate("/profile")}
            >{keyCloak.idTokenParsed['name']}</h3>
            <button onClick={() => keyCloak.logout({ redirectUri: 'http://localhost:3000' })}>Logout</button>
          </>
          : <>
            <button onClick={() =>
              keyCloak.login({ redirectUri: 'http://localhost:3000' })
            }
            >Login</button>
            <button onClick={() => keyCloak.register()}>Register</button>
          </>
        }
      </div>
    </nav>
  );
};

export default Navbar;