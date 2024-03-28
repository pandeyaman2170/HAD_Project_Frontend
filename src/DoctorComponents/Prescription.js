import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareMinus, faSquarePlus, faArrowsRotate, faCircleArrowUp, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientMedicalHistory from './PatientMedicalHistory';
import GradientLogo from "../components/images/whiteLogo.png";
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

const Prescription = () => {
    const navigate = useNavigate()
    const patientId = localStorage.getItem("DrPatientId");
    const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"))
    const [observation, setObservation] = useState("")
    const [advice, setAdvice] = useState("")
    const [allMedicineData, setAllMedicineData] = useState([]);
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [showHistory, setShowHistory] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [isRotating, setIsRotating] = useState(false)
    const [ptHistory, setPtHistory] = useState(false)
    const [fileList, setFileList] = useState([])
    const [patientDetail, setPatientDetail] = useState([
        {
            patientId: 1,
            firstName: "",
            lastName: "",
            dob: "",
        },
    ]);
    const [clickedButton, setClickedButton] = useState(false);

    const [inputFeilds, setInputFeilds] = useState([
        { medicine: "", dosage: "" },
    ]);

    const medicineString = inputFeilds
        .map((item) => {
            return `${item.medicine}-->${item.dosage}`;
        })

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay))
    }
    const handleClick = async () => {
        setIsRotating(true)
        await fetchPtHistory()
        await timeout(1000)
        handleAnimationEnd()
    }

    const handleAnimationEnd = () => {
        setIsRotating(false)
    }

    const getAllMedicine = async () => {
        await axios
            .get("https://rxnav.nlm.nih.gov/REST/displaynames.json")
            .then((response) => {
                setAllMedicineData(response.data.displayTermsList.term);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const fetchPatientDetail = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios
            .get(`http://localhost:8090/patient/getPatientById/${patientId}`)
            .then((response) => {
                console.log("patientDetail", response.data);
                setPatientDetail(response.data);
                console.log("patients", patientDetail);
            })
            .catch((error) => {
                console.log("error:", error);
            });
    };
    const handleFormChange = (index, event) => {
        let data = [...inputFeilds];
        data[index][event.target.name] = event.target.value;
        setInputFeilds(data);
    };

    const addFields = (event) => {
        event.preventDefault();
        let newfield = { medicine: "", dosage: "" };
        setInputFeilds([...inputFeilds, newfield]);
    };


    const removeFields = (index) => {
        let data = [...inputFeilds];
        data.splice(index, 1);
        setInputFeilds(data);
    };

    const handleToggle = () => {
        setIsDatePickerVisible(!isDatePickerVisible)
    };

    const handleHistory = () => {
        setShowHistory(!showHistory)
    }

    const calculateAge = (dateOfBirth) => {
        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        return age;
    }

    const ptAge = calculateAge(patientDetail.dob)

    const submitHandler = async (event) => {
        setClickedButton(true)
        event.preventDefault();
        const data = {
            consultationDate: new Date(),
            observation: observation,
            medicine: medicineString,
            remark: advice,
            doctorId: doctorDetails.doctorId,
            patientName: patientDetail.firstName,
            patientId: patientId,
            followUpDate: selectedDate,
        };
        // console.log("form updated data", data);
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios
            .post(`http://localhost:8090/prescription/addPrescription`, data)
            .then((response) => {
                // console.log("inside post prescription api");
                // console.log(response.data);
                // deletePtHistory()
                navigate(`/doctor`);
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    const fetchPtHistory = async () => {
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.get(`http://localhost:8090/aws/getAllFilesDoctor/${patientId}`)
            .then((response) => {
                console.log("fetched files", response.data)
                setFileList(response.data)
                setPtHistory(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleViewClick = async (fileKey) => {
        console.log(`File key:`,fileKey);
        const jwtToken=localStorage.getItem("jwtToken");
        axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
        await axios.get(`http://localhost:8090/aws/downloadFile/${fileKey}`, { responseType: 'arraybuffer' })
            .then(response => {
                console.log("fileeeee")
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchPatientDetail();
        getAllMedicine();

        const handleBeforeUnload = (event) => {
            if (!clickedButton) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [clickedButton]);



                // // Define ptAge function
    // const calculateAge = (dateOfBirth) => {
    //     const dob = new Date(dateOfBirth);
    //     const today = new Date();
    //     let age = today.getFullYear() - dob.getFullYear();
    //     return age;
    // };
    //
    // const ptAge = patientDetail[0]?.dob ? calculateAge(patientDetail[0].dob) : 0;
    //
    // // Define handleFormChange function
    // const handleFormChange = (index, event) => {
    //     let data = [...inputFeilds];
    //     data[index][event.target.name] = event.target.value;
    //     setInputFeilds(data);
    // };
    //
    // // Define removeFields function
    // const removeFields = (index) => {
    //     let data = [...inputFeilds];
    //     data.splice(index, 1);
    //     setInputFeilds(data);
    // };
    //
    // // Define addFields function
    // const addFields = (event) => {
    //     event.preventDefault();
    //     let newfield = { medicine: "", dosage: "" };
    //     setInputFeilds([...inputFeilds, newfield]);
    // };
    //
    // // Define handleToggle function
    // const handleToggle = () => {
    //     setIsDatePickerVisible(!isDatePickerVisible);
    // };
    //
    // // Define handleHistory function
    // const handleHistory = () => {
    //     setShowHistory(!showHistory);
    // };
    //
    // // Define submitHandler function
    // const submitHandler = async (event) => {
    //     setClickedButton(true);
    //     event.preventDefault();
    //     // Rest of the function implementation remains the same
    // };
    // function timeout(delay) {
    //     return new Promise(res => setTimeout(res, delay));
    // }
    //
    // const handleAnimationEnd = () => {
    //     setIsRotating(false);
    // };
    //
    // // Remove the function to fetch all medicines from Axios
    // const getAllMedicine = async () => {
    //     await axios
    //         .get("https://rxnav.nlm.nih.gov/REST/displaynames.json")
    //         .then((response) => {
    //             setAllMedicineData(response.data.displayTermsList.term);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };
    //
    // // Remove the function to fetch patient detail from Axios
    // const fetchPatientDetail = async () => {
    //     // Mock patient detail
    //     const mockPatientDetail = {
    //         patientId: 1,
    //         firstName: "John",
    //         lastName: "Doe",
    //         dob: "01-01-1980",
    //         gender: "Male",
    //     };
    //     setPatientDetail(mockPatientDetail);
    // };
    //
    // // Remove the function to fetch patient history from Axios
    // const fetchPtHistory = async () => {
    //     // Mock file list for patient history
    //     const mockFileList = ["file1.pdf", "file2.pdf", "file3.pdf"];
    //     setFileList(mockFileList);
    //     setPtHistory(true);
    // };
    //
    // // Modify the view handler to open a new tab with mock data
    // const handleViewClick = (fileKey) => {
    //     // Mock action to open a new tab with file
    //     window.open(`https://example.com/${fileKey}`);
    // };
    //
    // useEffect(() => {
    //     fetchPatientDetail();
    //     getAllMedicine();
    //
    //     const handleBeforeUnload = (event) => {
    //         if (!clickedButton) {
    //             event.preventDefault();
    //             event.returnValue = '';
    //         }
    //     };
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [clickedButton]);

    return (
        <div className='w-full p-8 items-center justify-center bg-orange-50 border-l-4 border-b-4 shadow-lg border-orange-600'>
        <div className='grid grid-row-2'>
            <div className='relative z-0 w-full mb-6 group font-normal'>
                {/* <img src={GradientLogo} alt='logo' className='mx-auto w-48' /> */}
                <div className="flex items-center flex-shrink-0 md:justify-center">
                  <div className="font-bold text-5xl cursor-pointer flex items-center text-orange-700 font-poppins">
                  <span className="text-6xl text-orange-700 pr-2">
                    <ion-icon name="logo-ionic"></ion-icon>
                  </span>
                  <span className="text-5xl text-blue font-roboto text-center">Healthiest</span>
                  </div>
                </div>
            </div>
            <div className='relative z-0 w-full mb-6 group font-normal text-lg text-center font-bold'>
                <p className='font-bold'>Name : {patientDetail.firstName}</p>
                <p className='font-bold'>Gender : {patientDetail.gender}</p>
                <p className='font-bold'>Age : {ptAge}</p>
            </div>
        </div>
        <form className='items-center justify-evenly'>
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="symptom" id="symptom" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={observation} onChange={(e) => setObservation(e.target.value)} required />
                <label htmlFor="symptom" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Symptom</label>
            </div>
            {inputFeilds.map((input, index) => {
                return (
                    <div key={index}>
                        <div className='grid grid-cols-5 gap-4'>
                            <div className="col-span-4 grid md:grid-cols-3 md:gap-6" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridColumnGap: "1.5rem" }}>
                                <div className="relative z-0 w-full mb-6 group" style={{ gridColumn: "1/3" }}>
                                    <input type="text" name="medicine" id="medicine" autoComplete='false' value={input.medicine} onChange={(event) => handleFormChange(index, event)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                    <label htmlFor="medicine" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Medicine</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group" style={{ gridColumn: "3/5" }}>
                                    <input type="text" name="dosage" id="dosage" autoComplete='false' value={input.dosage} onChange={(event) => handleFormChange(index, event)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " required />
                                    <label htmlFor="dosage" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dosage</label>
                                </div>
                                <div className="relative z-0 w-full mb-6 group space-x-2" style={{ gridColumn: "5/7" }}>
                                    <button onClick={() => removeFields(index)}><FontAwesomeIcon icon={faSquareMinus}   size='2xl' style={{ color: "#ec0909", }} /></button>
                                </div>
                            </div>
                            <div className='col-span-1'>
                                <button onClick={addFields}><FontAwesomeIcon icon={faSquarePlus} size='2xl' style={{ color: "#008000", }} /></button>
                            </div>
                        </div>
                        <Dropdown
                            style={{
                                position: "absolute",
                                backgroundColor: "white", // Set background color to white
                                borderRadius: "4px", // Set border radius to create rounded corners
                                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)", // Add a box shadow for depth
                                padding: "3px", // Add padding to create spacing between items
                                zIndex: "9999",
                                maxWidth: "35%",
                                maxHeight: "35%",
                                overflow: "auto",
                            }}
                        >
                            {allMedicineData
                                .filter((item) => {
                                    const searchItem = input.medicine.toLowerCase();
                                    const medicine = item.toLowerCase();
                                    return (
                                        medicine.indexOf(searchItem) > -1 &&
                                        searchItem != medicine &&
                                        searchItem.length >= 1
                                    );
                                })
                                .slice(0, 10)
                                .map((item) => (
                                    <Dropdown.Item
                                        key={item}
                                        onClick={() => {
                                            const updatedInputFields = [...inputFeilds];
                                            updatedInputFields[index].medicine = item;
                                            setInputFeilds(updatedInputFields);
                                        }}
                                        style={{
                                            // Add additional styling for each item
                                            padding: "5px 10px", // Add padding to create spacing within each item
                                        }}
                                    >
                                        {item}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown>
                    </div>
                )
            })}
            <div className="relative z-0 w-full mb-6 group">
                <input type="text" name="Remarks" id="Remarks" autoComplete='false' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-orange-500 focus:outline-none focus:ring-0 focus:border-orange-600 peer" placeholder=" " value={advice} onChange={(e) => setAdvice(e.target.value)} required />
                <label htmlFor="Remarks" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-600 peer-focus:dark:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Medical Findings</label>
            </div>
            {/* show follow-up */}
            <div className='relative z-0 w-full mb-6 group'>
                <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={isDatePickerVisible}
                            onChange={handleToggle}
                            placeholder='Select Date'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                        <span className="ml-3 text-sm font-normal text-gray-900 dark:text-gray-800">
                            Follow up
                        </span>
                    </label>
                </div>
                {isDatePickerVisible && (
                    <div className="relative w-1/3 mb-6 group">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Add follow-up"
                            className="block w-full px-4 py-2 text-gray-700 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                )}
            </div>
            <button type="submit" onClick={submitHandler} className="mb-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Prescription</button>


            {/* show patient history */}
            <div className='relative z-0 w-full mb-6 group'>
                <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            value=""
                            className="sr-only peer"
                            checked={showHistory}
                            onChange={handleHistory}
                            placeholder='Show Patient Medical History'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-serif text-gray-900 dark:text-gray-800">
                                Show Patient Medical History
                            </span>
                    </label>
                </div>
                {showHistory && (<PatientMedicalHistory patientDetail={patientDetail} />)}
            </div>

            <div className=" flex flex-col border-2 rounded-lg border-orange-600 items-center justify-center p-4">
                <div className='flex flex-row items-center space-x-2 px-8'>
                    <p className='py-2 text-sm text-gray-900 font-normal'>Patient's Uploaded Health Records</p>
                    <button onClick={handleClick}>
                        <FontAwesomeIcon icon={faArrowsRotate} className={`text-gray-600 ${isRotating ? "animate-spin" : ""}`} />
                    </button>

                </div>
                {ptHistory ?
                    (<div>
                        <ul>
                            {fileList.map((file,index) => (
                                <div className="flex flex-row p-2" key={file.Key}>
                                    <li>
                                        {file}
                                    </li>
                                    <li key={`view-${index}`}>
                                        <button className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleViewClick(file)}>
                                            View
                                        </button>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>)
                    : (<div className="flex items-center justify-center space-y-4"><p className="text-sm text-zinc-400 font-normal">No records found</p></div>
                    )}
            </div>
        </form>
    </div>
    );
};

export default Prescription;
