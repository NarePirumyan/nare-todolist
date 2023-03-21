import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { ToDo } from './Components/ToDo';
// import { Task } from './Components/Task';


class App extends Component {

  render() {
    return (
        <ToDo />
        // <Task />
    );
  }
}

export default App;