import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../utils/auth/AuthContext';
import apiClient from "../utils/apiClient";

import '../styles/pages/login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;

        apiClient.post('/api/customers/login', { email: email, password: password }).then((result) => {
            console.log(result);
            login();
            navigate('/');
        }).catch((err) => {
            setError('Invalid email or password');
        });
    };

    return (
        <div className="login-page">
            <div className="image-section">{/* Placeholder for your image */}</div>
            <div className="form-section">
                <div className="form-container">
                    <h1 className="text-align-center">Login</h1>
                    <p className="text-align-center">
                        New here? <a href="/signup" className="link">Create an account</a>
                    </p>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="button">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

