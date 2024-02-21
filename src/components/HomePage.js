import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Stepper from "./StepperHomePage/Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faComment, faMoneyBillAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faStethoscope,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import HomePageFooter from "./HomePageFooter";


const HomePage = () => {

  const navigate = useNavigate()
  const imgofmain = require('../components/images/handsome-indian-doctor-generate-ai-photo-removebg-preview.png');
  const img = require('../components/images/Home_page_image-removebg-preview.png');
  return (
    <div className="md:flex md:flex-col">
      <NavBar />
      <br />
      <br></br>
      <div className="bg-orange-600 p-4 md:flex md:flex-row">
        <div className="md:flex-1 md:w-1/2 p-4 md:flex md:flex-col md:items-center md:justify-center">
          <p className="text-white font-roboto md:text-center">
            <span className="md:text-4xl leading-60 font-normal">
              Welcome to our
            </span>
            <br />
            <span className="md:text-4xl leading-60 font-normal">
              Tele-Consultation Platform
            </span>
            <br />
            <span className="md:text-lg leading-36">
              where healthcare meets convenience
            </span>
          </p>
          <div className="flex md:order-2 p-4">
            <button
              type="button"
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
          <Stepper />
<div className="md:flex md:flex-row md:justify-center md:h-full md:justify-between p-8">
  {/* First three items */}
  <div className="md:flex md:flex-col md:items-center md:w-1/3">
    <div className="mb-8">
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faHeart}
          className="fa-5x"
          style={{ color: "#ffffff" }}
        />
      </div>
      <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
        Online OPD
      </p>
    </div>
    <div className="mb-8">
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faClock}
          className="fa-5x"
          style={{ color: "#ffffff" }}
        />
      </div>
      <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
        Real Time Tele-medicine
      </p>
    </div>
    <div>
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faVideo}
          className="fa-5x"
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
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faComment}
          className="fa-5x"
          style={{ color: "#ffffff" }}
        />
      </div>
      <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
        Chat
      </p>
    </div>
    <div className="mb-8">
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faStethoscope}
          className="fa-5x"
          style={{ color: "#ffffff" }}
        />
      </div>
      <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
        Best Medical Specialists
      </p>
    </div>
    <div>
      <div className="bg-orange-600 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
        <FontAwesomeIcon
          icon={faMoneyBillAlt}
          className="fa-5x"
          style={{ color: "#ffffff" }}
        />
      </div>
      <p className="font-normal font-normal font-400 md:text-center text-blue-980 text-xl p-2">
        Free Service
      </p>
    </div>
  </div>
</div>
      {/* Footer */}
      <HomePageFooter />
    </div>
  );
};

export default HomePage;
