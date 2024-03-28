import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GlobalAdminNavbar from './GlobalAdminNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHospita = () => {

    const navigate = useNavigate()
    const [hospitalName, sethospitalName] = useState("")
    const [hospitalUserName, sethospitalUserName]=useState("");
    const [hospitalUserPassword, sethospitalUserPassword] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [address, setAddress] = useState("")
    // const [admin, setAdmin] = useState()

    // const [selectedDepartment, setSelectedDepartment] = useState("");
    const [department, setDepartment] = useState("");

    const hospitalProfilePhoto = require('../components/images/hospitalProfileImage.png');


    const addHosAddHospita = async () => {
        const data = {
            name: hospitalName,
            location: address,
            phone: phoneNo,
            hospitalUserName: hospitalUserName,
            hospitalPassword: hospitalUserPassword,
        }
        console.log("data as JSON:", data);

        const admin = JSON.parse(localStorage.getItem('globalAdminDetails'))
        const token = localStorage.getItem('jwtToken');
        if (!admin || !token) {
            navigate('/global_admin/login')
            return
          }
        console.log(admin);
        console.log(token);

        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`
        await axios.post(`http://localhost:8090/global_admin/addHospital/${admin.id}`, data)
            .then((response) => {
                console.log(response.data)
                console.log("hospital added")
                toast.success('Hospital added successfully!', {
                    position: 'top-right',
                    autoClose: 3000, // Close the alert after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                //   const notify = () => toast(`Request sent to ${response.data} for room swapping`);
                //   notify();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await addHosAddHospita();
        // navigate('/admin');
    }

    return (
        <div className='flex flex-col justify-center bg-orange-200'>
            <GlobalAdminNavbar />
            <div className='flex items-center justify-center h-screen mt-4 '>
                <div className='w-screen flex items-center justify-center'>
                    <form onSubmit={handleSubmit} className='w-4/5 p-8 items-center justify-evenly h-4/5 font-normal border-2 border-gray-500 rounded-lg bg-orange-100 drop-shadow-xl'>
                        <img
                            src={hospitalProfilePhoto}
                            alt="Profile"
                            className="w-20 h-30 rounded-lg mx-auto mb-8 drop-shadow-xl"
                        />
                        <h1 className='mb-10 text-center text-4xl font-extrabold text-orange-900'>Add Hospital</h1>
                        <div className="grid md:grid-cols-3 md:gap-6 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="hospitalName" id="hospitalName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-700 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={hospitalName} onChange={(e) => sethospitalName(e.target.value)} required />
                                <label htmlFor="hospitalName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-700 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="hospitalUserName" id="hospitalName" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-700 dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={hospitalUserName} onChange={(e) => sethospitalUserName(e.target.value)} required />
                                <label htmlFor="hospitalUserName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-700 peer-focus:dark:text-orange-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Hospital UserName</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 md:gap-4 align-center justify-center">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="hospitalUserPassword" name="hospitalUserPassword" id="hospitalUserPassword" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={hospitalUserPassword} onChange={(e) => sethospitalUserPassword(e.target.value)} required />
                                <label htmlFor="hospitalUserPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">hospitalUserPassword</label>
                            </div>
                            <div className='relative z-0 w-full group flex flex-row items-center'>
                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="tel" pattern="[+0-9]{3}[0-9]{10}" autoComplete='false' name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
                                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (add +91)</label>
                                </div>
                            </div>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="Address" id="Address" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={address} onChange={(e) => setAddress(e.target.value)} required />
                            <label htmlFor="Address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                        </div>
                        <div className="relative z-0 w-full group text-center">
                            <button type="submit" className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transform transition duration-300 hover:scale-110">Register</button>
                        </div>
                    </form>
                </div>
                <ToastContainer/>
            </div>
        </div>
    )
}

export default AddHospita