import React, { useState } from "react";
import Otp from "./Otp";

const LoginTab = () => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="flex items-center bg-gradient-to-br">
      <div className="max-w-3xl mx-auto px-8 sm:px-0">
        <div className="sm:w-7/12 sm:mx-auto flex flex-col justify-center items-center">
          <div className="relative w-max mx h-12 grid grid-cols-3 justify-items-center items-center px-[3px] rounded-full bg-blue-100 overflow-hidden shadow-lg shadow-900/20 transition">
            <div>
              <button
                className={`active:bg-blue-500 active focus:outline-none focus:bg-blue-500 relative block h-10 px-6 rounded-full ${
                  toggleState === 1 && "bg-blue-500"
                }`}
                onClick={() => toggleTab(1)}
              >
                <span className="text-lg">Patient</span>
              </button>
            </div>
            <div>
              <button
                className={`active:bg-blue-800 focus:outline-none focus:bg-blue-700 relative block h-10 px-6 rounded-full ${
                  toggleState === 2 && "bg-blue-700"
                }`}
                onClick={() => toggleTab(2)}
              >
                <span className="text-lg">Doctor</span>
              </button>
            </div>
            <div>
              <button
                className={`active:bg-blue-800 focus:outline-none focus:bg-blue-700 relative block h-10 px-6 rounded-full ${
                  toggleState === 3 && "bg-blue-700"
                }`}
                onClick={() => toggleTab(3)}
              >
                <span className="text-lg">Admin</span>
              </button>
            </div>
          </div>
          <div className="mt-0 relative">
            {toggleState === 1 ? (
              <div className="tab-panel p-6 transition duration-300">
                <Otp value={toggleState} />
                <div className="flex items-center justify-center pb-6">
                  <p className="mb-0 mr-2">Don't have an account?</p>
                  <a
                    href="/register"
                    className="text-blue-500 hover:text-blue-900"
                  >
                    Register
                  </a>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {toggleState === 2 ? (
              <div className="tab-panel p-6 transition duration-300">
                <Otp value={toggleState} />
              </div>
            ) : (
              <div></div>
            )}
            {toggleState === 3 ? (
              <div className="tab-panel p-6 transition duration-300">
                <Otp value={toggleState} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTab;
