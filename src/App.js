
import React,{ Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'
import DoctorDashboard from './DoctorComponents/DoctorDashboard';
import DoctorConsultationPage from './DoctorComponents/DoctorConsultationPage';
import DoctorProfile from './DoctorComponents/DoctorProfile';
import PatientDashboard from './PatientComponent/PatientDashboard';
import PatientRegistration from './PatientComponent/PatientRegistration';
import PatientWaitingRoom from './PatientComponent/PatientWaitingRoom';
import PatientUpdateProfile from './PatientComponent/PatientUpdateProfile';
import PatientVideoCallPage from './PatientComponent/PatientVideoCallPage';
import AdminDashboard from './AdminComponents/AdminDashboard';
const App = () => {
  return (
    <div>
      <Suspense fallback={"Loading..."}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/consultationpage" element={<DoctorConsultationPage />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path='/register' element={<PatientRegistration />} />
          <Route path='/patient/waitingroom' element={<PatientWaitingRoom />} />
          <Route path='/patient/updateProfile' element={<PatientUpdateProfile />} />
          <Route path='/patient/patientVideoCall' element={<PatientVideoCallPage />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
