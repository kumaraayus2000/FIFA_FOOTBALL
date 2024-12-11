import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const PlayerCards = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch players data from the API
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/players/players");
        setPlayers(response.data); // Set fetched players data
      } catch (err) {
        setError("Failed to fetch players data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "red",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

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
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "20px" }}
      >
        Player Profiles
      </Typography>
      <Grid container spacing={3}>
        {players.map((player) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
            <Card
              sx={{
                maxWidth: 300,
                borderRadius: "10px",
                boxShadow: 3,
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={player.avatar}
                alt={player.name}
                sx={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {player.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginBottom: "5px" }}
                >
                  <strong>Nationality:</strong> {player.nationality}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginBottom: "5px" }}
                >
                  <strong>Position:</strong> {player.position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Age:</strong> {player.age}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerCards;
