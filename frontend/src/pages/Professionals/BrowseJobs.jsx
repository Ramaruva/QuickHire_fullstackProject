import React, { useEffect } from "react";
import JobCardDetails from "../../components/ProfessionalProfile/JobCardDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/jobSlice";

const BrowseJobs = () => {
  const jobData = useSelector((state) => state.jobSlice.jobs);
  const disPatch = useDispatch();
  useEffect(()=>{
    disPatch(getAllJobs());
    console.log(jobData);
  },[disPatch])
  return (
    <div className="grid grid-cols-3 gap-3">
        {
           jobData && jobData.map((item)=><JobCardDetails  jobData={item}/>)
        }
        
    </div>
  );
};

export default BrowseJobs;
