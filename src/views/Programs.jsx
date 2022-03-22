import { useEffect, useState } from "react";
import { fetchPrograms } from "../api/program";
import Program from "../components/program/Program";

const Programs = () => {
  const [programs, setPrograms] = useState();

  
  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await fetchPrograms();

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
