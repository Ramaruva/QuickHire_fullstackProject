import React, { useEffect } from "react";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";
import { getRequest } from "../../API/config";
import { useDispatch, useSelector } from "react-redux";
import { asyncProfessionalDataReviews } from "../../redux/staffSlicer";

const Profiles = ({ customerType, viewType }) => {
  const professionalReviews = useSelector((state)=>state.staffStates.professionalReviews);
  const dispatch = useDispatch();
  const getData =async()=>{
       try {
        // const data = await getRequest("getAllProfessionalRequests");
        // console.log(data.data);
        const prom = dispatch(asyncProfessionalDataReviews());
        prom.then((response)=>{
          console.log(response);
        })
        console.log(professionalReviews);
       } catch (error) {
        console.log(error);
       } 
  }

  useEffect(()=>{
      getData();
  },[])
  return (
    <div className="grid grid-cols-3 gap-3">
       {
        professionalReviews && professionalReviews.map((item,index)=>{
             return <SingleProfileBox key={index} customerType={customerType} viewType={viewType} userData={item}/>
        })
       }
      {/* <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} /> */}
    </div>
  );
};

export default Profiles;
