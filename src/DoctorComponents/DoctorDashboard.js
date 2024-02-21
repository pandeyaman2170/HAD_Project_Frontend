import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DoctorNavbar from "./DoctorNavbar";
import QueuedPatient from "./QueuedPatient";
import Infographics from "./Infographics";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
const DoctorDashboard = () => {
  return (
    <div className='bg-blue-50 flex flex-col justify-evenly'>
      <div>
        <DoctorNavbar />
      </div>
      <div className='flex flex-row'>
        <div className='w-1/6 h-screen relative'>
          <QueuedPatient />
        </div>

        <div className="flex-grow flex flex-row p-8 justify-between h-screen">
          <div className="w-3/5 grid grid-rows-5">
            <div className="row-span-2 flex flex-row justify-between p-8 w-full space-x-6">
              <div className="w-1/2 p-4 h-3/5 border-t-4 border-blue-900 shadow-lg font-serif rounded-lg flex flex-col justify-evenly transition-transform duration-500 transform-gpu hover:scale-110">
                <p>Total Consultations</p>
                <p className="text-5xl text-center">10345</p>
              </div>
              <div className="w-1/2 p-4 h-3/5 border-t-4 border-blue-900 shadow-lg font-serif rounded-lg flex flex-col justify-evenly transition-transform duration-500 transform-gpu hover:scale-110">
                <p>Today's Consultations</p>
                <p className="text-5xl text-center">32</p>

              </div>
            </div>
            <div className='row-span-3 h-4/5 w-full flex justify-center'>
              <Infographics />
            </div>
          </div>
          <div className='shadow-lg p-6 w-2/5 h-4/5 border-t-4 border-blue-900 rounded-lg mt-8'>
            <table className="table-auto w-full mx-auto">
              <caption className="caption-top font-serif text-2xl p-2 border-b-2 border-gray-700">
                Daily Log
              </caption>
              <thead className='font-serif text-lg'>
                <tr>
                  <th>Patient Id</th>
                  <th>Medical Findings</th>
                  <th>Remarks</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='font-serif text-md text-center'>
                <tr className='p-8'>
                    <td>1</td>
                    <td>Sneezing</td>
                    <td>Severe</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
                <tr className='p-8'>
                    <td>2</td>
                    <td>Sneezing</td>
                    <td>Severe</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
                <tr className='p-8'>
                    <td>3</td>
                    <td>Cough</td>
                    <td>Mild</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
                <tr className='p-8'>
                    <td>4</td>
                    <td>Sneezing</td>
                    <td>Mind</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
                <tr className='p-8'>
                    <td>5</td>
                    <td>Fever</td>
                    <td>Severe</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
                <tr className='p-8'>
                    <td>6</td>
                    <td>Sneezing</td>
                    <td>Mind</td>
                    <td><FontAwesomeIcon icon={faCircleCheck} beatFade style={{ color: "#3ee302", }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard