import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChoosePlayers from "pages/ChoosePlayers";
import { Navbar } from "components/Navbar";
import Betting from "pages/Betting";
import Payment from "pages/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_51QNlBqBhwWVqOPIEOVEhW42AyQxnyDlwnEwsz7mV9EtVzwm6gMRBFqNSxsCqFSrbM4gASUTHd1WvhY6Yuk8HBAU8008wGRAIJy");

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
          <Routes>
            <Route path="/choose-players" element={<ChoosePlayers />} />
            <Route path="/betting" element={<Betting />}/>
            <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
          </Routes>
      </Router>
    </>
  );
};

export default App;
