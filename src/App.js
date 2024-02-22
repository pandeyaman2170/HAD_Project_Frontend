import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AppHomePage from './pages/AppHomePage';
import PatientLogin from './pages/PatientLongin';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/healthiest/home' element={<AppHomePage/>} />
          <Route path='/healthiest/home/Patient/Login' element={<PatientLogin/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
