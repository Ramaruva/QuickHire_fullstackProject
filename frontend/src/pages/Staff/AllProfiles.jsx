import React, { useEffect, useState } from "react";
import { USERTYPE } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { asyncProfessionalDetails, asyncEmployerDetails } from "../../redux/staffSlicer";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";
import { setLoading } from "../../redux/loadingSlice";

const AllProfiles = () => {
  const [filter, setFilter] = useState('Professional');
  const details = useSelector(state =>
    filter === 'Professional' ? state.staffStates.professionalDetails : state.staffStates.employerDetails
  );
  const dispatch = useDispatch();

  useEffect(() => {
    
    switch (filter) {
      case 'Professional':
        dispatch(asyncProfessionalDetails());
        break;
      case 'Employer':
        dispatch(asyncEmployerDetails());
        break;
      default:
        console.log("No such filter");
    }
    dispatch(setLoading(false))
  }, [dispatch, filter]);

  return (
    <div>
    <div className="mb-4">
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="Professional">Professionals</option>
        <option value="Employer">Employers</option>
      </select>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {details &&
        details.map((item, index) => (
          <SingleProfileBox
            key={index}
            customerType={filter}
            viewType="view"
            userData={item}
          />
        ))}
    </div>
  </div>
  );
};

export default AllProfiles;
