import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Loader from "../components/loader/Loader";
import Program from "../components/program/Program";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";
import { useKC } from "../context/useKeyCloak";

const Programs = () => {
  const [programs, setPrograms] = useState();
  const [keyCloak] = useKC;

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

export default Programs;
