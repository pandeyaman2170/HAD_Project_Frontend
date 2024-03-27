import React, { useState, useEffect } from "react";
import axios from "axios";

const PatientHistory = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/getPrescriptionsPatient/1"
        );
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    // Replace {patientId} with the actual patient ID
    fetchPrescriptions();
  }, []); // Empty dependency array to run effect only once on component mount

  const handleDownload = async (prescriptionId) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/viewpres/${prescriptionId}`,
        {
          responseType: "blob", // Set the response type to 'blob' for file download
        }
      );

      // Create a temporary link to initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `prescription_${prescriptionId}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading prescription:", error);
    }
  };

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
          {prescriptions.map((prescription, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-orange-200" : "bg-grey"}
            >
              <td>{prescription.consultationDate}</td>
              <td>{prescription.observation}</td>
              <td>{prescription.remark}</td>
              <td className="p-2">
                <button
                  className="bg-orange-600 hover:bg-orange-600 text-white py-2 px-2 rounded-lg"
                  onClick={() => handleDownload(prescription.prescriptionId)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
