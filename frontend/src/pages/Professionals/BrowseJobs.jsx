import React, { useEffect } from "react";
import JobCardDetails from "../../components/ProfessionalProfile/JobCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/jobSlice";
import { postRequest } from "../../API/config";

const BrowseJobs = () => {
  const jobData = useSelector((state) => state.jobSlice.jobs);
  const user = useSelector((state) => state.auth.user);
  const disPatch = useDispatch();
  const matchRequest = async(item) => {
    try {
      console.log(item);
      let obj = {
        jobId: item.jobdescId,
        userProfileID: user.profileID,
      };
      const response = await postRequest("professionalJobMatchRequest", obj);
     // disPatch(matchRequest(obj));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    disPatch(getAllJobs());
    console.log(jobData);
  }, [disPatch]);
  return (
    <div className="grid grid-cols-3 gap-3">
      {jobData &&
        jobData.map((item) => (
          <JobCardDetails handleMatch={matchRequest} jobData={item} />
        ))}
    </div>
  );
};

export default BrowseJobs;
