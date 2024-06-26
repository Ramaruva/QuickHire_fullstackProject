import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import {
  validatePassword,
  validateUsername,
} from "../validations/standardValidations";

const userDetails = {
  userName: "",
  password: "",
};

const errorMsg = {
  userError: "",
  passwordError: "",
};
const SignIn = () => {
  const [loginDetails, setLoginDetails] = useState(userDetails);
  const [loginErrorMsgs, setLoginErrorMsgs] = useState(errorMsg);
  const handleChange = (e) => {
    try {
      setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        userError: validateUsername(loginDetails.userName),
        passwordError: validatePassword(loginDetails.password),
      };
      console.log(errorObj);
      setLoginErrorMsgs(errorObj);
      if (
        errorObj.userError.length <= 0 &&
        errorObj.passwordError.length <= 0
      ) {
        alert("login success");
        setLoginErrorMsgs(errorMsg);
        tempSignIn(loginDetails.userName);
        setLoginDetails(userDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tempSignIn = (name) => {
    switch (name) {
      case "gowtham123":
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: "gowtham123",
            role: "Professional",
          })
        );
         navigate("/home/BrowseJobs")
        break;
      case "jayasri123":
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: "jayasri123",
            role: "Empolyer",
          })
        );
        navigate("/home/CreateJobs")
        break;
      case "quickstaff123":
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: "gowtham123",
            role: "staff",
          })
        );
        navigate("/home/professionalReviews")
        break;
      case "quickroot123":
        localStorage.setItem(
          "user",
          JSON.stringify({
            userName: "quickroot123",
            role: "root",
          })
        );
        navigate("/home/createAccount")
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="max-h-screen flex flex-col">
        {/* <TopNavBar  /> */}
        {/*
      This example requires updating your template:

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
                      name="userName"
                      type="text"
                      value={loginDetails.userName}
                      onChange={handleChange}
                      autoComplete="userName"
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
                  to="/SignUp"
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
