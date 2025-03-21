import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apply from "./components/Apply";
import "./App.css";
import Landingpage from "./Landing Page/Landingpage";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // Ensure correct import
import Applicants from "./admin/Applicants";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Landingpage />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Route for Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="/admin" element={<Applicants />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
