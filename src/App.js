import './App.css';
import {Product} from './Product';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <Product name="bananas" price="1$" description="Fresh bananas from Ecuador" />
        
      </header>
    </div>
  );
}

export default App;