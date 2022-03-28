import Keycloak from "keycloak-js";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { KeyCloakContext } from "../../context/KeyCloakContext";

/**
 * Component to check if a user is login / has a token, other get redirected to home
 * Will protect of limit access.
 * @param {*} Component
 * @returns
 */
const withAuth = (Component) => (props) => {
  //This is used to redirect non logged in users to the login page.
  const [keyCloak] = useContext(KeyCloakContext);

  const hasValidSession = () => {
    if (keyCloak.authenticated) {
      return true;
    }
    return false;
  };

  const isAuthenticated = hasValidSession();

  console.log("isAuthenticated: ", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }
  return <Component {...props} />;
};

export default withAuth;
