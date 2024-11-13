import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import {
  checkKeysEmpty,
  validateEmail,
  validateEmptiness,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateZipcode,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../shared/ErrorMsgComponent";
import { getRequest, postRequest, putRequest } from "../../API/config";
import { useSelector } from "react-redux";
import ConfirmationModal from "../../pages/common/ConfirmationModal";

let intialDetails = {
  firstname: "Gowtham",
  lastname: "DOngari",
  email: "gowtham@gmail.com",
  phone: "9988553322",
  address: "*29 AMbusry Blvd",
  city: "Dallas",
  state: "Texas",
  pincode: "72509",
};
let errorDetails = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  phoneError: "",
  mailError: "",
  cityError: "",
  stateError: "",
  zipcodeError: "",
};
const EmpAccountSettings = () => {
  const [accountDetails, setAccountDetails] = useState(intialDetails);
  const [accountErrors, setAccountErrors] = useState(errorDetails);
  const user = useSelector((state) => state.auth.user);
  const [isEditable, setIsEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteRequest = async () => {
    try {
      const payLoad = {
        userProfileId: user.profileID,
      };
      const { data } = await putRequest("employer/deleteRequest",payLoad);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    try {
      setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      console.log("hilo");
      const data = await getRequest("getEmployDetails" + "/" + user.profileID);
      console.log(data.data);
      setAccountDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        firstNameError: validateFirstName(accountDetails.firstname),
        lastNameError: validateLastName(accountDetails.lastname),
        emailError: validateEmail(accountDetails.email),
        phoneError: validatePhone(accountDetails.phone),
        mailError: validateEmptiness(
          accountDetails.address,
          "Mail Address is empty!"
        ),
        cityError: validateEmptiness(
          accountDetails.city,
          "City Details are empty"
        ),
        stateError: validateEmptiness(
          accountDetails.state,
          "State Details are empty"
        ),
        zipcodeError: validateZipcode(accountDetails.pincode),
      };
      setAccountErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        delete accountDetails.username;
        const data = await putRequest("employer/editAccount", accountDetails);
        console.log(data);
        setAccountErrors(errorDetails);
        setIsEditable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex justify-center w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="text-md font-semibold mb-4">Account Settings</h1>
            </div>
            <div className="flex justify-between">
              <div onClick={() => setIsEditable(true)}>
                <MdEdit />
              </div>
              <MdDelete onClick={handleShowModal} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">First Name</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.firstNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="First Name"
                readOnly={!isEditable}
                value={accountDetails.firstname}
                name="firstname"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.firstNameError} />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <h1 className="text-xs font-semibold mb-2">Last Name</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.lastNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Last Name"
                readOnly={!isEditable}
                value={accountDetails.lastname}
                name="lastname"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.lastNameError.length} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">Email</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.emailError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="email"
                placeholder="Email"
                readOnly={!isEditable}
                value={accountDetails.email}
                name="email"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.emailError} />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <h1 className="text-xs font-semibold mb-2">Phone No</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.phoneError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="tel"
                placeholder="Phone No"
                readOnly={!isEditable}
                value={accountDetails.phone}
                name="phone"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.phoneError} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-full px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">Mailing Address</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.mailError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Mailing Address"
                readOnly={!isEditable}
                value={accountDetails.address}
                name="address"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.mailError} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mb-2">
            <div className="w-full md:w-1/3 px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">City</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.cityError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="City"
                readOnly={!isEditable}
                value={accountDetails.city}
                name="city"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.cityError} />
            </div>
            <div className="w-full md:w-1/3 px-2">
              <h1 className="text-xs font-semibold mb-2">State</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.stateError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="State"
                readOnly={!isEditable}
                value={accountDetails.state}
                name="state"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={accountErrors.stateError} />
            </div>
            <div className="w-full md:w-1/3 px-2">
              <h1 className="text-xs font-semibold mb-2">Zipcode</h1>
              <input
                className={`passwordinput text-grey-darker ${
                  accountErrors.firstNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Zipcode"
                readOnly={!isEditable}
                value={accountDetails.pincode}
                name="pincode"
                onChange={handleChange}
              />
            </div>
            <ErrorMsgComponent msg={accountErrors.zipcodeError} />
          </div>
          {isEditable && (
            <div className="flex items-center justify-between mt-8 mb-8">
              <div className="flex-1 ml-3 text-xs">
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-accept w-fit text-white px-4 py-2 text-sm rounded hover:bg-green-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditable(false);
                    setAccountDetails(intialDetails);
                    setAccountErrors(errorDetails);
                  }}
                  className=" text-white ml-10 bg-red-700 w-32 hover:bg-red-800  focus:ring-red-300 rounded text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteRequest}
        confirmText={"Yes!Request for Delete"}
        cancelText={"No!"}
      >
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          Are you sure wanted To Delete Your Account!
        </p>
      </ConfirmationModal>
    </div>
  );
};

export default EmpAccountSettings;
