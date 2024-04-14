import React from 'react'
import { MdDelete } from "react-icons/md";

const JobList = () => {

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
      <h1>Job Posted by you</h1>
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
             
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr   key={index} className="h-12 border-gray-300 border-b cursor-pointer">
              <td className="px-6">{job.position}</td>
              <td className="px-6">{job.id}</td>
              <td className="px-6">{job.startDate}</td>
              <td className="px-6">{job.endDate}</td>
              <td className="px-6">{job.pay}</td>
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
