import "./App.css";
import ApplicationContent from "./components/applicationContent/ApplicationContent";
import Navbar from "./components/headerbar/navbar/Navbar";
import KeyCloakProvider from "./context/KeyCloakContext";


function App() {
  
  return (
    <div className="App">

      <KeyCloakProvider>
        <Navbar />
        <ApplicationContent />
      </KeyCloakProvider>


    </div>
  );
}

export default App;
