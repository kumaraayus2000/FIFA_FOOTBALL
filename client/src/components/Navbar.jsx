import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth/AuthContext';
import "styles/components/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    const handleLogin = () => {
        navigate('/login'); // Navigate to login page
    };

    const handleLogout = () => {
        logout(); // Call the logout function from AuthContext
        navigate('/'); // Redirect to home page or login
    };

    return (
        <header className="header">
            <div className="header-icon">
        <span role="img" aria-label="soccer">
          ⚽
        </span>
            </div>
            <h1>Choose Players</h1>
            <div className="auth-buttons">
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="auth-button">
                        Logout
                    </button>
                ) : (
                    <button onClick={handleLogin} className="auth-button">
                        Login
                    </button>
                )}
            </div>
        </header>
    );
};