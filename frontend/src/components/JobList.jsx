import React from "react";

const JobList = () => {
  const jobs = [
    {
      position: "Sofware Developer",
      uniqueId: 1102,
      startDate: "Feb-01-2024",
      endDate: "Feb-02-2024",
      pay: "35$hr",
    },
    {
      position: "Sofware Developer",
      uniqueId: 1103,
      startDate: "Feb-01-2024",
      endDate: "Feb-02-2024",
      pay: "35$hr",
    },
    {
      position: "Sofware Developer",
      uniqueId: 1104,
      startDate: "Feb-01-2024",
      endDate: "Feb-02-2024",
      pay: "35$hr",
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matching Job List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Position</th>
            <th className="px-4 py-2">Unique Id</th>
            <th className="px-4 py-2">Start Date</th>
            <th className="px-4 py-2">End Date</th>
            <th className="px-4 py-2">Pay</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.uniqueId} className="even:bg-gray-100">
              <td className="px-4 py-2 text-left">{job.position}</td>
              <td className="px-4 py-2">{job.uniqueId}</td>
              <td className="px-4 py-2">{job.startDate}</td>
              <td className="px-4 py-2">{job.endDate}</td>
              <td className="px-4 py-2">{job.pay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
