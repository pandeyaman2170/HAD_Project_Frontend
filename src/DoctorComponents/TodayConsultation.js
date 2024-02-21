import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const TodayConsultation = () => {
  const consultations = [
    { id: 1, findings: "Sneezing", remarks: "Severe" },
    { id: 2, findings: "Sneezing", remarks: "Severe" },
    { id: 3, findings: "Cough", remarks: "Mild" },
    { id: 4, findings: "Sneezing", remarks: "Mild" },
    { id: 5, findings: "Fever", remarks: "Severe" },
    { id: 6, findings: "Sneezing", remarks: "Mild" },
  ];

  return (
    <div className="shadow-lg p-6 w-2/5 h-4/5 border-t-4 border-blue-900 rounded-lg mt-8">
      <table className="table-auto w-full mx-auto">
        <caption className="caption-top font-normal text-2xl p-2 border-b-2 border-gray-700">
          Daily Log
        </caption>
        <thead className="font-normal text-lg">
          <tr>
            <th>Patient Id</th>
            <th>Medical Findings</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="font-normal text-md text-center">
          {consultations.map((consultation, index) => (
            <tr key={index} className="p-8">
              <td>{consultation.id}</td>
              <td>{consultation.findings}</td>
              <td>{consultation.remarks}</td>
              <td>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  beatFade
                  style={{ color: "#3ee302" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodayConsultation;
