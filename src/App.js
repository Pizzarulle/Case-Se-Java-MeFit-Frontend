import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/headerbar/navbar/Navbar';
import Home from './views/Home';
import NoMatch from './views/NoMatch';
import Test from './views/Test';

function App() {
  return (
    <div className="App">
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/test' element={<Test/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </div>
  );
}

export default App;
