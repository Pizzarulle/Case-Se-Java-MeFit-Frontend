import "./App.css";
import ApplicationContent from "./components/applicationContent/ApplicationContent";
import Navbar from "./components/headerbar/navbar/Navbar";


function App() {
  return (
    <div className="App">
      <Navbar />
      <ApplicationContent />
    </div>
  );
}

export default App;
