import React, { useState } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from 'axios';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from '../firebase';

const PatientMedicalHistory = ({ patientDetail }) => {
    const phoneNo = patientDetail.phoneNo
    const patientId = localStorage.getItem("DrPatientId")
    const [showMedicalHistory, setShowMedicalHistory] = useState(false)
    const [showVerifyOTP, setShowVerifyOTP] = useState(false)
    const [otp, setOtp] = useState()
    const [prescription, setPrescription] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(2);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prescription.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(prescription.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <li key={number} className={`p-4 cursor-pointer ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`} onClick={() => setCurrentPage(number)}>
            {number}
        </li>
    ));


    const fetchPrescription = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        console.log("pt id",patientId)
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/prescription/getPrescriptionsDoctor/${patientId}`)
            .then((response) => {
                console.log("egfgwe")
                setPrescription(response.data)
                console.log("prescription", prescription)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const downloadPDF = async (id, date) => {
        try {
            const jwtToken=localStorage.getItem("jwtToken");
            axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/pdf/getPdfDoctor/${id}`, {
                responseType: 'blob',
            });
            console.log("inside download pdf")
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const newWindow = window.open();
            newWindow.document.write(`<iframe src="${url}" width="100%" height="100%"></iframe>`);
        } catch (error) {
            console.log(error);
        }
    };

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            getAuth(initializeApp(firebaseConfig))
        )
    }

    async function sendOTP(e) {
        e.preventDefault();
        setShowVerifyOTP(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(getAuth(initializeApp(firebaseConfig)), phoneNo, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                alert("Otp sent to patient")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        let confirmationResult = window.confirmationResult;
        confirmationResult
            .confirm(otp)
            .then((result) => {
                // User signed in successfully.
                fetchPrescription();
                setShowMedicalHistory(true);
                const user = result.user;
                console.log(result);
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log(error);
            })
    }



    return (
        <div>
            {!showMedicalHistory && (<div>
                {!showVerifyOTP && (<button
                    type="submit"
                    className="px-2 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
                    onClick={sendOTP}
                >
                    Send OTP
                </button>)}
                <p className='text-sm text-zinc-500 font-normal'>Patient needs to allow the access to his medical history</p>
                {showVerifyOTP && (
                    <div className="mt-2 grid md:grid-cols-2 md:gap-6 align-center justify-center">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="otp" id="otp" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            <label htmlFor="otp" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter OTP</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <button
                                type="submit"
                                className="px-2 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600"
                                onClick={verifyOTP}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                )}
                <div id="recaptcha-container"></div>
            </div>
            )}
            {showMedicalHistory && (
                <div className="p-2 rounded-lg border-2 border-gray-200">
                    <table className="table-auto w-full mx-auto">
                        <caption className="caption-top font-normal text-xl p-2 border-b-2">Prescriptions</caption>
                        <thead className="font-normal text-md">
                            <tr>
                                <th>Date</th>
                                <th>Symptom</th>
                                {/* <th>Remarks</th> */}
                                <th>PDF</th>
                            </tr>
                        </thead>
                        <tbody className="font-normal text-sm text-center">
                            {currentItems.length > 0 ? (
                                currentItems.map((p) => (
                                    <tr key={p.prescriptionId} className='bg-blue-50 border-2'>
                                        <td>{p.consultationDate}</td>
                                        <td>{p.observation}</td>
                                        {/* <td>{p.remark}</td> */}
                                        <td className='p-2'>
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                                                onClick={() => downloadPDF(p.prescriptionId, p.date)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No prescriptions found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <ul className="flex justify-center mt-4">
                        {renderPageNumbers}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default PatientMedicalHistory