import React,{ useEffect, useState } from 'react'
import PatientNavbar from './PatientNavbar'
import namaste from '../components/images/waiting_room.jpg'
import { useNavigate } from 'react-router-dom'

const PatientWaitingRoom = () => {

    const navigate = useNavigate()
    return (
        <>
            <PatientNavbar />
            <div className='bg-orange-100 p-16 h-screen w-full items-center justify-center'>
                <h1 className='text-5xl font-normal text-center text-orange-900'>Waiting Room</h1><br />
                <h3 className='text-lg font-normal text-center text-orange-800'>Please wait here for your turn</h3>
                <div className='border-2 bg-orange-50 border-orange-700 rounded-lg h-4/5 flex flex-row items-center justify-center space-x-16 p-2 drop-shadow-xl'>
                    <div className='h-full'>
                        <img src={namaste} 
                            alt='logo' className='w-full h-full rounded-lg'/>
                    </div>
                    <div className='justify-center items-center flex flex-col gap-8 h-full w-1/6 p-8'>
                        <div className='border-2 border-gray-400 text-center justify-center p-4'>
                            <h1 className='font-normal text-9xl'>9</h1>
                        </div>
                        <div className='items-center justify-center'>
                            <button type="button" className="text-white w-full bg-green-700 hover:bg-green-700 font-normal text-lg rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0 transform transition duration-300 hover:scale-110">
                                Join Consultation
                            </button>
                            <br></br>
                            <br></br>
                            <button type="button" className="text-white w-full bg-orange-500 font-normal text-lg rounded-lg text-sm px-2 py-2 text-center mr-3 md:mr-0" disabled>
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