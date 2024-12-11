// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import {
//   SportsSoccer as SoccerIcon,
//   LocationOn as LocationIcon,
//   CalendarToday as CalendarIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// const Matches = () => {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch matches data from the API
//     const fetchMatches = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/matches/getAllMatches");
//         setMatches(response.data); // Set fetched matches data
//       } catch (err) {
//         setError("Failed to fetch matches data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           color: "red",
//         }}
//       >
//         <Typography variant="h6">{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         maxWidth: "1200px",
//         margin: "20px auto",
//         padding: "20px",
//         borderRadius: "15px",
//         background: "linear-gradient(to bottom, #f5faff, #e8f0fe)",
//         boxShadow: 4,
//       }}
//     >
//       <Typography
//         variant="h4"
//         align="center"
//         gutterBottom
//         sx={{ fontWeight: "bold", color: "#1976d2", marginBottom: "20px" }}
//       >
//         Matches
//       </Typography>
//       <Grid container spacing={3}>
//         {matches.map((match) => (
//           <Grid item xs={12} sm={6} md={4} key={match.id}>
//             <Card
//               sx={{
//                 borderRadius: "10px",
//                 boxShadow: 3,
//                 padding: "20px",
//                 backgroundColor: "#ffffff",
//                 "&:hover": {
//                   transform: "scale(1.05)",
//                   transition: "transform 0.3s",
//                 },
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h6"
//                   gutterBottom
//                   sx={{
//                     fontWeight: "bold",
//                     textAlign: "center",
//                     marginBottom: "15px",
//                     color: "#1976d2",
//                   }}
//                 >
//                   {match.teamA} vs {match.teamB}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   <SoccerIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
//                   <strong>Teams:</strong> {match.teamA} vs {match.teamB}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   <LocationIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
//                   <strong>Venue:</strong> {match.venue}
//                 </Typography>
//                 <Typography
//                   variant="body2"
//                   color="textSecondary"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <CalendarIcon sx={{ marginRight: "8px", color: "#1976d2" }} />
//                   <strong>Date:</strong>{" "}
//                   {new Date(match.matchDate).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}{" "}
//                   at{" "}
//                   {new Date(match.matchDate).toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default Matches;


import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  SportsSoccer as SoccerIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import axios from "axios";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false); // Dialog open state
  const [newMatch, setNewMatch] = useState({
    teamA: "",
    teamB: "",
    venue: "",
    matchDate: "",
  });

  const fetchMatches = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/matches/getAllMatches");
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

  const handleCreateMatch = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/matches/createMatch", newMatch, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Match created successfully!");
        setOpen(false);
        setNewMatch({ teamA: "", teamB: "", venue: "", matchDate: "" });
        fetchMatches(); // Refresh matches list
      }
    } catch (error) {
      alert("Failed to create match. Please try again.");
    }
  };

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
      <Box textAlign="center" mt={5}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            padding: "10px 40px",
            borderRadius: "25px",
          }}
        >
          Create Match
        </Button>
      </Box>
      {/* Dialog for creating match */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Match</DialogTitle>
        <DialogContent>
          <TextField
            label="Team A"
            value={newMatch.teamA}
            onChange={(e) => setNewMatch({ ...newMatch, teamA: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Team B"
            value={newMatch.teamB}
            onChange={(e) => setNewMatch({ ...newMatch, teamB: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Venue"
            value={newMatch.venue}
            onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Match Date"
            type="datetime-local"
            value={newMatch.matchDate}
            onChange={(e) =>
              setNewMatch({ ...newMatch, matchDate: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateMatch}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Matches;
