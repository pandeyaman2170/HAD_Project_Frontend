import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../firebase";
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

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      authentication
    );
  };

  async function sendOTP(e) {
    e.preventDefault();
    if (isValid) {
      setSend(true);
      generateRecaptcha();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      alert("Invalid Number")
    }
  }

  const verifyOTP = (e) => {
    e.preventDefault();
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then((result) => {
        const userI = result.user;
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/authenticate`, {
          username: phoneNumber,
          password: phoneNumber
        }).then((response => {
          jwtToken = response.data.jwtToken
          axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
          localStorage.setItem("jwtToken", response.data.jwtToken)
          setValidOTP(true);
          if (props.value == 1) {
            fetchPtDetail()
            navigate(`/patient`)
          }
          else if (props.value == 2) {
            fetchDrDetail()
            navigate(`/doctor`)
          }
        })).catch((e) => console.log(e))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyPatient = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/verifyPatientPhoneNumber/${phoneNumber}`)
      .then((response) => {
        setIsValid(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const verifyDoctor = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/verifyDoctorPhoneNumber/${phoneNumber}`)
      .then((response) => {
        setIsValid(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchPtDetail = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patient/getPatientByPhoneNumber/${phoneNumber}`)
      .then((response) => {
        localStorage.setItem("patientDetails", JSON.stringify(response.data))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const fetchDrDetail = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/doctor/getDoctorByPhoneNumber/${phoneNumber}`)
      .then((response) => {
        localStorage.setItem("doctorDetails", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (user == 1) {
      verifyPatient();
    }
    else if (user == 2) {
      verifyDoctor();
    }
  }, [phoneNumber])

  return (
    <div>
      <form className="max-w-md mx-auto mt-2 p-2">
        <div>
          <h2 className="text-lg">Enter Phone Number</h2>
          <div className="flex flex-row justify-evenly items-center">
            <div className="flex flex-col">
              <PhoneInput
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="w-60 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="p-2">
              <button
                type="submit"
                className="w-24 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
                    className="w-24 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
