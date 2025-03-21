import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("email"); // or however you check authentication
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;