import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const navigate = useNavigate();

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Try it again, agian and again until you succeed!!!"
  
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'calc(100vh - 60px)',
        textAlign: 'center',
        padding: 4,
      }}
    >
      <Typography variant="h4" sx={{ color: '#1976d2', mb: 3 }}>
        Your Test Has Been Submitted!
      </Typography>
      <Typography variant="h6" sx={{ color: '#333', mb: 4 }}>
        Thank you for completing the exam. Your results will be processed soon.
      </Typography>
      <Typography variant="body1" sx={{ color: '#666', mb: 4, maxWidth: '600px' }}>
        {randomQuote}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        sx={{ mt: 2 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default Submit;