import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import ErrorMsgComponent from "../shared/ErrorMsgComponent";
import EducationList from "../EducationList";
import Category from "../Category";
import CategoryList from "../CategoryList";
import { useDispatch, useSelector } from "react-redux";
import {
  checkKeysEmpty,
  validateDate,
  validateEmail,
  validateEmptiness,
  validateFirstName,
  validateLastName,
  validateMajorName,
  validatePhone,
  validateSchoolName,
  validateZipcode,
} from "../../validations/standardValidations";
import { getRequest, putRequest } from "../../API/config";
import ConfirmationModal from "../../pages/common/ConfirmationModal";

const education = [
  {
    schoolName: "SMU",
    major: "Msc Software engineering",
    completionTime: "05/25/2025",
    ID: "1234",
  },
  {
    schoolName: "UNT",
    major: "Bsc Comp science",
    completionTime: "05/25/2020",
    ID: "1233",
  },
];
const category = [
  {
    type: "Skills",
    keywords: "Java,Python",
    ID: "1234",
  },
  {
    type: "Experience",
    keywords: "2 years in java",
    ID: "1233",
  },
];
const intitalDetails = {
  firstname: "jaya",
  lastname: "Payili",
  email: "jaya@gmail.com",
  phone: "9988985533",
  address: "23 mcfarlin apt11",
  city: "Dallas",
  state: "Texas",
  pincode: "72509",
  education: education,
  qualification: category,
};

