import React, { useState } from "react";
import PaymentHistory from "../../components/Payments/PaymentHistory";

const PaymentPage = () => {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const handleSubscriptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Subscription:", selectedOption);
    // Here, implement your logic to handle the subscription choice, like processing the payment.
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold">
              Choose your Payment plan
            </h2>
          </div>
          <div className="flex justify-between space-x-4">
            <label className="block w-full p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 text-center">
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
            </label>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
      <PaymentHistory />
    </div>
  );
};

export default PaymentPage;
