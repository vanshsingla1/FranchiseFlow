import React from 'react';
import { Home, BadgeIndianRupee, History, ChartBar, Settings, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  var email = localStorage.getItem("email");
  const menuItems = [
    { icon: BadgeIndianRupee, label: "Today's Sale", path: 'todays-sale' },
    { icon: History, label: 'Sales History', path: 'sales-history' },
    { icon: ChartBar, label: 'Charts', path: 'charts' },
    { icon: Settings, label: 'Settings', path: 'settings' },
    // { icon: LogOut, label: 'Logout', path: '' },
  ];
  function doLogout()
  {
    localStorage.removeItem("email");
    navigate("/")
  }
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-900 text-gray-300 shadow-lg">
      {/* Logo */}
      <div className="p-6 flex items-center space-x-2 border-b border-gray-800">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-blue-500">
          <path fill="currentColor" d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" />
        </svg>
        <span className="text-xl font-semibold text-white">Dashboard</span>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 px-4 py-6 space-y-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(`/dashboard/${item.path}`)}// Use absolute path
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-left rounded-lg hover:bg-gray-800 hover:text-white transition-all"
          >
            <item.icon size={22} className="mr-3 text-gray-400" />
            <span className="flex-1">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      
        <button onClick={doLogout} className="flex items-center px-6 py-4 border-t border-gray-800 bg-gray-850  hover:bg-gray-800 hover:text-white transition-all">
        <LogOut size={24} className="text-gray-400" />
        <span className="ml-3 text-sm font-medium text-gray-300 hover:outline-white ">Logout</span>
        </button>
      
      <div className="flex items-center px-6 py-4 border-t border-gray-800 bg-gray-850  hover:bg-gray-800 hover:text-white transition-all">
        <User size={24} className="text-gray-400" />
        <span className="ml-3 text-sm font-medium text-gray-300">{email}</span>
      </div>
    </div>
  );
};

export default Sidebar;
