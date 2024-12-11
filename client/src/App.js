import React from "react";
import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ChoosePlayers from "pages/ChoosePlayers";
import { Navbar } from "components/Navbar";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import SignUpBio from "pages/SignUpBio";

import { AuthProvider, useAuth } from './utils/auth/AuthContext';


const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    // Check localStorage as a fallback
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    if (isAuthenticated || loggedIn) {
        return children;
    }

    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
};

const App = () => {
  return (
      <>
      <AuthProvider>
          <Router>
              <Navbar />
              <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signup-bio" element={<SignUpBio />} />
                  <Route
                      path="/"
                      element={
                          <PrivateRoute>
                              <>Please add HomePage</>
                          </PrivateRoute>
                      }
                  />
                  <Route
                      path="/choose-players"
                      element={
                          <PrivateRoute>
                              <ChoosePlayers />
                          </PrivateRoute>
                      }
                  />
                  <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              </Routes>
          </Router>
              </AuthProvider>
      </>
  );
};

export default App;
