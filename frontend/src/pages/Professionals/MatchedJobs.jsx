import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { getRequest } from "../../API/config";

const MatchedJobs = () => {
  const user = useSelector((state) => state.auth.user);
  const [jobData,setJobData] = useState([]);
  const getData =async ()=>{
    try {
       const {data} = await getRequest("getMatchedJobs"+"/"+user.profileID)
       console.log(data);
       data.forEach(element => {
        let obj ={
          matchPercentage:element?.matches?.matchPercentage,
          jobID:element?.jobDescription?.jobId,
          positionName:element?.jobDescription?.positionName,
          title:element?.jobDescription?.jobId+" "+element?.jobDescription?.positionName,
          message:"Your Profile has been matched with this company with "+" "+element?.matches?.matchPercentage +" "+"Percentage!"
         }
         if(jobData.length>0){
          setJobData([...jobData,obj]);
         }else{
          setJobData([obj])
         }
       });
       
       
    } catch (error) {
       console.log(error);
    }
  }
  useEffect(()=>{
     getData();
  },[])
  const topics = [
    {
      title: "Google",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    {
      title: "Facebook",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    {
      title: "Amazon",
      message:
        "Your profile has been matched with Software Engi 1 start end end time",
    },
    // ... other topics
  ];

  return (
    <div className="max-w-[90%] mx-auto bg-white shadow rounded">
      {jobData&&jobData?.map((topic, index) => (
        <TopicItem key={index} {...topic} />
      ))}
    </div>
  );
};

export default MatchedJobs;

const TopicItem = ({ title, message }) => {
  return (
    <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};
