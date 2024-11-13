import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import professional_image from "/assets/professional_image_gif.gif"; // Path to a success animation GIF
import employer_image from "/assets/company_employer image.jpeg"; // Corrected path and name

const NoDataAvailable = ({ viewType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the user type from location state if passed or default to 'User'
  const userType = location.state?.userType || "User";

  const imageSrc = userType === "Professional"
    ? professional_image  // Use the imported image directly
    : employer_image;     // Use the imported image directly

  const title = `No Pending ${userType} Requests`;
  const message = `There are no pending ${viewType} requests for ${userType.toLowerCase()}s at this time.`;

  return (
    <div className="flex flex-col items-center justify-center p-12 ml-10 w-full h-full">
    {/* // 'mx-auto' for automatic horizontal margins, 'my-auto' for vertical, which helps in centering as well. */}
    <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-300 mx-auto my-auto">
      <img src={imageSrc} alt="No Data" className="mx-auto mb-8 max-w-xs h-auto" />
      <h1 className="text-4xl font-bold mb-4 text-indigo-600">{title}</h1>
      <p className="text-xl text-gray-700">{message}</p>
    </div>
  </div>
  );
};

export default NoDataAvailable;
