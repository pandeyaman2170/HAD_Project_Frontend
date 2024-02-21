import React, { useState, useEffect } from 'react';
const PatientHistory = () => {
  return (
    <div className="p-6 rounded-lg border-2 border-gray-200">
      <table className="table-auto w-full mx-auto">
        <caption className="caption-top font-serif text-2xl p-2 border-b-2">Prescriptions</caption>
        <thead className="font-serif text-lg">
          <tr>
            <th>Date</th>
            <th>Medical Findings</th>
            <th>Remarks</th>
            <th>View PDF</th>
          </tr>
        </thead>
        <tbody className="font-serif text-md text-center">
          <tr className='bg-blue-50 border-2'>
                <td>2-feb-2023</td>
                <td>Sneezing</td>
                <td>Severe</td>
                <td className='p-2'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    download pdf
                  </button>
                </td>
          </tr>
          <tr className='bg-blue-50 border-2'>
                <td>3-feb-2023</td>
                <td>cough</td>
                <td>mild</td>
                <td className='p-2'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    download pdf
                  </button>
                </td>
          </tr>
          <tr className='bg-blue-50 border-2'>
                <td>2-feb-2023</td>
                <td>Sneezing</td>
                <td>Severe</td>
                <td className='p-2'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    download pdf
                  </button>
                </td>
          </tr>
          <tr className='bg-blue-50 border-2'>
                <td>3-feb-2023</td>
                <td>cough</td>
                <td>mild</td>
                <td className='p-2'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                    download pdf
                  </button>
                </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
