import React, {useEffect, useState} from 'react';
import DoctorNavbar from './DoctorNavbar';
import PatientQueue from './PatientQueue';
import axios from "axios";
import { useTranslation } from "react-i18next";

// TodayConsultation component
// const TodayConsultation = () => {
//   // Dummy data for today's consultations
//   const todayConsultations = [
//     { patientId: 4, medicalFindings: 'Headache', remarks: 'Mild' },
//     { patientId: 5, medicalFindings: 'Back pain', remarks: 'Moderate' },
//     // Add more today's consultations data as needed
//   ];
//
//   return (
//     <div className="bg-orange-100 shadow-lg rounded-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Today's Consultations</h2>
//       <div className="overflow-auto max-h-96">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-orange-200">
//               <th className="border border-orange-400 px-4 py-2">Patient ID</th>
//               <th className="border border-orange-400 px-4 py-2">Medical Findings</th>
//               <th className="border border-orange-400 px-4 py-2">Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todayConsultations.map((consultation, index) => (
//               <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-100'}>
//                 <td className="border border-orange-400 px-4 py-2">{consultation.patientId}</td>
//                 <td className="border border-orange-400 px-4 py-2">{consultation.medicalFindings}</td>
//                 <td className="border border-orange-400 px-4 py-2">{consultation.remarks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// DoctorDashboard component
const DoctorDashboard = () => {
  const [dailyLog, setDailyLog] = useState()
  const [totalConsult, setTotalConsult] = useState(0)
  const [todayConsult, setTodayConsult] = useState(0)
  // const doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
  let doctorDetails;
  //const totalConsultations = 10345;

  // // Dummy data for past history
  // const pastHistory = [
  //   { patientId: 1, medicalFindings: 'Sneezing', remarks: 'Severe' },
  //   { patientId: 2, medicalFindings: 'Cough', remarks: 'Mild' },
  //   { patientId: 3, medicalFindings: 'Fever', remarks: 'Severe' },
  //   // Add more past history data as needed
  // ];

  // const [showAllPastConsultations, setShowAllPastConsultations] = useState(false);
  //
  // const handleShowAllPastConsultations = () => {
  //   setShowAllPastConsultations(!showAllPastConsultations); // Toggle the value
  // };

  const { t } = useTranslation();
  const fetchTotalConsult = async () => {
    const jwtToken=localStorage.getItem("jwtToken");
    axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
    //await axios.get(`http://localhost:9090/consultation/getAllConsultationsCount`)
    await axios.get(`http://localhost:8090/consultation/totalConsultationByDoctor/${doctorDetails?.doctorId}`)
        .then((response) => {
          // console.log("totalCount",response.data)
          setTotalConsult(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
  }
  // const fetchTodayConsult = async() =>{
  //   const jwtToken=localStorage.getItem("jwtToken");
  //   axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
  //   await axios.get(`http://localhost:8090/consultation/totalDailyConsultationByDoctor/${doctorDetails?.doctorId}`)
  //       .then((response) => {
  //         // console.log("todayConsult",response.data)
  //         setTodayConsult(response.data)
  //       })
  //       .catch((error) =>{
  //         console.log(error)
  //       })
  // }
  // const fetchDailyLog = async () => {
  //   const jwtToken=localStorage.getItem("jwtToken");
  //   axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
  //   await axios.get(`http://localhost:8090/doctor/doctorDailyLog/${doctorDetails?.doctorId}`)
  //       .then((response) => {
  //         setDailyLog(response.data)
  //         // console.log(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  // }

  useEffect(() => {
    doctorDetails = JSON.parse(localStorage.getItem("doctorDetails"));
    fetchTotalConsult()
    // fetchTodayConsult()
    // fetchDailyLog()
    // fetchTotalConsult()
    // fetchTodayConsult()
    // fetchDailyLog()
  }, [])


  return (
    <>
    <DoctorNavbar />
    <div className="bg-orange-50 flex flex-col items-center justify-center">
      
      <div className="flex justify-center w-full mb-8">
        <div className="w-full max-w-screen-lg">
          {/* Total Consultations */}
          <div className="bg-orange-100 shadow-lg rounded-lg p-6 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Total Consultations</h2>
            <p className="text-5xl font-bold">{totalConsult}</p>
          </div>
          <div className="flex justify-between">
            {/* Today's Consultations */}
            {/*<div className="w-1/2 mr-4">*/}
            {/*  <TodayConsultation />*/}
            {/*</div>*/}
            {/* Past History */}
            {/*<div className="w-1/2">*/}
            {/*  {showAllPastConsultations && (*/}
            {/*    <div className="bg-orange-100 shadow-lg rounded-lg p-6">*/}
            {/*      <h2 className="text-2xl font-bold mb-4">Past History</h2>*/}
            {/*      <div className="overflow-auto max-h-96">*/}
            {/*        <table className="w-full border-collapse">*/}
            {/*          <thead>*/}
            {/*            <tr className="bg-orange-200">*/}
            {/*              <th className="border border-orange-400 px-4 py-2">Patient ID</th>*/}
            {/*              <th className="border border-orange-400 px-4 py-2">Medical Findings</th>*/}
            {/*              <th className="border border-orange-400 px-4 py-2">Remarks</th>*/}
            {/*            </tr>*/}
            {/*          </thead>*/}
            {/*          <tbody>*/}
            {/*            {pastHistory.map((consultation, index) => (*/}
            {/*              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-orange-100'}>*/}
            {/*                <td className="border border-orange-400 px-4 py-2">{consultation.patientId}</td>*/}
            {/*                <td className="border border-orange-400 px-4 py-2">{consultation.medicalFindings}</td>*/}
            {/*                <td className="border border-orange-400 px-4 py-2">{consultation.remarks}</td>*/}
            {/*              </tr>*/}
            {/*            ))}*/}
            {/*          </tbody>*/}
            {/*        </table>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  /!* Past History Button *!/*/}
            {/*  <div className="text-center">*/}
            {/*    <button onClick={handleShowAllPastConsultations} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4">*/}
            {/*      {showAllPastConsultations ? "Hide Past Consultations" : "Show All Past Consultations"}*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      {/* <div> */}
        <PatientQueue />
      {/* </div> */}
      
    </div>
    </>
  );
};

export default DoctorDashboard;
