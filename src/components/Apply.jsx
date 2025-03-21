import React, { useState } from "react";
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import Navbar2 from "../Landing Page/Navbar2";
import Footer  from "../Landing Page/Footer";


const Apply = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  var [obj, setObj] = useState({
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
    var { name, value } = event.target;
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
      let url = "http://franchiseflow-backend-production.up.railway.app/user/SaveUserApplyDetails";
      let resp = await axios.post(url, obj, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      
      if (resp.data && resp.data.status === "success") {
        alert("Application Submitted Successfully ! Keep Checking your Email for the Status");
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

  return (
    <>
    <Navbar2 />
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-[#282D2D] px-5 apply ">
      <div className=" flex flex-col items-end justify-start  overflow-hidden mb-2 xl:max-w-3xl w-full">
        <div className="flex">
          <h3 className="text-white">Dark Mode : &nbsp;</h3>
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={darkMode}
              readOnly
            />
            <div
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
          </label>
        </div>
      </div>
      <div
        className={`xl:max-w-3xl ${
          darkMode ? "bg-black" : "bg-white"
        }  w-full p-5 sm:p-10 rounded-md`}
      >
        <h1
          className={`text-center text-xl sm:text-3xl font-semibold ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          Get a Franchise
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
                    errors.name ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={doUpdate}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                    errors.email ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={doUpdate}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>
            <div>
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                  errors.contact ? "border-red-500" : "border-transparent"
                } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                placeholder="Contact Number"
                name="contact"
                onChange={doUpdate}
              />
              {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
            </div>
            <div>
              <input
                className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                  errors.residential_address ? "border-red-500" : "border-transparent"
                } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                  darkMode
                    ? "bg-[#302E30] text-white focus:border-white"
                    : "bg-gray-100 text-black focus:border-black"
                }`}
                type="text"
                placeholder="Residental Address"
                name="residential_address"
                onChange={doUpdate}
              />
              {errors.residential_address && <p className="text-red-500 text-xs mt-1">{errors.residential_address}</p>}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
                    errors.experience ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Any Business Experience? "
                  name="experience"
                  onChange={doUpdate}
                />
                {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                    errors.years ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Years in Business"
                  name="years"
                  onChange={doUpdate}
                />
                {errors.years && <p className="text-red-500 text-xs mt-1">{errors.years}</p>}
              </div>
            </div>
            <h2 className={`text-center text-xl sm:text-xl font-semibold ${
              darkMode ? "text-white" : "text-black"
            }`}>Site Details</h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
                    errors.siteLocation ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Site Location "
                  name="siteLocation"
                  onChange={doUpdate}
                />
                {errors.siteLocation && <p className="text-red-500 text-xs mt-1">{errors.siteLocation}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                    errors.city ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="City"
                  name="city"
                  onChange={doUpdate}
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
                    errors.district ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="District"
                  name="district"
                  onChange={doUpdate}
                />
                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                    errors.pincode ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="PinCode"
                  name="pincode"
                  onChange={doUpdate}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
                    errors.length ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none  focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Area(Length) in Sq Feet"
                  name="length"
                  onChange={doUpdate}
                />
                {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
              </div>
              <div className="w-full">
                <input
                  className={`w-full px-5 py-3 rounded-lg  font-medium border-2 ${
                    errors.breadth ? "border-red-500" : "border-transparent"
                  } placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${
                    darkMode
                      ? "bg-[#302E30] text-white focus:border-white"
                      : "bg-gray-100 text-black focus:border-black"
                  }`}
                  type="text"
                  placeholder="Area(Breadth) in Sq Feet"
                  name="breadth"
                  onChange={doUpdate}
                />
                {errors.breadth && <p className="text-red-500 text-xs mt-1">{errors.breadth}</p>}
              </div>
            </div>
            <div className="flex justify-center items-center flex-col gap-1">
              <div className="flex justify-center gap-3 py-5">
                <h4 className={`text-center text-md sm:text-md font-semibold ${
                  darkMode ? "text-white" : "text-black"
                }`}>OwnerShip </h4>
                <div>
                  <input
                    className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white align-top checked:border-4 checked:border-blue-600"
                    type="radio"
                    name="ownership"
                    value="Owned"
                    id="radioidthree"
                    onChange={doUpdate}
                  />
                  <label className="text-gray-600" htmlFor="radioidthree">
                    Owned
                  </label>
                </div>
                <div>
                  <input
                    className="mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white align-top checked:border-4 checked:border-blue-600 disabled:border-blue-400"
                    type="radio"
                    name="ownership"
                    value="Rented"
                    id="radioidfour"
                    onChange={doUpdate}
                  />
                  <label className="text-gray-600" htmlFor="radioidfour">
                    Rented
                  </label>
                </div>
              </div>
              {errors.ownership && <p className="text-red-500 text-xs mt-1">{errors.ownership}</p>}
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer checked:gray"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <span className="hover:cursor-pointer">Agreed in all Terms & Conditions</span>
              </label>
              {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}
            </div>
            <button
              onClick={doSave}
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -ml-2"
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
              <span className="ml-3">Register</span>
            </button>

            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <a href="" onClick={() => navigate('/login')}>
                <span className="text-[#E9522C] font-semibold">Login</span>
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