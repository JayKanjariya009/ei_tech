import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // 1️⃣ Get token from localStorage
    const token = localStorage.getItem("token");

    // 2️⃣ If token does NOT exist → redirect to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // 3️⃣ If token exists → allow access
    return <Outlet />;
};

export default ProtectedRoute;
