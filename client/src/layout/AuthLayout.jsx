import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";
import { useSelector } from "react-redux";
const AuthLayout = ({ children, authentication = true }) => {
    const currentUser = useSelector(state => state.auth.currentUser);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const checkAuth = async () => {
            // Wait briefly to allow Redux state to initialize
            await new Promise(resolve => setTimeout(resolve, 100));
            
            if (authentication) {
                if (!currentUser) {
                    console.log("No user found, redirecting to login");
                    navigate('/login');
                }
            } else if (!authentication && currentUser) {
                console.log("User found, redirecting to home");
                navigate('/');
            }
            setLoading(false);
        };

        checkAuth();
    }, [authentication, currentUser, navigate]);

    if (loading) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
};

export default AuthLayout;