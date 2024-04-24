import React, { useState, useEffect } from "react";
import axios from 'axios';

function PaymentHistory({ profileId }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // const payments = [
  //   { date: "2024-02-10", amount: 100, status: "Paid" },
  //   { date: "2024-02-05", amount: 50, status: "Paid" },
  //   { date: "2024-01-30", amount: 75, status: "Pending" },
  //   { date: "2024-01-25", amount: 60, status: "Paid" },
  // ];

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        // Replace with your actual endpoint and add necessary headers or credentials
        const { data } = await axios.get(`/api/payments/${profileId}`);
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payment history", error);
      }
      setLoading(false);
    };

    fetchPayments();
  }, [profileId]);

  if (loading) return <div>Loading payment history...</div>;

  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-full w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {payments.map((payment, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(payment.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="py-3 px-6 text-center">
                <span className={`inline-block rounded-full px-3 py-1 ${payment.status === "Paid" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;
