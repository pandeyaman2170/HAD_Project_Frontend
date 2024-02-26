import React from 'react';

const PatientHistory = () => {
  // Sample data for the table
  const prescriptions = [
    { date: '2-feb-2023', medicalFindings: 'Sneezing', remarks: 'Severe' },
    { date: '3-feb-2023', medicalFindings: 'Cough', remarks: 'Mild' },
    { date: '2-feb-2023', medicalFindings: 'Sneezing', remarks: 'Severe' },
    { date: '3-feb-2023', medicalFindings: 'Cough', remarks: 'Mild' },
    { date: '2-feb-2023', medicalFindings: 'Sneezing', remarks: 'Severe' },
    { date: '3-feb-2023', medicalFindings: 'Cough', remarks: 'Mild' },
    { date: '2-feb-2023', medicalFindings: 'Sneezing', remarks: 'Severe' },
    { date: '3-feb-2023', medicalFindings: 'Cough', remarks: 'Mild' },
    // Add more data as needed
  ];

  return (
    <div className="p-6 rounded-lg border-2 border-orange-600">
      <table className="table-auto w-full mx-auto border-orange-600">
        <caption className="caption-top font-normal text-2xl p-2 border-b-2">Prescriptions</caption>
        <thead className="font-normal text-lg">
          <tr>
            <th>Date</th>
            <th>Medical Findings</th>
            <th>Remarks</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody className="font-normal text-md text-center">
          {prescriptions.map((prescription, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-orange-200' : 'bg-grey'}>
              <td>{prescription.date}</td>
              <td>{prescription.medicalFindings}</td>
              <td>{prescription.remarks}</td>
              <td className='p-2'>
                <button className="bg-orange-600 hover:bg-orange-600 text-white py-2 px-2 rounded-lg">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
