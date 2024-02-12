import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppHomePage from './pages/AppHomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/healthiest/home' element={<AppHomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
