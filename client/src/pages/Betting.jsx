

import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Box, TextField, Button, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/imgs/FIFA-PROJECT-WORLD-CUP-BACKGORUNG-IMAGE.jpg";

const BettingPage = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(""); // Define state for "Team I Support"

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all matches
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/matches/getAllMatches");
        setMatches(response.data);
      } catch (err) {
        setError("Failed to load matches. Please try again.");
      }
    };
    fetchMatches();
  }, []);

  const handleSimulate = async () => {
    setError(null);
    setResult(null);

    if (!selectedMatch || !betAmount || !selectedTeam) {
      setError("Please select a match and enter the bet amount.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/games/${selectedMatch.id}/simulate`,
        null,
        {
          params: {
            teamName: selectedTeam, // Automatically pick teamA for now
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
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: 3 }}
      >
        Betting Simulator
      </Typography>

      {/* Display matches */}
      <Grid container spacing={2} sx={{ maxWidth: 1000, marginBottom: 4 }}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card
              sx={{
                backgroundColor: selectedMatch?.id === match.id ? "#f0f0f0" : "white",
                boxShadow: 3,
                borderRadius: 2,
                cursor: "pointer",
                border: selectedMatch?.id === match.id ? "2px solid #1976d2" : "none",
              }}
              onClick={() => setSelectedMatch(match)}
            >
              <CardContent>
                <Typography variant="h6">
                  {match.teamA} vs {match.teamB}
                </Typography>
                <Typography variant="body2">Venue: {match.venue}</Typography>
                <Typography variant="body2">
                  Date: {new Date(match.matchDate).toLocaleString()}
                </Typography>
                {match.score && <Typography variant="body2">Score: {match.score}</Typography>}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedMatch && (
        <Paper elevation={3} sx={{ maxWidth: 600, padding: 3, marginBottom: 3 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Place Your Bet
          </Typography>

          {/* <TextField
      fullWidth
      label="Team I Support"
      type="text"
      value={selectedTeam} // Bind to a new state variable for team support
      onChange={(e) => setSelectedTeam(e.target.value)}
      margin="normal"
      variant="outlined"
    /> */}
        <FormControl fullWidth margin="normal">
            <InputLabel id="team-select-label">Team I Support</InputLabel>
            <Select
              labelId="team-select-label"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <MenuItem value={selectedMatch.teamA}>{selectedMatch.teamA}</MenuItem>
              <MenuItem value={selectedMatch.teamB}>{selectedMatch.teamB}</MenuItem>
            </Select>
          </FormControl>


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
      )}

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
            <strong>Outcome:</strong> {result.outcome > 0 ? "+" : ""}
            {result.outcome}
          </Typography>
          <Typography variant="body1">
            <strong>Status:</strong> {result.status}
          </Typography>
          {result.outcome < 0 && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={() =>
                navigate("/payment", { state: { amount: betAmount } })
              }
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
