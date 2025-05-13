import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuestion } from '../redux/quizSlice.js';
import { Box, Stepper, Step, StepLabel } from "@mui/material";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { questions, currentQuestion, questionStatus } = useSelector((state) => state.quiz);

  const [activeStep, setActiveStep] = React.useState(currentQuestion);
  const sidebarRef = useRef(null);

  useEffect(() => {
    setActiveStep(currentQuestion);
  }, [currentQuestion]);

  const steps = questions.map((q, index) => ({
    label: (index + 1).toString(), 
    id: q.id, 
  }));

  console.log("Number of steps in Sidebar:", steps.length); 

  const CustomStepIcon = (props) => {
    const { icon } = props; 
    const stepIndex = icon ? icon - 1 : 0; 
    const stepId = questions[stepIndex]?.id; 

    let backgroundColor = '#e0e0e0'; 
    let border = 'none';
    let color = '#000';

    if (stepId) {
      if (questionStatus[stepId] === 'completed') {
        backgroundColor = '#42a5f5'; 
        color = '#fff';
      } else if (questionStatus[stepId] === 'review') {
        border = '2px solid #ffb300'; 
        backgroundColor = 'transparent';
        color = '#ffb300';
      }
    }

    return (
      <Box
        sx={{
          width: { xs: 20, sm: 24 }, // Responsive size
          height: { xs: 20, sm: 24 }, // Responsive size
          borderRadius: '50%',
          backgroundColor: backgroundColor,
          border: border,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
          fontSize: { xs: '0.7rem', sm: '0.9rem' }, // Responsive font size
          fontWeight: 'bold',
        }}
      >
        {icon}
      </Box>
    );
  };

  const handleQuestionClick = (index) => {
    dispatch(setCurrentQuestion(index));
  };

  return (
    <Box sx={{ 
      maxWidth: { xs: 200, sm: 300, md: 400 }, // Responsive maxWidth
      position: 'relative',
    }}>
      <Box
        ref={sidebarRef}
        sx={{
          maxHeight: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 80px)' }, // Responsive maxHeight
          overflowY: 'auto',
          paddingTop: { xs: '2px', sm: '4px' }, // Responsive padding
          paddingBottom: { xs: '4px', sm: '8px' }, // Responsive padding
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            marginTop: 0,
            paddingTop: '0px',
            '& .MuiStep-root': {
              padding: { xs: '1px 0', sm: '2px 0' }, // Responsive padding
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.id || index} completed={questionStatus[step.id] === 'completed'}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  // '&:hover': {
                  //   transform: 'scale(1.1)',
                  //   backgroundColor: 'rgba(25, 118, 210, 0.1)',
                  // },
                  padding: { xs: '1px 0', sm: '2px 0' }, // Responsive padding
                  cursor: 'pointer',
                }}
                onClick={() => handleQuestionClick(index)}
              >
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Box>
  );
}