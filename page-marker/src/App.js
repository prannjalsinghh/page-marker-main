import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {Route,Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import Foreground from './components/Test';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
    </Routes>
  );
}

export default App;
