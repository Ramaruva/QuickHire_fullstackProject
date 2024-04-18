import React from "react";
import StaffSettings from "../../components/StaffComponents/StaffSettings";
import EmpAccountSettings from "../../components/Employer/EmpAccountSettings";
import { useQuery } from "../../customHooks/useQuery";
import ProfSettings from "../../components/ProfessionalProfile/ProfSettings";

const Settings = () => {
  const query = useQuery("user");
  const user = query.get("user");
  return (
    <div>
      {(() => {
        switch (user) {
          case "empolyer":
            return <EmpAccountSettings />;
          case 'professional':
            return <ProfSettings />;  
          default:
            return <StaffSettings />;
        }
      })()}
    </div>
  );
};

export default Settings;
