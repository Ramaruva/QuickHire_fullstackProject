import React from "react";
import { MdDelete } from "react-icons/md";

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const EducationList = ({ educationDetails, handleDelete }) => {
  console.log(educationDetails)
  const manageDelete = (item) => {
    try {
      console.log(item);
      let id = item?.educationId || item?.ID;
      handleDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {educationDetails.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-800 px-4 py-2">Education</th>
                <th className="border border-gray-800 px-4 py-2">Degree/Major</th>
                <th className="border border-gray-800 px-4 py-2">End Date</th>
                {handleDelete && (
                  <th className="border border-gray-800 px-4 py-2"></th>
                )}
              </tr>
            </thead>
            <tbody>
              {educationDetails &&
                educationDetails.map((item, index) => (
                  <>
                    {item &&!item?.delete && (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                      >
                        <td className="border border-gray-800 px-4 py-2">
                          {item?.schoolName}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {item?.major}
                        </td>
                        <td className="border border-gray-800 px-4 py-2">
                          {formatDate(item?.completionTime)}
                        </td>
                        {handleDelete && (
                          <td
                            className="border border-gray-800 px-4 py-2"
                            onClick={() => manageDelete(item)}
                          >
                            <MdDelete />
                          </td>
                        )}
                      </tr>
                    )}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EducationList;
