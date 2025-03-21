import Sidebar from './Sidebar'
import Todays from './Todays'
import SalesHistory from './SalesHistory'
import Charts from './Charts'
import Settings from './Settings'
import { Routes, Route } from 'react-router-dom';
import Navbar2 from '../Landing Page/Navbar2'
import Footer from '../Landing Page/Footer'


function Dashboard() {
  return (
    <>
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 min-h-screen">
        <Navbar2 />
        <Sidebar />
        
      </div>
      
      {/* Content Area */}
      <div className="w-full min-h-screen bg-gray-100 p-4">
      <Routes>
          {/* Remove "/dashboard" from all paths - they should be relative */}
          <Route path="todays-sale" element={<Todays />} />
          <Route path="sales-history" element={<SalesHistory />} />
          <Route path="charts" element={<Charts />} />
          <Route path="settings" element={<Settings />} />
          {/* Add a default route */}
          <Route path="/" element={<Charts />} />
        </Routes>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Dashboard