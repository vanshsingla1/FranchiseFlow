import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import axios from "axios";

const Charts = () => {
  const [chartType, setChartType] = useState('area');
  const [salesData, setSalesData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  var email = localStorage.getItem("email");
  // Fetch sales data from API
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const url = "http://localhost:2004/user/sales-charts";
        const obj = { email };
    
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
    
        setSalesData(response.data); // Directly set response data
      } catch (err) {
        setError(err.response?.data?.message || err.message); // Capture server error message
      } finally {
        setLoading(false);
      }
    };
    
    
    
    fetchSalesData();
  }, []);

  // Process data when salesData changes
  useEffect(() => {
    if (!salesData.length) return;

    const formatted = salesData.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      sales: item.sales,
      fullDate: new Date(item.date)
    })).sort((a, b) => a.fullDate - b.fullDate);

    setProcessedData(formatted);
  }, [salesData]);

  // Filter data based on selected time frame
  const getFilteredData = () => {
    if (!processedData.length) return [];

    const now = new Date();
    switch (timeFrame) {
      case 'week':
        return processedData.filter(item => item.fullDate >= new Date(now.setDate(now.getDate() - 7)));
      case 'month':
        return processedData.filter(item => item.fullDate >= new Date(now.setMonth(now.getMonth() - 1)));
      case 'quarter':
        return processedData.filter(item => item.fullDate >= new Date(now.setMonth(now.getMonth() - 3)));
      default:
        return processedData;
    }
  };

  const displayData = getFilteredData();
  const totalSales = displayData.reduce((sum, item) => sum + item.sales, 0).toFixed(2);
  const avgSales = displayData.length ? (totalSales / displayData.length).toFixed(2) : "0.00";

  // Choose the right chart
  const renderChart = () => {
    if (loading) return <div className="text-gray-500">Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (displayData.length === 0) return <div className="text-gray-500">No data available</div>;

    const commonProps = { data: displayData, margin: { top: 10, right: 30, left: 10, bottom: 10 } };

    if (chartType === 'area') {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
          <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="url(#colorSales)" />
        </AreaChart>
      );
    }

    if (chartType === 'line') {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
          <Line type="monotone" dataKey="sales" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      );
    }

    return (
      <BarChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
        <Bar dataKey="sales" fill="#8b5cf6" />
      </BarChart>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
        <h2 className="text-xl font-bold">Sales Dashboard</h2>
      </div>

      <div className="flex flex-wrap gap-2 p-4 border-b">
        <div className="flex rounded bg-gray-100 p-1">
          {['week', 'month', 'quarter', 'all'].map(period => (
            <button key={period} onClick={() => setTimeFrame(period)}
              className={`px-3 py-1 text-sm rounded ${timeFrame === period ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex rounded bg-gray-100 p-1 ml-auto">
          {['area', 'line', 'bar'].map(type => (
            <button key={type} onClick={() => setChartType(type)}
              className={`px-3 py-1 text-sm rounded ${chartType === type ? 'bg-blue-500 text-white' : 'text-gray-700'}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-blue-50 p-4 rounded border border-blue-100">
          <p className="text-sm text-blue-800">Total Sales</p>
          <p className="text-xl font-bold">${totalSales}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded border border-purple-100">
          <p className="text-sm text-purple-800">Average Sale</p>
          <p className="text-xl font-bold">${avgSales}</p>
        </div>
        <div className="bg-green-50 p-4 rounded border border-green-100">
          <p className="text-sm text-green-800">Transactions</p>
          <p className="text-xl font-bold">{displayData.length}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="h-72 bg-gray-50 rounded border">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
