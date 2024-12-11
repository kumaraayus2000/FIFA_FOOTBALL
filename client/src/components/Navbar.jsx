// import "styles/components/navbar.css";

// export const Navbar = () => {
//   return (
//     <header className="header">
//       <div className="header-icon">
//         <span role="img" aria-label="soccer">
//           ⚽
//         </span>
//       </div>
//       <h1>Choose Players</h1>
//     </header>
//   );
// };

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {SportsFootball} from "@mui/icons-material";
// import { deleteforever } from '@mui/icons-material';
//import { useNavigate } from "react-router-dom";


export const Navbar = () => {
 // const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ background: "linear-gradient(45deg, #4caf50, #2196f3)" }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <SportsFootball />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Choose Players
        </Typography>
        {/* <Button color="inherit" sx={{ mr: 2}} onClick={() => navigate("/betting")}Betting ></Button> */}
        <Button color="inherit" sx={{ mr: 2 }}>Stats</Button>
        <Button color="inherit" sx={{ mr: 2 }}>Matches</Button>
        <Button color="inherit" variant="outlined" sx={{ color: "#fff", borderColor: "#fff" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
