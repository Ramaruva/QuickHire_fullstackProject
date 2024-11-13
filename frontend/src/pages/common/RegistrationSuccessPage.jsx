import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import successAnimation from '/assets/success-animation.gif' // Path to a success animation GIF

const RegistrationSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the user type from location state if passed or default to 'User'
  const userType = location.state?.userType || 'User';

  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-10 m-4 w-full max-w-lg text-center">
        <img src={successAnimation} alt="Success" className="w-120 h-80 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold mb-4">Account Successfully Registered!</h1>
        <p className="text-md mb-8">
          Your {userType} account has been successfully created. <br />
          Please check your email for updates on your account.
        </p>
        <button
          onClick={handleGoToDashboard}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
