import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../customHooks/useQuery";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateUsername,
  validateZipcode,
} from "../../validations/standardValidations";
import { USERREQUESTTYPE } from "../../types";
import { useDispatch } from "react-redux";
import { setData } from "../../redux/professionalRegisterSlice";
import { postRequest } from "../../API/config";
const details = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  username: "",
  state: "",
  city: "",
  pincode: "",
  companyName: "",
  requestType:USERREQUESTTYPE.newAccount
};
const erroMsg = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  phoneError: "",
  addressError: "",
  userNameError: "",
  stateError: "",
  cityError: "",
  zipcodeError: "",
  companyNameError: "",
};
const RegistrationPage = () => {
  const query = useQuery();
  const customerType = query.get("type");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  if (customerType == "Professional") details.companyName = "dummy";
  const [userDetails, setUserDetails] = useState(details);
  const [userErrors, setUserErrors] = useState(erroMsg);
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (customerType == "Professional") {
      
      navigation("/education");
    } 
  };
  const handleChange = (e) => {
    try {
      setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (customerType == "Professional") details.companyName = "dummy";
    setUserDetails(details);
  }, []);
  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        firstNameError: validateFirstName(userDetails.firstname),
        lastNameError: validateLastName(userDetails.lastname),
        emailError: validateEmail(userDetails.email),
        phoneError: validatePhone(userDetails.phone),
        addressError: userDetails.address.length > 0 ? "" : "Address is Empty",
        userNameError: validateUsername(userDetails.username),
        stateError:
          userDetails.state.length > 0 ? "" : "Please Enter state Name",
        cityError: userDetails.city.length > 0 ? "" : "Please Enter city Name",
        zipcodeError: validateZipcode(userDetails.pincode),
        companyNameError:
          userDetails.companyName.length > 0 ? "" : "Please Enter Company Name",
      };
      console.log(errorObj);
      setUserErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        setUserErrors(erroMsg);
        if(customerType == "Professional"){
          console.log(userDetails);
          dispatch(setData(userDetails))
          handleNavigation();
          // navigate('/registration-success', { state: { userType: 'Professional' } });

        } else {
          postRequest("employerRegister", userDetails)
          navigate('/registration-success', { state: { userType: 'Employer' } });

        }
        setUserDetails(details);
      
        // alert("Registration success!");
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkKeysEmpty = (obj) => {
    for (const key in obj) {
      if (obj[key].length > 0) return true;
    }
    return false;
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
        <div className="flex justify-center">
          <h1 className="text-md font-semibold mb-4">
            {customerType}Registration
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-xs font-semibold mb-4">
            Enter Your Details to continue
          </p>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">First Name</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                userErrors.firstNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              id="firstName"
              placeholder="First Name"
              value={userDetails.firstname}
              name="firstname"
              onChange={handleChange}
            />
            {userErrors?.firstNameError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.firstNameError}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Last Name</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                userErrors.lastNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={userDetails.lastname}
              name="lastname"
              onChange={handleChange}
            />
            {userErrors?.lastNameError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.lastNameError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          {customerType == "Employer" && (
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">Company name</h1>
              <input
                className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                  userErrors.companyNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                id="company name"
                placeholder="Enter the company name"
                value={userDetails.companyName}
                name="companyName"
                onChange={handleChange}
              />
              {userErrors?.companyNameError.length > 0 && (
                <p className="mt-2 text-sm text-red-600" id="username-error">
                  {userErrors.companyNameError}
                </p>
              )}
            </div>
          )}
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Preferred Username</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                userErrors.userNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              id="Preferred Username"
              placeholder="Create your unique Username Name"
              value={userDetails.username}
              name="username"
              onChange={handleChange}
            />
            {userErrors?.userNameError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.userNameError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Email</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                userErrors.emailError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              id="Email"
              placeholder="Enter your email Address"
              value={userDetails.email}
              name="email"
              onChange={handleChange}
            />
            {userErrors?.emailError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.emailError}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Phone No</h1>
            <input
              className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                userErrors.phoneError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="tel"
              id="Phone No"
              placeholder="Enter your phone number"
              value={userDetails.phone}
              name="phone"
              onChange={handleChange}
            />
            {userErrors?.phoneError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.phoneError}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-full px-2 -mx-2 mb-2 md:mb-0">
          <h1 className="text-xs font-semibold mb-2">Mailing Address</h1>
          <input
            className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
              userErrors.addressError.length > 0
                ? "border-red-500"
                : "border-gray-300"
            }`}
            type="text"
            id="Mailing Address"
            placeholder="Enter your mail Address"
            value={userDetails.address}
            onChange={handleChange}
            name="address"
          />
          {userErrors?.addressError.length > 0 && (
            <p className="mt-2 text-sm text-red-600" id="username-error">
              {userErrors.addressError}
            </p>
          )}
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">City</h1>
            <input
              className={`passwordinput text-grey-darker ${
                userErrors.cityError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="City"
              value={userDetails.city}
              onChange={handleChange}
              name="city"
            />
            {userErrors?.cityError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.cityError}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/3 px-2">
            <h1 className="text-xs font-semibold mb-2">State</h1>
            <input
              className={`passwordinput text-grey-darker ${
                userErrors.stateError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="State"
              value={userDetails.state}
              onChange={handleChange}
              name="state"
            />
            {userErrors?.stateError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.stateError}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/3 px-2">
            <h1 className="text-xs font-semibold mb-2">Zipcode</h1>
            <input
              className={`passwordinput text-grey-darker ${
                userErrors.zipcodeError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="pincode"
              value={userDetails.pincode}
              onChange={handleChange}
              name="pincode"
            />
            {userErrors?.stateError.length > 0 && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {userErrors.zipcodeError}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-8 mb-8">
          <div className="flex-1 ml-3 text-xs">
            <button
              type="button"
              onClick={handleSubmit}
              className="item-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-1/2"
            >
              {customerType == "Professional" ? "Save & Continue" : "Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
