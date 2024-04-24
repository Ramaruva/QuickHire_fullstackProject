import React from "react";
import { MdDelete } from "react-icons/md";

const EducationList = ({ educationDetails, handleDelete }) => {
  return (
    <div>
      {educationDetails.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-4 py-2">Education</th>
                <th className="border border-gray-800 px-4 py-2">Major</th>
                <th className="border border-gray-800 px-4 py-2">End Date</th>
                {handleDelete && (
                  <th className="border border-gray-800 px-4 py-2"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {educationDetails &&
                educationDetails.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="border border-gray-800 px-4 py-2">
                      {item?.schoolname}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item?.major}
                    </td>
                    <td className="border border-gray-800 px-4 py-2">
                      {item?.completiontime}
                    </td>
                    {handleDelete && (
                      <td
                        className="border border-gray-800 px-4 py-2"
                        onClick={() => handleDelete(item.ID)}
                      >
                        <MdDelete />
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EducationList;
