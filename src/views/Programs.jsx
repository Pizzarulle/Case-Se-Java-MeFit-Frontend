import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../api/api";
import Loader from "../components/loader/Loader";
import Program from "../components/program/Program";
import { ModelTypes } from "../constants/enums";
import { KeyCloakContext } from "../context/KeyCloakContext";

const Programs = (props) => {
  const [keycloak, setKeycloak] = useContext(KeyCloakContext)
  const [programs, setPrograms] = useState(props.programs);


  useEffect(() => {
    const asyncWrapper = async () => {
      const [error, { payload }] = await apiFetch(ModelTypes.PROGRAM);
      if (error !== null) {
        console.log(error);
      } else {
        setPrograms(payload);
      }
    };
    console.log(props.programs);
    if (props.programs === undefined) {
      console.log("Getting programs");
      asyncWrapper();
    }
  }, []);


  return (
    <>
      {programs === undefined /* ||  programs.length === 0 */ ? <Loader /> :
        <div>
          {props.userProgram ?
            <h1>Your programs!</h1>
            :
            <h1>Available programs!</h1>
          }
          {programs.map(program => (<div key={program.id}>
            {
              props.userProgram && <Program programData={program} removeProgramFromProfile={() => props.removeProgram(program)} />}
            {
              props.availableProgram && <Program programData={program} addProgramToProfile={() => props.addProgram(program)} />
            }
            {/* {
          props.workouts === undefined && <ContributorProgram  programData={program} />
        } */}


          </div>
          ))}


          {/* {programs &&
        programs.map((program) => (
        
            props.userProgram ?
              <Program key={program.id} programData={program} removeProgramFromProfile={() => props.editPrograms(program)} />
              :
              <Program key={program.id} programData={program} addProgramToProfile={() => props.editPrograms(program)} />
            // :
            // <Program key={program.id} programData={program} />

        )
        )} */}
        </div>}
    </>
  );
};

export default Programs;
