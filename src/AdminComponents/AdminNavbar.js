import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import WhiteLogo from "../components/images/whiteLogo.png";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-400 border-orange-400 dark:bg-orange-400 top-0 w-full z-20 left-0 dark:border-orange-200">
      <div className="max-w-full mx-auto px-0 sm:px-6 lg:px-8">
        <div className="flex flex-row justify-between h-16">
          <div className="flex-shrink-0 flex items-center p-4">
            <a href='/admin'><img src={WhiteLogo} alt="logo" className="w-auto h-9" /></a>
          </div>
          <div className="flex flex-row items-center justify-end">
            <div className="relative flex flex-row items-center justify-end space-x-4">
              <div><a href='/admin' className='text-white font-medium font-serif hover:text-blue-200'>Home</a></div>
              <div className='text-white font-medium font-serif'>Admin</div>
              <div>
                <button
                  className="py-2 rounded inline-flex items-center"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FontAwesomeIcon icon={faCircleUser} className='fa-xl' style={{ color: "#ffffff" }} />
                  <svg className={`fill-current h-4 w-4 ml-0 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
                  </svg>
                </button>
              </div>
              {isOpen && (
                <div className="overflow-hidden z-10 absolute top-8 right-0 mt-2 w-36 rounded-sm shadow-lg">
                  <div className="rounded-md bg-blue-50 shadow-xs">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <a
                        href="/admin/profile"
                        className="block px-4 py-2 text-sm font-serif font-medium text-gray-700 hover:bg-blue-200 hover:text-gray-900"
                        role="menuitem"
                      >
                        Update Profile
                      </a>
                      <button
                        className="w-full block px-4 py-2 text-sm font-serif font-medium text-gray-700 hover:bg-red-400 hover:text-gray-900"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
