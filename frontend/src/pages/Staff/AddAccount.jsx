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
import { postRequest } from "../../API/config";
import { useNavigate } from 'react-router-dom';
// import RegistrationSuccessPage from "../common/RegistrationSuccessPage";

const intialDetails = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  phone: "",
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    try {
      setStaffDetails({ ...staffDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const  handleSave = async (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        firstNameError: validateFirstName(staffDetails.firstname),
        lastNameError: validateLastName(staffDetails.lastname),
        emailError: validateEmail(staffDetails.email),
        userNameError: validateUsername(staffDetails.username),
        phoneError: validatePhone(staffDetails.phone),
      };
      setStaffErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        // alert("Account Added successfully!");
        const data = await postRequest("createStaff",staffDetails);
        console.log(data);
        setStaffDetails(intialDetails);
        setStaffErrors(error);
        navigate('/registration-success', { state: { userType: 'Staff' } }); // Navigate to success page
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
        <div className="flex justify-center">
          <h1 className="text-md font-semibold mb-4">New Staff Account </h1>
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
              id="firstname"
              placeholder="First Name"
              value={staffDetails.firstname}
              name="firstname"
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
              id="lastname"
              placeholder="Last Name"
              value={staffDetails.lastname}
              name="lastname"
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
              id="username"
              placeholder="Preferred Username"
              value={staffDetails.username}
              name="username"
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
              id="email"
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
            value={staffDetails.phone}
            name="phone"
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
 