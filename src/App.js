import "./App.css";
import ApplicationContent from "./components/applicationContent/ApplicationContent";
import Navbar from "./components/headerbar/navbar/Navbar";
import KeyCloakProvider from "./context/KeyCloakContext";
import KCProvider from "./context/useKeyCloak";


function App() {
  
  return (
    <div className="App">

        <Navbar />
        <ApplicationContent />


    </div>
  );
}

export default App;
