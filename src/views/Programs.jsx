import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Program from "../components/program/Program";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

const Programs = (props) => {
  const [keycloak, setKeycloak] = useContext(KeyCloakContext)
  const [programs, setPrograms] = useState();


  const addProgramToProfile = (e) => {
    console.log(e);
  }

  const removeProgramFromProfile = (e) => {
    console.log(e);

  }

  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.PROGRAM);
      if (error !== null) {
        console.log(error);
      } else {
        setPrograms(payload);
      }
    };

    const asyncUserPrograms = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.PROGRAM);
      if (error !== null) {
        console.log(error);
      } else {
        setPrograms(payload);
      }
    }

    if (props.userProgram)
      asyncUserPrograms()
    else
      asyncWrapper();
  }, []);



  return (
    <>
      {props.userProgram ?
        <h1>Your programs!</h1>
        :
        <h1>Available programs!</h1>
      }

      {programs &&
        programs.map((program) => (
          keycloak.authenticated ?
            props.userProgram ?
              <Program key={program.id} programData={program} removeProgramFromProfile={removeProgramFromProfile} />
              :
              <Program key={program.id} programData={program} addProgramToProfile={addProgramToProfile} />
            :
            <Program key={program.id} programData={program} />

        )
        )}
    </>
  );
};

export default Programs;
