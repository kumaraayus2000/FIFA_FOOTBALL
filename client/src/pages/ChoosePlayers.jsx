// import React, { useEffect, useState } from "react";
// import "styles/pages/choose-players.css";
// import Avatar from "components/Avatar";
// import Button from "components/Button";
// import TextField from "components/Textfield";
// import apiClient from "../utils/apiClient";

// const ChoosePlayers = () => {
//   const [team1Players, setTeam1Players] = useState([]);
//   const [team2Players, setTeam2Players] = useState([]);
//   const [venue, setVenue] = useState("");
//   const [team1Name, setTeam1Name] = useState("");
//   const [team2Name, setTeam2Name] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [error, setError] = useState([]);

//   const handleSelect = (team, player) => {
//     const setter = team === "team1" ? setTeam1Players : setTeam2Players;
//     const currentPlayers = team === "team1" ? team1Players : team2Players;

//     if (currentPlayers.includes(player)) {
//       setter(currentPlayers.filter((p) => p !== player));
//     } else {
//       if (currentPlayers.length < 11) {
//         setter([...currentPlayers, player]);
//       }
//     }
//   };

//   const isPlayerDisabled = (team, player) => {
//     if (team === "team1") {
//       return team2Players.includes(player);
//     } else if (team === "team2") {
//       return team1Players.includes(player);
//     }
//     return false;
//   };

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await apiClient.get(
//           "http://localhost:8080/api/players/players"
//         );

//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         setPlayers(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchPlayers();
//   }, []);

//   const handleClick = () => {
//     console.log(team1Name, team1Players, team2Name, team2Players, venue);
//   };

//   return (
//     <div className="choose-players-container">
//       <div className="form">
//         <div className="form-row">
//           <TextField
//             label="Venue"
//             value={venue}
//             handleChange={setVenue}
//             name="venue"
//           />
//         </div>
//         <div className="form-row">
//           <div className="team-section">
//             <TextField
//               label="Team1 Name"
//               value={team1Name}
//               handleChange={setTeam1Name}
//               name="team1Name"
//             />
//             <div className="dropdown">
//               <TextField label="Team1 Players" />
//               <div className="dropdown-content">
//                 {players.map((player) => (
//                   <label key={player.name}>
//                     <input
//                       type="checkbox"
//                       checked={team1Players.includes(player.name)}
//                       onChange={() => handleSelect("team1", player.name)}
//                       disabled={
//                         isPlayerDisabled("team1", player.name) ||
//                         (team1Players.length >= 11 &&
//                           !team1Players.includes(player.name))
//                       }
//                     />
//                     {player.name}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="team-section">
//             <TextField
//               label="Team2 Name"
//               value={team2Name}
//               handleChange={setTeam2Name}
//               name="team2Name"
//             />
//             <div className="dropdown">
//               <TextField label="Team2 Players" />
//               <div className="dropdown-content">
//                 {players.map((player) => (
//                   <label key={player.name}>
//                     <input
//                       type="checkbox"
//                       checked={team2Players.includes(player.name)}
//                       onChange={() => handleSelect("team2", player.name)}
//                       disabled={
//                         isPlayerDisabled("team2", player.name) ||
//                         (team2Players.length >= 11 &&
//                           !team2Players.includes(player.name))
//                       }
//                     />
//                     {player.name}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="team-list">
//         <div className="team">
//           <h3>Team 1</h3>
//           <div className="team-avatars">
//             {team1Players.map((name) => {
//               const player = players.find((p) => p.name === name);
//               return (
//                 <div key={name} className="avatar">
//                   <Avatar name={name} src={player?.avatar} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="team">
//           <h3>Team 2</h3>
//           <div className="team-avatars">
//             {team2Players.map((name) => {
//               const player = players.find((p) => p.name === name);
//               return (
//                 <div key={name} className="avatar">
//                   <Avatar name={name} src={player?.avatar} />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="start-game-button">
//         <Button text="Start Game" handleClick={handleClick} />
//       </div>
//     </div>
//   );
// };

// export default ChoosePlayers;




//second approach
// import React, { useEffect, useState } from "react";
// import { Box, TextField, Typography, Checkbox, FormControlLabel, Button, Avatar, Grid, Paper } from "@mui/material";
// import apiClient from "../utils/apiClient";

// const ChoosePlayers = () => {
//   const [team1Players, setTeam1Players] = useState([]);
//   const [team2Players, setTeam2Players] = useState([]);
//   const [venue, setVenue] = useState("");
//   const [team1Name, setTeam1Name] = useState("");
//   const [team2Name, setTeam2Name] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [error, setError] = useState([]);

//   const handleSelect = (team, player) => {
//     const setter = team === "team1" ? setTeam1Players : setTeam2Players;
//     const currentPlayers = team === "team1" ? team1Players : team2Players;

//     if (currentPlayers.includes(player)) {
//       setter(currentPlayers.filter((p) => p !== player));
//     } else {
//       if (currentPlayers.length < 11) {
//         setter([...currentPlayers, player]);
//       }
//     }
//   };

//   const isPlayerDisabled = (team, player) => {
//     if (team === "team1") {
//       return team2Players.includes(player);
//     } else if (team === "team2") {
//       return team1Players.includes(player);
//     }
//     return false;
//   };

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const response = await apiClient.get(
//           "http://localhost:8080/api/players/players"
//         );

//         if (response.status !== 200) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         setPlayers(response.data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchPlayers();
//   }, []);

//   const handleClick = () => {
//     console.log(team1Name, team1Players, team2Name, team2Players, venue);
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: "1200px",
//         margin: "20px auto",
//         padding: "20px",
//         borderRadius: "10px",
//         background: "linear-gradient(to bottom, #e3f2fd, #ffffff)",
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h4" gutterBottom align="center">
//         Choose Players
//       </Typography>
//       <Paper sx={{ padding: "20px", marginBottom: "30px" }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <TextField
//               label="Venue"
//               value={venue}
//               onChange={(e) => setVenue(e.target.value)}
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Team 1 Name"
//               value={team1Name}
//               onChange={(e) => setTeam1Name(e.target.value)}
//               fullWidth
//             />
//             <Box mt={2}>
//               <Typography variant="h6">Select Players</Typography>
//               {players.map((player) => (
//                 <FormControlLabel
//                   key={player.name}
//                   control={
//                     <Checkbox
//                       checked={team1Players.includes(player.name)}
//                       onChange={() => handleSelect("team1", player.name)}
//                       disabled={
//                         isPlayerDisabled("team1", player.name) ||
//                         (team1Players.length >= 11 &&
//                           !team1Players.includes(player.name))
//                       }
//                     />
//                   }
//                   label={player.name}
//                 />
//               ))}
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Team 2 Name"
//               value={team2Name}
//               onChange={(e) => setTeam2Name(e.target.value)}
//               fullWidth
//             />
//             <Box mt={2}>
//               <Typography variant="h6">Select Players</Typography>
//               {players.map((player) => (
//                 <FormControlLabel
//                   key={player.name}
//                   control={
//                     <Checkbox
//                       checked={team2Players.includes(player.name)}
//                       onChange={() => handleSelect("team2", player.name)}
//                       disabled={
//                         isPlayerDisabled("team2", player.name) ||
//                         (team2Players.length >= 11 &&
//                           !team2Players.includes(player.name))
//                       }
//                     />
//                   }
//                   label={player.name}
//                 />
//               ))}
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <Typography variant="h5">Team 1</Typography>
//           <Grid container spacing={1}>
//             {team1Players.map((name) => {
//               const player = players.find((p) => p.name === name);
//               return (
//                 <Grid item key={name}>
//                   <Avatar alt={name} src={player?.avatar} />
//                   <Typography variant="caption">{name}</Typography>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Grid>
//         <Grid item xs={6}>
//           <Typography variant="h5">Team 2</Typography>
//           <Grid container spacing={1}>
//             {team2Players.map((name) => {
//               const player = players.find((p) => p.name === name);
//               return (
//                 <Grid item key={name}>
//                   <Avatar alt={name} src={player?.avatar} />
//                   <Typography variant="caption">{name}</Typography>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Grid>
//       </Grid>
//       <Box textAlign="center" mt={4}>
//         <Button variant="contained" color="primary" onClick={handleClick}>
//           Start Game
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ChoosePlayers;


import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, Checkbox, FormControlLabel, Button, Avatar, Grid, Paper } from "@mui/material";
import apiClient from "../utils/apiClient";

const ChoosePlayers = () => {
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [venue, setVenue] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState([]);

  const handleSelect = (team, player) => {
    const setter = team === "team1" ? setTeam1Players : setTeam2Players;
    const currentPlayers = team === "team1" ? team1Players : team2Players;

    if (currentPlayers.includes(player)) {
      setter(currentPlayers.filter((p) => p !== player));
    } else {
      if (currentPlayers.length < 11) {
        setter([...currentPlayers, player]);
      }
    }
  };

  const isPlayerDisabled = (team, player) => {
    if (team === "team1") {
      return team2Players.includes(player);
    } else if (team === "team2") {
      return team1Players.includes(player);
    }
    return false;
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await apiClient.get(
          "http://localhost:8080/api/players/players"
        );

        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setPlayers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPlayers();
  }, []);

  const handleClick = () => {
    console.log(team1Name, team1Players, team2Name, team2Players, venue);
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "15px",
        background: "linear-gradient(to bottom, #f5faff, #e8f0fe)",
        boxShadow: 4,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Choose Players
      </Typography>
      <Paper sx={{ padding: "20px", marginBottom: "30px", borderRadius: "10px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Team 1 Name"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Box mt={3}>
              <Typography variant="h6" color="textSecondary">
                Select Players
              </Typography>
              {players.map((player) => (
                <FormControlLabel
                  key={player.name}
                  control={
                    <Checkbox
                      checked={team1Players.includes(player.name)}
                      onChange={() => handleSelect("team1", player.name)}
                      disabled={
                        isPlayerDisabled("team1", player.name) ||
                        (team1Players.length >= 11 &&
                          !team1Players.includes(player.name))
                      }
                    />
                  }
                  label={player.name}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Team 2 Name"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <Box mt={3}>
              <Typography variant="h6" color="textSecondary">
                Select Players
              </Typography>
              {players.map((player) => (
                <FormControlLabel
                  key={player.name}
                  control={
                    <Checkbox
                      checked={team2Players.includes(player.name)}
                      onChange={() => handleSelect("team2", player.name)}
                      disabled={
                        isPlayerDisabled("team2", player.name) ||
                        (team2Players.length >= 11 &&
                          !team2Players.includes(player.name))
                      }
                    />
                  }
                  label={player.name}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{ padding: "20px", borderRadius: "10px", textAlign: "center" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Team 1
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {team1Players.map((name) => {
                const player = players.find((p) => p.name === name);
                return (
                  <Grid item key={name}>
                    <Avatar
                      alt={name}
                      src={player?.avatar}
                      sx={{
                        width: 64,
                        height: 64,
                        boxShadow: 2,
                        border: "2px solid #1976d2",
                      }}
                    />
                    <Typography variant="caption" display="block">
                      {name}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{ padding: "20px", borderRadius: "10px", textAlign: "center" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
              Team 2
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {team2Players.map((name) => {
                const player = players.find((p) => p.name === name);
                return (
                  <Grid item key={name}>
                    <Avatar
                      alt={name}
                      src={player?.avatar}
                      sx={{
                        width: 64,
                        height: 64,
                        boxShadow: 2,
                        border: "2px solid #d32f2f",
                      }}
                    />
                    <Typography variant="caption" display="block">
                      {name}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={5}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            padding: "10px 40px",
            borderRadius: "25px",
            background: "linear-gradient(to right, #1976d2, #42a5f5)",
            "&:hover": {
              background: "linear-gradient(to right, #1565c0, #1e88e5)",
            },
          }}
          onClick={handleClick}
        >
          Start Game
        </Button>
      </Box>
    </Box>
  );
};

export default ChoosePlayers;
