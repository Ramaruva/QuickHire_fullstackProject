import React from "react";
import { FaUserTie } from "react-icons/fa"; // react-icons for professional icon
import { BsBank } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { USERREQUESTTYPE } from "../../types";
import {
  asyncEmployerDataReviews,
  asyncEmployerReviewOperation,
  asyncProfessionalDataReviews,
  asyncProfessionalReviewOperation,
} from "../../redux/staffSlicer";

const SingleProfileBox = ({ customerType, viewType, userData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const companyDetails = [
    {
      title: "Google",
      address: "Newyork",
    },
  ];

  const handleAccept = () => {
    try {
      let postData = {
        id: userData.prequestid,
        requestType: USERREQUESTTYPE.accountAccepted,
        reviewMessage: "",
      };
      if (customerType == "Professional") {
        const data = dispatch(asyncProfessionalReviewOperation(postData));
        dispatch(asyncProfessionalDataReviews());
      } else {
        const data = dispatch(asyncEmployerReviewOperation(postData));
        dispatch(asyncEmployerDataReviews());
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigator = () => {
    navigate(
      "/home/individual?type=" +
        customerType +
        "&" +
        "op=" +
        viewType +
        "&" +
        "reqId=" +
        userData.userprofileid
    );
  };

  return (
    <div>
      <div className="bg-white p-3 m-2 border-spacing-3  rounded-lg shadow-2xl">
        <div className="flex justify-between mb-3">
          <div className="flex-shrink-0">
            {customerType == "Professional" ? (
              <FaUserTie className="h-12 w-14" />
            ) : (
              <BsBank className="h-12 w-14" />
            )}
          </div>
          <h2 className="font-light text-xs mb-4 flex justify-end bg-teal-300 p-2 rounded-md">
            {customerType}
          </h2>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold"> {userData?.username}</h4>
        </div>
        {customerType == "Professional" ? (
          userData?.qualification.map((item, index) => {
            return (
              <div key={index} className="mt-4">
                <p className="mb-2 text-gray-800 font-medium text-xs">
                  {item.type} {item.keywords}
                </p>
              </div>
            );
          })
        ) : (
          <div className="mt-4">
            <p className="font-medium">{userData?.companyName}</p>
            <p className="mb-2 text-gray-600">{userData?.city}</p>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          {viewType == "review" && (
            <button
              onClick={handleAccept}
              className="bg-accept w-32 text-white px-4 py-2 hover:bg-green-600"
            >
              Accept
            </button>
          )}

          <button
            onClick={navigator}
            className="bg-details w-32 text-black text- px-4 py-2 hover:bg-blue-600"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProfileBox;
