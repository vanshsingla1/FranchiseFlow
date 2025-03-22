import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar2 from "../Landing Page/Navbar2";
import Footer from "../Landing Page/Footer";

const Apply = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [obj, setObj] = useState({
    email: "", name: "", contact: "", residential_address: "", 
    experience: "", years: "", siteLocation: "", city: "",
    district: "", pincode: "", length: "", breadth: "", ownership: ""
  });

  const doUpdate = (event) => {
    const { name, value } = event.target;
    setObj({ ...obj, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Required fields
    const requiredFields = {
      email: "Email", name: "Name", contact: "Contact number", 
      residential_address: "Residential address", siteLocation: "Site location",
      city: "City", district: "District", pincode: "Pincode",
      length: "Length", breadth: "Breadth", ownership: "Ownership status"
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!obj[field]) {
        formErrors[field] = `${label} is required`;
        isValid = false;
      }
    });

    // Special validations
    if (obj.email && !/\S+@\S+\.\S+/.test(obj.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (obj.contact && !/^\d{10}$/.test(obj.contact)) {
      formErrors.contact = "Contact number should be 10 digits";
      isValid = false;
    }
    
    if (obj.pincode && !/^\d{6}$/.test(obj.pincode)) {
      formErrors.pincode = "Pincode should be 6 digits";
      isValid = false;
    }
    
    if (obj.length && (isNaN(obj.length) || obj.length <= 0)) {
      formErrors.length = "Length should be a positive number";
      isValid = false;
    }
    
    if (obj.breadth && (isNaN(obj.breadth) || obj.breadth <= 0)) {
      formErrors.breadth = "Breadth should be a positive number";
      isValid = false;
    }

    if (!agreeTerms) {
      formErrors.terms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const doSave = async () => {
    if (!validateForm()) return;

    try {
      const url = "https://franchiseflow-backend-production.up.railway.app/user/SaveUserApplyDetails";
      const resp = await axios.post(url, obj, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      if (resp.data?.status === "success") {
        alert("Application Submitted Successfully! Keep Checking your Email for the Status");
        navigate('/');
      } else {
        if (resp.data?.message === "Email already exists") {
          setErrors({ ...errors, email: "Email already exists. Please use a different email." });
        } else {
          alert("Failed to submit application. " + (resp.data?.message || ""));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again later.");
    }
  };

  return (
    <>
    <Navbar2 />
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-[#282D2D] px-5 apply py-8">
      <div className="flex justify-end items-center mb-2 xl:max-w-2xl w-full">
        <h3 className="text-white text-sm">Dark Mode:</h3>
        <label className="inline-flex relative items-center ml-2 cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={darkMode} readOnly />
          <div
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"
          ></div>
        </label>
      </div>
      
      <div className={`xl:max-w-2xl ${darkMode ? "bg-black" : "bg-white"} w-full p-4 sm:p-6 rounded-md`}>
        <h1 className={`text-center text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-black"}`}>
          Get a Franchise
        </h1>
        
        <div className="w-full">
          <div className="mx-auto max-w-lg flex flex-col gap-3">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Name input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.name ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={obj.name}
                  onChange={doUpdate}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              {/* Email input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={obj.email}
                  onChange={doUpdate}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {/* Contact input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.contact ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Contact Number"
                  name="contact"
                  value={obj.contact}
                  onChange={doUpdate}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>
              
              {/* Residential Address input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.residential_address ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Residential Address"
                  name="residential_address"
                  value={obj.residential_address}
                  onChange={doUpdate}
                />
                {errors.residential_address && <p className="text-red-500 text-xs mt-1">{errors.residential_address}</p>}
              </div>
              
              {/* Experience input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.experience ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Business Experience?"
                  name="experience"
                  value={obj.experience}
                  onChange={doUpdate}
                />
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>
              
              {/* Years input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.years ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Years in Business"
                  name="years"
                  value={obj.years}
                  onChange={doUpdate}
                />
                {errors.years && <p className="text-red-500 text-xs mt-1">{errors.years}</p>}
              </div>
            </div>
            
            {/* Site Details Section */}
            <h2 className={`text-center text-lg font-semibold mt-2 mb-1 ${darkMode ? "text-white" : "text-black"}`}>
              Site Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Site Location input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.siteLocation ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Site Location"
                  name="siteLocation"
                  value={obj.siteLocation}
                  onChange={doUpdate}
                />
                {errors.siteLocation && <p className="text-red-500 text-xs mt-1">{errors.siteLocation}</p>}
              </div>
              
              {/* City input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.city ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="City"
                  name="city"
                  value={obj.city}
                  onChange={doUpdate}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
              
              {/* District input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.district ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="District"
                  name="district"
                  value={obj.district}
                  onChange={doUpdate}
                />
                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
              </div>
              
              {/* Pincode input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.pincode ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Pincode"
                  name="pincode"
                  value={obj.pincode}
                  onChange={doUpdate}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
              
              {/* Length input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.length ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Length (sq ft)"
                  name="length"
                  value={obj.length}
                  onChange={doUpdate}
                />
                {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
              </div>
              
              {/* Breadth input */}
              <div className="w-full">
                <input
                  className={`w-full px-3 py-2 rounded-lg font-medium border-2 ${
                    errors.breadth ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2 ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Breadth (sq ft)"
                  name="breadth"
                  value={obj.breadth}
                  onChange={doUpdate}
                />
                {errors.breadth && <p className="text-red-500 text-xs mt-1">{errors.breadth}</p>}
              </div>
            </div>
            
            {/* Ownership Selection */}
            <div className="flex justify-center items-center mt-1">
              <h4 className={`text-sm font-medium ${darkMode ? "text-white" : "text-black"}`}>Ownership: </h4>
              <div className="flex gap-4 ml-3">
                <label className="flex items-center">
                  <input
                    className="mr-1 h-4 w-4 cursor-pointer"
                    type="radio"
                    name="ownership"
                    value="Owned"
                    checked={obj.ownership === "Owned"}
                    onChange={doUpdate}
                  />
                  <span className="text-sm text-gray-600">Owned</span>
                </label>
                <label className="flex items-center">
                  <input
                    className="mr-1 h-4 w-4 cursor-pointer"
                    type="radio"
                    name="ownership"
                    value="Rented"
                    checked={obj.ownership === "Rented"}
                    onChange={doUpdate}
                  />
                  <span className="text-sm text-gray-600">Rented</span>
                </label>
              </div>
            </div>
            {errors.ownership && <p className="text-red-500 text-xs text-center">{errors.ownership}</p>}
            
            {/* Terms and Submit */}
            <div className="mt-2">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer mr-2"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <span>I agree to all Terms & Conditions</span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>
            
            <button
              onClick={doSave}
              className="mt-3 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-3 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none"
            >
              <svg
                className="w-5 h-5 -ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-2">Register</span>
            </button>

            <p className="mt-3 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="#" onClick={() => navigate('/login')} className="text-[#E9522C] font-semibold">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Apply;