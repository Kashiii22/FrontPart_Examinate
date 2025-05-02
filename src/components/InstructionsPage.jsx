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
  padding: theme.spacing(2),
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
  maxWidth: '1000px', // Increased from 900px
  maxHeight: '70vh', // Increased from 60vh
  overflowY: 'auto',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  boxSizing: 'border-box',
}));

const InstructionItem = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  fontWeight: 500,
  textAlign: 'left',
  marginBottom: theme.spacing(1.5),
  color: '#333',
}));

const NextButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  fontSize: '1.2rem',
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
    <InstructionsContainer>
      <LogoContainer>
        <AssignmentIcon sx={{ fontSize: '64px', color: '#1976d2' }} />
      </LogoContainer>
      <Typography variant="h2" sx={{ fontSize: '2.8rem', fontWeight: 900, color: '#1976d2', marginBottom: 3 }}>
        Exam Instructions
      </Typography>
      <InstructionsList>
        <Typography variant="h6" sx={{ fontSize: '1.6rem', fontWeight: 700, color: '#1976d2', marginBottom: 2 }}>
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
          label={<Typography sx={{ fontSize: '1.2rem', fontWeight: 500, color: '#333' }}>I have read and understood the instructions</Typography>}
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