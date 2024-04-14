import React from "react";
import SingleProfileBox from "../../components/StaffComponents/SingleProfileBox";

const Profiles = ({ customerType, viewType }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
      <SingleProfileBox customerType={customerType} viewType={viewType} />
    </div>
  );
};

export default Profiles;
