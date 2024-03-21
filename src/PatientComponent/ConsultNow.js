import React, { useState, useEffect } from "react";

const ConsultNow = () => {
  const [departments, setDepartments] = useState([
    { departmentName: "Department of Orthopedics" },
  { departmentName: "Department of Cardiology" },
  { departmentName: "Department of Neurology" },
  { departmentName: "Department of Oncology" },
  { departmentName: "Department of Pediatrics" },
  { departmentName: "Department of Gynecology" },
  { departmentName: "Department of Dermatology" },
  { departmentName: "Department of Ophthalmology" },
  { departmentName: "Department of Psychiatry" },
  ]);
  const languages = [
    "English",
    "Hindi",
    "Marathi",
    "Tamil",
    "Kannada",
    "Telugu",
    "Gujarati",
    "Punjabi",
    "Bengali",
    "Malayalam",
    "Urdu",
  ];
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLang, setIsOpenLang] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [prevConsultation, setprevConsultation] = useState(false);
  const [count, setCount] = useState(0);

  const toggleModal = () => {
    setShow(!show);
  };

  const handleSelectDepartment = (department) => {
    setSelectedDepartment(department);
    setIsOpen(false);
  };

  const handleSelectLanguage = (lang) => {
    setSelectedLanguage(lang);
    setIsOpenLang(false);
  };

  const OPD = () => {
    // Implement your functionality for OPD
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Implement your submitHandler logic
  };

  const deleteprevConsultation = () => {
    // Implement your deleteprevConsultation logic
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    // Fetch previous appointments and other necessary data
  }, [count]);

  return (
    <div className="flex flex-col items-center justify-center border-2 border-orange-600 rounded-lg p-8 space-y-8 w-full">
      <p className="font-normal text-5xl text-orange-950">Welcome to Healthiest</p>
      {/* Button to open modal */}
      {prevConsultation ?
        (<div className="flex flex-row justify-evenly  p-4 items-center w-full">
          <button
            className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={deleteprevConsultation}
          >
            Revoke Consultation
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={OPD}
          >
           Waiting Room
          </button>
        </div>)

        : <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          ConsultNow
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
              <div className="bg-orange-50 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between w-full p-4">
                  <h2 className="text-xl font-bold mb-2 font-normal ml-8">Apply for Consultation</h2>
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
                    className="p-2 bg-orange-100 w-full flex items-center justify-between mb-4 font-normal text-lg rounded-lg border-4 border-gray-500 active:border-orange-100 duration-300"
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
                          className="flex w-full justify-between hover:bg-orange-100 p-2 cursor-pointer"
                          onClick={() => handleSelectDepartment(department.departmentName)}
                        >
                          <h3>{department.departmentName}</h3>
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

export default ConsultNow;
