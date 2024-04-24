import React, { useEffect, useState } from "react";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncEmployerDataReviews,
  asyncProfessionalDataReviews,
} from "../../redux/staffSlicer";

const Profiles = ({ customerType, viewType }) => {
  const professionalReviews = useSelector(
    (state) => state.staffStates.professionalReviews
  );
  const employerReviews = useSelector(
    (state) => state.staffStates.employerReviews
  );
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      console.log(customerType);
      if (customerType == "Professional") {
        const prom = dispatch(asyncProfessionalDataReviews());
        prom.then((response) => {
          console.log(response);
        });
      } else {
        let prom = dispatch(asyncEmployerDataReviews());
        console.log(prom);
        prom.then((response) => {
          console.log(response);
        });
      }
      console.log(professionalReviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);
  return (
    <div className="grid grid-cols-3 gap-3">
      {customerType=="Professional"&&professionalReviews &&
        professionalReviews.map((item, index) => {
          return (
            <SingleProfileBox
              key={index}
              customerType={customerType}
              viewType={viewType}
              userData={item}
            />
          );
        })}
      {customerType!="Professional"&&employerReviews &&
        employerReviews.map((item, index) => {
          return (
            <SingleProfileBox
              key={index}
              customerType={customerType}
              viewType={viewType}
              userData={item}
            />
          );
        })}
    </div>
  );
};

export default Profiles;
