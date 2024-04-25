import React, { useEffect, useState } from "react";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncEmployerDataReviews,
  asyncProfessionalDataReviews,
} from "../../redux/staffSlicer";
import NoDataAvailable from "../common/NoDataAvailable";

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

  const isEmpty = (data) => data === null || data.length === 0;

  return (
    <div className="grid grid-cols-3 gap-3">
      {customerType === "Professional" ? (
        isEmpty(professionalReviews) ? (
          <NoDataAvailable userType={customerType} viewType={viewType} />
        ) : (
          professionalReviews.map((item, index) => (
            <SingleProfileBox
              key={index}
              customerType={customerType}
              viewType={viewType}
              userData={item}
            />
          ))
        )
      ) : isEmpty(employerReviews) ? (
        <NoDataAvailable userType={customerType} viewType={viewType} />
      ) : (
        employerReviews.map((item, index) => (
          <SingleProfileBox
            key={index}
            customerType={customerType}
            viewType={viewType}
            userData={item}
          />
        ))
      )}
    </div>
  );
};

export default Profiles;
