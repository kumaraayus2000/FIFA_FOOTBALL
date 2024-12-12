import React from "react";
import { Box, Button, Typography } from "@mui/material";
import backgroundImage from "../assets/imgs/FIFA-PROJECT-WORLD-CUP-BACKGORUNG-IMAGE.jpg"; // Adjust the path
import startGameImage from "../assets/imgs/FIFA-PROJECT-IMAGE-1.jpg"; // Adjust the path
import betImage from "../assets/imgs/FIFA-PROJECT-IMAGE-2.webp"; // Adjust the path
import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//     return (
//       <Box
//         sx={{
//           height: "90vh",
//           width: "100%",
//           backgroundImage: `url(${backgroundImage})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "space-between",
//           color: "white",
//           textAlign: "center",
//           padding: "20px",
//           overflow: "hidden",
//         }}
//       >
//         {/* Title */}
//         <Typography
//           variant="h2"
//           sx={{
//             fontWeight: "bold",
//             textShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
//             marginBottom: "20px",
//           }}
//         >
//           Welcome to the Gaming World
//         </Typography>
  
//         {/* Images and Buttons */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             maxWidth: "1200px",
//           }}
//         >
//           {/* Start Game Section */}
//           <Box
//             sx={{
//               textAlign: "center",
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Box
//               component="img"
//               src={startGameImage}
//               alt="Start Game"
//               sx={{
//                 width: "200px",
//                 height: "auto",
//                 marginBottom: 2,
//                 borderRadius: "10px",
//                 boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
//               }}
//             />
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#ff4081",
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 borderRadius: "25px",
//                 padding: "10px 20px",
//                 textTransform: "uppercase",
//                 boxShadow: "0px 4px 10px rgba(255, 64, 129, 0.5)",
//                 "&:hover": {
//                   backgroundColor: "#ff79a7",
//                 },
//               }}
//             >
//               Start Game
//             </Button>
//           </Box>
  
//           {/* Bet Section */}
//           <Box
//             sx={{
//               textAlign: "center",
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Box
//               component="img"
//               src={betImage}
//               alt="Bet"
//               sx={{
//                 width: "200px",
//                 height: "auto",
//                 marginBottom: 2,
//                 borderRadius: "10px",
//                 boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
//               }}
//             />
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#ff9800",
//                 fontSize: "18px",
//                 fontWeight: "bold",
//                 borderRadius: "25px",
//                 padding: "10px 20px",
//                 textTransform: "uppercase",
//                 boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.5)",
//                 "&:hover": {
//                   backgroundColor: "#ffc947",
//                 },
//               }}
//             >
//               Bet
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     );
//   };
  
//   export default HomePage;

const HomePage = () => {
    const navigate = useNavigate();

    return (
      <Box
        sx={{
          height: "90vh",
          width: "100%",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Title */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            textShadow: "0 4px 10px rgba(0, 0, 0, 0.7)",
            marginBottom: "20px",
          }}
        >
          Welcome to the Gaming World
        </Typography>
  
        {/* Images and Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {/* Start Game Section */}
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={startGameImage}
              alt="Start Game"
              sx={{
                width: "550px", // Make image larger
                height: "auto",
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff4081",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "25px",
                padding: "10px 20px",
                textTransform: "uppercase",
                boxShadow: "0px 4px 10px rgba(255, 64, 129, 0.5)",
                "&:hover": {
                  backgroundColor: "#ff79a7",
                },
              }} onClick={() => navigate("/choose-players")}
            >
              Start Game
            </Button>
          </Box>
  
          {/* Bet Section */}
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={betImage}
              alt="Bet"
              sx={{
                width: "600px", // Make image larger
                height: "auto",
                marginBottom: 2,
                borderRadius: "10px",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)",
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff9800",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "25px",
                padding: "10px 20px",
                textTransform: "uppercase",
                boxShadow: "0px 4px 10px rgba(255, 152, 0, 0.5)",
                "&:hover": {
                  backgroundColor: "#ffc947",
                },
             }}  onClick={() => navigate("/betting")}
            >
              Bet
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  
  export default HomePage;