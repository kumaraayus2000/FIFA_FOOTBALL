// import React, { useState } from "react";
// import axios from "axios";
// import { Box, TextField, Button, Typography, Paper } from "@mui/material";

// const BettingPage = () => {
//   const [matchId, setMatchId] = useState("");
//   const [teamName, setTeamName] = useState("");
//   const [betAmount, setBetAmount] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);


// const handleSimulate = async () => {
//     setError(null);
//     setResult(null);
  
//     if (!matchId || !teamName || !betAmount) {
//       setError("Please fill in all fields.");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/api/games/${matchId}/simulate`,
//         null, // No data body for this request
//         {
//           params: {
//             teamName,
//             betAmount,
//           },
//         }
//       );
      
//       console.log(response.data);
//       setResult(response.data);
//     } catch (err) {
//       setError("Failed to simulate game. Please try again.");
//     }
//   };
  
//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "50px auto",
//         padding: 3,
//         backgroundColor: "#ffffff",
//         boxShadow: 3,
//         borderRadius: 2,
//       }}
//     >
//       <Typography variant="h4" component="h1" align="center" gutterBottom>
//         Betting Simulator
//       </Typography>

//       <Paper elevation={3} sx={{ padding: 3 }}>
//         <Typography variant="h6" component="h2" gutterBottom>
//           Place Your Bet
//         </Typography>

//         <TextField
//           fullWidth
//           label="Match ID"
//           type="number"
//           value={matchId}
//           onChange={(e) => setMatchId(e.target.value)}
//           margin="normal"
//           variant="outlined"
//         />

//         <TextField
//           fullWidth
//           label="Team Name"
//           type="text"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//           margin="normal"
//           variant="outlined"
//         />

//         <TextField
//           fullWidth
//           label="Bet Amount"
//           type="number"
//           value={betAmount}
//           onChange={(e) => setBetAmount(e.target.value)}
//           margin="normal"
//           variant="outlined"
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2 }}
//           onClick={handleSimulate}
//         >
//           Simulate Game
//         </Button>

//         {error && (
//           <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
//             {error}
//           </Typography>
//         )}
//       </Paper>

//       {result && (
//         <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
//           <Typography variant="h6" component="h2" gutterBottom>
//             Simulation Result
//           </Typography>
//           <Typography variant="body1">
//             <strong>Match Outcome:</strong> {result.outcome}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Winning Amount:</strong> ${result.winningAmount}
//           </Typography>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default BettingPage;

import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";


const BettingPage = () => {
  const [matchId, setMatchId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSimulate = async () => {
    setError(null);
    setResult(null);

    if (!matchId || !teamName || !betAmount) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/games/${matchId}/simulate`,
        null,
        {
          params: {
            teamName,
            betAmount,
          },
        }
      );
      setResult(response.data);
    } catch (err) {
      setError("Failed to simulate game. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "50px auto",
        padding: 3,
        backgroundColor: "#ffffff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Betting Simulator
      </Typography>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Place Your Bet
        </Typography>

        <TextField
          fullWidth
          label="Match ID"
          type="number"
          value={matchId}
          onChange={(e) => setMatchId(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Team Name"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Bet Amount"
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          margin="normal"
          variant="outlined"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleSimulate}
        >
          Simulate Game
        </Button>

        {error && (
          <Typography color="error" variant="body2" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>

      {result && (
        <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Simulation Result
          </Typography>
          <Typography variant="body1">
            <strong>Game ID:</strong> {result.game.id}
          </Typography>
          <Typography variant="body1">
            <strong>Team A:</strong> {result.game.teamA}
          </Typography>
          <Typography variant="body1">
            <strong>Team B:</strong> {result.game.teamB}
          </Typography>
          <Typography variant="body1">
            <strong>Winner:</strong> {result.winner}
          </Typography>
          <Typography variant="body1">
            <strong>Game Date:</strong> {new Date(result.game.gameDate).toLocaleString()}
          </Typography>
          <Typography variant="body1">
            <strong>Bet Amount:</strong> ${result.betAmount}
          </Typography>
          <Typography variant="body1">
            <strong>Team Chosen:</strong> {result.teamChosen}
          </Typography>
          <Typography variant="body1">
            <strong>Outcome:</strong> {result.outcome > 0 ? "+" : ""}{result.outcome}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {result.status}
          </Typography>
          {result.outcome < 0 && (
           <Button
           variant="contained"
           color="secondary"
           sx={{ marginTop: 2 }}
           onClick={() => navigate("/payment", { state: { amount: betAmount } })}
         >
           Pay Now
         </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default BettingPage;
