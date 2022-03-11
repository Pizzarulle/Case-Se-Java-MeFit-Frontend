import { useState } from "react";
import Program from "../components/program/Program";

const Programs = () => {

  const [programs, setPrograms] = useState(null)
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
