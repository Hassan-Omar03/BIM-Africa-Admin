import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import AddBlog from "./pages/AddBlog";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("BIMAdminToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with Sidebar layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SidebarLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/add-blog" element={<AddBlog />} />
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<Blogs />} />
        </Route>
      </Routes>
    </Router>
  );
}
