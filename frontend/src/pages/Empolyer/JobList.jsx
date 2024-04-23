import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../redux/jobSlice';
import {  useNavigate } from "react-router-dom";

const JobList = () => {
  const jobData = useSelector((state)=>state.jobSlice.jobs);
  const user = useSelector((state)=>state.auth.user);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
       disPatch(getAllJobs(user.profileID));
       console.log(jobData);
  },[disPatch])
   

  return (
    <div   className="bg-gray-100 min-h-screen p-8 ">
    <div className="flex items-center justify-center">
      <h1>Job Posted by you</h1>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full h-16 border-gray-300 border-b py-8">
            <th className="text-left px-6">Position</th>
            <th className="text-left px-6">Job Id</th>
            <th className="text-left px-6">Start Date</th>
            <th className="text-left px-6">End Date</th>
            <th className="text-left px-6">Pay</th>
            <th className="text-right px-6">
             
            </th>
          </tr>
        </thead>
        <tbody>
          {jobData &&jobData.map((job, index) => (
            <tr   key={index} className="h-12 border-gray-300 border-b cursor-pointer">
              <td className="px-6">{job?.positionName}</td>
              <td className="px-6">{job?.jobId}</td>
              <td className="px-6">{job?.startDate}</td>
              <td className="px-6">{job?.endDate}</td>
              <td className="px-6">{job?.payPerHour}</td>
              <td className="px-6 text-center">
                  <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default JobList
