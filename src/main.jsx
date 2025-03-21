import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Apply from './components/Apply.jsx'

import Applicants from './admin/applicants.jsx'
import Login from './components/Login.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'

import Landingpage from './Landing Page/Landingpage.jsx'


createRoot(document.getElementById('root')).render(
  <>
    {/* <App /> */}
    {/* <Apply></Apply> */}
    {/* <Applicants></Applicants> */}
    {/* <Login></Login> */}
    {/* <Sidebar></Sidebar> */}
    {/* <Dashboard></Dashboard> */}
    
    <App />
  
    {/* <Landingpage></Landingpage> */}
    
  </>
)
