import logo from './logo.svg';
import './App.css';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXOR82sAF64xL44BP7mkl6FMcyxU86f-c",
  authDomain: "tether-2781a.firebaseapp.com",
  projectId: "tether-2781a",
  storageBucket: "tether-2781a.appspot.com",
  messagingSenderId: "785492280537",
  appId: "1:785492280537:web:8b7fa1a5346491b6f86ac8",
  measurementId: "G-37B2ZG3ENB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
