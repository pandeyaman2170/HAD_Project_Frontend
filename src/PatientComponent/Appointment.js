import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const navigate = useNavigate()
  const patientDetails = JSON.parse(localStorage.getItem("patientDetails"))
  // const [patientDetails,setPatientDetails] = useState()
  const [departments, setDepartments] = useState()
  const languages = ["English", "Hindi", "Marathi", "Tamil","Kannada", "Telugu","Gujarati","Punjabi","Bengali","Malayalam","Urdu"]
  const [show, setShow] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenLang, setIsOpenLang] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [prevAppointment, setPrevAppointment] = useState(false)
  const [count, setCount] = useState(0)

  const toggleModal = () => {
    setShow(!show);
  }

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setIsOpen(false);
  }

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsOpenLang(false);
  }

  const fetchDept = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/department/getDepartment`)
      .then((response) => {
        setDepartments(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchPrevAppointment = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/appointment/checkAppointments/${patientDetails?.patientId}`
      )
      .then((response) => {
        setPrevAppointment(response.data)
      })
      .catch((error) => {
        console.log("error", error)
      });
  }

  const OPD = () => {
    navigate(`/patient/waitingroom`)
  }

  const submitHandler = async (event) => {
    // setShow(!show)
    event.preventDefault()
    const data = {
      appointmentTimestamp: new Date(),
      patientId: patientDetails?.patientId,
      departmentName: selectedDepartment,
      preferredLanguage: selectedLanguage
    }
    // console.log("data",data)
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/appointment/requestAppointment`,data)
      .then((response) => {
        console.log("appointment set", response.data)
        localStorage.setItem("ptAppointmentId", response.data)
        // const appId = response.data
        // console.log("appId",appId)
        navigate(`/patient/waitingroom`)
      })
      .catch((error) => {
        console.log(error)
      })
    setShow(!show)
  }

  const deletePrevAppointment = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    await axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/appointment/deleteAppointmentByPatientId/${patientDetails?.patientId}`
      )
      .then((response) => {
        setCount(count + 1);
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
        console.error("There was an error!", error);
      });
  }

  const handleClose = () => {
    setShow(false)
  }

  useEffect(() => {
    // setPatientDetails(JSON.parse(localStorage.getItem("patientDetails")))
    fetchDept()
    fetchPrevAppointment()
  }, [count])

  return (
    <div className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-8 space-y-8">
      <p className="font-serif text-5xl text-blue-950">Welcome to E-Aarogya</p>
      {/* Button to open modal */}
      {prevAppointment ?
        (<div className="flex flex-row justify-evenly  p-4 items-center w-full">
          <button
            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deletePrevAppointment}
          >
            Revoke Consultation
          </button>
          <button
            className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={OPD}
          >
           Waiting Room
          </button>
        </div>)

        : <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Apply for Consultation
        </button>
      }
      {/* Modal */}
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              {/* Modal content */}
              <div className="bg-blue-50 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between w-full p-4">
                  <h2 className="text-xl font-bold mb-2 font-serif ml-8">Apply for Consultation</h2>
                  <button onClick={handleClose}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500 hover:text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {/* department button */}
                <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                  <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="p-2 bg-blue-100 w-full flex items-center justify-between mb-4 font-serif text-lg rounded-lg border-4 border-gray-500 active:border-blue-100 duration-300"
                  >
                    {selectedDepartment ? selectedDepartment : "Select Department"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                      {departments.map((department, i) => (
                        <div
                          key={i}
                          className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                          onClick={() => handleSelectDepartment(department.departmentName)}
                        >
                          <h3>{department.departmentName}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* language button */}
                <div className="relative flex flex-col items-center w-[340px] rounded-lg">
                  <button
                    onClick={() => setIsOpenLang((prev) => !prev)}
                    className="p-2 bg-blue-100 w-full flex items-center justify-between font-serif text-lg rounded-lg border-4 border-transparent active:border-blue-100 duration-300"
                  >
                    {selectedLanguage ? selectedLanguage : "Select Language"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isOpenLang && (
                    <div className="bg-blue-50 mt-2 top-full flex flex-col items-start p-2 w-[340px] rounded-lg overflow-y-auto max-h-56">
                      {languages.map((lang, i) => (
                        <div
                          key={i}
                          className="flex w-full justify-between hover:bg-blue-100 p-2 cursor-pointer"
                          onClick={() => handleSelectLanguage(lang)}
                        >
                          <h3>{lang}</h3>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 mb-6"
                  onClick={submitHandler}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
