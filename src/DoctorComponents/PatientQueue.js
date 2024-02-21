import React from 'react';

// PatientQueue component
const PatientQueue = () => {
  // Dummy data for patient queue
  const patientQueue = [
    { tokenId: 'T001', patientId: 101, name: 'John Doe' },
    { tokenId: 'T002', patientId: 102, name: 'Jane Smith' },
    // Add more patients in the queue
  ];

  const handleAcceptCall = (tokenId) => {
    // Logic to handle accepting the call
    console.log(`Accepted call for Token ID: ${tokenId}`);
  };

  const handleRejectCall = (tokenId) => {
    // Logic to handle rejecting the call
    console.log(`Rejected call for Token ID: ${tokenId}`);
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Patient Queue</h2>
      <div className="overflow-auto max-h-96">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Token ID</th>
              <th className="border border-gray-400 px-4 py-2">Patient ID</th>
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patientQueue.map((patient, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className="border border-gray-400 px-4 py-2">{patient.tokenId}</td>
                <td className="border border-gray-400 px-4 py-2">{patient.patientId}</td>
                <td className="border border-gray-400 px-4 py-2">{patient.name}</td>
                <td className="border border-gray-400 px-4 py-2">
                  <button onClick={() => handleAcceptCall(patient.tokenId)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Accept
                  </button>
                  <button onClick={() => handleRejectCall(patient.tokenId)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientQueue;
