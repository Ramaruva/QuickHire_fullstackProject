import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const TopNavBar = ({ isLandingPage = false, isSignin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Redirect to sign-in page if not authenticated
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
    
    // Function to check if click is outside the dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAuthenticated, navigate]);


  const handleLogout = async () => {
    try {
       dispatch(logout()); // Ensure logout is completed before navigating
      navigate("/SignIn");
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };
  return (
    <div className=" bg-white space-y-4 rounded-md p-3 sm:p-1  lg:p-3 xl:px-6 xl:py-4">
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
        {!isLandingPage && user && (
            <>
              <div className="text-sm font-semibold hidden sm:block">
                {user.sub}
              </div>
              {/* Other components */}
            </>
          )}
          {isLandingPage ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => navigate("/SignIn")}
            >
              Login
            </button>
          ) : user && (
            <>
              <div className=" hidden ml-2 sm:flex sm:items-center sm:space-x-4">
                <img
                  src="/assets/Profile-pic.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
                {isOpen && (
                  <div ref={dropdownRef} className=" mt-2 w-48 bg-white shadow-md rounded-md py-1">
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      to="/home/PasswordChange"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </NavLink>
                    <NavLink
                      onClick={handleLogout}
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
              
              <div className="text-xs text-gray-600 hidden sm:block">
                {user && user.type}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
