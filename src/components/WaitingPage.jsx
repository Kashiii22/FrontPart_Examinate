import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion'; // Import Framer Motion
import hourglassIllustration from '../assets/Imgg2.png'; // Adjust path to your image

const WaitingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  padding: theme.spacing(3),
  backgroundColor: '#F8F8F8', // Updated to match the image background
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
  },
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(2),
  gap: theme.spacing(2), // Add spacing between elements
}));

const StartButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderRadius: '8px',
  backgroundColor: '#1976d2', // MUI primary blue
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '&.Mui-disabled': {
    backgroundColor: '#bdbdbd', // Gray when disabled
    color: '#fff',
  },
}));

export default function WaitingPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    const testStartTime = new Date("2025-05-01T10:00:00").getTime();

    const updateTimer = () => {
      const currentTime = new Date().getTime();
      const timeDifference = testStartTime - currentTime;

      if (timeDifference <= 0) {
        setCanStart(true); // Enable the button when time is up
        setTimeLeft("0m 0s"); // Stop the timer at 0
      } else {
        const totalSeconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setTimeLeft(`${minutes}m ${seconds}s`);
        setCanStart(false); // Keep button disabled
      }
    };

    updateTimer();

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleStartTest = () => {
    if (canStart) {
      navigate("/exam");
    }
  };

  // Animation variants
  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        duration: 1,
        bounce: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    fontWeight:'bolder',
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.8 },
    },
  };

  return (
    <WaitingContainer>
      <IllustrationContainer>
        <motion.img
          src={hourglassIllustration}
          alt="Waiting Illustration"
          style={{ maxWidth: '100%', height: 'auto' }}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        />
      </IllustrationContainer>
      <TextContainer>
        <motion.Typography variant="h2" gutterBottom variants={textVariants} initial="hidden" animate="visible" sx={{ fontSize: '3.5rem', fontWeight: 900 }}>
          Please Wait
        </motion.Typography>
        <motion.Typography variant="body1" gutterBottom variants={textVariants} initial="hidden" animate="visible" sx={{ fontSize: '2rem', fontWeight: 700 }}>
          The test will start at 10:00 AM on May 1, 2025.
        </motion.Typography>
        <motion.Typography variant="h6" variants={textVariants} initial="hidden" animate="visible" sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
          Time Remaining: {timeLeft || "Calculating..."}
        </motion.Typography>
        <motion.div variants={textVariants} initial="hidden" animate="visible">
          <StartButton
            disabled={!canStart}
            onClick={handleStartTest}
          >
            Start Test
          </StartButton>
        </motion.div>
      </TextContainer>
    </WaitingContainer>
  );
}