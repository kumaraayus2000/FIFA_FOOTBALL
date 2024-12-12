import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ChoosePlayers from "pages/ChoosePlayers";
import { Navbar } from "components/Navbar";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import SignUpBio from "pages/SignUpBio";
import Betting from "pages/Betting";
import Payment from "pages/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PlayersCards from "pages/PlayersCards";
import Matches from "pages/Matches";

import { AuthProvider, useAuth } from './utils/auth/AuthContext';
import HomePage from "pages/HomePage";
import SuccessPage from "pages/SuccessPage";

const stripePromise = loadStripe("pk_test_51QNlBqBhwWVqOPIEOVEhW42AyQxnyDlwnEwsz7mV9EtVzwm6gMRBFqNSxsCqFSrbM4gASUTHd1WvhY6Yuk8HBAU8008wGRAIJy");


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
            <Route path="/playercards" element={<PlayersCards />} />
            <Route path="/matches" element={<Matches/>} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/success" element={<SuccessPage/>}/>
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
            <Route
              path="/betting"
              element={
                <PrivateRoute>
                  <Betting />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute>
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </PrivateRoute>
              }
            />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App;
