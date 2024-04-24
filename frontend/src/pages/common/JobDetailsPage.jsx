import React from "react";
import CategoryList from "../../components/CategoryList";
import { useQuery } from "../../customHooks/useQuery";
import { useSelector } from "react-redux";

const JobDetailsPage = () => {
  const query = useQuery();
  const id = query.get("id");
  const jobData = useSelector((state)=>state.jobSlice.jobs);
  let jobSpecific = jobData &&jobData.find((ele)=>ele.jobdescId==id);
  
  const formattedStartDate = jobSpecific && new Date(jobSpecific?.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedEndDate = jobSpecific && new Date(jobSpecific?.endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const jobDetails = {
    positionName: "Software Engineer",
    companyName: "Innovatech Solutions",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    payPerHour: "$40/hr",
  };

  const employerDetails = {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@innovatech.com",
    phone: "(555) 123-4567",
    address: "123 Innovation Way, Techville, TX",
  };

  const categoryList = [
    {
      type: "skills",
      keywords: "java",
    },
    {
      type: "Exp",
      keywords: "must have 2 years exp in webdev",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto my-10 p-5 bg-white rounded-xl shadow-lg">
      <div className="mb-6 border-b-2 border-gray-100">
        <h3 className="text-3xl text-gray-800 font-bold mb-3">Job Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">
            {jobSpecific?.positionName} 
          </span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">
          {formattedStartDate} to {formattedEndDate}
          </span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">
            {jobSpecific?.startTime} to {jobSpecific?.endTime}
          </span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{jobSpecific?.payPerHour} $ Pay Per Hour</span>
        </div>
        <div className="w-[600px] h-fit mt-6">
          <CategoryList Lists={categoryList} />
        </div>
      </div>

      <div className="mb-6 border-b-2 border-gray-100">
        <h3 className="text-3xl text-gray-800 font-bold mb-3">
          Employer Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{jobSpecific?.email}</span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{jobSpecific?.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="ml-2 text-gray-700">{jobSpecific?.address}</span>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-accept w-fit text-white px-4 py-2 mt-2 hover:bg-green-600">
          Request Match
        </button>
      </div>
    </div>
  );
};

export default JobDetailsPage;

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
