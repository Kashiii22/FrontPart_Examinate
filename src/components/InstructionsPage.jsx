import React, { useState } from "react";
import { Box, Typography, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AssignmentIcon from '@mui/icons-material/Assignment';

const InstructionsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  padding: { xs: theme.spacing(2), sm: theme.spacing(3), md: theme.spacing(4) }, // Responsive padding
  backgroundColor: '#fff',
  textAlign: 'center',
  boxSizing: 'border-box',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
}));

const InstructionsList = styled(Box)(({ theme }) => ({
  maxWidth: { xs: '100%', sm: '800px', md: '1000px' }, // Responsive maxWidth
  maxHeight: { xs: '60vh', sm: '70vh' }, // Responsive maxHeight
  overflowY: 'auto',
  marginBottom: theme.spacing(3),
  padding: { xs: theme.spacing(2), sm: theme.spacing(3) }, // Responsive padding
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
}));

const InstructionItem = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' }, // Responsive font size
  fontWeight: 500,
  textAlign: 'left',
  marginBottom: theme.spacing(1.5),
  color: '#333',
}));

const NextButton = styled(Button)(({ theme }) => ({
  padding: { xs: theme.spacing(1, 2), sm: theme.spacing(1.5, 3) }, // Responsive padding
  fontSize: { xs: '1rem', sm: '1.2rem' }, // Responsive font size
  fontWeight: 'bold',
  borderRadius: '10px',
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '&.Mui-disabled': {
    backgroundColor: '#bdbdbd',
    color: '#fff',
    cursor: 'not-allowed',
  },
}));

export default function InstructionsPage() {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = (event) => {
    setIsConfirmed(event.target.checked);
  };

  const handleNext = () => {
    if (isConfirmed) {
      navigate("/login");
    }
  };

  return (
    <InstructionsContainer  >
      <LogoContainer>
        <AssignmentIcon sx={{ fontSize: { xs: '48px', sm: '64px' }, color: '#1976d2' }} />
      </LogoContainer>
      <Typography 
        variant="h2" 
        sx={{ 
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' }, // Responsive font size
          fontWeight: 900, 
          color: '#1976d2', 
          marginBottom: 3 
        }}
      >
        Exam Instructions
      </Typography>
      <InstructionsList>
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }, // Responsive font size
            fontWeight: 700, 
            color: '#1976d2', 
            marginBottom: 2 
          }}
        >
          Please read the following instructions carefully:
        </Typography>
        <InstructionItem>
          1. The exam will commence at 10:00 AM on May 1, 2025.
        </InstructionItem>
        <InstructionItem>
          2. You are allotted 60 minutes to complete the test.
        </InstructionItem>
        <InstructionItem>
          3. No external materials, notes, calculators, or electronic devices are permitted.
        </InstructionItem>
        <InstructionItem>
          4. Ensure a stable and uninterrupted internet connection prior to starting.
        </InstructionItem>
        <InstructionItem>
          5. Initiate the test by clicking "Start Test" only when fully prepared.
        </InstructionItem>
        <InstructionItem>
          6. All questions must be answered; partial submissions are not accepted.
        </InstructionItem>
        <InstructionItem>
          7. Avoid refreshing the browser to prevent automatic submission.
        </InstructionItem>
        <InstructionItem>
          8. Use of unauthorized software or assistance will result in disqualification.
        </InstructionItem>
        <InstructionItem>
          9. Contact the exam support team via the helpline for technical difficulties.
        </InstructionItem>
        <InstructionItem>
          10. Maintain academic integrity by completing the exam independently.
        </InstructionItem>
        <FormControlLabel
          control={<Checkbox checked={isConfirmed} onChange={handleConfirm} sx={{ color: '#1976d2' }} />}
          label={
            <Typography 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' }, // Responsive font size
                fontWeight: 500, 
                color: '#333' 
              }}
            >
              I have read and understood the instructions
            </Typography>
          }
        />
      </InstructionsList>
      <NextButton
        disabled={!isConfirmed}
        onClick={handleNext}
      >
        Next
      </NextButton>
    </InstructionsContainer>
  );
}