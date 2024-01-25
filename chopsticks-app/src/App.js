import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/blah';
import PlayerOne from './components/player1';
import PlayerOneLeftHand from './components/P1-LeftHand';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HelloWorld />
        <HelloWorld />
        <PlayerOne />
        <PlayerOneLeftHand />
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
