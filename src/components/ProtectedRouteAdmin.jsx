import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const email = localStorage.getItem("email");
  
  // Check if the user is logged in AND is the admin
  if (email === "sunitasinglam11@gmail.com") {
    return <Outlet />;
  } else {
    // Redirect to login if not admin
    return <Navigate to="/dashboard" />;
  }
};

export default ProtectedRouteAdmin;