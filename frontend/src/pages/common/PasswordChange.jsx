import React, { useState } from "react";
import {
  checkKeysEmpty,
  validatePassword,
  validateTwoPassword,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../../components/shared/ErrorMsgComponent";

const initialDetails = {
  currentPassword: "",
  newPassword: "",
  comfirmNewPassword: "",
};
const errorDetails = {
  passwordError: "",
  confirmNewPasswordError: "",
};
const PasswordChange = () => {
  const [passwordDetails, setPasswordDetails] = useState(initialDetails);
  const [passwordErrors, setPasswordErrors] = useState(errorDetails);
  const handleChange = (e) => {
    try {
      setPasswordDetails({
        ...passwordDetails,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const savePassword = (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        passwordError: validatePassword(passwordDetails.newPassword),
        confirmNewPasswordError: validateTwoPassword(
          passwordDetails.newPassword,
          passwordDetails.comfirmNewPassword
        ),
      };
      setPasswordErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        alert("Password changed successful");
        setPasswordDetails(initialDetails);
        setPasswordErrors(errorDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-xl w-1/2">
        <h1 className="text-xs font-semibold mb-4">Current Password</h1>
        <input
          className="passwordinput text-grey-darker"
          type="password"
          placeholder="Current Password"
          value={passwordDetails.currentPassword}
          name="currentPassword"
          onChange={handleChange}
        />
        <h1 className="text-xs font-semibold mb-4">New Password</h1>
        <input
          className={`passwordinput text-grey-darker ${
            passwordErrors.passwordError.length > 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="New Password"
          value={passwordDetails.newPassword}
          name="newPassword"
          onChange={handleChange}
        />
        <ErrorMsgComponent msg={passwordErrors.passwordError} />
        <h1 className="text-xs font-semibold mb-4">Confirm New Password</h1>
        <input
          className={`passwordinput text-grey-darker ${
            passwordErrors.confirmNewPasswordError.length > 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
          type="password"
          placeholder="Confirm Password"
          value={passwordDetails.comfirmNewPassword}
          name="comfirmNewPassword"
          onChange={handleChange}
        />
        <ErrorMsgComponent msg={passwordErrors.confirmNewPasswordError} />
        <div className="flex items-center justify-between mt-8 mb-8">
          <div className="flex-1 ml-3 text-xs">
            <button
              type="button"
              onClick={savePassword}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Save & Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
