import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChoosePlayers from "pages/ChoosePlayers";
import { Navbar } from "components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/choose-players" element={<ChoosePlayers />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
