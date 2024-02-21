
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QueuedPatient = () => {
    const [queuedPt, setQueuedPt] = useState([
        { patientId: 1, appointmentId: 101 },
        { patientId: 2, appointmentId: 102 },
        { patientId: 3, appointmentId: 103 },
        { patientId: 4, appointmentId: 104 },
        { patientId: 5, appointmentId: 105 },
        { patientId: 6, appointmentId: 106 }
    ]);
    const [isRotating, setIsRotating] = useState(false);
    const navigate = useNavigate();

    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 font-serif sm:px-2 sm:py-2 md:px-4 md:py-8 items-center justify-center float-right shadow-lg shadow-blue-500 shadow-opacity-70'>
            <div className='flex flex-row items-center space-x-2 px-8'>
                <h2 className='py-2 text-md'>Queued Patients</h2>
            </div>
            <div className='border-b-2 border-gray-500'></div>
            {queuedPt.length ? (
                queuedPt.map((p, index) => {
                    return (
                        <div key={index} className='px-2 py-2 flex flex-row items-center justify-evenly'>
                            Patient Id: {p.patientId}
                            <button
                                key={index}
                                className="menu-item bg-green-400 hover:bg-green-600 rounded-lg px-2"
                                onClick={() => {
                                    // Handle accepting patient logic here
                                }}
                                disabled={index === 1}
                            >
                                Accept
                            </button>
                        </div>
                    );
                })
            ) : (
                <h1>No Patients Waiting</h1>
            )}
        </div>
    )
}

export default QueuedPatient;