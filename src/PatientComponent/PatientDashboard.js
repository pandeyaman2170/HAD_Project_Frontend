
import PatientNavbar from './PatientNavbar';
import ConsultNow from './ConsultNow';
import PatientHistory from './PatientHistory';
import React, { useEffect, useState } from 'react'


const PatientDashboard = () => {
    let patient
    const [viewHistory, setViewHistory] = useState(false)

    const handleToggle = () => {
        setViewHistory(!viewHistory)
    }

    useEffect(() => {
        patient = JSON.parse(localStorage.getItem("patientDetails"))
        // console.log("dashboard",patient)
    })
  return (
    <div className='bg-orange-200'>
      <PatientNavbar />
      <div className='bg-orange-100 flex flex-row p-4 space-x-6 w-full justify-center drop-shadow-xl h-screen'>
        <div className='w-5/6 flex flex-row  justify-center '>
          <div className='flex flex-col w-2/3 p-2 h-auto max-auto'>
            <ConsultNow />
            <div className=' relative z-0 w-full group drop-shadow-xl'>
              <PatientHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
