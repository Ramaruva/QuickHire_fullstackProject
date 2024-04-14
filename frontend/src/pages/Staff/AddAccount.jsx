import React, { useState } from "react";
import {
  checkKeysEmpty,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateUsername,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../../components/shared/ErrorMsgComponent";
const intialDetails = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phoneNo: "",
};
const error = {
  firstNameError: "",
  lastNameError: "",
  userNameError: "",
  emailError: "",
  phoneError: "",
};
const AddAccount = () => {
  const [staffDetails, setStaffDetails] = useState(intialDetails);
  const [staffErrors, setStaffErrors] = useState(error);
  const handleChange = (e) => {
    try {
      setStaffDetails({ ...staffDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        firstNameError: validateFirstName(staffDetails.firstName),
        lastNameError: validateLastName(staffDetails.lastName),
        emailError: validateEmail(staffDetails.email),
        userNameError: validateUsername(staffDetails.userName),
        phoneError: validatePhone(staffDetails.phoneNo),
      };
      setStaffErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        alert("Account Added successfully!");
        setStaffDetails(intialDetails);
        setStaffErrors(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
        <div className="flex justify-center">
          <h1 className="text-md font-semibold mb-4">New Applicant</h1>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">First Name</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker
            ${
              staffErrors.firstNameError.length > 0
                ? "border-red-500"
                : "border-gray-300"
            }
            `}
              type="text"
              id="firstName"
              placeholder="First Name"
              value={staffDetails.firstName}
              name="firstName"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={staffErrors.firstNameError} />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Last Name</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker
              ${
                staffErrors.lastNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }
              `}
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={staffDetails.lastName}
              name="lastName"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={staffErrors.lastNameError} />
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Preferred Username</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker
              ${
                staffErrors.userNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }
              `}
              type="text"
              id="firstName"
              placeholder="Preferred Username"
              value={staffDetails.userName}
              name="userName"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={staffErrors.userNameError} />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Email</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker
              ${
                staffErrors.emailError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }
              `}
              type="text"
              id="lastName"
              placeholder="Email"
              value={staffDetails.email}
              name="email"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={staffErrors.emailError} />
          </div>
        </div>
        <div className="flex flex-wrap">
          <h1 className="text-xs font-semibold mb-2">Phone No</h1>
          <input
            className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker
            ${
              staffErrors.phoneError.length > 0
                ? "border-red-500"
                : "border-gray-300"
            }
            `}
            type="text"
            id="phone"
            placeholder="Phone No"
            value={staffDetails.phoneNo}
            name="phoneNo"
            onChange={handleChange}
          />
          <ErrorMsgComponent msg={staffErrors.phoneError} />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className=" mt-8 flex w-full justify-center rounded-md bg-fbblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AddAccount;
