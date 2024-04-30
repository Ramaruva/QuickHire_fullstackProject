import React, { useState } from "react";
import EducationList from "../../components/EducationList";
import { useNavigate } from "react-router-dom";
import {
  checkKeysEmpty,
  validateDate,
  validateMajorName,
  validateSchoolName,
} from "../../validations/standardValidations";
import ErrorMsgComponent from "../../components/shared/ErrorMsgComponent";
import { useDispatch } from "react-redux";
import { setData, setEducationList } from "../../redux/professionalRegisterSlice";

const details = {
  schoolName: "",
  major: "",
  completionTime: "",
};
const Error = {
  schoolNameError: "",
  majorNameError: "",
  endTimeError: "",
};
const Education = () => {
  const [educationDetails, setEducationDetails] = useState(details);
  const [educationErrors, setEducationErrors] = useState(Error);
  const [totalEducationDetails, setTotalEducationDetails] = useState([]);
  const dispatch = useDispatch();
  let sample = { ...details };
  const mystyle = {
    Header: {
      color: "#5856d6",
      fontsize: "48px",
      fontFamily: "Roboto Slab",
      fontWeight: "500",
      lineHeight: "62px",
      textAlign: "center",
    },
    Registration: {
      color: "#3a3a3a",
      fontSize: "40px",
      fontFamily: "Source Sans Pro",
      fontWeight: 700,
      lineHeight: "38px",
      textAlign: "center",
    },
    Para: {
      color: "#3a3a3a",
      fontSize: "18px",
      fontFamily: "Source Sans Pro",
      lineHeight: "31px",
      textAlign: "center",
    },
  };
  const navigation = useNavigate();

  const handleChange = (key, val) => {
    setEducationDetails({ ...educationDetails, [key]: val });
  };
  const handleAdd = () => {
    try {
      console.log(educationDetails);
      const errorObj = {
        schoolNameError: validateSchoolName(educationDetails.schoolName),
        majorNameError: validateMajorName(educationDetails.major),
        endTimeError: validateDate(educationDetails.completionTime),
      };
      setEducationErrors(errorObj);
      console.log(educationErrors);
      if (checkKeysEmpty(errorObj)) return;
      if (totalEducationDetails) {
        setTotalEducationDetails([...totalEducationDetails, educationDetails]);
      } else {
        setTotalEducationDetails([educationDetails]);
      }
      console.log(totalEducationDetails);
      setEducationDetails(details);
      setEducationErrors(Error);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNext = (e) => {
    try {
      e.preventDefault();
      if (totalEducationDetails.length > 0) {
        sample = { ...totalEducationDetails[0] };
        dispatch(setData({...sample}));
        let education = {
          educationList: totalEducationDetails,
        };
        dispatch(setEducationList(totalEducationDetails));
        navigation("/category");
        return;
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1 style={mystyle.Header}>QuickHire</h1>
      <h3 style={mystyle.Registration}>Professional Registration</h3>
      <p style={mystyle.Para}>Enter your Education details to continue</p>
      <div>
        <form className="justify-center ml-[350px] mt-[60px]">
          <div className="flex flex-row gap-5">
            <div>
              <label>School Name:</label>
              <br></br>
              <input
                value={educationDetails.schoolName}
                onChange={(e) => handleChange("schoolName", e.target.value)}
                placeholder="Enter your school name"
                type="text"
                className={`${
                  educationErrors.schoolNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMsgComponent msg={educationErrors.schoolNameError} />
            </div>
            <div>
              <label>Degree/Majors:</label>
              <br></br>
              <input
                value={educationDetails.major}
                onChange={(e) => handleChange("major", e.target.value)}
                placeholder="Enter your major"
                type="text"
                className={`${
                  educationErrors.majorNameError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMsgComponent msg={educationErrors.majorNameError} />
            </div>
            <div>
              <label>Completion Time:</label>
              <br></br>
              <input
                value={educationDetails.completionTime}
                onChange={(e) => handleChange("completionTime", e.target.value)}
                type="Date"
                className={`${
                  educationErrors.endTimeError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMsgComponent msg={educationErrors.endTimeError} />
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={handleAdd}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                add
              </button>
            </div>
          </div>
          {totalEducationDetails && (
            <div className="w-[800px] h-fit mt-6">
              <EducationList educationDetails={totalEducationDetails} />
            </div>
          )}
          <div className="mt-7">
            <button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Education;

//export default EducationForm;
