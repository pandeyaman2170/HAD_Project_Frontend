import React from 'react';
import PatientNavbar from './PatientNavbar';
import ConsultNow from './ConsultNow';
import PatientHistory from './PatientHistory';

const PatientDashboard = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-blue-50'>
      <PatientNavbar />
      <div className='bg-blue-100 flex flex-row p-4 space-x-6 w-full'>
        <div className='w-5/6 flex flex-row p-2 justify-between'>
          <div className='flex flex-col w-2/3 p-2'>
            <ConsultNow />
            <div className='p-2 relative z-0 w-full group'>
              <PatientHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
