import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetQuiz } from '../redux/quizSlice';
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { answers, questions } = useSelector((state) => state.quiz);

  const motivationalQuotes = [
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Try it again, again and again until you succeed!!!"
  ];
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const handleBack = () => {
    dispatch(resetQuiz());
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
        padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
      }}
    >
      <Typography 
        variant="h4" 
        sx={{ 
          color: '#1976d2', 
          mb: 3,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive font size
        }}
      >
        Your Test Has Been Submitted!
      </Typography>
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#333', 
          mb: 2,
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Responsive font size
        }}
      >
        Thank you for completing the exam. Your results will be processed soon.
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666', 
          mb: 2,
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
        }}
      >
        You answered {Object.keys(answers).length} out of {questions.length} questions.
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#666', 
          mb: 4, 
          maxWidth: { xs: '90%', sm: '600px' }, // Responsive maxWidth
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
        }}
      >
        {randomQuote}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBack}
        sx={{ 
          mt: 2,
          padding: { xs: '8px 16px', sm: '10px 20px' }, // Responsive padding
          fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default Submit;