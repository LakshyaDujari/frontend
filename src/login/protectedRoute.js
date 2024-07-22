import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const [auth, setAuth] = useState(localStorage.getItem("token"));

    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken && storedToken !== null) {
                setAuth(storedToken);
            } else {
                setAuth(null);
            }
        };

        const checkExpiration = () => {
            const lastActivityTime = parseInt(localStorage.getItem("lastActivityTime"));
            const currentTime = new Date().getTime();
            if (lastActivityTime && currentTime - lastActivityTime > 15 * 60 * 1000) {
                // If more than 15 minutes have passed since the last activity, clear localStorage
                localStorage.clear();
                setAuth(null);
            } else {
                localStorage.setItem("lastActivityTime", currentTime.toString());
            }
        };

        checkAuth();
        checkExpiration();

        const activityInterval = setInterval(() => {
            checkExpiration();
        }, 60 * 1000); // Check every minute for inactivity

        return () => clearInterval(activityInterval);
    }, []);

    return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;