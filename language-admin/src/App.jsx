import HomePage from './page/Home';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div>
      <HomePage />
    </div>
    </BrowserRouter>
  );
}

export default App;
