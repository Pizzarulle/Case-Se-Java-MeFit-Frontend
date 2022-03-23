import { useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Program from "../components/program/Program";
import { ModelTypes } from "../constants/enums";

const Programs = () => {
  const [programs, setPrograms] = useState();

  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.PROGRAM);

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
