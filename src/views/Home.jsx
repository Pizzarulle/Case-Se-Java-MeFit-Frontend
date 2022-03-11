import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { initKeycloak, login, usertest } from '../components/KeyCloak/KeyCloak';
import { KeyCloakContext } from '../context/KeyCloakContext';
import logo from '../logo.svg';


const Home = () => {

  const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)

  useEffect(() => {
    if (window.location.href.includes("#state=")) {
      initKeycloak(keyCloak)
      console.log(keyCloak)
    }
  }, [])

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

export default Home;