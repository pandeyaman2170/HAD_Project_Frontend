import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faHospital, faStethoscope, faFilePrescription, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Stepper = () => {
  return (
    <div className="bg-gray-100 h-full w-full flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
        <p className="font-normal text-lg text-gray mb-8 text-center">
          Steps for Consultation
        </p>
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">Register/Login eSanjeevani</div>
          </div>
              <FontAwesomeIcon icon={faArrowRight} className="text-gray-700 mx-2 size-20" />
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">Book Consultation</div>
          </div>
          <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faHospital} style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">Enter eOPD</div>
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faStethoscope} style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">Consult Doctor/Specialist virtually</div>
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faFilePrescription} style={{ fontSize: '1.5rem' }} />
            </div>
            <div className="mt-2 text-sm text-gray-600">Get prescription</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
