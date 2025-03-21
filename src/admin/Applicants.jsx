import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../Landing Page/Navbar2";
import Footer from "../Landing Page/Footer";
import { useNavigate } from "react-router-dom"; // Import for navigation

const Applicants = () => {
  const [jsonApplications, setjsonApplications] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [franchised, setFranchised] = useState({});
  const [viewType, setViewType] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const navigate = useNavigate(); // For navigation after logout

  useEffect(() => {
    if (viewType === "pending") getAllPendingApplicantDetails();
  }, []);

  const handleApprove = async (email) => {
    if (statuses[email]) return; // Prevent duplicate actions
    setStatuses((prev) => ({ ...prev, [email]: "Accepted" }));
    await doApprove(email);
    // Refresh the list after approval
    setTimeout(() => getAllPendingApplicantDetails(), 500);
  };

  const handleDecline = async (email) => {
    if (statuses[email]) return;
    setStatuses((prev) => ({ ...prev, [email]: "Declined" }));
    await doDecline(email);
    // Refresh the list after decline
    setTimeout(() => getAllPendingApplicantDetails(), 500);
  };

  const handleFranchise = async (email) => {
    if (franchised[email]) return;
    setFranchised((prev) => ({ ...prev, [email]: true }));
    let url = "https://franchiseflow-backend-production.up.railway.app/admin/makeFranchise";
    let obj = { email: email };

    try {
      await axios.post(url, obj, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (error) {
      console.error("Error updating franchise status:", error);
    }
  };

  const handleLogout = async () => {
    try {
     
      localStorage.removeItem("email"); 
     
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchApplicants = async (url, type) => {
    if (loading) return;
    setLoading(true);
    setViewType(type);
    setSearchTerm("");

    try {
      let response = await axios.get(url);
      setjsonApplications(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(`Error fetching ${type} applicants:`, error);
      setjsonApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllPendingApplicantDetails = () =>
    fetchApplicants("https://franchiseflow-backend-production.up.railway.app/admin/getAllPendingApplicantsDetails", "pending");

  const getAllAcceptedApplicantDetails = () =>
    fetchApplicants("https://franchiseflow-backend-production.up.railway.app/admin/getAllAcceptedApplicantsDetails", "accepted");

  const getAllDeclinedApplicantDetails = () =>
    fetchApplicants("https://franchiseflow-backend-production.up.railway.app/admin/getAllDeclinedApplicantsDetails", "declined");

  const doApprove = async (email) => {
    try {
      await axios.post("https://franchiseflow-backend-production.up.railway.app/admin/approveApplications", { email }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const doDecline = async (email) => {
    try {
      await axios.post("https://franchiseflow-backend-production.up.railway.app/declineApplications", { email }, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    } catch (error) {
      console.error("Decline error:", error);
    }
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Search filter
  const filteredApplications = jsonApplications.filter(application => {
    return (
      application?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application?.district?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sort applications
  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Generate table headers with sort indicators
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Status badge component
  const StatusBadge = ({ type }) => {
    let bgColor, textColor, text;
    
    switch (type) {
      case 'pending':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-800';
        text = 'Pending';
        break;
      case 'accepted':
        bgColor = 'bg-green-100';
        textColor = 'text-green-800';
        text = 'Accepted';
        break;
      case 'declined':
        bgColor = 'bg-red-100';
        textColor = 'text-red-800';
        text = 'Declined';
        break;
      default:
        bgColor = 'bg-gray-100';
        textColor = 'text-gray-800';
        text = 'Unknown';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
        {text}
      </span>
    );
  };

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-50">
        {/* Admin header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <div className="flex items-center space-x-4">
                <StatusBadge type={viewType} />
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 100 2h5v8H5V5h5v3zm1-5l5 5h-5V3z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M12.293 7.293a1 1 0 011.414 0L15 8.586V5a1 1 0 012 0v6a1 1 0 01-1 1H10a1 1 0 010-2h3.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Action buttons */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6">
              <button
                onClick={getAllPendingApplicantDetails}
                disabled={loading}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
                  viewType === "pending"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
              >
                Pending Applicants
              </button>
              <button
                onClick={getAllAcceptedApplicantDetails}
                disabled={loading}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
                  viewType === "accepted"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
              >
                Accepted Applicants
              </button>
              <button
                onClick={getAllDeclinedApplicantDetails}
                disabled={loading}
                className={`px-4 py-2 rounded-lg shadow-sm text-sm font-medium ${
                  viewType === "declined"
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
              >
                Declined Applicants
              </button>
            </div>

            {/* Search bar */}
            <div className="mb-6">
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by name, location or district"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Table */}
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {loading ? (
                      <div className="bg-white px-4 py-12 border-b border-gray-200 text-center">
                        <div className="flex justify-center">
                          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">Loading applicants data...</p>
                      </div>
                    ) : sortedApplications.length === 0 ? (
                      <div className="bg-white px-4 py-12 border-b border-gray-200 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants found</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm ? "Try adjusting your search terms." : `No ${viewType} applicants are available.`}
                        </p>
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              #
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('name')}
                            >
                              <div className="flex items-center">
                                Name {renderSortIcon('name')}
                              </div>
                            </th>
                            <th 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                              onClick={() => requestSort('dos')}
                            >
                              <div className="flex items-center">
                                Date of Application {renderSortIcon('dos')}
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Contact
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Experience
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Location
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              District
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ownership
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {sortedApplications.map((data, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{data?.name || "N/A"}</div>
                                <div className="text-sm text-gray-500">{data?.email || "No email"}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.dos || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.contact || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.experience || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.location || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.district || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {data?.ownership || "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {viewType === "pending" ? (
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleApprove(data.email)}
                                      disabled={statuses[data.email]}
                                      className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                                        statuses[data.email] === "Accepted"
                                          ? "bg-green-50 text-green-700 border-green-200"
                                          : "text-green-700 bg-white hover:bg-green-50 border-green-300"
                                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50`}
                                    >
                                      {statuses[data.email] === "Accepted" ? (
                                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                      ) : null}
                                      {statuses[data.email] === "Accepted" ? "Accepted" : "Accept"}
                                    </button>
                                    <button
                                      onClick={() => handleDecline(data.email)}
                                      disabled={statuses[data.email]}
                                      className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                                        statuses[data.email] === "Declined"
                                          ? "bg-red-50 text-red-700 border-red-200"
                                          : "text-red-700 bg-white hover:bg-red-50 border-red-300"
                                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50`}
                                    >
                                      {statuses[data.email] === "Declined" ? (
                                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                      ) : null}
                                      {statuses[data.email] === "Declined" ? "Declined" : "Decline"}
                                    </button>
                                  </div>
                                ) : viewType === "accepted" ? (
                                  <button
                                    onClick={() => handleFranchise(data.email)}
                                    disabled={franchised[data.email]}
                                    className={`inline-flex items-center px-3 py-1.5 border rounded-md text-sm font-medium ${
                                      franchised[data.email]
                                        ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                        : "text-indigo-700 bg-white hover:bg-indigo-50 border-indigo-300"
                                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
                                  >
                                    {franchised[data.email] ? (
                                      <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                      </svg>
                                    ) : null}
                                    {franchised[data.email] ? "Franchised" : "Franchise"}
                                  </button>
                                ) : (
                                  <span className="text-gray-500">No actions available</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Applicants;