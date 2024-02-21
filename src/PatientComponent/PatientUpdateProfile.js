import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from './PatientNavbar';

const PatientUpdateProfile = () => {

    const navigate = useNavigate()
    // const patientDetails = JSON.parse(localStorage.getItem("patientDetails"))
    // const patientId = patientDetails.patientId
    // const [title, setTitle] = useState(patientDetails.title)
    // const [firstName, setFirstName] = useState(patientDetails.firstName)
    // const [lastName, setLastName] = useState(patientDetails.lastName)
    // const [gender, setGender] = useState(patientDetails.gender)
    // const [selectedDate, setSelectedDate] = useState(new Date(patientDetails.dob))
    // const [email, setEmail] = useState(patientDetails.email)
    // const [phoneNo, setPhoneNo] = useState(patientDetails.phoneNo)
    // const [address, setAddress] = useState(patientDetails.addr)
    // const [city, setCity] = useState(patientDetails.city)
    // const [pinCode, setPinCode] = useState(patientDetails.pincode)

    // const handleSubmit = async (event) => {
    //     event.preventDefault()
    //     const data = {
    //         title: title,
    //         firstName: firstName,
    //         lastName: lastName,
    //         gender: gender,
    //         phoneNo: phoneNo,
    //         email: email,
    //         dob: selectedDate,
    //         addr: address,
    //         city: city,
    //         pincode: pinCode,
    //     }
    //     const jwtToken=localStorage.getItem("jwtToken");
    //     axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    //     await axios.put(`${process.env.REACT_APP_BACKEND_URL}/patient/updatePatient/${patientId}`, data)
    //         .then((response) => {
    //             // console.log(JSON.stringify(response.data));
    //             localStorage.setItem("patientDetails", JSON.stringify(response.data));
    //             navigate("/patient");
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }

    return (
        <div>
            <PatientNavbar />
            <div className='flex items-center justify-center'>
                <div className='w-full flex items-center justify-center mt-10'>
                    <form className='w-4/5 p-8 items-center justify-evenly h-4/5 font-serif border-2 border-gray-200 rounded-lg'>
                        <h1 className='mb-10 text-center text-4xl'>Patient Profile</h1>
                        <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group" >
                                {/* <label for="Title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label> */}
                                {/* <select id="Title" className=" text-gray-900 text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" placeholder='Title'  value={title} onChange={(e) => setTitle(e.target.value)} required> */}
                                <select id="Title" className=" text-gray-900 text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" placeholder='Title' required>
                                    <option>Title</option>
                                    <option>Mr.</option>
                                    <option>Miss.</option>
                                    <option>Mrs.</option>
                                </select>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="text" name="FirstName" id="FirstName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} required /> */}
                                <input type="text" name="FirstName" id="FirstName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="FirstName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firstname</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="text" name="LastName" id="LastName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={lastName} onChange={(e) => setLastName(e.target.value)} required /> */}
                                <input type="text" name="LastName" id="LastName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="LastName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
                            </div>
                        </div>
                        <div className='grid md:grid-cols-2 md:gap-6 align-center justify-center'>
                            <div className="relative z-0 w-full mb-6 group items-center justify-center" >
                                {/* <label for="Title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label> */}
                                {/* <select id="Gender" className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" value={gender} onChange={(e) => setGender(e.target.value)} required> */}
                                {/* <select id="Gender" className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" value={gender} required> */}
                                <select id="Gender" className="border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" required>
                                    <option>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="relative w-full mb-6 group">
                                <DatePicker
                                    // selected={selectedDate}
                                    // onChange={(date) => setSelectedDate(date)}
                                    // dateFormat="dd/MM/yyyy"
                                    // placeholderText="Select DOB"
                                    // className="block w-full px-4 py-2 text-zinc-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    // disabled
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="email" name="Email" id="Email" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required /> */}
                                <input type="email" name="Email" id="Email" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="tel" pattern="[+0-9]{3}[0-9]{10}" autoComplete='false' name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-zinc-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} disabled/> */}
                                <input type="tel" pattern="[+0-9]{3}[0-9]{10}" autoComplete='false' name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-zinc-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled/>
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (add +91)</label>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            {/* <input type="text" name="Address" id="Address" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} required /> */}
                            <input type="text" name="Address" id="Address" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="text" name="City" id="City" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={city} onChange={(e) => setCity(e.target.value)} required /> */}
                                <input type="text" name="City" id="City" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="City" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                            </div>
                            {/* <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="State" id="State" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={state} onChange={(e) => setState(e.target.value)} required />
                                <label for="State" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                            </div> */}
                            <div className="relative z-0 w-full mb-6 group">
                                {/* <input type="text" name="Pincode" id="Pincode" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={pinCode} onChange={(e) => setPinCode(e.target.value)} required /> */}
                                <input type="text" name="Pincode" id="Pincode" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="Pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pincode</label>
                            </div>
                        </div>
                        {/* <button type="submit" className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleSubmit}>Update</button> */}
                        <button type="submit" className="text-white bg-green-400 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PatientUpdateProfile