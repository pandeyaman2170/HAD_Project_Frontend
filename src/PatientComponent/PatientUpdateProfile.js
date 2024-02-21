import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from "react-select";
import PatientNavbar from './PatientNavbar'

const PatientUpdateProfile = () => {
  const dummyPatientDetails = {
    title: "Mr.",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01", // Format: YYYY-MM-DD
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    addr: "123 Street Name",
    city: "New York",
    pincode: "10001",
  };

  // Use dummy data if no patientDetails found in localStorage
  const patientDetailsJSON = localStorage.getItem("patientDetails");
  const patientDetails = patientDetailsJSON ? JSON.parse(patientDetailsJSON) : dummyPatientDetails;

  const defaultSelectedDate = patientDetails.dob ? new Date(patientDetails.dob) : new Date();
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [title, setTitle] = useState(patientDetails.title || "");
  const [firstName, setFirstName] = useState(patientDetails.firstName || "");
  const [lastName, setLastName] = useState(patientDetails.lastName || "");
  const [gender, setGender] = useState(patientDetails.gender || "");
  const [email, setEmail] = useState(patientDetails.email || "");
  const [phoneNo, setPhoneNo] = useState(patientDetails.phoneNumber || "");
  const [address, setAddress] = useState(patientDetails.addr || "");
  const [city, setCity] = useState(patientDetails.city || "");
  const [pinCode, setPinCode] = useState(patientDetails.pincode || "");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dummy data fetch
    const response = { data: "Dummy Data" };
    localStorage.setItem("patientDetails", JSON.stringify(response.data));
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
    }),
  };
  const profilePhoto = require('../components/images/handsome-indian-doctor-generate-ai-photo-removebg-preview.png');
  return (
    <div>
      <PatientNavbar />
      <div>
        <div className='w-full flex justify-center bg-blue-50'>
          <form className='bg-blue-50 w-4/5 p-8 items-center justify-evenly h-4/5 font-normal border-2 border-orange-600 '>
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-60 h-30 rounded-full mx-auto mb-8"
          />
            <h1 className='mb-8 text-center text-4xl'>{firstName} {lastName}</h1>
            <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
              <div className="relative z-0 w-full mb-6 group" >
                <select id="Title" className="bg-transparent text-zinc-500 text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} required>
                  <option>{title}</option>
                  <option>Mr.</option>
                  <option>Miss.</option>
                  <option>Mrs.</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="FirstName" id="FirstName" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                <label htmlFor="FirstName" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firstname</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="LastName" id="LastName" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <label htmlFor="LastName" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <DatePicker className="bg-transparent text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" selected={selectedDate} onChange={date => setSelectedDate(date)} required />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <select id="Gender" className="bg-transparent text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option>{gender}</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="email" name="Email" id="Email" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="Email" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="tel" name="PhoneNumber" id="PhoneNumber" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                <label htmlFor="PhoneNumber" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="Address" id="Address" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} required />
                <label htmlFor="Address" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="City" id="City" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={city} onChange={(e) => setCity(e.target.value)} required />
                <label htmlFor="City" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="PinCode" id="PinCode" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                <label htmlFor="PinCode" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pin Code</label>
              </div>
            </div>
            <button type="submit" className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800 mx-auto block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PatientUpdateProfile;
