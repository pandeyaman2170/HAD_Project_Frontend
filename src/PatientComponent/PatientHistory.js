import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientHistory = () => {
  let patientDetails;
  const [prescription, setPrescription] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  patientDetails = JSON.parse(localStorage.getItem("patientDetails"))
  console.log(patientDetails);


  // useEffect(() => {
  //   const fetchPrescriptions = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8090/getPrescriptionsPatient/1"
  //       );
  //       setPrescriptions(response.data);
  //     } catch (error) {
  //       console.error("Error fetching prescriptions:", error);
  //     }
  //   };
  //
  //   // Replace {patientId} with the actual patient ID
  //   fetchPrescriptions();
  // }, []); // Empty dependency array to run effect only once on component mount
  const fetchPrescription = async () => {
    try {
      const jwtToken=localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
      const response = await axios.get(`http://localhost:8090/prescription/getPrescriptionsPatient/${patientDetails?.patientId}`);
      setPrescription(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDownload = async (prescriptionId) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8090/viewpres/${prescriptionId}`,
  //       {
  //         responseType: "blob", // Set the response type to 'blob' for file download
  //       }
  //     );
  //
  //     // Create a temporary link to initiate the download
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", `prescription_${prescriptionId}.pdf`);
  //     document.body.appendChild(link);
  //     link.click();
  //
  //     // Clean up
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading prescription:", error);
  //   }
  // };

  const downloadPDF = async (id, date) => {
    try {
      const jwtToken=localStorage.getItem("jwtToken");
      axios.defaults.headers.common["Authorization"]=`Bearer ${jwtToken}`
      const response = await axios.get(`http://localhost:8090/pdf/getPdfPatient/${id}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;

      link.setAttribute("download", `${date}-prescription.pdf`);

      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
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

  useEffect(() => {
    patientDetails = JSON.parse(localStorage.getItem("patientDetails"))
    fetchPrescription();
  }, []);


  return (
    <div className="p-6 rounded-lg border-2 border-orange-600">
      <table className="table-auto w-full mx-auto border-orange-600">
        <caption className="caption-top font-normal text-2xl p-2 border-b-2">
          Prescriptions
        </caption>
        <thead className="font-normal text-lg">
          <tr>
            <th>Date</th>
            <th>Medical Findings</th>
            <th>Remarks</th>
            <th>View Prescription</th>
          </tr>
        </thead>
        <tbody className="font-normal text-md text-center">
        {currentItems.length > 0 ? (
            currentItems.map((p) => (
                <tr key={p.prescriptionId} className='index % 2 === 0 ? "bg-orange-200" : "bg-grey'>
                  <td>{p.consultationDate}</td>
                  <td>{p.observation}</td>
                  <td>{p.remark}</td>
                  <td className='p-2'>
                    <button
                        className="bg-orange-600 hover:bg-orange-600 text-white py-2 px-2 rounded-lg"
                        onClick={() =>
                            downloadPDF(p.prescriptionId, p.consultationDate)
                        }
                    >
                      download pdf
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

    </div>
  );
};

export default PatientHistory;
