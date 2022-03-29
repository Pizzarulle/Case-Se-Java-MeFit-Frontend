import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Loader from "../components/loader/Loader";
import Program from "../components/program/Program";
import withAuth from "../components/security/withAuth";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

/**
 * component that will render all the avaible programs, will fetch them from the database.
 * @returns 
 */
const Programs = () => {
  const [programs, setPrograms] = useState();
  const [keyCloak] = useContext(KeyCloakContext);

  /**
   * Method that will be run when component first mounts and when keycloak  updates, will fetch all programs from database
   */
  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.PROGRAM, keyCloak);

      if (error !== null) {
        console.log(error);
      } else {
        setPrograms(payload);
      }
    };
    asyncWrapper();
  }, [keyCloak]);
  return (
    <>
      {!programs ? (
        <Loader />
      ) : (
        <>
          <h1>Available programs!</h1>
          {programs.map((program) => (
            <Program key={program.id} programData={program} />
          ))}
        </>
      )}
    </>
  );
};

export default withAuth(Programs);
