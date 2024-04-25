import React from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfessionalJobListingPage = ({ type }) => {
  const navigation = useNavigate();
  const jobs = [
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
    {
      position: "Software Developer",
      id: "49345081",
      startDate: "Feb-01-2024",
      endDate: "Feb-01-2024",
      pay: "35 $/hr",
    },
  ];

  
  return (
    <div   className="bg-gray-100 min-h-screen p-8 ">
      <div className="flex items-center justify-center">
        <button className="flex items-center m-6 bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-md">
          Initiate Matching
          <FiSearch className="text-2l ml-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              <th className="text-left px-6">Position</th>
              <th className="text-left px-6">Unique Id</th>
              <th className="text-left px-6">Start Date</th>
              <th className="text-left px-6">End Date</th>
              <th className="text-left px-6">Pay</th>
              <th className="text-right px-6">
                Match Percent
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr onClick={()=>navigation("/home/JobLists/JobDescription")}  key={index} className="h-12 border-gray-300 border-b cursor-pointer">
                <td className="px-6">{job.position}</td>
                <td className="px-6">{job.id}</td>
                <td className="px-6">{job.startDate}</td>
                <td className="px-6">{job.endDate}</td>
                <td className="px-6">{job.pay}</td>
                <td className="px-6 text-center">
                  {type == "empolyerlisting" ? (
                    <MdDelete />
                  ) : (
                    <FiBell className="inline-block" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfessionalJobListingPage;
