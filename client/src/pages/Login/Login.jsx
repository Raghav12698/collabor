import React, { useState } from "react";
import '../../styles/form.scss';
import Logo from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/api";
import { useDispatch } from 'react-redux';
import { userLogin } from "../../reducers/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            // Basic validation
            if (!inputs.email || !inputs.password) {
                throw new Error("Please fill in all fields");
            }

            const response = await login(inputs);
            
            if (!response?.data?.user) {
                throw new Error("No user data received");
            }

            dispatch(userLogin(response.data.user));
            navigate('/');
        } catch (error) {
            console.error("Login error:", error);
            setError(
                error.response?.data?.message || 
                error.message || 
                "Network error. Please check your connection."
            );
            
            // Special handling for network errors
            if (error.code === "ERR_NETWORK") {
                console.error("Backend server might be down");
                setError("Cannot connect to server. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-head">
                    <Logo />
                    <div className="form-heading">
                        Login to collabordraw
                    </div>
                </div>
                {error && (
                    <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
                        {error}
                    </div>
                )}
                <input 
                    type="email" 
                    placeholder="Enter your email id" 
                    name="email" 
                    value={inputs.email}
                    onChange={handleChange} 
                    required
                    disabled={loading}
                />
                <input 
                    type="password" 
                    placeholder="Enter password" 
                    name="password" 
                    value={inputs.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    style={{ backgroundColor: loading ? '#cccccc' : '' }}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <div className="message">
                    Not signed up yet? Click here to <Link to={'/signup'} className="hyperlink">Signup</Link>.
                </div>
            </form>
        </div>
    );
};

export default Login;