
import React from "react";
const LoginNavbar = () => {
  return (
    <div>
      <nav className="bg-orange-600 fixed  w-full z-20 top-0 left-0 border-orange-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <div className="flex items-center flex-shrink-0">
            {/* <img src = "./images/whiteLogo.png" alt="logo" className="w-auto h-8"/> */}
            <div className="font-bold text-2xl cursor-pointer flex items-center font-poppins text-gray-700">
            <span className="text-5xl text-lime-50 pr-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            <span className="text-4xl text-white font-roboto text-center">Healthiest</span>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex md:order-2">
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-4 "
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                <li className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">

                  <a href="/">Home</a>

                </li>
                <li className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">
                  About
                </li>
                <li className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">
                  Timmings
                </li>
                <li className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">
                  FAQ
                </li>
                <li className="block py-2 pl-3 pr-4 text-white rounded md:bg-transparent md:text-white-700 md:p-0 md:dark:text-white-500">
                  Contact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default LoginNavbar