import React, { useState, useEffect } from "react";
import {
  checkKeysEmpty,
  validatePassword,
  validateTwoPassword,
} from "../../validations/standardValidations";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAsync, clearNotification } from "../../redux/authSlice";
import ErrorMsgComponent from "../../components/shared/ErrorMsgComponent";
import Notification from "../../components/shared/Notifications";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notification = useSelector((state) => state.auth.notification);
  const [showNotification, setShowNotification] = useState(false);

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
  const savePassword = async (e) => {
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
        let data = dispatch(
          changePasswordAsync({
            username: user.sub,
            newPassword: passwordDetails.newPassword,
          })
        );
        console.log(data);
        setPasswordDetails(initialDetails);
        setPasswordErrors(errorDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Listen to state changes for notifications
  React.useEffect(() => {
  
    if (notification) {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        dispatch(clearNotification());
      }, 3000*10); // Close the notification automatically after 3 seconds
    }
  }, [notification, dispatch]);

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
        <Notification
          message={notification?.message}
          type={notification?.type}
          isOpen={showNotification}
          onClose={() => setShowNotification(false)}
        />
      </div>
    </div>
  );
};

export default PasswordChange;
