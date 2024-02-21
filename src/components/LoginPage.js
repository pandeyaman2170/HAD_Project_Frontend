import React from "react";
import LoginTab from "./LoginTab";
import LoginNavbar from "./LoginNavbar";
import imagee from './images/415.jpg'

const LoginPage = () => {
  const imgablogin = require('../components/images/whiteLogo.png');
  return (
    <div className="flex md:flex-row flex-col">
      <LoginNavbar/>
      <div className="flex md:flex-row flex-col">
        <div className="lg:w-3/5">
          <img
            src={imagee}
            alt="doctor"
            className="object-cover h-full w-full hidden md:block mt-6 p-2"
          />
        </div>
        <div className="px-4 md:px-0 lg:w-2/5 p-2 flex flex-col items-center justify-around">
          <div className="md:mx-6 md:p-4">
            <div className="text-center mt-10">
              <img
                className="mx-auto w-48"
                src={imgablogin}
                alt="logo"
              />
              <h4 className="mb-4 pb-1 text-3xl font-bold text-blue-900 mt-1 border-b border-solid border-blue-900">
                Login Portal
              </h4>
            </div>
            <div>
              <LoginTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
