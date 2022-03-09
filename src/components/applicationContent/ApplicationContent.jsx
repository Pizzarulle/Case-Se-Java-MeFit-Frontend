import { Route, Routes } from "react-router-dom";
import Home from "../../views/Home";
import Test from "../../views/Test";
import NoMatch from "../../views/NoMatch";

const ApplicationContent = () => {
    return (
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    );
}

export default ApplicationContent;