import React from "react";
import LoginTab from "./LoginTab";
import LoginNavbar from "./LoginNavbar";
import imagee from './images/login_img.jpg'
import HomePageFooter from "./HomePageFooter";

const LoginPage = () => {
  const imgablogin = require('../components/images/whiteLogo.png');
  return (
      <>
      <LoginNavbar/>
      <div className="flex md:flex-row flex-col  justify-around items-center w-screen h-screen h-2/4 p-2">
        <div className="flex md:flex-row flex-col pt-50 align-center">
          <div className="w-2/4 h-1/3">
            <img
              src={imagee}
              alt="doctor"
              className="object-cover h-full w-full hidden md:block mt-6 p-10"
            />
          </div>
          <div className="px-4 md:px-0 lg:w-2/4 p-2 flex flex-col items-center justify-around">
            <div className="md:mx-6 md:p-4">
              <div className="text-center mt-10">
                {/* <img
                  className="mx-auto w-48"
                  src={imgablogin}
                  alt="logo"
                /> */}
                <div className="flex items-center flex-shrink-0 md:justify-center drop-shadow-xl">
                  <div className="font-bold text-5xl cursor-pointer flex items-center text-orange-700 font-poppins">
                  <span className="text-6xl text-orange-700 pr-2">
                    <ion-icon name="logo-ionic"></ion-icon>
                  </span>
                  <span className="text-5xl text-blue font-roboto text-center">Healthiest</span>
                  </div>
                </div>
                <h4 className="mb-4 pb-1 text-3xl font-bold text-orange-700 mt-1 border-b-2 border-solid border-orange-900">
                  Login
                </h4>

              </div>
              <div>
                <LoginTab />
              </div>
            </div>
          </div>
        </div>
    </div >
    <HomePageFooter/>
    </>
  );
};

export default LoginPage;
