import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'styles/pages/signup.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleContinue = (e) => {
        e.preventDefault();
        navigate('/signup-bio', { state: formData });
    };

    return (
        <div className="signup-page">
            <div className="image-section signup-image-1"></div>
            <div className="form-section">
                <div className="form-container">
                    <h1>Get Started</h1>
                    <p>Create your account</p>
                    <form onSubmit={handleContinue}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="input"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
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
                        <button type="submit" className="button">Continue</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;