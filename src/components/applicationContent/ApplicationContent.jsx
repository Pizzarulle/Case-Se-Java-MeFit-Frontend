import { Route, Routes } from "react-router-dom";
import Home from "../../views/Home";
import Test from "../../views/Test";
import NoMatch from "../../views/NoMatch";
import styles from "./ApplicationContent.module.css";
import Exercises from "../../views/Exercises";
import Workouts from "../../views/Workouts";
import Programs from "../../views/Programs";
import Registration from "../registration/Registration";
import AdminPage from "../admin/AdminPage";

const ApplicationContent = () => {
  return (
    <div className={styles.applicationContentContainer}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exercises" element={<Exercises/>}/>
        <Route path="/workouts" element={<Workouts/>}/>
        <Route path="/programs" element={<Programs/>}/>
        <Route path="/test" element={<Test />} />

        <Route path="/reg" element={<Registration/>} />
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path= "/silent-check-sso.html"/> 

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default ApplicationContent;
