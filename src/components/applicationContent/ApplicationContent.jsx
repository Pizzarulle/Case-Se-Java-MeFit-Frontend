import { Route, Routes } from "react-router-dom";
import Home from "../../views/Home";
import Test from "../../views/Test";
import NoMatch from "../../views/NoMatch";
import styles from "./ApplicationContent.module.css";
import Exercises from "../../views/Exercises";
import Programs from "../../views/Programs";

const ApplicationContent = () => {
  return (
    <div className={styles.applicationContentContainer}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises/>}/>
        <Route path="/programs" element={<Programs/>}/>
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default ApplicationContent;
