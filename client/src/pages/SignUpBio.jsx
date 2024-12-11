import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from "../utils/apiClient";
import {useAuth} from "../utils/auth/AuthContext";

import 'styles/pages/signup.css';

const SignUpBio = () => {
    const location = useLocation();
    const initialData = location.state || {};
    const [bio, setBio] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const navigate = useNavigate();

    const { login } = useAuth();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        const finalData = {
            ...initialData,
            bio,
            profileImage,
        };
        console.log('Final Form Data:', finalData);

        apiClient.post('/api/customers/register', {
            username: finalData.username,
            email: finalData.email,
            password: finalData.password,
            avatar: finalData.profileImage,
            bio: finalData.bio
        }).then((result) => {
            login();
            navigate('/choose-players');
        }).catch((err) => {
            alert(err);
        });
    };

    return (
        <div className="signup-page">
            <div className="image-section signup-image-2"></div>
            <div className="form-section">
                <div className="form-container">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="profile-image" />
                    ) : (
                        <div className="profile-placeholder">Upload Image</div>
                    )}
                    <form onSubmit={handleSignUp}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="input"
                        />
                        <label htmlFor="bio" className="bio-label">Bio</label>
                        <textarea
                            id="bio"
                            className="input bio-input"
                            placeholder="Tell us about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            required
                        ></textarea>
                        <button type="submit" className="button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpBio;
