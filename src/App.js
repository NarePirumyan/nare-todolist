import logo from './logo.svg';
import Heading from './Heading';
import DivMaker from './DivMaker';
import './App.css';


function App() {
  const comment = 'My first React code.'

  return (
    <div className="App">
      <header className="App-header">
        <Heading />
        <DivMaker />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {comment}
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
