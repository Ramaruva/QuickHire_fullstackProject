import React, { useState } from "react";
import {
  checkKeysEmpty,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../shared/ErrorMsgComponent";

const details = {
  firstName: "gowtham",
  lastName: "Dongari",
  email: "gowtham@quickhire.com",
  phone: "9988553344",
};

const error = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  phoneError: "",
};
const StaffSettings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [userDetails, setUserDetails] = useState(details);
  const [userError, setUserError] = useState(error);

  const handleEdit = (val) => {
    setIsEditable(val);
    console.log(isEditable);
    if (val == false) {
      setUserDetails(details);
    }
  };
  const handleChange = (key, val) => {
    setUserDetails({ ...userDetails, [key]: val });
  };

  const handleSave = (e) => {
    try {
      e.preventDefault();
      const errObj = {
        firstNameError: validateFirstName(userDetails.firstName),
        lastNameError: validateLastName(userDetails.lastName),
        emailError: validateEmail(userDetails.email),
        phoneError: validatePhone(userDetails.phone),
      };
      setUserError(errObj);
      if (!checkKeysEmpty(errObj)) {
        alert("Changes are saved successfully!");
        setUserError(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-xl w-1/2">
        <h1 className="flex justify-center text-lg font-semibold mb-4">
          Account Settings
        </h1>
        <div className="m-4">
          <label className="text-xs font-semibold mb-4">FirstName:</label>
          <input
            className={`passwordinput text-grey-darker ${
              userError.firstNameError > 0
                ? "border-red-500"
                : "border-gray-300"
            }`}
            readOnly={!isEditable}
            value={userDetails.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            type="text"
          />
          <ErrorMsgComponent msg={userError.firstNameError} />
        </div>
        <div className="m-4">
          <label className="text-xs font-semibold mb-4">LastName:</label>
          <input
             className={`passwordinput text-grey-darker ${
              userError.firstNameError > 0
                ? "border-red-500"
                : "border-gray-300"
            }`}
            readOnly={!isEditable}
            value={userDetails.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            type="text"
          />
          <ErrorMsgComponent msg={userError.lastNameError} />
        </div>
        <div className="m-4">
          <label className="text-xs font-semibold mb-4">Email:</label>
          <input
            className={`passwordinput text-grey-darker ${
              userError.firstNameError > 0
                ? "border-red-500"
                : "border-gray-300"
            }`}
            readOnly={!isEditable}
            value={userDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
            type="text"
          />
          <ErrorMsgComponent msg={userError.emailError} />
        </div>
        <div className="m-4">
          <label className="text-xs font-semibold mb-4">Phone:</label>
          <input
            className={`passwordinput text-grey-darker ${
              userError.firstNameError > 0
                ? "border-red-500"
                : "border-gray-300"
            }`}
            readOnly={!isEditable}
            value={userDetails.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            type="tel"
          />
          <ErrorMsgComponent msg={userError.phoneError} />
        </div>
        <div className="m-4 flex justify-center">
          {isEditable ? (
            <>
              <button
                type="button"
                onClick={() => handleEdit(false)}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="flex w-fit justify-center rounded-md bg-fbblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEdit(true)}
              type="button"
              className="flex w-full justify-center rounded-md bg-fbblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffSettings;
