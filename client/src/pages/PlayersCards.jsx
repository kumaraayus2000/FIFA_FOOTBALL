import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const PlayerCards = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState({
    open: false,
    playerId: null,
  });
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    age: "",
    nationality: "",
    position: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/players/players"
        );
        setPlayers(response.data);
      } catch (err) {
        setError("Failed to fetch players data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [newPlayer]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPlayer = async () => {
    try {
      await axios.post("http://localhost:8080/api/players", newPlayer);
      setPlayers((prev) => [...prev, newPlayer]);
      handleCloseModal();
      setNewPlayer({
        name: "",
        age: "",
        nationality: "",
        position: "",
        avatar: "",
      });
    } catch (err) {
      console.error("Failed to add player", err);
    }
  };

  const handleOpenConfirmationModal = (playerId) => {
    setConfirmationModal({ open: true, playerId });
  };

  const handleCloseConfirmationModal = () => {
    setConfirmationModal({ open: false, playerId: null });
  };

  const handleDeletePlayer = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/players/${confirmationModal.playerId}`
      );
      setPlayers((prev) =>
        prev.filter((player) => player.id !== confirmationModal.playerId)
      );
      handleCloseConfirmationModal();
    } catch (err) {
      console.error("Failed to delete player", err);
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ marginBottom: "20px" }}
      >
        Add Player
      </Button>

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
                sx={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {player.name}
                  </Typography>
                  <DeleteIcon
                    onClick={() => handleOpenConfirmationModal(player.id)}
                    sx={{
                      cursor: "pointer",
                      color: "#aaa",
                      marginLeft: "8px",
                      "&:hover": { color: "darkred" },
                    }}
                  />
                </Box>

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

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add New Player
          </Typography>

          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={newPlayer.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Age"
            name="age"
            fullWidth
            margin="normal"
            type="number"
            value={newPlayer.age}
            onChange={handleInputChange}
          />
          <TextField
            label="Nationality"
            name="nationality"
            fullWidth
            margin="normal"
            value={newPlayer.nationality}
            onChange={handleInputChange}
          />
          <TextField
            label="Position"
            name="position"
            fullWidth
            margin="normal"
            value={newPlayer.position}
            onChange={handleInputChange}
          />
          <TextField
            label="Avatar URL"
            name="avatar"
            fullWidth
            margin="normal"
            value={newPlayer.avatar}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
            onClick={handleAddPlayer}
          >
            Add Player
          </Button>
        </Box>
      </Modal>

      <Modal
        open={confirmationModal.open}
        onClose={handleCloseConfirmationModal}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography>Are you sure you want to delete this player?</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseConfirmationModal}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeletePlayer}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PlayerCards;
