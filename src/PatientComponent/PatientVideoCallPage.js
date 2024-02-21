import React from 'react'
import { useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';
import FileUpload from './FileUpload';

const PatientVideoCallPage = () => {

    const navigate = useNavigate()
    return (
        <div className='bg-blue-50'>
            <PatientNavbar />
            <div className='grid grid-cols-5'>
                <div className='col-span-4 p-8' >
                    <div style={{ width: '100%', height: '75%' }} />
                </div>
                <div className='col-span-1 bg-indigo-200'><FileUpload /></div>
            </div>
        </div>
    )
}

export default PatientVideoCallPage