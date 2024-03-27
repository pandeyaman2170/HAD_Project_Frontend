import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";

function Otp(props) {
  const navigate = useNavigate();
  let jwtToken;
  const user = props.value;
  const [phoneNumber, setPhoneNumber] = useState();
  const [otp, setOtp] = useState("");
  const [send, setSend] = useState(false);
  const [validOTP, setValidOTP] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [userId, setUserId] = useState(null);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      getAuth(initializeApp(firebaseConfig))
    );
  };

  async function sendOTP(e) {
    e.preventDefault();
    if (isValid) {
      setSend(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(getAuth(initializeApp(firebaseConfig)), phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Invalid Number");
    }
  }

  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
        .confirm(otp)
        .then((result) => {
          const userI = result.user;
          axios.post('http://localhost:8090/authenticate',{
            username: phoneNumber,
            password: phoneNumber
          }).then((response) => { // Added missing closing parenthesis here
            jwtToken = response.data.jwtToken;
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
            localStorage.setItem("jwtToken", response.data.jwtToken);
            setValidOTP(true);
            if (props.value === 1) {
              fetchPtDetail();
              navigate(`/patient`);
            } else if (props.value === 2) {
              fetchDrDetail();
              navigate(`/doctor`);
            }
          })
              .catch((error) => {
                console.log(error);
              });
        }); // Added missing closing parenthesis here
  };

  const verifyPatient = () => {
    axios
      .get(`http://localhost:8090/login/${phoneNumber}/patient`)
      .then((response) => {
        setIsValid(response.data.isValid);
        setUserId(response.data.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyDoctor = () => {
    axios
      .get(`http://localhost:8090/login/${phoneNumber}/doctor`)
      .then((response) => {
        setIsValid(response.data.isValid);
        setUserId(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPtDetail = async () => {
    await axios
      .get(
        `http://localhost:8090/patient/getPatientByPhoneNumber/${phoneNumber}`
      )
      .then((response) => {
        localStorage.setItem("patientDetails", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchDrDetail = async () => {
    await axios
      .get(
        `https://localhost:8090/doctor/getDoctorByPhoneNumber/${phoneNumber}`
      )
      .then((response) => {
        localStorage.setItem("doctorDetails", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user === 1) {
      verifyPatient();
    } else if (user === 2) {
      verifyDoctor();
    }
  }, [phoneNumber]);

  return (
    <div>
      <form className="max-w-md mx-auto mt-2 p-2">
        <div>
          <h2 className="text-lg">Enter Phone Number</h2>
          <div className="flex flex-row justify-evenly items-center">
            <div className="flex flex-col">
              <PhoneInput
                country={"in"}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-60 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="p-2">
              <button
                type="submit"
                className="w-24 h-10 bg-orange-700 text-white rounded-lg hover:bg-orange-600"
                onClick={sendOTP}
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
        {send ? (
          <div>
            <div>
              <h2 className="text-lg">Enter OTP</h2>
              <div className="flex flex-row justify-evenly items-center">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-60 border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>
                <div className="p-2">
                  <button
                    type="submit"
                    className="w-24 h-10 bg-orange-500 text-white rounded-lg hover:bg-orange-700"
                    onClick={verifyOTP}
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Otp;
