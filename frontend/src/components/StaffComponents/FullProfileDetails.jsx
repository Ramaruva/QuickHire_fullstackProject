import React, { useEffect, useState } from "react";
import { FaUserTie, FaPhoneAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi"; // react-icons for professional icon
import { IoIosMail } from "react-icons/io";
import EducationList from "../EducationList";
import CategoryList from "../CategoryList";
import PaymentHistory from "../Payments/PaymentHistory";
import { BsBank } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { USERREQUESTTYPE, USERTYPE, reduceMatch } from "../../types";
import {
  asyncEmployerDataReviews,
  asyncEmployerDeleteReviews,
  asyncEmployerDetails,
  asyncEmployerReviewOperation,
  asyncProfessionalDataReviews,
  asyncProfessionalDeleteReviews,
  asyncProfessionalDetails,
  asyncProfessionalReviewOperation,
} from "../../redux/staffSlicer";
import { getRequest, postRequest, putRequest } from "../../API/config";
import PaymentPage from "../../pages/common/PaymentPage";
import { Navigate, useNavigate } from "react-router-dom";

const FullProfileDetails = ({ customerType, operationType, requestID }) => {
  const professionalReviews = useSelector(
    (state) => state.staffStates.professionalReviews
  );
  const employerReviews = useSelector(
    (state) => state.staffStates.employerReviews
  );

  const professionalDetails = useSelector(
    (state) => state.staffStates.professionalDetails
  );
  const employerDetails = useSelector(
    (state) => state.staffStates.employerDetails
  );
  const initateMatch = async () => {
    try {
      const { data } = await getRequest(
        "initateProfessionalMatches/" + requestID
      );
      setJobList(data);
      setShowJobMatches(true);
      console.log(data);
    } catch (error) {
      console.log(error);
      setShowJobMatches(false);
    }
  };
  const handleDeleteRequest = async (status) => {
    try {
      const payload = {
        requestId: userData.prequestid,
        requestType: status,
        message: rejectMsg,
      };
      if (customerType == "Employer") {
        const { data } = await putRequest("employerDeleteOperation", payload);
        console.log(data);
      } else {
        const { data } = await putRequest(
          "professionalDeleteOperation",
          payload
        );
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formatDate = (dateString) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [jobList, setJobList] = useState([]);
  const [showJobMatches, setShowJobMatches] = useState(false);
  const [rejectMsg, setRejectMsg] = useState("");
  const user = useSelector((state) => state.auth.user);

  const getLatestData = () => {
    try {
      if (customerType == "Professional") {
        if (operationType == "view") {
          const obj = professionalDetails.find(
            (element) => element.userprofileid == requestID
          );
          if (obj == undefined || obj == null) {
            const prom = dispatch(asyncProfessionalDetails());
            setUserData(
              professionalDetails.find(
                (element) => element.userprofileid == requestID
              )
            );
            prom.then((res) => {
              let arr = res.payload;
              setUserData(
                arr.find((element) => element.userprofileid == requestID)
              );
            });
          } else {
            setUserData(obj);
          }
        } else {
          const obj = professionalReviews.find(
            (element) => element.userprofileid == requestID
          );
          console.log(obj);
          if (obj == undefined || obj == null) {
            let prom;
            if (operationType == "delete") {
              prom = dispatch(asyncProfessionalDeleteReviews());
              console.log(prom);
            } else {
              prom = dispatch(asyncProfessionalDataReviews());
            }
            let upobj = professionalReviews.find(
              (ele) => ele.userprofileid == requestID
            );
            if (upobj == undefined) {
              prom.then((res) => {
                let resObj = res.payload;
                setUserData(
                  resObj.find((element) => element.userprofileid == requestID)
                );
              });
            } else {
              setUserData(upobj);
            }
          } else {
            setUserData(obj);
          }
        }
      } else {
        if (operationType == "view") {
          const obj = employerDetails.find(
            (element) => element.userprofileid == requestID
          );
          if (obj == undefined || obj == null) {
            const prom = dispatch(asyncEmployerDetails());
            setUserData(
              employerDetails.find(
                (element) => element.userprofileid == requestID
              )
            );
            prom.then((res) => {
              let arr = res.payload;
              setUserData(
                arr.find((element) => element.userprofileid == requestID)
              );
            });
          } else {
            setUserData(obj);
          }
        } else {
          const obj = employerReviews.find(
            (element) => element.userprofileid == requestID
          );
          if (obj == undefined || obj == null) {
            let prom;
            if (operationType == "delete") {
              prom = dispatch(asyncEmployerDeleteReviews());
            } else {
              prom = dispatch(asyncEmployerDataReviews());
            }
            let upobj = employerReviews.find(
              (ele) => ele.userprofileid == requestID
            );
            if (upobj == undefined) {
              prom.then((res) => {
                let resObj = res.payload;
                setUserData(
                  resObj.find((element) => element.userprofileid == requestID)
                );
              });
            } else {
              setUserData(upobj);
            }
          } else {
            setUserData(obj);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleReview = (reviewType) => {
    try {
      let postData = {
        id: userData?.prequestid,
        requestType: reviewType,
        reviewMessage: rejectMsg,
      };
      if (customerType == "Professional") {
        const data = dispatch(asyncProfessionalReviewOperation(postData));
      } else {
        const data = dispatch(asyncEmployerReviewOperation(postData));
      }
      navigate("/home/AllCustomer");

      // history("-1");
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatchNotification = async (data) => {
    try {
      console.log(data);
      let payload = {
        customerId: requestID,
        jobId: data?.jobDescription?.jobdescriptionId,
        percentage: data.matchPercentage,
        staffId: user.profileID,
      };
      const res = await postRequest("staffJobMatchNotification", payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLatestData();
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="font-extrabold text-2xl">{customerType} Details</h1>
      </div>
      <div className="flex flex-col">
        <div className="flex-shrink-0">
          {customerType == "Professional" ? (
            <FaUserTie className="h-12 w-14" />
          ) : (
            <BsBank className="h-12 w-14" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold m-3">
            Username: {userData?.username}
          </h3>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row text-base font-medium ">
            <h5 className="mr-3">Firstname: {userData?.firstname}</h5>
            <h5>Lastname: {userData?.lastname}</h5>
          </div>
          <div className="text-gray-400 text-sm mt-1">
            <h5>
              Address:
              {" " +
                userData?.address +
                " " +
                userData?.city +
                " " +
                userData?.state +
                " " +
                userData?.pincode}
            </h5>
          </div>
        </div>
        <div>
          <div className="flex flex-col mr-12 text-sm text-gray-600 font-normal">
            <div className="flex flex-row">
              <IoIosMail />
              <text className="ml-2"> {userData?.email}</text>{" "}
            </div>
            <div className="flex flex-row mt-2">
              <FaPhoneAlt />
              <p className="ml-2">{userData?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      {customerType == "Professional" && (
        <div className="w-fit h-fit mt-6">
          <h3 className="m-1">Education:</h3>
          {userData?.education && (
            <EducationList educationDetails={userData?.education} />
          )}
          <h3 className="m-1">Categories:</h3>
          {userData?.qualification && (
            <CategoryList Lists={userData?.qualification} />
          )}
        </div>
      )}
      {operationType == "review" && (
        <div className="w-[500px]  mt-5">
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write the reasons for rejection"
            value={rejectMsg}
            onChange={(e) => setRejectMsg(e.target.value)}
          ></textarea>
          <div className="flex justify-between flex-row mt-2">
            <button
              type="button"
              className="bg-accept w-32 text-white px-4 py-2 text-sm rounded hover:bg-green-600"
              onClick={() => handleReview(USERREQUESTTYPE.accountAccepted)}
            >
              Accept
            </button>
            <button
              type="button"
              className=" text-white bg-red-700 w-32 hover:bg-red-800  focus:ring-red-300 rounded text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => handleReview(USERREQUESTTYPE.accountRejected)}
            >
              Reject
            </button>
          </div>
        </div>
      )}
      {operationType == "delete" && (
        <div className="w-[500px]  mt-5">
          This Customer has requested for Account Delete!
          <textarea
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write the reasons for rejection"
            value={rejectMsg}
            onChange={(e) => setRejectMsg(e.target.value)}
          ></textarea>
          <div className="flex justify-between flex-row mt-2">
            <button
              type="button"
              className="bg-accept w-34 text-white px-4 py-2 text-sm rounded hover:bg-green-600"
              onClick={() =>
                handleDeleteRequest(USERREQUESTTYPE.deleteAccepted)
              }
            >
              Delete Account!
            </button>
            <button
              type="button"
              className=" text-white bg-red-700 w-34 hover:bg-red-800  focus:ring-red-300 rounded text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() =>
                handleDeleteRequest(USERREQUESTTYPE.deleteRejected)
              }
            >
              Reject Request
            </button>
          </div>
        </div>
      )}

      {(operationType == "view" || operationType == "delete") && (
        <div>
          <PaymentPage viewer="staff" customerData={userData} />
          {/* <div className="container mx-auto p-4">
            <form onSubmit={initateMatch} className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-lg font-semibold">Request Payment</h2>
              </div>
              <div className="flex justify-between space-x-4">
                <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                  <h1 className="text-xs font-semibold mb-2">amount Due:</h1>
                  <input
                    className={`passwordinput text-grey-darker ${"border-gray-300"}`}
                    type="text"
                    placeholder="amount"
                    value={paymentDetails.amount}
                    name="amount"
                    // onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                  <h1 className="text-xs font-semibold mb-2">startDate:</h1>
                  <input
                    className={`passwordinput text-grey-darker ${"border-gray-300"}`}
                    type="Date"
                    placeholder=""
                    value={paymentDetails.startdate}
                    name="startdate"
                    // onChange={handleChange}
                  />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
                  <h1 className="text-xs font-semibold mb-2">endDate:</h1>
                  <input
                    className={`passwordinput text-grey-darker ${"border-gray-300"}`}
                    type="Date"
                    placeholder=""
                    value={paymentDetails.enddate}
                    name="enddate"
                    // onChange={handleChange}
                  />
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className={`px-6 py-2 ${
                    loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Request"}
                </button>
              </div>
            </form>
          </div> */}
          <div className="w-full mt-4">
            {/* PaymentHistory:
            <div className="w-9/12 ml-12">
              <PaymentHistory paymentData={userData?.paymentHistory} />
            </div> */}
            {customerType == "Professional" && (
              // <ProfessionalJobListingPage />
              <div>
                <div className="bg-gray-100 p-8 w-full ">
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="flex items-center m-6 bg-blue-800 hover:bg-blue-900 text-white font-bold py-4 px-6 rounded-md"
                      onClick={initateMatch}
                    >
                      Initiate Match
                      <FiSearch className="text-2l ml-4" />
                    </button>
                  </div>

                  {showJobMatches && jobList.length > 0 ? (
                    <div className="bg-gray-100 min-h-screen p-8">
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white">
                          <thead>
                            <tr className="w-full h-16 border-gray-300 border-b py-8">
                              <th className="text-left px-6">Position</th>
                              <th className="text-left px-6">Unique Id</th>
                              <th className="text-left px-6">Start Date</th>
                              <th className="text-left px-6">End Date</th>
                              <th className="text-left px-6">Pay</th>
                              <th className="text-right px-6">Match Percent</th>
                              <th className="text-right px-6">notify</th>
                            </tr>
                          </thead>
                          <tbody>
                            {jobList.map((job, index) => (
                              <tr
                                key={index}
                                className="h-12 border-gray-300 border-b"
                              >
                                <td className="px-6">
                                  {job.jobDescription.positionName}
                                </td>
                                <td className="px-6">
                                  {job.jobDescription.jobId}
                                </td>
                                <td className="px-6">
                                  {formatDate(job.jobDescription.startDate)}
                                </td>
                                <td className="px-6">
                                  {formatDate(job.jobDescription.endDate)}
                                </td>
                                <td className="px-6">
                                  ${job.jobDescription.payPerHour} / hr
                                </td>
                                <td className="px-6 text-center">
                                  {reduceMatch(job.matchPercentage).toFixed(2)}%
                                </td>
                                <td className="px-6">
                                  <button
                                    className="bg-fbblue rounded-md w-16 p-1"
                                    onClick={() => handleMatchNotification(job)}
                                  >
                                    send
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {showJobMatches && (
                        <div className="text-lg p-1 text-center font-semibold mt-4">
                          We are sorry to inform that No Matches Found for your
                          Profile.
                          <span className="text-yellow-400 mt-4 p-2">
                            {" "}
                            Update your skills and come back again for suitable
                            matches.
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FullProfileDetails;
