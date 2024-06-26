import React from "react";

function PaymentHistory() {
  const payments = [
    { date: "2024-02-10", amount: 100, status: "Paid" },
    { date: "2024-02-05", amount: 50, status: "Paid" },
    { date: "2024-01-30", amount: 75, status: "Pending" },
    { date: "2024-01-25", amount: 60, status: "Paid" },
  ];

  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {payments.map((payment, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {payment.date}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                ${payment.amount}
              </td>
              <td className="py-3 px-6 text-center">
                <span
                  className={`inline-block rounded-full px-3 py-1 ${
                    payment.status === "Paid"
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
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
