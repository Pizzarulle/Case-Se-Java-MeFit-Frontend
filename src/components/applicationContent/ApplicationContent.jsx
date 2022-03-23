import { Route, Routes } from "react-router-dom";
import NoMatch from "../../views/NoMatch";
import styles from "./ApplicationContent.module.css";
import Registration from "../registration/Registration";
import AdminPage from "../admin/AdminPage";
import ContributorsArea from "../../views/contributorsArea/ContributorsArea";
import DashboardView from "../../views/DashboardView";
import Profile from "../profile/Profile";
import DasboardArea from "../../views/dashboardArea/DashboardArea"

const ApplicationContent = () => {
  return (
    <div className={styles.applicationContentContainer}>
      <Routes>
        <Route path="/" element={<DashboardView/>}/>
        <Route path="/dashboard/*" element={<DasboardArea/>}/>
        <Route path="/contributor/*" element={<ContributorsArea restrict={{role:"MeFitt_Contributer"}}/>}/>

        <Route path="/profile" element={<Profile/>} />

        <Route path="/reg" element={<Registration/>} />
        <Route path="/admin" element={<AdminPage restrict={{role:"MeFitt_Admin"}}/>}/>
        <Route path= "/silent-check-sso.html"/> 

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
};

export default ApplicationContent;
