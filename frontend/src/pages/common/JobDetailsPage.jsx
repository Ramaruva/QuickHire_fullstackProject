import React, { useEffect, useState } from "react";
import CategoryList from "../../components/CategoryList";
import { useQuery } from "../../customHooks/useQuery";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/jobSlice";
import { USERTYPE, reduceMatch } from "../../types";
import JobPosting from "../../components/Employer/JobPosting";
import { getRequest, postRequest } from "../../API/config";

const JobDetailsPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const jobData = useSelector((state) => state.jobSlice.jobs);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let jobSpecific = jobData && jobData.find((ele) => ele.jobdescId == id);

  const [isEditable, setIsEditable] = useState(false);
  const [matchedProfessionals, setMatchedProfessionals] = useState([]);
  const formattedStartDate =
    jobSpecific &&
    new Date(jobSpecific?.startDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formattedEndDate =
    jobSpecific &&
    new Date(jobSpecific?.endDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const matchRequest = async(item) => {
    try {
      console.log(item);
      let obj = {
        jobId: item.jobdescId,
        userProfileID: user.profileID,
      };
     // dispatch(matchRequest(obj));
      const response = await postRequest("professionalJobMatchRequest", obj);
    } catch (error) {
      console.log(error);
    }
  };
  const getMatchedData = async () => {
    try {
      if (user.userType == USERTYPE.employer) {
        const response = await getRequest("getEmployerJobMatches/" + id);
        console.log(response.data);
        setMatchedProfessionals(response.data);
      } else {
        console.log(jobSpecific);
        matchRequest(jobSpecific);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = () => {
    console.log("edit");
    console.log(jobSpecific.qualification);
    jobSpecific = { ...jobSpecific, qualifications: jobSpecific.qualification };
    console.log(jobSpecific);
    setIsEditable((state) => !state);
  };
  useEffect(() => {
    if (user.userType != USERTYPE.professional) {
      dispatch(getAllJobs(user.profileID));
    } else {
      dispatch(getAllJobs());
    }
    console.log(jobData);
    console.log(jobSpecific);
    jobSpecific = jobData && jobData.find((ele) => ele.jobdescId == id);
  }, [dispatch]);
  return isEditable ? (
    <JobPosting isedit={true} editData={jobSpecific} handleEdit={handleEdit} />
  ) : (
    <div className="max-w-6xl mx-auto my-10 p-5 bg-white rounded-xl shadow-lg">
      <div className="mb-6 border-b-2 border-gray-100">
        <h3 className="text-3xl text-gray-800 font-bold mb-3">Job Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          Position:
          <span className="ml-2 text-gray-700">
            {jobSpecific?.positionName} at {jobSpecific?.companyName}
          </span>
        </div>
        <div className="flex items-center">
          Duration:
          <span className="ml-2 text-gray-700">
            {formattedStartDate} to {formattedEndDate}
          </span>
        </div>
        <div className="flex items-center">
          StartTime & EndTime:
          <span className="ml-2 text-gray-700">
            {jobSpecific?.startTime} to {jobSpecific?.endTime}
          </span>
        </div>
        <div className="flex items-center">
          Payment:
          <span className="ml-2 text-gray-700">
            {jobSpecific?.payPerHour} $ Pay Per Hour
          </span>
        </div>
        <div className="w-[600px] h-fit mt-6">
          {jobSpecific?.qualification && (
            <CategoryList Lists={jobSpecific?.qualification} />
          )}
        </div>
      </div>

      <div className="mb-6 border-b-2 border-gray-100">
        <h3 className="text-3xl text-gray-800 font-bold mb-3">
          Employer Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          Email:
          <span className="ml-2 text-gray-700">{jobSpecific?.email}</span>
        </div>
        <div className="flex items-center">
          Phone:
          <span className="ml-2 text-gray-700">{jobSpecific?.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{jobSpecific?.address}</span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={getMatchedData}
          className="bg-accept w-fit text-white px-4 py-2 mt-2 hover:bg-green-600"
        >
          {user.userType == USERTYPE.employer
            ? "Show Matched Professionals "
            : "Request Match"}
        </button>
        {user.userType == USERTYPE.employer && (
          <button
            onClick={handleEdit}
            className="bg-accept w-fit text-white px-4 py-2 mt-2 hover:bg-blue-600 ml-5"
          >
            Edit
          </button>
        )}
      </div>
      <div className="mt-4">
        {user.userType == USERTYPE.employer && matchedProfessionals.length > 0
          ? renderMatchedProfessionals({ matchedProfessionals })
          : user.userType == USERTYPE.employer && (
              <p className="text-gray-600 mt-4 p-2">
                No matches found!!{" "}
                <span className="text-red-400 font-semibold">
                  Click Show Matched Professionals to refresh.{" "}
                </span>
              </p>
            )}
      </div>
    </div>
  );
};

export default JobDetailsPage;

const renderMatchedProfessionals = ({ matchedProfessionals }) => {
  return matchedProfessionals.map((match) => (
    <div key={match.matchId} className="my-2 p-2 border rounded shadow-lg">
      <div className="font-bold text-lg mb-4">
        Match Percentage: {reduceMatch(match.matchPercentage)}%
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="text-gray-800 flex items-center">
          Username: {match.userProfile.username}
        </div>
        <div className=" flex items-center">
          Name: {match.userProfile.firstname} {match.userProfile.lastname}
        </div>
        {/* <div className="mt-2 mb-6 ml-6 mr-6"> */}
        <div className="flex items-center ">
          Email: {match.userProfile.email}
        </div>
        <div className="flex items-center ">
          Phone: {match.userProfile.phone}
        </div>
        {/* </div> */}
      </div>
      <div className="mt-2">
        <CategoryList Lists={match.professionalQualifications} />
      </div>
    </div>
  ));
};

{
  /* <div>
<div className="flex justify-center">
  <h1 className="font-extrabold text-2xl">Job Details</h1>
</div>
<div className="flex flex-col">
  <div>
    <h3 className="text-xl font-semibold m-3">
      Position name:Software Name
    </h3>
  </div>
  <div>
    <h3 className="text-sm font-medium m-3">Company name:Google</h3>
  </div>
</div>
<div className="flex flex-row justify-between">
  <div className="flex flex-col">
    <div className="flex flex-row text-base font-medium ">
      <h5 className="mr-3">First Name</h5>
      <h5>Last Name</h5>
    </div>
    <div className="text-gray-400 text-sm mt-1">
      <h5>Address: 5657, mcfarlein Blvd, Dallas, Texas, United States</h5>
    </div>
  </div>
  <div>
    <div className="flex flex-col mr-12 text-sm text-gray-600 font-normal">
      <div className="flex flex-row">
        <text className="ml-2">empolyer@gmail.com</text>{" "}
      </div>
      <div className="flex flex-row mt-2">
        <p className="ml-2">1234567890</p>
      </div>
    </div>
  </div>
</div>
</div> */
}
