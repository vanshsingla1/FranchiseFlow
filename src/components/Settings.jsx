import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../Landing Page/Navbar';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [oldpassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  var email = localStorage.getItem("email");

  const validate = () => {
    const newErrors = {};
    if (!oldpassword) {
      newErrors.oldpassword = 'Old password is required';
    }
    if (!password) {
      newErrors.password = 'New password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    if (!confirmpassword) {
      newErrors.confirmpassword = 'Confirm New Password';
    } else if (confirmpassword !== password) {
      newErrors.confirmpassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({});
  
    // Ensure passwords match
    if (password !== confirmpassword) {
      alert("Confirm Password Again");
      return;
    }
  
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication failed! No token found.");
      return;
    }
  
    try {
      let url = "https://franchiseflow-backend-production.up.railway.app/user/updatePwd";
      let obj = { 
        pwd: oldpassword,
        newpwd: password,
        email: email,
      };
  
      let resp = await axios.post(url, obj, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`, // Attach token in headers
        },
      });
  
      if (resp.data.success) {
        alert("Password Changed Successfully");
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Invalid Credentials");
        setOldPassword("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      alert("Error updating password: " + (error.response?.data?.message || error.message));
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              id="oldpassword"
              value={oldpassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${errors.oldpassword ? 'border-red-500' : 'border-gray-300'} rounded`}
              placeholder="********"
            />
            {errors.oldpassword && <p className="text-red-500 text-xs mt-1">{errors.oldpassword}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`mt-1 block w-full p-2 border ${errors.confirmpassword ? 'border-red-500' : 'border-gray-300'} rounded`}
              placeholder="********"
            />
            {errors.confirmpassword && <p className="text-red-500 text-xs mt-1">{errors.confirmpassword}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default Settings;