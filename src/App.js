import './App.css';
import {Product} from './Product';



function App() {

  return (
    <div className="App">
      <header className="App-header">
        
        <Product 
        name="bananas" 
        price="100" 
        description="Fresh bananas from Ecuador" 
        />

        <Product 
        name="apples" 
        price="250" 
        description="Golden apples" 
        />
        
      </header>
    </div>
  );
}

export default App;