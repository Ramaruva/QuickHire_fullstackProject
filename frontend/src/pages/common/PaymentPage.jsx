import React, { useEffect, useState } from "react";
import PaymentHistory from "../../components/Payments/PaymentHistory";
import axios from "axios";
import { useSelector } from "react-redux";
import { getRequest, postRequest } from "../../API/config";
const intialDetails = {
  amount: "",
  startdate: "",
  enddate: "",
  status: "",
};
const PaymentPage = ({viewer="customer",customerData=null}) => {
  const [paymentDetails, setPaymentDetails] = useState(intialDetails);
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [paymentHistory,setPaymentHistory] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(false);

  const handleSubscriptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChange =(e)=>{
     try {
         setPaymentDetails({...paymentDetails,[e.target.name]: e.target.value})
     } catch (error) {
       console.log(error);
     }
  }
  const createPayment = async (amount) => {
    try {
      setLoading(true);
      if(viewer=="staff"){
        let payObj={
          ...paymentDetails, profid:customerData?.userprofileid, status:"Unpaid"
        }
        let data = await postRequest("payments",payObj);
        console.log(data);
      }
      else{
        let payObj ={
          ...paymentDetails,profid:user?.profileID,status:"PAID"
        }
        console.log(payObj);
        let data = await postRequest("payments",payObj);
        console.log(data);
      }
      // Replace with your actual endpoint and add necessary headers or credentials
      
      getAllPayments();
      setLoading(false);
      // Handle further actions after payment success here
    } catch (error) {
      setLoading(false);
      console.error("Payment error", error);
      alert("Payment failed"); // Show a proper error message to the user
    }
  };

  const getAllPayments =async ()=>{
    try {
      if(viewer=="staff"){
        let data = await getRequest("getAllPayments/"+ customerData?.userprofileid);
        console.log(data.data);
        setPaymentHistory(data.data);
        return;
      }
       let data = await getRequest("getAllPayments/"+user?.profileID);
       console.log(data);
       setPaymentHistory(data.data);
    } catch (error) {
       console.log(error);
    }
  }
useEffect(()=>{
  getAllPayments();
},[])
  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = selectedOption === "monthly" ? 5 : 50; // Monthly or yearly rate
    createPayment(amount);
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">{viewer=="staff"
            ? "Choose customers payment plan":"Choose your Payment plan"}</h2>
          </div>
          <div className="flex justify-between space-x-4">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
              <h1 className="text-xs font-semibold mb-2">amount:</h1>
              <input
                className={`passwordinput text-grey-darker ${"border-gray-300"}`}
                type="text"
                placeholder="amount"
                value={paymentDetails.amount}
                name="amount"
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            {/* <label className="block w-full p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 text-center">
              <input
                type="radio"
                name="subscription"
                value="monthly"
                checked={selectedOption === "monthly"}
                onChange={handleSubscriptionChange}
                className="mr-2"
              />
              <span className="font-medium">Monthly Bill</span>
              <div className="text-sm">$5/month</div>
            </label>
            <label className="block w-full p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 text-center">
              <input
                type="radio"
                name="subscription"
                value="yearly"
                checked={selectedOption === "yearly"}
                onChange={handleSubscriptionChange}
                className="mr-2"
              />
              <span className="font-medium">Yearly Bill</span>
              <div className="text-sm">$50/year</div>
            </label> */}
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className={`px-6 py-2 ${
                loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
              } text-white rounded`}
              disabled={loading}
            >
              {loading ? "Processing..." : viewer=="staff"?"RequestPay":"Pay"}
            </button>
          </div>
        </form>
      </div>
      {
         <PaymentHistory  paymentData ={paymentHistory}  getAllPayments={getAllPayments}/>
      }
      
    </div>
  );
};

export default PaymentPage;
