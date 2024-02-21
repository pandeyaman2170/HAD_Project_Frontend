import React from 'react';
import DoctorNavbar from './DoctorNavbar';
import Prescription from './Prescription';
import { useLocation } from 'react-router-dom';
import VideoCall from '../PatientComponent/VideoCall';

const DoctorConsultationPage = () => {
  const { state } = useLocation();
  const appId = 1;

  return (
    <div className='bg-blue-50 h-full'>
      <DoctorNavbar />
      <div className='grid grid-cols-5 gap-4'>
        {/* Prescription on the left */}
        <div className='p-4' style={{ gridColumn: "1 / span 2" }}>
          <Prescription />
        </div>
        
        {/* Video call on the right */}
        <div className='p-0' style={{ gridColumn: "3 / span 3" }}>
          <VideoCall />
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultationPage;
