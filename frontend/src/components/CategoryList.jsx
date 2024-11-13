import React from "react";
import { MdDelete } from "react-icons/md";

const CategoryList = ({ Lists, handleDelete }) => {
  const manageCategoryList = (item) => {
    try {
      console.log(item);
      let id = item?.qualificationId || item?.ID;
      console.log(id);
      handleDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-800 px-4 py-2">Category Type</th>
            <th className="border border-gray-800 px-4 py-2">Keywords</th>
            {handleDelete && (
              <th className="border border-gray-800 px-4 py-2"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {Lists && Lists?.map((item, index) => (
            <>
              {!item?.delete && (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-800 px-4 py-2">
                    {item?.type}
                  </td>
                  <td className="border border-gray-800 px-4 py-2">
                    {item?.keywords}
                  </td>
                  {handleDelete && (
                    <td
                      className="border border-gray-800 px-4 py-2"
                      onClick={() => manageCategoryList(item)}
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
  );
};

export default CategoryList;
