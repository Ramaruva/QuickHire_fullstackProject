import React from "react";
import { useState } from "react";
import {
  checkKeysEmpty,
  validateEmptiness,
} from "../validations/standardValidations";
import ErrorMsgComponent from "./shared/ErrorMsgComponent";

const details = {
  type: "",
  keywords: "",
};
const intialErrorObj = {
  typeError: "",
  keywordError: "",
};
const Category = ({ handleCategoryAdd }) => {
  const [category, setCategory] = useState(details);
  const [categoryError, setCategoryError] = useState(intialErrorObj);
  const handleChange = (key, val) => {
    setCategory({ ...category, [key]: val });
  };

  const handleAdd = () => {
    try {
      const errorObj = {
        typeError: validateEmptiness(category.type, "Type Field is empty!"),
        keywordError: validateEmptiness(
          category.keywords,
          "Keywords are empty!"
        ),
      };
      setCategoryError(errorObj)
      if (!checkKeysEmpty(errorObj)) {
        handleCategoryAdd({...category,ID:Date.now()+Math.random()});
        setCategory(details);
        setCategoryError(intialErrorObj);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form>
          <div className="flex flex-row -mx-2 mb-2">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
              <label className="text-xs font-semibold mb-2">
                Category Type:
              </label>
              <br></br>
              <input
                className={`w-full text-xs border rounded shadow appearance-none text-grey-darke ${
                  categoryError.typeError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                value={category.type}
                onChange={(e) => handleChange("type", e.target.value)}
                placeholder="Enter your Category Type"
                type="text"
              />
              <ErrorMsgComponent msg={categoryError.typeError}/>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="text-xs font-semibold mb-2">Keywords</label>
              <br></br>
              <input
                className={`w-full text-xs border rounded shadow appearance-none text-grey-darke ${
                  categoryError.keywordError.length > 0
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your keywwords"
                value={category.keywords}
                onChange={(e) => handleChange("keywords", e.target.value)}
                type="text"
              />
               <ErrorMsgComponent msg={categoryError.keywordError}/>
            </div>
            <div className="m-6">
              <button
                type="button"
                onClick={handleAdd}
                className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
