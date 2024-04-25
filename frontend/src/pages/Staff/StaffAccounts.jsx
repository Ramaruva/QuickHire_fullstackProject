import React, { useEffect, useState } from "react";
import { getRequest } from "../../API/config";
import { FaTrash } from 'react-icons/fa';
import ConfirmationModal from "../common/ConfirmationModal"

const StaffAccounts = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleDelete = () => {
    const newData = [...data];
    newData.splice(deleteIndex, 1);
    setData(newData);
    handleCloseModal();
  };

  const handleShowModal = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllStaffDetails =async()=>{
    try {
      const response = await getRequest("getAllStaffAccounts");
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(()=>{
    getAllStaffDetails();
  },[])
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Staff Accounts</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2">Delete Account</th>{" "}
              {/* Empty header for delete icon */}
            </tr>
          </thead>
          <tbody>
            {data && data.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.username}</td>
                <td className="border px-4 py-2">{row.phone}</td>
                <td className="border px-4 py-2">{row.email}</td>
                <td className="border px-4 py-2">
                <button
                    onClick={() => handleShowModal(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleDelete}
        title="Confirm Delete"
        confirmText="Yes, delete it"
        cancelText="No, keep it"
      >
        <p className="my-4 text-gray-600 text-lg leading-relaxed">
          Are you sure you want to delete <span className="text-teal-500">Staff Account</span>?
        </p>
      </ConfirmationModal>
    </div>
  );
};
 
export default StaffAccounts;
 