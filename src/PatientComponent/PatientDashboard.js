import React from 'react'
import PatientNavbar from './PatientNavbar'
import Appointment from './Appointment'
import PatientHistory from './PatientHistory'

const PatientDashboard = () => {
  return (
    <div className='bg-blue-50 w-full'>
      <PatientNavbar/>
      <div className='flex flex-row p-4 space-x-6 w-full'>
        <div className='w-5/6 flex flex-row p-2 justify-between'>
          <div className='flex flex-col w-2/3 p-2'>
            <div><Appointment /></div>
            <div className='p-2 relative z-0 w-full group'>
                <div>
                  <PatientHistory />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard