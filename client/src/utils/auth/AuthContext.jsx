import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize authentication state based on localStorage
    useEffect(() => {
        const loggedIn = localStorage.getItem('loggedIn');
        console.log('useEffect loggedIn:', localStorage.getItem('loggedIn'));
        if (loggedIn === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // Login function
    const login = () => {
        console.log('Login called');
        localStorage.setItem('loggedIn', 'true'); // Set loggedIn in localStorage
        console.log('localStorage loggedIn:', localStorage.getItem('loggedIn'));
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = () => {
        console.log('logout called');
        localStorage.removeItem('loggedIn'); // Remove loggedIn from localStorage
        console.log('localStorage logout:', localStorage.getItem('loggedIn'));
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
