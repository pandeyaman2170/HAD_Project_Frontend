import React from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';
import FileUpload from './FileUpload';
import VideoCall from './VideoCall';

const PatientVideoCallPage = () => {
    const navigate = useNavigate();

    return (
        <div className='bg-blue-50'>
            <PatientNavbar />
            <div className='grid grid-cols-2'>
                {/* Video Call Section */}
                <div className='p-0'>
                    <VideoCall />
                </div>
                {/* File Upload Section */}
                <div className='p-0 bg-orange-100'>
                    <FileUpload />
                </div>
            </div>
        </div>
    );
}

export default PatientVideoCallPage;
