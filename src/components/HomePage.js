import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Stepper from "./StepperHomePage/Stepper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import {
  faComments,
  faEnvelope,
  faHeartPulse,
  faIndianRupeeSign,
  faPhone,
  faStethoscope,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

import img from './images/img1.png'


const HomePage = () => {

  const navigate = useNavigate()
  return (
    <div className="md:flex md:flex-col">
      <NavBar />
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
              className="w-40 text-white bg-orange-800 hover:bg-red-700 font-serif text-xl rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 transform transition duration-300 hover:scale-110"
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
      <div className="md:flex md:flex-col md:h-full md:justify-between p-8">
        <div className="h-1/3 flex md:justify-center md:items-center">
          <h1 className="font-serif font-normal font-400 text-5xl md:text-5xl lg:text-7xl md:text-center md:justify-center text-blue-950 p-4">
            Why Healthiest?
          </h1>
        </div>
        <div className="p-10">
          <div className="md:h-1/3 md:flex md:flex-row md:justify-evenly md:items-center">
            <div className="md:flex md:flex-col md:items-center ">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faHeartPulse}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Online OPD
              </p>
            </div>
            <div className="md:flex md:flex-col md:items-center">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faClock}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Real Time Tele-medicine
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faVideo}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Video Consultations
              </p>
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="md:h-1/3 md:flex md:flex-row md:justify-evenly md:items-center">
            <div className="md:flex md:flex-col md:items-center">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faComments}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Chat
              </p>
            </div>
            <div className="md:flex md:flex-col md:items-center">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faStethoscope}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Best Medical Specialists
              </p>
            </div>
            <div className="md:flex md:flex-col md:items-center">
              <div className="bg-blue-900 md:w-44 md:h-44 rounded-full md:flex md:items-center md:justify-center ">
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="fa-5x"
                  style={{ color: "#ffffff" }}
                />
              </div>
              <p className="font-serif font-normal font-400 md:text-center text-blue-980 text-xl p-2">
                Free Service
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-950 flex flex-row justify-evenly items-center">
        <div className="mt-8 mb-8 w-1/3">

          <p className="font-serif text-lg text-white mb-8 text-center">
            Steps for Consultation
          </p>
          <Stepper />
        </div>
        <div className="flex-col justify-evenly items-center w-2/3">
          <div className="flex flex-row items-center justify-evenly">
            <div className="bg-white font-serif md:w-60 md:h-40 rounded-lg md:flex md:flex-col md:items-center md:justify-center shadow-xl transform transition duration-300 hover:scale-110">
              <p className="text-7xl text-bold">8345</p>
              <p>Total Consultations</p>
            </div>
            <div className="bg-white font-serif md:w-60 md:h-40 rounded-lg md:flex md:flex-col md:items-center md:justify-center shadow-xl transform transition duration-300 hover:scale-110">
              <p className="text-7xl text-bold">500+</p>
              <p>Online Doctors</p>
            </div>
          </div>
          <div className="ml-4 mt-14 flex flex-row justify-evenly p-8">
            <div>
              <button
                type="button"
                className="w-36 text-black bg-white hover:bg-green-400 font-serif text-xl rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 transform transition duration-300 hover:scale-125"
              >
                Get started
              </button>
            </div>
            <div className="flex flex-col justify-evenly space-y-8">
              <div className="flex flex-row font-serif space-x-4 items-center">
                <FontAwesomeIcon icon={faEnvelope} beat style={{ color: "#ffffff", }} />
                <p className="text-white text-lg">HAD@gmail.com</p>
              </div>
              <div className="flex flex-row font-serif space-x-4 items-center">
                <FontAwesomeIcon icon={faPhone} beat style={{ color: "#ffffff", }} />
                <p className="text-white text-lg">123456789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
