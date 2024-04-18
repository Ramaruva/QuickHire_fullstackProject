import React from "react";
import JobCardDetails from "../../components/ProfessionalProfile/JobCardDetails";

const BrowseJobs = () => {
  return (
    <div className="grid grid-cols-3 gap-3">
        <JobCardDetails />
        <JobCardDetails />
        <JobCardDetails />
        <JobCardDetails />
    </div>
  );
};

export default BrowseJobs;
