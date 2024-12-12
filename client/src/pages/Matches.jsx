import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  SportsSoccer as SoccerIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import backgroundImage from "../assets/imgs/FIFA-PROJECT-WORLD-CUP-BACKGORUNG-IMAGE.jpg"; // Adjust the path
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/matches/getAllMatches"
      );
      setMatches(response.data); // Set fetched matches data
    } catch (err) {
      setError("Failed to fetch matches data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
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
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "20px" }}
      >
        Matches
      </Typography>
      <Grid container spacing={3}>
        {matches.map((match) => (
          <Grid item xs={12} sm={6} md={4} key={match.id}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: 3,
                padding: "20px",
                backgroundColor: "#ffffff",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "15px",
                    color: "#1976d2",
                  }}
                >
                  {match.teamA} vs {match.teamB}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <SoccerIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
                  <strong>Teams:</strong> {match.teamA} vs {match.teamB}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <LocationIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
                  <strong>Venue:</strong> {match.venue}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CalendarIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
                  <strong>Date:</strong>{" "}
                  {new Date(match.matchDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {new Date(match.matchDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for creating match */}
    </Box>
    </Box>
  );
};

export default Matches;
