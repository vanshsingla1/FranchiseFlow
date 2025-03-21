import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Todays = () => {
  const [date, setDate] = useState(null);
  const [totalSales, setTotalSales] = useState("");
  const [customersVisited, setCustomersVisited] = useState("");
  var email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ date, totalSales, customersVisited });
  
    let url = "http://franchiseflow-backend-production.up.railway.app/user/save-todays-sale";
    let obj = {
      email: email,
      date: date,
      sales: totalSales,
      customers: customersVisited,
    };
  
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication failed! No token found.");
      return;
    }
  
    try {
      let resp = await axios.post(url, obj, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
  
      // Check response for token validation failure
      if (resp.data.status === false) {
        alert(`Error: ${resp.data.msg}`);
      } else {
        alert("Sales Saved Successfully!");
        setDate(null);
        setTotalSales("");
        setCustomersVisited("");
      }
    } catch (error) {
      console.error("Error submitting sales data:", error);
      alert("Failed to submit data. Please check your internet connection and try again.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
          Today's Report
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
              placeholderText="Select Date"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Total Sales</label>
            <input
              type="number"
              value={totalSales}
              onChange={(e) => setTotalSales(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter total sales"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Total Customers Visited</label>
            <input
              type="number"
              value={customersVisited}
              onChange={(e) => setCustomersVisited(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter total customers visited"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Todays;
