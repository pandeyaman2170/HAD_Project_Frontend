import React,{ useEffect, useState } from 'react'
import PatientNavbar from './PatientNavbar'
import namaste from '../components/images/7617.jpg'
import { useNavigate } from 'react-router-dom'

const PatientWaitingRoom = () => {

    const navigate = useNavigate()
    return (
        <>
            <PatientNavbar />
            <div className='bg-blue-50 p-16 h-screen w-full items-center justify-center'>
                <h1 className='text-5xl font-serif text-center'>Waiting Area</h1><br />
                <h3 className='text-lg font-serif text-center'>Please wait here for your turn</h3>
                <div className='border-2 border-gray-500 rounded-lg h-4/5 flex flex-row items-center justify-center space-x-16 p-2'>
                    <div className='w-3/5 h-full'>
                        <img src={namaste} 
                            alt='logo' className='w-full h-full object-cover' />
                    </div>
                    <div className='justify-center items-center flex flex-col gap-8 h-full w-1/6 p-8'>
                        <div className='border-2 border-gray-300 text-center justify-center p-4'>
                            <h1 className='font-serif text-9xl'>100</h1>
                        </div>
                        <div className='items-center justify-center'>
                            <button type="button" className="text-white w-full bg-green-500 hover:bg-green-700 font-serif text-lg rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0 transform transition duration-300 hover:scale-110">
                                Join Consultation
                            </button>
                            <button type="button" className="text-white w-full bg-gray-500 font-serif text-lg rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0" disabled>
                                Wait here
                            </button>                    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientWaitingRoom