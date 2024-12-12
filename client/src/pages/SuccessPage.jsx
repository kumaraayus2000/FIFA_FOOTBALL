import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        Thank you for your payment. Your transaction was successful.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/home")}
        sx={{
          textTransform: "uppercase",
          padding: "10px 20px",
          fontSize: "16px",
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default SuccessPage;
