import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePassword,
  validateUsername,
} from "../validations/standardValidations";
import { postRequest } from "../API/config";
import { useDispatch, useSelector } from "react-redux";
import { getLocalItem, setLocalItem } from "../localStrorage";
import { checkAuthenticationAsync } from "../redux/authSlice";
import { USERTYPE } from "../types";
import { jwtDecode } from "jwt-decode";

const userDetails = {
  username: "",
  password: "",
};

const errorMsg = {
  userError: "",
  passwordError: "",
  apiError: "",
};
const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState(userDetails);
  const [loginErrorMsgs, setLoginErrorMsgs] = useState(errorMsg);
  const disPatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleChange = (e) => {
    try {
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const errorObj = {
    userError: validateUsername(loginDetails.username),
    passwordError: validatePassword(loginDetails.password),
    apiError: "",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Set the new state for any possible previous API error message to clear it out.
    setLoginErrorMsgs({
      ...loginErrorMsgs,
      apiError: "",
    });

    console.log(errorObj);
    setLoginErrorMsgs(errorObj);

    if (errorObj.userError.length <= 0 && errorObj.passwordError.length <= 0) {
      // Set the new state for any possible previous API error message to clear it out.
      setLoginErrorMsgs({
        ...loginErrorMsgs,
        apiError: "",
      });
    }
    try {
      const data = await postRequest("login", loginDetails);
      if (data.status === 200) {
        console.log(data?.data?.token);
        setLocalItem("token", data?.data?.token);
        await disPatch(checkAuthenticationAsync());
        let token = getLocalItem("token");
        let decode = jwtDecode(token);
        console.log(decode);
        redirect(decode.userType, decode.isPasswordChanged);
      } else {
        // Handle any other non-successful status codes here.
        setLoginErrorMsgs({
          ...loginErrorMsgs,
          apiError: "Invalid username or password",
        });
      }
    } catch (error) {
      // This will handle network errors and any other errors thrown by postRequest.
      setLoginErrorMsgs({
        ...loginErrorMsgs,
        apiError:
          error.response?.data?.message ||
          "Invalid username or password. Please enter valid credentials.",
      });
    }
  };

  const redirect = (userType, isPasswordChanged) => {
    console.log(userType, USERTYPE.root, isPasswordChanged);
    // Check if the password needs to be changed first
    if (isPasswordChanged === "No") {
        navigate("/home/PasswordChange");
    } else {
        // Proceed with user type specific redirection
        switch (userType) {
            case USERTYPE.professional:
                navigate("/home/BrowseJobs");
                break;
            case USERTYPE.employer:
                navigate("/home/CreateJobs");
                break;
            case USERTYPE.staff:
                navigate("/home/professionalReviews");
                break;
            case USERTYPE.root:
                navigate("/home/createAccount");
                break;
            default:
                break;
        }
    }
};
  return (
    <>
      <div className="max-h-screen flex flex-col">
        {/* <TopNavBar  /> */}
        {/*
      This example requires updating your template:
      console.
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    */}
        <div className="flex grid h-screen grid-cols-2">
          <div className="flex min-h-full flex-1 flex-col justify-center ml-6 rounded-lg px-6 py-12 lg:px-8 shadow-md bg-accept">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto  rounded-xl bg-details"
                src="/assets/bannerlog.webp"
                alt="QuickHire"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Welcome to QuickHire
              </h2>
              <p className="mt-10 text-center text-2xl font-bold text-white leading-9 tracking-tight text-gray-90">
                Find short term jobs and connect{" "}
              </p>
            </div>
          </div>
          <div className="flex min-h-full flex-1 flex-col justify-center ml-3 bg-indigo-200 mr-6 rounded-lg px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Login to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      name="username"
                      type="text"
                      value={loginDetails.username}
                      onChange={handleChange}
                      autoComplete="username"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        !(loginErrorMsgs?.userError.length > 0)
                          ? "border-gray-300"
                          : "border-red-500"
                      }`}
                    />
                    {loginErrorMsgs?.userError.length > 0 && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="username-error"
                      >
                        {loginErrorMsgs.userError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={loginDetails.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                        loginErrorMsgs.userError.length > 0
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                    {loginErrorMsgs?.passwordError.length > 0 && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="username-error"
                      >
                        {loginErrorMsgs.passwordError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-fbblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Login
                  </button>
                  {loginErrorMsgs.apiError && (
                    <p className="text-sm text-red-600 text-center mt-2">
                      {loginErrorMsgs.apiError}
                    </p>
                  )}
                </div>
                <div className="text-sm text-center">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  to="/"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Create an Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
