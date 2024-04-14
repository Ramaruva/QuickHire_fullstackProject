import React, { useState } from "react";

const StaffAccounts = () => {
  const [data, setData] = useState([
    { username: "JohnDoe", phone: "123-456-7890", email: "john@example.com" },
    { username: "JaneDoe", phone: "987-654-3210", email: "jane@example.com" },
    // Add more data as needed
  ]);
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
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
              <th className="px-4 py-2"></th>{" "}
              {/* Empty header for delete icon */}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{row.username}</td>
                <td className="border px-4 py-2">{row.phone}</td>
                <td className="border px-4 py-2">{row.email}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.828 12l3.293 3.293-1.415 1.414L12 13.414l-3.707 3.293-1.415-1.414L10.172 12 6.465 8.293l1.415-1.414L12 10.586l3.707-3.293 1.415 1.414L13.828 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffAccounts;
