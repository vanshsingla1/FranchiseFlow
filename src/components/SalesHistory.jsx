import React, { useState, useEffect } from "react";
import axios from "axios";

const SalesHistory = () => {
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  var email = localStorage.getItem("email");

  useEffect(() => {
    fetchSalesData(); // Fetch all data initially
  }, []);

  const fetchSalesData = async () => {
    try {
      const url = "https://franchiseflow-backend-production.up.railway.app/user/fetch-sales-data";
      const obj = { startDate, endDate, email };
  
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication failed! No token found.");
        return;
      }
  
      const response = await axios.post(url, obj, {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
  
      // Handle invalid token response
      if (response.data.status === false) {
        alert(`Error: ${response.data.msg}`);
        return;
      }
  
      console.log("Response:", response.data);
      setSalesData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      alert("Failed to fetch sales data. Please check your internet connection and try again.");
    }
  };
  

  const sortData = (key) => {
    setSortConfig((prev) => {
      const direction = prev.key === key && prev.direction === "asc" ? "desc" : "asc";
      return { key, direction };
    });

    setFilteredData((prevData) => [...prevData].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    }));
  };

  const exportToCSV = () => {
    // Skip export if no data
    if (filteredData.length === 0) return;

    // Create CSV header
    const csvHeader = ["Date", "Franchise ID", "Amount"];

    // Convert data to CSV format
    const csvRows = filteredData.map(({ date, email, sales }) => {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      return [formattedDate, email, `$${sales.toFixed(2)}`].join(",");
    });

    // Combine header and rows
    const csvContent = [csvHeader.join(","), ...csvRows].join("\n");

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link and trigger download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_history_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Sales History</h2>
      <div className="flex gap-4 mb-4">
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded" />
        <button onClick={fetchSalesData} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Filter</button>
        <button 
          onClick={exportToCSV} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={filteredData.length === 0}
        >
          Export to CSV
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {['date', 'Franchise Id', 'amount'].map((key) => (
              <th key={key} onClick={() => sortData(key)} className="cursor-pointer p-2 border capitalize">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map(({ date, email, sales }, index) => (
              <tr key={index} className="border">
                <td className="p-2 border">{new Date(date).toISOString().split('T')[0]}</td>
                <td className="p-2 border">{email}</td>
                <td className="p-2 border">${sales.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="p-4 text-center">No sales data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;