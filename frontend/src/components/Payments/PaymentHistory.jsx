import React, { useState, useEffect } from "react";
import axios from 'axios';
import { postRequest } from "../../API/config";

function PaymentHistory({paymentData,getAllPayments}) {
  const [payments, setPayments] = useState([]);

  // const payments = [
  //   { date: "2024-02-10", amount: 100, status: "Paid" },
  //   { date: "2024-02-05", amount: 50, status: "Paid" },
  //   { date: "2024-01-30", amount: 75, status: "Pending" },
  //   { date: "2024-01-25", amount: 60, status: "Paid" },
  // ];

   const changePay =async(payment)=>{
      try {
            if(payment.status=="Unpaid"){
              let payload = {
                matchId:payment.paymentId
              }
               const data = await postRequest("changePayments",payment);
               getAllPayments();
            }
      } catch (error) {
         console.log(error);
      }
   }


  return paymentData&&paymentData.length>0 ?(
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
          {paymentData&&paymentData?.map((payment, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {new Date(payment?.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                ${payment?.amount}
              </td>
              <td className="py-3 px-6 text-center">
                <span onClick={()=>changePay(payment)} className={`inline-block rounded-full px-3 py-1 ${payment.status === "PAID" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                  {payment?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ):(
    <div className="text-lg font-semibold mt-4 text-center">
      No Active Payments for this account! <span className="text-red-400"> Please send a request To choose a payment plan.</span>
    </div>
  );
}

export default PaymentHistory;
