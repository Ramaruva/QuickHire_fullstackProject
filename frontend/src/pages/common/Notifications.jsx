import React from "react";
import StaffNotifications from "../../components/StaffComponents/StaffNotifications";
import { useQuery } from "../../customHooks/useQuery";
import EmpNotification from "../../components/Employer/EmpNotification";

const Notifications = () => {
  const query = useQuery("user");
  const user = query.get("user");
  return (
    <div>
      {(() => {
        switch (user) {
          case "empolyer":
            return <EmpNotification />;
          default:
            return <StaffNotifications />;
        }
      })()}
    </div>
  );
};

export default Notifications;
