import React, { useState } from 'react';
import axios from "axios";
import Navbar from '../Landing Page/Navbar';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../Landing Page/Navbar2';
import Footer from '../Landing Page/Footer';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }
    return newErrors;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Handle successful login here
      // console.log('Logged in with:', { email, password });
      let url = "http://localhost:2004/user/checklogin";
      let obj = { email: email,
        pwd : password
      };
       let resp = await axios.post(url, obj, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        if(resp.data.status==true)
        {
          // alert(resp.data.message);
          localStorage.setItem("email",email);
          // localStorage.removeItem("email");
          // alert(localStorage.getItem("email"));
          // alert(resp.data.token);
          localStorage.setItem("token",resp.data.token);
          if(email==="sunitasinglam11@gmail.com")
          {
            navigate("/admin")
          }
          else{
            navigate("/dashboard")
          }
          
        }
      else
      {
        alert(resp.data.message);
      }      
    }
  };

  return (
    <>
    <Navbar2 />
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Login;