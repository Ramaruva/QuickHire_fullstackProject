import React from "react";
import { useNavigate } from "react-router-dom";

const JobCardDetails = ({jobData}) => {
  const job = {
    companyName: "Google ",
    positionName: "Software engineer 11",
    payInfo: "50 dollars per hour pay",
    startTime: "27th", // Assuming start time means flexibility here
    endTime: "29th feb",
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const navigation = useNavigate();
  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{jobData?.companyName}</div>
          <p className="text-gray-700 text-base">{jobData?.positionName}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {jobData?.payPerHour}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Start: {formatDate(jobData?.startDate)}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            End: {formatDate(jobData?.endDate)}
          </span>
        </div>
        <div className="px-6 pt-4 pb-2 flex justify-between">
          <button className="bg-accept w-32 text-white px-4 py-2 hover:bg-green-600">
            Request Match
          </button>
          <button
            onClick={() => navigation("/home/jobdetails"+"?" + "id=" + jobData?.jobdescId)}
            className="bg-details w-32 text-black text- px-4 py-2 hover:bg-blue-600"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCardDetails;
