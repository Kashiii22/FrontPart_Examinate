import React, { useContext, useEffect, useRef } from "react";
import { QuizContext } from "../context/QuizContext";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function Sidebar() {
  const { questions, currentQuestion, setCurrentQuestion, questionStatus } = useContext(QuizContext);
  const [activeStep, setActiveStep] = React.useState(currentQuestion);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const sidebarRef = useRef(null);

  const handleScroll = () => {
    const sidebar = sidebarRef.current;
    const isBottom = sidebar.scrollHeight === sidebar.scrollTop + sidebar.clientHeight;
    setIsScrollable(!isBottom);
  };

  useEffect(() => {
    setActiveStep(currentQuestion);
  }, [currentQuestion]);

  const steps = questions.map((q, index) => ({
    label: (index + 1).toString(), 
    id: q.id, 
  }));

  console.log("Number of steps in Sidebar:", steps.length); // Debugging log

  const CustomStepIcon = (props) => {
    const { icon } = props; 
    const stepIndex = icon ? icon - 1 : 0; 
    const stepId = questions[stepIndex]?.id; 

    if (!stepId || questionStatus[stepId] === 'unattempted') {
      return null;
    }

    const iconColor = questionStatus[stepId] === 'completed' ? '#42a5f5' : '#ffb300'; 

    return (
      <CheckCircleIcon
        sx={{
          color: iconColor,
          fontSize: '1.5rem',
        }}
      />
    );
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index); 
  };

  return (
    <Box sx={{ maxWidth: 400, position: 'relative' }}>
      <Box
        ref={sidebarRef}
        sx={{
          maxHeight: 'calc(100vh - 80px)', // Adjusted to match TopBar height (80px)
          overflowY: 'auto',
          paddingTop: '8px',
          paddingBottom: '20px', // Reduced to allow more scrollable space
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={handleScroll}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.id || index} completed={questionStatus[step.id] === 'completed'}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  },
                }}
                onClick={() => handleQuestionClick(index)}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}