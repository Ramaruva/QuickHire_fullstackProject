import React, { useState } from "react";
import Category from "../../components/Category";
import CategoryList from "../../components/CategoryList";
import { useNavigate } from "react-router-dom";
const mystyle = {
  Header: {
    color: "#5856d6",
    fontsize: "48px",
    fontFamily: "Roboto Slab",
    fontWeight: "500",
    lineHeight: "62px",
    textAlign: "center",
  },
  Registration: {
    color: "#3a3a3a",
    fontSize: "40px",
    fontFamily: "Source Sans Pro",
    fontWeight: 700,
    lineHeight: "38px",
    textAlign: "center",
  },
  Para: {
    color: "#3a3a3a",
    fontSize: "18px",
    fontFamily: "Source Sans Pro",
    lineHeight: "31px",
    textAlign: "center",
  },
};
const CategoryPage = () => {
  const [categoryLists, setCategoryList] = useState([]);
  const navigation = useNavigate();
  const handleAdd = (category) => {
    try {
      if (categoryLists.length > 0) {
        setCategoryList([...categoryLists, category]);
      } else {
        setCategoryList([category]);
      }
      console.log(categoryLists);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete =(index)=>{
    try {
       const arraycat = categoryLists.splice(index,1);
       console.log(arraycat)
       setCategoryList(arraycat);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div>
        <h1 style={mystyle.Header}>QuickHire</h1>
        <h3 style={mystyle.Registration}>Professional Registration</h3>
        <p style={mystyle.Para}>
          Enter your Role Specific Category details to continue
        </p>
      </div>
      <div className="w-[70%] ml-auto mr-auto mt-10">
        <Category handleCategoryAdd={handleAdd} />
      </div>
      <div className="w-[60%] ml-auto mr-auto mt-10">
        {categoryLists.length > 0 && <CategoryList Lists={categoryLists} handleDelete={handleDelete} />}
      </div>
      {categoryLists.length >= 2 && (
        <div className="ml-[300px] mt-10">
          <button type="button" onClick={()=>navigation("/home/BrowseJobs")} className="bg-blue-500 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Finish
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;


