import StartScreen from './components/start_screen';
import './App.css';
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <StartScreen />
    </BrowserRouter>
  );
}

export default App;
