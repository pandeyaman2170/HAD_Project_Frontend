import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from '../components/LoginNavbar';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const PatientRegistration = () => {

    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [gender, setGender] = useState("")
    const [selectedDate, setSelectedDate] = useState(null);
    const [email, setEmail] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pinCode, setPinCode] = useState("")
    const [otp, setOtp] = useState("");
    const [send, setSend] = useState(false);
    const [validOTP, setValidOTP] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
            },
            authentication
        );
    };

    async function sendOTP(e) {
        e.preventDefault();
        setSend(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, phoneNo, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const verifyOTP = (e) => {
        e.preventDefault();
        let confirmationResult = window.confirmationResult;
        confirmationResult
            .confirm(otp)
            .then((result) => {
                const userI = result.user;
                setValidOTP(true);
                setSend(false);
                alert("Number Verified")
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                alert("Invalid OTP");
                console.log(error);
            });
    };

    const addPatient = async () => {
        const data = {
            title: title,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phoneNo: phoneNo,
            email: email,
            dob: selectedDate,
            addr: address,
            city: city,
            pincode: pinCode,
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/patient/addPatient`, data)
            .then((response) => {
                console.log(response.data)
                console.log("user added")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await addPatient()
        navigate('/login')
    }

    return (
        <div className='flex flex-col justify-center'>
            <LoginNavbar />
            <div className='flex items-center justify-center h-screen mt-4'>
                <div className='w-full flex items-center justify-center'>
                    <form onSubmit={handleSubmit} className='w-4/5 p-8 items-center justify-evenly h-4/5 font-normal border-2 border-gray-200 rounded-lg'>
                        <h1 className='mb-10 text-center text-4xl'>Patient Registration</h1>
                        <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group" >
                                <select id="Title" className=" text-gray-900 text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-transparent" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required>
                                    <option>Title</option>
                                    <option>Mr.</option>
                                    <option>Miss.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="FirstName" id="FirstName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                <label for="FirstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firstname</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="LastName" id="LastName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                <label for="LastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 md:gap-6 align-center justify-center'>
                            <div className="relative z-0 w-full mb-6 group items-center justify-center" >
                                <select id="Gender" className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-transparent" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                    <option>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="relative w-full mb-6 group">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select DOB"
                                    className="block w-full px-4 py-2 text-gray-700 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-4 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="email" name="Email" id="Email" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <label for="Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className='relative z-0 w-full group flex flex-row items-center'>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="tel" pattern="[+0-9]{3}[0-9]{10}" autoComplete='false' name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required disabled={validOTP}/>
                                    <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (add +91)</label>
                                </div>
                                {validOTP ? (<div className='relative z-0 w-full mb-6 group'><FontAwesomeIcon icon={faCheck} style={{color: "#0bd046",}} /></div>
                                ) :(<div className='relative z-0 mb-6 group'>
                                    <button
                                        type="submit"
                                        className="w-20 h-8 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                                        onClick={sendOTP}
                                    >
                                        Send OTP
                                    </button>
                                </div>)}
                            </div>
                            {send ? (
                                (<div className='relative z-0 w-full group flex flex-row'>
                                    <div className='relative z-0 w-full group'>
                                        <input type="otp" name="OTP" id="OTP" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                        <label for="OTP" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter OTP</label>
                                    </div>
                                    <div className='relative z-0 group'>
                                        <button
                                            type="submit"
                                            className="w-20 h-8 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                                            onClick={verifyOTP}
                                        >
                                            Verify OTP
                                        </button>
                                    </div>
                                </div>)
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="Address" id="Address" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} required />
                            <label for="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="City" id="City" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={city} onChange={(e) => setCity(e.target.value)} required />
                                <label for="City" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                            </div><div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="State" id="State" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={state} onChange={(e) => setState(e.target.value)} required />
                                <label for="State" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="Pincode" id="Pincode" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                                <label for="Pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pincode</label>
                            </div>
                        </div>
                        <button type="submit" className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transform transition duration-300 hover:scale-110">Register</button>
                    </form>
                    <div id="recaptcha-container"></div>
                </div>
            </div>
        </div>
    )
}

export default PatientRegistration