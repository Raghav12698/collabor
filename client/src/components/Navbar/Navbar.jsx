import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../reducers/authSlice"; // Import the userLogout action
import Logo from "../Logo/Logo";
import './Navbar.scss';

import crntusr from "../../assets/icons/na'vi.png";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignOut = () => {
        dispatch(userLogout()); // Dispatch the logout action
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="navbar-container">
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-right">
                <div className="currentUser">
                    <img src={crntusr} alt=''></img>
                </div>
                <button onClick={handleSignOut}>Sign Out</button> {/* Sign Out Button */}
            </div>
        </div>
    )
}

export default Navbar;