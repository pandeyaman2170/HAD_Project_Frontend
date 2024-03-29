import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from 'axios';
import HomePageFooter from "./HomePageFooter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faComment, faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import { faStethoscope, faVideo } from "@fortawesome/free-solid-svg-icons";
import Stepper from "./StepperHomePage/Stepper";

const HomePage = () => {
  const navigate = useNavigate();
  const imgofmain = require('../components/images/doctor_main.jpg');
  const img = require('../components/images/Home_page_image-removebg-preview.png');
  const stepsImg = require('../components/images/steps.png');

  const [consultationCount, setConsultationCount] = useState(null);
  const [hospitalCount, setHospitalCount] = useState(null);
  const [doctorCount, setDoctorCount] = useState(null);
  const [registeredCount, setRegisteredCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch consultation count
        const consultationResponse = await axios.get('http://localhost:8090/homepage/total_consultation');
        setConsultationCount(consultationResponse.data);
        console.log('Consultation count:', consultationResponse.data);

        // Fetch hospital count
        const hospitalResponse = await axios.get('http://localhost:8090/homepage/total_hospitals');
        setHospitalCount(hospitalResponse.data);
        console.log('Hospital count:', hospitalResponse.data);

        // Fetch doctor count
        const doctorResponse = await axios.get('http://localhost:8090/homepage/total_doctors');
        setDoctorCount(doctorResponse.data);
        console.log('Doctor count:', doctorResponse.data);

        // Fetch registered count
        const registeredResponse = await axios.get('http://localhost:8090/homepage/total_patients');
        setRegisteredCount(registeredResponse.data);
        console.log('Registered count:', registeredResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error scenario
      }
    };

    fetchData();
  }, []);

  const getStarted = () => {
    navigate("/login");
  };

  return (
      <div id="home" className="md:flex md:flex-col">
        <NavBar />
        <br />
        <br></br>
        <div className="bg-orange-500 p-5 md:flex md:flex-row">
          <div className="md:flex-1 md:w-1/2 p-4 md:flex md:flex-col md:items-center md:justify-center">
            <p className="text-white font-roboto md:text-center">
            <span className="md:text-5xl leading-60 font-normal ">
              Welcome to our
            </span>
              <br />
              <span className="md:text-5xl leading-60 font-normal">
              Tele-Consultation Platform
            </span>
              <br />
              <span className="md:text-xl leading-36">
              Wellness Simplified, Convenience Amplified
            </span>
            </p>
            <div className="flex md:order-2 p-4">
              <button
                  type="button"
                  onClick={getStarted}
                  className="w-40 text-white bg-orange-800 hover:bg-red-700 font-normal text-xl rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 transform transition duration-300 hover:scale-110"
              >
                LogIn/SignUp
              </button>
            </div>
          </div>
          <div className="md:flex-1 md:w-1/2 p-4 md:flex md:items-center md:justify-center">
            <img
                src={img}
                alt="main-img1"
                className="max-h-full max-w-full"
            />
          </div>
        </div>
        {/* Stepper*/}
        {/* <Stepper /> */}
        <div className="p-4">
          <img
              src={stepsImg}
              alt="main-img1"
              className=""
          />
        </div>
        <div id="showcase" className="md:flex md:flex-row md:justify-center md:h-full md:justify-between p-8">
          {/* First three items */}
          <div className="md:flex md:flex-col md:items-center md:w-1/3">
            <div className="mb-8">
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                    icon={faHeart}
                    className="fa-3x"
                    style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Online OPD
              </p>
            </div>
            <div className="mb-8 md:items-center">
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center mx-auto">
                <FontAwesomeIcon icon={faClock} className="fa-3x text-white" />
              </div>
              <p className="font-normal text-blue-980 text-xl p-2 md:text-center">
                Real Time Tele-medicine
              </p>
            </div>

            <div className="mb-8 md:items-center">
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center mx-auto">
                <FontAwesomeIcon
                    icon={faVideo}
                    className="fa-3x"
                    style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Video Consultations
              </p>
            </div>
          </div>

          {/* "Why Healthiest?" section */}
          <div className="md:flex md:flex-col md:items-center md:w-1/3 justify-center">
            <img src={imgofmain} alt="Why Healthiest?" className="mx-auto w-96 h-auto md:w-full md:h-auto rounded-lg" />
          </div>
          {/* Last three items */}
          <div className="md:flex md:flex-col md:items-center md:w-1/3">
            <div className="mb-8">
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                    icon={faComment}
                    className="fa-3x"
                    style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Chat
              </p>
            </div>
            <div className="mb-8 md:items-center">
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center mx-auto">
                <FontAwesomeIcon
                    icon={faStethoscope}
                    className="fa-3x"
                    style={{ color: "#ffffff" }}
                />
              </div>
              <div>
              <span className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Best Medical Specialists
              </span>
              </div>
            </div>
            <div>
              <div className="bg-orange-600 md:w-28 md:h-28 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                    icon={faMoneyBillAlt}
                    className="fa-3x"
                    style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Free Service
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between md:justify-around items-center w-full h-20 bg-orange-100 p-5 p-2">
          <div className="stat-card flex flex-col items-center justify-between m-4 text-orange-900 border-b-4 border-solid border-orange-900 p-1">
            <h3 className="text-xl font-extrabold">Hospitals</h3>
            <p className="text-2xl font-extrabold">{hospitalCount}</p>
          </div>
          <div className="stat-card flex flex-col items-center justify-between m-4 text-orange-900 decoration-8 border-b-4 border-solid border-orange-900 p-1">
            <h3 className="text-xl font-extrabold decoration-8">Doctors</h3>
            <p className="text-2xl font-extrabold">{doctorCount}</p>
          </div>
          <div className="stat-card flex flex-col items-center justify-between m-4 text-orange-900 border-b-4 border-solid border-orange-900 p-1">
            <h3 className="text-xl font-extrabold">Consultations</h3>
            <p className="text-2xl font-extrabold">{consultationCount}</p>
          </div>
          <div className="stat-card flex flex-col items-center justify-between m-4 text-orange-900 border-b-4 border-solid border-orange-900 p-1">
            <h3 className="text-xl font-extrabold">Registered People</h3>
            <p className="text-2xl font-extrabold">{registeredCount}</p>
          </div>
        </div>
        {/* Footer */}
        <HomePageFooter />
      </div>
  );
};

export default HomePage;

