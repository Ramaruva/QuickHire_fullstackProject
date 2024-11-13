import React, { useEffect, useState} from "react";
import { MdDelete } from "react-icons/md";
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { deleteRequest, postRequest } from "../../API/config";
import ConfirmationModal from "../common/ConfirmationModal"

const JobList = () => {
  const jobData = useSelector((state) => state.jobSlice.jobs);
  const user = useSelector((state) => state.auth.user);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    disPatch(getAllJobs(user.profileID));
    console.log(jobData);
  }, [disPatch]);

  const navigateJobSpecific = (id) => {
    try {
      navigate("/home/jobdetails" + "?" + "id=" + id);
    } catch (error) {}
  };
  const handleOpenModal = (jobId) => {
    setSelectedJobId(jobId);
    setModalIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedJobId) {
      try {
        const payload = { jobDescId: selectedJobId };
        const data = await postRequest("jobDelete", payload);
        console.log(data);
        dispatch(getAllJobs(user.profileID));
        setModalIsOpen(false); // Close modal after operation
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 ">
      <div className="flex items-center justify-center">
        <h1>Job Posted by you</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              <th className="text-left px-6">Position</th>
              <th className="text-left px-6">Job Id</th>
              <th className="text-left px-6">Start Date</th>
              <th className="text-left px-6">End Date</th>
              <th className="text-left px-6">Pay</th>
              <th className="text-right px-6"></th>
            </tr>
          </thead>
          <tbody>
            {jobData &&
              jobData.map((job, index) => (
                <tr
                  key={index}
                  className="h-12 border-gray-300 border-b cursor-pointer"
                >
                  <td
                    onClick={() => navigateJobSpecific(job?.jobdescId)}
                    className="px-6"
                  >
                    {job?.positionName}
                  </td>
                  <td className="px-6">{job?.jobId}</td>
                  <td className="px-6">{formatDate(job.startDate)}</td>
                  <td className="px-6">{formatDate(job.endDate)}</td>
                  <td className="px-6">{job?.payPerHour}</td>
                  <td className="px-6 text-center">
                    <FaTrash className="w-5 h-5" onClick={() => handleOpenModal(job?.jobdescId)} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        confirmText="Delete"
        cancelText="Cancel"
      >
        Are you sure you want to delete this job?
      </ConfirmationModal>
    </div>
  );
};
export default JobList;
