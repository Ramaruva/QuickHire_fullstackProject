import React, { useState } from "react";
import PaymentHistory from "../../components/Payments/PaymentHistory";
import axios from 'axios';

const PaymentPage = ({ profileId }) => {
  const [selectedOption, setSelectedOption] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const handleSubscriptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

   const createPayment = async (amount) => {
    try {
      setLoading(true);
      // Replace with your actual endpoint and add necessary headers or credentials
      const { data } = await axios.post('/api/payments', {
        profileId,
        status: 'Pending', // Initial status, assuming you will process the payment and then update
        startDate: new Date().toISOString(), // Current date, formatted
        endDate: null, // To be set when payment period ends or upon another action
        amount,
      });
      setLoading(false);
      alert('Payment successful');
      // Handle further actions after payment success here
    } catch (error) {
      setLoading(false);
      console.error('Payment error', error);
      alert('Payment failed'); // Show a proper error message to the user
    }
  };

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
              className={`px-6 py-2 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Pay'}
            </button>
          </div>
        </form>
      </div>
      <PaymentHistory profileId={profileId} />
    </div>
  );
};

export default PaymentPage;
