import React, { useEffect, useState } from "react";
import { USERTYPE } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { asyncProfessionalDetails } from "../../redux/staffSlicer";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";

const AllProfiles = () => {
  const [userType, setUserType] = useState(USERTYPE.professional);
  const professionalDetails = useSelector(
    (state) => state.staffStates.professionalDetails
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncProfessionalDetails());
    console.log(professionalDetails);
  }, [dispatch]);
  return (
    <div className="grid grid-cols-3 gap-3">
      {professionalDetails &&
        professionalDetails.map((item, index) => (
          <SingleProfileBox
            key={index}
            customerType={"Professional"}
            viewType={"view"}
            userData={item}
          />
        ))}
    </div>
  );
};

export default AllProfiles;
