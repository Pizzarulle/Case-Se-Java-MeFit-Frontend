import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Program from "../components/program/Program";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

const Programs = () => {
  const [programs, setPrograms] = useState();
  const [keyCloak] = useContext(KeyCloakContext)

  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.EXERCISE,keyCloak);

      if (error !== null) {
        console.log(error);
      } else {
        setPrograms(payload);
      }
    };
    asyncWrapper();
  }, []);
  return (
    <>
      <h1>Available programs!</h1>

      {programs &&
        programs.map((program) => (
          <Program key={program.id} programData={program} />
        ))}
    </>
  );
};

export default Programs;