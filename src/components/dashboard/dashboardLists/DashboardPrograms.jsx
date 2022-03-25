import Loader from "../../loader/Loader";
import Program from "../../program/Program";

const DashboardPrograms = (props) => {


  return (
    <>
      {props.programs === undefined ? (
        <Loader />
      ) : (
        <div>
          {props.userProgram ? <h3>Your programs!</h3> : <h3>Available programs!</h3>}
          {props.programs.map((program) => (
            <div key={program.id}>
              {props.userProgram && (
                <Program
                  programData={program}
                  removeProgramFromProfile={() => props.removeProgram(program)}
                />
              )}
              {props.availableProgram && (
                <Program
                  programData={program}
                  addProgramToProfile={() => props.addProgram(program)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DashboardPrograms;
