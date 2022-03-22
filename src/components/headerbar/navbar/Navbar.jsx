import { useContext, useEffect, useState } from "react";
import { KeyCloakContext } from "../../../context/KeyCloakContext";
import TestService from "../../security/TestFunctions";

import Navlinks from "../navlinks/Navlinks";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

  return (
    <nav className={styles.navbarContainer}>

      <h1>MeFit</h1>

      <Navlinks />

      <div className={styles.navbarUserContainer}>
        {/* <button onClick={() => TestService.testuser(keyCloak)} >Test User</button>
        <button onClick={() => TestService.testadmin(keyCloak)} >Test Admin</button> */}
        {keyCloak.authenticated ?
          <>
            {/* <h3>{KeyCloakService.getUserFromJWT(keyCloak)}</h3> */}
            <h3>{keyCloak.idTokenParsed['name']}</h3>
            <button onClick={() => keyCloak.logout({redirectUri: 'http://localhost:3000'})}>Logout</button>

            <button onClick={() => TestService.testuser(keyCloak)}>Test</button>

          </>
          : <>
            <button onClick={() => 
            keyCloak.login({redirectUri: 'http://localhost:3000'})
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
