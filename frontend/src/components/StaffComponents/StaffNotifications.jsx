import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { BsLightningCharge } from "react-icons/bs";
import { getRequest } from "../../API/config";

const StaffNotifications = () => {
  // State to hold notifications from API
  const [apiNotifications, setApiNotifications] = useState([]);

  const getData = async () => {
    try {
      const { data } = await getRequest("getAllMatchRequets");
      setApiNotifications(data); // Save fetched data to state
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const notifications = [
  //   {
  //     userName: "professional",
  //     type: "jobRequest",
  //     companyName: " Google",

  //   },
  //   {
  //     userName: "professional2",
  //     type: "jobRequest",
  //     companyName: " Facebook",
  //   },
  //   {
  //     userName: "professional",
  //     type: "deleteRequest",
  //     companyName: null,
  //   },
  //   {
  //     userName: "empolyee",
  //     type: "deleteRequest",
  //     companyName: null,
  //   },
  //   {
  //     job: "FrontEnd Engineer",
  //     type: "jobNotification",
  //     companyName: " Facebook",
  //   },
  //   {
  //     job: "BackendEnd Engineer",
  //     type: "jobNotification",
  //     companyName: " Linkedin",
  //   },
  //   {
  //     job: "ML Engineer",
  //     type: "jobNotification",
  //     companyName: " Apple",
  //   },
  // ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Notifcations</h1>
      <div className="w-[750px] h-[639px] rounded-3xl box-border border">
        <div className="bg-gray-100 shadow-md rounded px-4 py-6">
          <div className="flex flex-row justify-end mr-4 ">
            {" "}
            <IoIosNotifications />
          </div>

          {apiNotifications.map((notification, index) => (
            <div
              key={index}
              className="rounded-lg m-3 py-2 border-l-0 border border-r-0 border-t-0 hover:bg-blue-300"
            >
              <div className="flex items-center justify-between ">
                <p className="text-base font-normal ml-6">
                  The professional{" "}
                  <span className="font-bold text-indigo-600">
                    {notification.userProfile.username}
                  </span>{" "}
                  has requested a match with Job ID{" "}
                  <span className="font-bold text-indigo-600">
                    {notification.jobDescription.jobId}
                  </span>{" "}
                  for the position of{" "}
                  <span className="font-bold text-indigo-600">
                    {notification.jobDescription.positionName}
                  </span>
                  .
                </p>
              </div>
              <div className="flex items-center justify-end">
                <button className="bg-accept mr-5 hover:bg-blue-700 text-white text-xs h-5 w-24 rounded focus:outline-none">
                  Match
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white mr-6 text-xs h-5 w-24 rounded focus:outline-none">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffNotifications;
