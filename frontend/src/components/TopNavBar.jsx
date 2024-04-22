import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
 
const TopNavBar = ({ isLandingPage = false, isSignin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "gowtham123",
    role: "staff",
  });
  useEffect(() => {
    try {
      const userDetails1 = JSON.parse(localStorage.getItem("user"));
      setUserDetails(userDetails1);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="bg-white space-y-4 rounded-md p-3 sm:p-1  lg:p-3 xl:px-6 xl:py-4">
      <div className="flex items-center justify-center border-b">
        <div className="w-1/6 flex justify-start">
          <img src="/assets/logo.png" alt="QuickHire" className="h-8 w-auto" />
        </div>
        <div className="flex-grow flex justify-center">
          <h2 className="text-base font-bold text-gray-800 hidden sm:block">
            Quick Hire
          </h2>
        </div>
        <div className="w-1/6 flex justify-end items-center">
          {isLandingPage ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate("/SignIn")}
            >
              Login
            </button>
          ) : (
            <>
              <div className="hidden sm:flex sm:items-center sm:space-x-4">
                <img
                  src="/assets/Profile-pic.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-1 z-50">
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/home/PasswordChange"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      onClick={() => {
                        // Reset any user-specific state/store
                        localStorage.clear();
                        navigate("/SignIn");
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
              <div className="flex sm:hidden">
                <button
                  className="p-2 rounded-md"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-sm font-semibold hidden sm:block">
                {userDetails && userDetails.userName}
              </div>
              <div className="text-xs text-gray-600 hidden sm:block">
                { userDetails &&userDetails.role}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default TopNavBar;