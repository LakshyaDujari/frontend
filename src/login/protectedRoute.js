import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axiosInstance from "../axio-config/axiosConfig";
import { useDispatch } from "react-redux";
import { clear, setData } from '../redux/Slice/dataSlice';
import { toast } from "react-toastify";

const ProtectedRoute = () => {
    const [auth, setAuth] = useState(localStorage.getItem("token"));
    const logout_api = '/login/logout_user/';
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post(logout_api);
            if (response.status === 200) {
                localStorage.clear();
                dispatch(clear());
                toast.success('Logout Successfully');
            } else {
                toast.error('Invalid Credentials');
            }
        } catch (error) {
            toast.error(Object.values(error.response.data)[0]);
        }
    };
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
                handleLogout();
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