import { useContext, useEffect, useState } from 'react';
import KeyCloakService from '../components/security/KeyCloak';
import { KeyCloakContext } from '../context/KeyCloakContext';
import logo from '../logo.svg';

const Home = () => {

  const [keyCloak, setKeyCloak] = useContext(KeyCloakContext)
  const [userName, setUserName] = useState("Test");


  useEffect(() => {
    // const getKeyCloak = async () => {
    //   console.log(keyCloak);
    //   const newKeyCloak = await KeyCloakService.initKeycloak(keyCloak)
    //   console.log(newKeyCloak);
    //   newKeyCloak.loadUserProfile()
    //   setKeyCloak(newKeyCloak)
    // }
    // getKeyCloak()
    
  }, [])

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      {keyCloak.authenticated ?
        <h1>{keyCloak.idTokenParsed['name']}</h1>
        :
        <h1>No user</h1>
      }
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