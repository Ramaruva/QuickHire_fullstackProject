import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const TopNavBar = ({ isLandingPage = false, isSignin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userName: "gowtham123",
    role: "staff",
  });
  useEffect(()=>{
    try {
      const userDetails1 = JSON.parse(localStorage.getItem("user"));
      setUserDetails(userDetails1);
    } catch (error) {
      console.log(error);
    }
  },[])
  return (
    <div className="bg-white space-y-4  rounded-md sm:px-5 sm:py-3 lg:p-3 xl:px-6 xl:py-4">
      <div className="flex items-center justify-between border-b">
        <div className="mb-2">
          {/* Replace with your actual logo */}
          <img src="/assets/logo.png" alt="Logo" className="h-8 w-auto" />
        </div>
        <div className="text-gray shadow text-base font-bold ">
          <h2>Quick Hire</h2>
        </div>
        <div className="flex flex-row justify-center ">
          <div className="m-1">
            {!isLandingPage && (
              <div className="relative">
                <img
                  src="/assets/Profile-pic.jpg" // Replace this with your profile picture URL
                  alt="Profile"
                  className="w-8 h-8 mr-4 rounded-full cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-1">
                    <NavLink
                      onClick={() => setIsOpen(!isOpen)}
                      to="/home/PasswordChange" // Replace this with your actual link to account settings
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      to="/SignIn" // Implement your logout functionality here
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </div>
          {isLandingPage ? (
            <button onClick={() => navigate("/SignIn")}>Login</button>
          ) : (
            <div className="ml-1">
              <p className="text-sm font-semibold">{userDetails.userName}</p>
              <div className="text-xs text-gray-600">{userDetails.role}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
