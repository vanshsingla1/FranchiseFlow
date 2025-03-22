import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Navbar2 from "../Landing Page/Navbar2";
import Footer from "../Landing Page/Footer";

const Apply = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [obj, setObj] = useState({
    email: "",
    name: "",
    contact: "",
    residential_address: "",
    experience: "",
    years: "",
    siteLocation: "",
    city: "",
    district: "",
    pincode: "",
    length: "",
    breadth: "",
    ownership: ""
  });

  function doUpdate(event) {
    const { name, value } = event.target;
    setObj({ ...obj, [name]: value });
    
    // Clear error for the field being updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function validateForm() {
    let formErrors = {};
    let isValid = true;

    // Email validation
    if (!obj.email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(obj.email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    // Name validation
    if (!obj.name) {
      formErrors.name = "Name is required";
      isValid = false;
    }

    // Contact validation
    if (!obj.contact) {
      formErrors.contact = "Contact number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(obj.contact)) {
      formErrors.contact = "Contact number should be 10 digits";
      isValid = false;
    }

    // Address validation
    if (!obj.residential_address) {
      formErrors.residential_address = "Residential address is required";
      isValid = false;
    }

    // Site location validation
    if (!obj.siteLocation) {
      formErrors.siteLocation = "Site location is required";
      isValid = false;
    }

    // City validation
    if (!obj.city) {
      formErrors.city = "City is required";
      isValid = false;
    }

    // District validation
    if (!obj.district) {
      formErrors.district = "District is required";
      isValid = false;
    }

    // Pincode validation
    if (!obj.pincode) {
      formErrors.pincode = "Pincode is required";
      isValid = false;
    } else if (!/^\d{6}$/.test(obj.pincode)) {
      formErrors.pincode = "Pincode should be 6 digits";
      isValid = false;
    }

    // Area validation
    if (!obj.length) {
      formErrors.length = "Length is required";
      isValid = false;
    } else if (isNaN(obj.length) || obj.length <= 0) {
      formErrors.length = "Length should be a positive number";
      isValid = false;
    }

    if (!obj.breadth) {
      formErrors.breadth = "Breadth is required";
      isValid = false;
    } else if (isNaN(obj.breadth) || obj.breadth <= 0) {
      formErrors.breadth = "Breadth should be a positive number";
      isValid = false;
    }

    // Ownership validation
    if (!obj.ownership) {
      formErrors.ownership = "Ownership status is required";
      isValid = false;
    }

    // Terms and conditions validation
    if (!agreeTerms) {
      formErrors.terms = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  }

  async function doSave() {
    if (!validateForm()) {
      return;
    }

    try {
      let url = "https://franchiseflow-backend-production.up.railway.app/user/SaveUserApplyDetails";
      let resp = await axios.post(url, obj, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      if (resp.data && resp.data.status === "success") {
        alert("Application Submitted Successfully! Keep Checking your Email for the Status");
        navigate('/');
      } else {
        // Handle specific error cases
        if (resp.data && resp.data.message === "Email already exists") {
          setErrors({ ...errors, email: "Email already exists. Please use a different email." });
        } else {
          alert("Failed to submit application. " + (resp.data?.message || ""));
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again later.");
    }
  }

  // Input field component for DRY code
  const InputField = ({ name, placeholder, type = "text" }) => (
    <div className="w-full">
      <input
        className={`w-full px-4 py-2 rounded-md font-medium border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } placeholder-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
          darkMode
            ? "bg-[#302E30] text-white"
            : "bg-white text-black"
        }`}
        type={type}
        placeholder={placeholder}
        name={name}
        value={obj[name]}
        onChange={doUpdate}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <Navbar2 />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-end mb-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">Dark Mode</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  readOnly
                />
                <div
                  onClick={() => setDarkMode(!darkMode)}
                  className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"
                ></div>
              </label>
            </div>
          </div>
          
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
            <h2 className={`text-center text-xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Get a Franchise
            </h2>
            
            <div className="space-y-5">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className={`text-md font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField name="name" placeholder="Name" />
                  <InputField name="email" placeholder="Email" type="email" />
                </div>
                <InputField name="contact" placeholder="Contact Number" />
                <InputField name="residential_address" placeholder="Residential Address" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField name="experience" placeholder="Business Experience?" />
                  <InputField name="years" placeholder="Years in Business" />
                </div>
              </div>
              
              {/* Site Details Section */}
              <div className="pt-2 space-y-4">
                <h3 className={`text-md font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>Site Details</h3>
                <InputField name="siteLocation" placeholder="Site Location" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField name="city" placeholder="City" />
                  <InputField name="district" placeholder="District" />
                </div>
                <InputField name="pincode" placeholder="Pincode" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField name="length" placeholder="Length (sq ft)" />
                  <InputField name="breadth" placeholder="Breadth (sq ft)" />
                </div>

                {/* Ownership Radio Buttons */}
                <div className="space-y-2">
                  <label className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                    Ownership Status
                  </label>
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <input
                        id="owned"
                        name="ownership"
                        type="radio"
                        value="Owned"
                        onChange={doUpdate}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="owned" className={`ml-2 block text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Owned
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="rented"
                        name="ownership"
                        type="radio"
                        value="Rented"
                        onChange={doUpdate}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label htmlFor="rented" className={`ml-2 block text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Rented
                      </label>
                    </div>
                  </div>
                  {errors.ownership && <p className="text-red-500 text-xs">{errors.ownership}</p>}
                </div>
              </div>
              
              {/* Terms and Conditions */}
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className={`ml-2 block text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    I agree to all Terms & Conditions
                  </label>
                </div>
                {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
              </div>
              
              {/* Submit Button */}
              <div>
                <button
                  onClick={doSave}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#E9522C] hover:bg-[#E9522C]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E9522C]"
                >
                  Register
                </button>
              </div>
              
              {/* Login Link */}
              <div className="text-center mt-4">
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Already have an account?{" "}
                  <a onClick={() => navigate('/login')} className="text-[#E9522C] font-semibold cursor-pointer">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Apply;