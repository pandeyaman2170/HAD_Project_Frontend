import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from "react-select";
import DoctorNavbar from './DoctorNavbar'

const DoctorProfile = () => {
  const dummyDoctorDetails = {
    title: "Dr.",
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    dob: "1990-01-01", // Format: YYYY-MM-DD
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    registration_number: "12345",
    departmentName: "Cardiology",
    addr: "123 Street Name",
    city: "New York",
    pincode: "10001",
    doctorLanguages: ["English", "Spanish"]
  };
  
  // Use dummy data if no doctorDetails found in localStorage
  const doctorDetailsJSON = localStorage.getItem("doctorDetails");
  const doctorDetails = doctorDetailsJSON ? JSON.parse(doctorDetailsJSON) : dummyDoctorDetails;
  
  const defaultSelectedDate = doctorDetails.dob ? new Date(doctorDetails.dob) : new Date();
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [title, setTitle] = useState(doctorDetails.title || "");
  const [firstName, setFirstName] = useState(doctorDetails.firstName || "");
  const [lastName, setLastName] = useState(doctorDetails.lastName || "");
  const [gender, setGender] = useState(doctorDetails.gender || "");
  const [email, setEmail] = useState(doctorDetails.email || "");
  const [phoneNo, setPhoneNo] = useState(doctorDetails.phoneNumber || "");
  const [registrationNo, setRegistrationNo] = useState(doctorDetails.registration_number || "");
  const [drDept, setDrDept] = useState(doctorDetails.departmentName || "");
  const [address, setAddress] = useState(doctorDetails.addr || "");
  const [city, setCity] = useState(doctorDetails.city || "");
  const [pinCode, setPinCode] = useState(doctorDetails.pincode || "");
  const [drLang, setDrLang] = useState(doctorDetails.doctorLanguages || []);
  ;
  const options = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Marathi", label: "Marathi" },
    { value: "Tamil", label: "Tamil" },
    { value: "Kannada", label: "Kannada" },
    { value: "Telugu", label: "Telugu" },
    { value: "Gujarati", label: "Gujarati" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "Bengali", label: "Bengali" },
    { value: "Malayalam", label: "Malayalam" },
    { value: "Urdu", label: "Urdu" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.5rem",
    }),
  };

  const handleDrLang = (selectedOptions) => {
    setDrLang(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dummy data fetch
    const response = { data: "Dummy Data" };
    localStorage.setItem("doctorDetails", JSON.stringify(response.data));
  }
  const profilePhoto = require('../components/images/handsome-indian-doctor-generate-ai-photo-removebg-preview.png');
  return (
    <div>
      <DoctorNavbar />
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
               <select id="Title" className="bg-transparent text-zinc-500 text-sm rounded-lg border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} readOnly>
                  <option>{title}</option>
                  <option>Mr.</option>
                  <option>Miss.</option>
                  <option>Mrs.</option>
                </select>

              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="FirstName" id="FirstName" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={firstName} onChange={(e) => setFirstName(e.target.value)} readOnly />
                <label for="FirstName" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Firstname</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="LastName" id="LastName" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={lastName} onChange={(e) => setLastName(e.target.value)} readOnly />
                <label for="LastName" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Lastname</label>
              </div>
            </div>
            <div className='grid md:grid-cols-2 md:gap-6 align-center justify-center'>
              <div className="relative z-0 w-full mb-6 group items-center justify-center" >
                <select id="Gender" className="bg-transparent border-2 border-gray-200 text-zinc-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" disabled>
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
                  className="bg-transparent block w-full px-4 py-2 text-zinc-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6 align-center justify-center">
              <div className="relative z-0 w-full mb-6 group">
                <input type="email" name="Email" id="Email" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  required />
                <label for="Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="tel" pattern="[+0-9]{3}[0-9]{10}" autoComplete='false' name="floating_phone" id="floating_phone" className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (add +91)</label>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="RegistrationNo" id="RegistrationNo" autoComplete='false' className="bg-transparent block py-2.5 px-0 w-full text-sm text-zinc-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                <label for="RegistrationNo" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Registration Number</label>
              </div>
              <div className="relative z-0 w-full mb-6 group items-center justify-center" >
              <select id="Department" className="bg-transparent border-2 border-gray-200 text-zinc-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 bg-white" readOnly>
                  <option>{drDept}</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="relative z-10 w-full mb-6 group items-center justify-center" >
                <Select
                  isMulti
                  options={options}
                  value={drLang.map((language) => ({ value: language, label: language }))}
                  onChange={handleDrLang}
                  styles={customStyles}
                  className="bg-transparent mt-1"
                  placeholder="Select languages"
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input type="text" name="Address" id="Address" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="City" id="City" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="City" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="Pincode" id="Pincode" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="Pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Pincode</label>
              </div>
            </div>
            <button type="submit" className="text-white bg-orange-400 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-500 dark:hover:bg-orange-700 dark:focus:ring-orange-800 mx-auto block">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile