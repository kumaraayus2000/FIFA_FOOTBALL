import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth/AuthContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { SportsFootball } from "@mui/icons-material";

import "styles/components/navbar.css";

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated, logout } = useAuth();

//   const handleLogin = () => {
//     navigate('/login'); // Navigate to login page
//   };

//   const handleLogout = () => {
//     logout(); // Call the logout function from AuthContext
//     navigate('/'); // Redirect to home page or login
//   };

//   return (
//     <header className="header">
//       <div className="header-icon">
//         <span role="img" aria-label="soccer">
//           ⚽
//         </span>
//       </div>
//       <h1>Choose Players</h1>
//       <div className="auth-buttons">
//         {isAuthenticated ? (
//           <button onClick={handleLogout} className="auth-button">
//             Logout
//           </button>
//         ) : (
//           <button onClick={handleLogin} className="auth-button">
//             Login
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to home page or login
  };

  const navbarTitle = () => {
    switch (location.pathname) {
      case "/choose-players":
        return "FIFA Soccer Simulator";
      case "/playercards":
        return "Players";
      case "/matches":
        return "Matches";
      case "/betting":
        return "Betting";
      case "/payment":
        return "Payments";

      default:
        return "";
    }
  };

  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(45deg, #4caf50, #2196f3)" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate("/home")}
        >
          <SportsFootball />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {navbarTitle()}
        </Typography>
        <Button
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate("/choose-players")}
        >
          Game
        </Button>
        <Button
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate("/betting")}
        >
          Betting{" "}
        </Button>
        <Button
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate("/playercards")}
        >
          Players
        </Button>
        <Button
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => navigate("/matches")}
        >
          Matches
        </Button>
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
      </Toolbar>
    </AppBar>
  );
};
