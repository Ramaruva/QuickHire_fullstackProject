import React, { useState } from "react";
import Category from "../Category";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import CategoryList from "../CategoryList";
import {
  checkKeysEmpty,
  validateEmail,
  validateEmptiness,
  validateFirstName,
  validateLastName,
  validatePay,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../shared/ErrorMsgComponent";

const details = {
  positionName: "",
  uniqueID: "",
  firstName: "",
  lastName: "",
  email: "",
  pay: "",
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
  categoryLists: [],
};

const error = {
  positionError: "",
  uniqueIDError: "",
  firsNameError: "",
  lastNameError: "",
  emailError: "",
  payError: "",
  startDateError: "",
  endDateError: "",
  startTimeError: "",
  endTimeError: "",
  categoryrError: "",
};

const JobPosting = ({ isView = false }) => {
  const [jobDetails, setJobDetails] = useState(details);
  const [jobError, setJobError] = useState(error);
  const [isEditable, setIsEditable] = useState(!isView);
  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };
  const handleJobSave = (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        positionError: validateEmptiness(
          jobDetails.positionName,
          "Position is Empty!"
        ),
        uniqueIDError: validateEmptiness(jobDetails.uniqueID, "Job ID is empty!"),
        firsNameError: validateFirstName(jobDetails.firstName),
        lastNameError: validateLastName(jobDetails.lastName),
        emailError: validateEmail(jobDetails.email),
        payError: validatePay(jobDetails.pay),
        startDateError: validateEmptiness(
          jobDetails.startDate,
          "StartDate is Empty"
        ),
        endDateError: validateEmptiness(
          jobDetails.endDate,
          "End Date is Empty!"
        ),
        startTimeError: validateEmptiness(
          jobDetails.startTime,
          "start Time is empty"
        ),
        endTimeError: validateEmptiness(
          jobDetails.endTime,
          "End Time is empty"
        ),
        categoryrError:
          jobDetails.categoryLists.length >= 2
            ? ""
            : "Need atleast two categories",
      };
      setJobError(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        alert("Job saved successfully");
        setJobError(error);
        setJobDetails(details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryAdd = (obj) => {
    try {
      let array = [...jobDetails.categoryLists, obj];
      setJobDetails({ ...jobDetails, categoryLists: array });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryDelete = (id) => {
    try {
      if (id) {
        const array = jobDetails.categoryLists.filter((item) => item.ID != id);
        setJobDetails({ ...jobDetails, categoryLists: array });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-2xl w-full">
        <div className="flex justify-evenly">
          <div className="flex justify-center">
            <h1 className="text-md font-semibold mb-4">Job Posting</h1>
          </div>
          {isView && (
            <div className="flex justify-end ml-20">
              <MdEdit className="mr-3" />
              <MdDelete />
            </div>
          )}
        </div>
        <h1 className="text-xs font-semibold mb-2">Position</h1>
        <input
          className={`mb-2 w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
            jobError.positionError.length > 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
          type="text"
          readOnly={!isEditable}
          value={jobDetails.positionName}
          name="positionName"
          onChange={handleChange}
          placeholder="Name of Position ex: Software Engineer"
        />
        <ErrorMsgComponent msg={jobError.positionError} />
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">Unique ID</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                jobError.uniqueIDError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="First Name"
              readOnly={!isEditable}
              value={jobDetails.uniqueID}
              name="uniqueID"
              onChange={handleChange}
            />
            <br></br>
            <ErrorMsgComponent msg={jobError.uniqueIDError} />
          </div>
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <h1 className="text-xs font-semibold mb-2">First Name</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                jobError.firsNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="First Name"
              readOnly={!isEditable}
              value={jobDetails.firstName}
              name="firstName"
              onChange={handleChange}
            />
            <br></br>
            <ErrorMsgComponent msg={jobError.firsNameError} />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <h1 className="text-xs font-semibold mb-2">Last Name</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                jobError.lastNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="Last Name"
              readOnly={!isEditable}
              value={jobDetails.lastName}
              name="lastName"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={jobError.lastNameError} />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="w-1/2 mr-1">
            <h1 className="text-xs font-semibold mb-2">Email</h1>
            <input
              className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                jobError.emailError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="email"
              placeholder="Email"
              readOnly={!isEditable}
              value={jobDetails.email}
              name="email"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={jobError.emailError} />
          </div>
          <div className="w-1/2 ml-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                {/*} <FiMail className="text-gray-500" /> */}
              </div>
              <h1 className="text-xs font-semibold mb-2">Pay Per Hour</h1>
              <input
                className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                  jobError.payError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                type="text"
                placeholder="Enter pay per hour in $"
                readOnly={!isEditable}
                value={jobDetails.pay}
                name="pay"
                onChange={handleChange}
              />
              <ErrorMsgComponent msg={jobError.payError} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <div className="flex flex-row mt-4">
              <div className="flex justify-between ">
                <label
                  htmlFor="start-date"
                  className="text-xs font-semibold mb-2"
                >
                  Start Date:
                </label>
                <input
                  type="date"
                  id="start-date"
                  className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darker ${
                    jobError.startDateError.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  readOnly={!isEditable}
                  value={jobDetails.startDate}
                  name="startDate"
                  onChange={handleChange}
                />
                <br></br>
                <ErrorMsgComponent msg={jobError.startDateError} />
              </div>
              <div className="flex justify-between">
                <label htmlFor="end-date" className="text-xs font-semibold m-2">
                  End Date:
                </label>
                <input
                  type="date"
                  id="end-date"
                  className={`w-full px-4 py-2 text-xs border rounded shadow appearance-none text-grey-darke
                  ${
                    jobError.endDateError.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }
                  `}
                  readOnly={!isEditable}
                  value={jobDetails.endDate}
                  name="endDate"
                  onChange={handleChange}
                />
                <ErrorMsgComponent msg={jobError.endDateError} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-2">
          <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
            <div className="flex flex-row mt-4">
              <div className="flex justify-between ">
                <label
                  htmlFor="start-date"
                  className="text-xs font-semibold mb-2"
                >
                  Start Time:
                </label>
                <input
                  type="time"
                  id="start-date"
                  className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darke ${
                    jobError.startTimeError.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  readOnly={!isEditable}
                  value={jobDetails.startTime}
                  name="startTime"
                  onChange={handleChange}
                />
                <ErrorMsgComponent msg={jobError.startTimeError} />
              </div>
              <div className="flex justify-between">
                <label htmlFor="end-date" className="text-xs font-semibold m-2">
                  End Time:
                </label>
                <input
                  type="time"
                  id="end-date"
                  className={`w-full px-3 py-2 text-xs border rounded shadow appearance-none text-grey-darke ${
                    jobError.endTimeError.length > 0
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  readOnly={!isEditable}
                  value={jobDetails.endTime}
                  name="endTime"
                  onChange={handleChange}
                />
                <ErrorMsgComponent msg={jobError.endTimeError} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start mt-6 text-base font-medium">
          <Category handleCategoryAdd={handleCategoryAdd} />
        </div>
        <ErrorMsgComponent msg={jobError.categoryrError} />
        {jobDetails.categoryLists.length > 0 && (
          <CategoryList
            Lists={jobDetails.categoryLists}
            handleDelete={handleCategoryDelete}
          />
        )}
        <div className="flex items-center justify-between mt-4 mb-8">
          <div className="flex-1 ml-3">
            <button
              type="button"
              onClick={handleJobSave}
              className=" mt-8 flex w-full justify-center rounded-md bg-fbblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save & Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
