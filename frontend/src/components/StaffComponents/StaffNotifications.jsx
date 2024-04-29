import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { BsLightningCharge } from "react-icons/bs";
import { getRequest, postRequest } from "../../API/config";
import { useSelector } from "react-redux";
import { MATCHTYPE, reduceMatch } from "../../types";

const StaffNotifications = () => {
  // State to hold notifications from API
  const [apiNotifications, setApiNotifications] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const getData = async () => {
    try {
      const { data } = await getRequest("getAllMatchRequets");
      setApiNotifications(data); // Save fetched data to state
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptMethod = async (id, status) => {
    try {
      let data = {
        profid: user.profileID,
        matchId: id,
        status: status,
      };
      const response = await postRequest("matchStatus", data);
      console.log(response);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleProgressBarClick =  async (item) => {
    try {
      const updatedNotifications = await Promise.all(apiNotifications.map(async  (notification) => {
        if (notification.matchID === item.matchID) {
          let payload ={
            customerId:item.userProfile.userprofileid,
            jobId:item.jobDescription.jobdescriptionid
          }
          let data = await postRequest("singleJobMatchPercentage",payload)
          console.log(data.data);
          if(data.data>85){
            data.data = reduceMatch(data.data);
          }
          return { ...notification, loadedProgress: data.data }; // Load the actual progress from the API
        }
        return notification;
      }));
      console.log(updatedNotifications);
      setApiNotifications(updatedNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Notifications</h1>
      <div className="w-[750px] h-[639px] rounded-3xl box-border border">
        <div className="bg-gray-100 shadow-md rounded px-4 py-6">
          <div className="flex flex-row justify-end mr-4">
            <IoIosNotifications />
          </div>

          {apiNotifications.map((notification, index) => (
            <div
              key={index}
              className="rounded-lg m-3 py-2 border-l-0 border border-r-0 border-t-0 hover:bg-blue-300"
            >
              <p className="text-base font-normal ml-6">
                The professional{" "}
                <span className="font-bold text-indigo-600">
                  {notification.userProfile.username}
                </span>
                has requested a match with Job ID{" "}
                <span className="font-bold text-indigo-600">
                  {notification.jobDescription.jobId}
                </span>
                for the position of{" "}
                <span className="font-bold text-indigo-600">
                  {notification.jobDescription.positionName}
                </span>
                .
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleProgressBarClick(notification)}
                  className="flex ml-7 items-center"
                >
                  <div className="relative pt-1 w-32">
                    <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${notification?.loadedProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                      ></div>
                    </div>
                    <span className="text-sm font-semibold inline-block text-blue-600">
                      Total {notification?.loadedProgress}%
                    </span>
                  </div>
                </button>
                <div>
                  <button
                    onClick={() =>
                      acceptMethod(
                        notification.matchID,
                        MATCHTYPE.STAFF_ACCEPTED
                      )
                    }
                    className="bg-accept hover:bg-blue-700 mr-3 text-white text-xs h-5 w-24 rounded focus:outline-none"
                  >
                    Match
                  </button>
                  <button
                    onClick={() =>
                      acceptMethod(
                        notification.matchID,
                        MATCHTYPE.STAFF_REJECTED
                      )
                    }
                    className="bg-red-500 hover:bg-red-700 text-white text-xs h-5 w-24 rounded focus:outline-none"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffNotifications;
