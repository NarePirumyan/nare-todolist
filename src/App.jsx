import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToDo } from './Components/todo/ToDo';

class App extends Component {

  render() {
    return (
      <ToDo />
    );
  }
}

export default App;