const errorDetails = {
  firstNameError: "",
  lastNameError: "",
  emailError: "",
  phoneError: "",
  mailAddressError: "",
  cityError: "",
  stateError: "",
  zipCodeError: "",
  categoryError: "",
};
const Error = {
  schoolNameError: "",
  majorNameError: "",
  endTimeError: "",
};
const details = {
  schoolName: "",
  major: "",
  completionTime: "",
};
const ProfSettings = () => {
  const [accountDetails, setAccountDetails] = useState(intitalDetails);
  const [accountErrors, setAccountErrors] = useState(errorDetails);
  const [isEditable, setIsEditable] = useState(false);
  const [educationDetails, setEducationDetails] = useState(details);
  const [educationError, setEducationError] = useState(Error);
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const deleteRequests = async () => {
    try {
      let payLoad = {
        userProfileID: user.profileID,
      };
      const { data } = await putRequest("professional/DeleteRequest", payLoad);
      console.log(data);
      handleCloseModal();
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
  const handleEducationAdd = (e) => {
    e.preventDefault();
    const error = {
      schoolNameError: validateSchoolName(educationDetails.schoolName),
      majorNameError: validateMajorName(educationDetails.major),
      endTimeError: validateDate(educationDetails.completionTime),
    };
    setEducationError(error);
    if (!checkKeysEmpty(error)) {
      setEducationError(Error);
      let array = [
        ...accountDetails.education,
        { ...educationDetails, ID: Date.now() + Math.random() },
      ];
      setAccountDetails({ ...accountDetails, education: array });
      setEducationDetails(details);
    }
  };
  const handleEducationChange = (e) => {
    try {
      setEducationDetails({
        ...educationDetails,
        [e.target.name]: e.target.value,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    try {
      setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategory = (obj) => {
    try {
      let array = [...accountDetails.qualification, obj];
      setAccountDetails({ ...accountDetails, qualification: array });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEducationDelete = (id) => {
    try {
      const education = accountDetails.education.map((item) => {
        if (item.educationId == id) {
          item = { ...item, delete: true };
        }
        return item;
      });
      const array = education.filter((item) => id != item.ID);
      setAccountDetails({ ...accountDetails, education: array });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCategoryDelete = (id) => {
    try {
      const qualification = accountDetails.qualification.map((item) => {
        if (item.qualificationId == id) {
          item = { ...item, delete: true };
        }
        return item;
      });
      const array = qualification.filter((item) => id != item.ID);
      setAccountDetails({ ...accountDetails, qualification: array });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = async (e) => {
    try {
      e.preventDefault();
      const errorObj = {
        firstNameError: validateFirstName(accountDetails.firstname),
        lastNameError: validateLastName(accountDetails.lastname),
        emailError: validateEmail(accountDetails.email),
        phoneError: validatePhone(accountDetails.phone),
        mailAddressError: validateEmptiness(
          accountDetails.address,
          "Address field is empty!"
        ),
        cityError: validateEmptiness(
          accountDetails.city,
          "City Field is empty"
        ),
        stateError: validateEmptiness(
          accountDetails.state,
          "State Field is Empty"
        ),
        zipCodeError: validateZipcode(accountDetails.pincode),
        categoryError:
          accountDetails.qualification.length >= 2
            ? ""
            : "Need atleast two Categories",
      };
      setAccountErrors(errorObj);
      if (!checkKeysEmpty(errorObj)) {
        let updatedEducation = [];
        accountDetails.education.map((item) => {
          let obj = {
            schoolname: item.schoolName,
            major: item.major,
            completiontime: item.completionTime,
            delete: item?.delete,
          };
          if (item?.educationId) {
            obj = { ...obj, education_id: item.educationId };
          }
          updatedEducation.push(obj);
        });
        let obj = {
          ...accountDetails,
          qualifications: accountDetails.qualification,
          educationList: updatedEducation,
        };
        console.log(obj);
        const data = await putRequest("professional/editAccount", obj);
        console.log(data);
        setIsEditable(false);
        setAccountErrors(errorDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const data = await getRequest("getUserData" + "/" + user.profileID);
      console.log(data.data);
      setAccountDetails(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
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
              value={accountDetails?.firstname}
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
              value={accountDetails?.lastname}
              name="lastname"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={accountErrors.lastNameError} />
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
              type="text"
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
              type="text"
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
                accountErrors.mailAddressError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="Mailing Address"
              readOnly={!isEditable}
              value={accountDetails?.address}
              name="address"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={accountErrors.mailAddressError} />
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
              value={accountDetails?.city}
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
              value={accountDetails?.state}
              name="state"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={accountErrors.stateError} />
          </div>
          <div className="w-full md:w-1/3 px-2">
            <h1 className="text-xs font-semibold mb-2">Zipcode</h1>
            <input
              className={`passwordinput text-grey-darker ${
                accountErrors.zipCodeError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              placeholder="Zipcode"
              readOnly={!isEditable}
              value={accountDetails?.pincode}
              name="pincode"
              onChange={handleChange}
            />
            <ErrorMsgComponent msg={accountErrors.zipCodeError} />
          </div>
        </div>

        <div className="flex flex-row gap-1 flex-shrink w-full">
          <div>
            <label>School Name:</label>
            <br></br>
            <input
              placeholder="Enter your school name"
              type="text"
              value={educationDetails.schoolName}
              name="schoolName"
              onChange={handleEducationChange}
              className={`${
                educationError.schoolNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMsgComponent msg={educationError.schoolNameError} />
          </div>
          <div>
            <label>Major:</label>
            <br></br>
            <input
              placeholder="Enter your major"
              type="text"
              value={educationDetails.major}
              name="major"
              onChange={handleEducationChange}
              className={`${
                educationError.schoolNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMsgComponent msg={educationError.majorNameError} />
          </div>
          <div>
            <label>Completion Time:</label>
            <br></br>
            <input
              type="date"
              value={educationDetails.completionTime}
              name="completionTime"
              onChange={handleEducationChange}
              className={`${
                educationError.schoolNameError.length > 0
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            <ErrorMsgComponent msg={educationError.endTimeError} />
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleEducationAdd}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              add
            </button>
          </div>
        </div>
        <div className="mt-10">
          <EducationList
            educationDetails={accountDetails.education}
            handleDelete={isEditable && handleEducationDelete}
          />
        </div>
        <div className="mt-5">
          <Category handleCategoryAdd={handleCategory} />
        </div>
        <div className="mt-5">
          {accountDetails.qualification.length > 0 && (
            <CategoryList
              Lists={accountDetails.qualification}
              handleDelete={isEditable && handleCategoryDelete}
            />
          )}
          <ErrorMsgComponent msg={accountErrors.categoryError} />
        </div>
        <div className="flex items-center justify-between mt-8 mb-8">
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
                    setAccountDetails(intitalDetails);
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
       onConfirm={deleteRequests}
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

export default ProfSettings;
