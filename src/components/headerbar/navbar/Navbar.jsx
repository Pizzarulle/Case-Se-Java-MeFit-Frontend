import { useContext, useEffect, useState } from "react";
import { KeyCloakContext } from "../../../context/KeyCloakContext";

import KeyCloakService from "../../security/KeyCloak";
// import TestService from "../../security/TestFunctions";

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
        {KeyCloakService.userActive(keyCloak) ?
          <>
            <h3>{KeyCloakService.getUserFromJWT(keyCloak)}</h3>
            <button onClick={() => KeyCloakService.logout(keyCloak)}>Logout</button>
          </>
          : <>
            <button onClick={() => KeyCloakService.login(keyCloak)}>Login</button>
            <button onClick={() => KeyCloakService.register(keyCloak)}>Register</button>
          </>

        }
      </div>

    </nav>
  );
};

export default Navbar;
