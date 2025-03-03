import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Avatar,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import backgroundImage from "../assets/imgs/FIFA-PROJECT-WORLD-CUP-BACKGORUNG-IMAGE.jpg"; // Adjust the path

const ChoosePlayers = () => {
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [venue, setVenue] = useState("");
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState([]);
  const [apiResponse, setApiResponse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
        const response = await axios.get(
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

  const handleCreateMatch = async () => {
    try {
      const date = new Date();
      const response = await axios.post(
        "http://localhost:8080/api/matches/createMatch",
        {
          matchDate: date.toISOString(),
          score: "score",
          teamA: team1Name,
          teamB: team2Name,
          venue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert("Failed to create match. Please try again.");
    }
  };
  const handleStartGame = async () => {
    const requestBody = {
      venue,
      team1: team1Players.map((name) => {
        const player = players.find((p) => p.name === name);
        return player?.id;
      }),
      team2: team2Players.map((name) => {
        const player = players.find((p) => p.name === name);
        return player?.id;
      }),
      teamName1: team1Name,
      teamName2: team2Name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/gamesim/start",
        requestBody,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setApiResponse(response.data);
      setDialogOpen(true); // Open dialog to show the response
    } catch (error) {
      alert("Failed to start the game. Please try again.");
    }
  };

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
        <Paper
          sx={{
            padding: "20px",
            marginBottom: "30px",
            borderRadius: "10px",
          }}
        >
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
                        disabled={isPlayerDisabled("team1", player.name)}
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
                        disabled={isPlayerDisabled("team2", player.name)}
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
              sx={{
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
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
              sx={{
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
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
            onClick={async () => {
              await handleCreateMatch();
              await handleStartGame();
            }}
          >
            Create Match
          </Button>
        </Box>

        {/* Dialog for API Response */}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Game Simulation Result</DialogTitle>
          <DialogContent>
            {apiResponse ? (
              <Box>
                <Typography variant="body1">
                  <strong>Winner:</strong> {apiResponse.winner}
                </Typography>
                <Typography variant="body1">
                  <strong>Team 1 Players Below 60:</strong>{" "}
                  {apiResponse.idsBelow60Team1.join(", ") || "None"}
                </Typography>
                <Typography variant="body1">
                  <strong>Team 2 Players Below 60:</strong>{" "}
                  {apiResponse.idsBelow60Team2.join(", ") || "None"}
                </Typography>
              </Box>
            ) : (
              <Typography variant="body1">No result available.</Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ChoosePlayers;
