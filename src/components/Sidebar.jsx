import React, { useContext, useEffect, useRef } from "react";
import { QuizContext } from "../context/QuizContext";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // For custom tick

export default function Sidebar() {
  const { questions, currentQuestion, questionStatus } = useContext(QuizContext);
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

  // Generate steps dynamically based on questions
  const steps = questions.map((q, index) => ({
    label: (index + 1).toString(), // Use question index + 1 as label
    id: q.id, // Use question ID
  }));

  // Custom Step Icon Component
  const CustomStepIcon = (props) => {
    const { icon } = props; // Only need icon to determine step index
    const stepIndex = icon ? icon - 1 : 0; // Convert icon number to index (1-based to 0-based)
    const stepId = questions[stepIndex]?.id; // Get the question ID for this step

    // Only show the tick if the question is submitted (status is 'completed' or 'review')
    if (!stepId || questionStatus[stepId] === 'unattempted') {
      return null; // No tick for unattempted questions
    }

    let iconColor = '#42a5f5'; // Default blue for 'completed'
    if (questionStatus[stepId] === 'review') {
      iconColor = '#ffb300'; // Yellow for marked for review
    }

    return (
      <CheckCircleIcon
        sx={{
          color: iconColor,
          fontSize: '1.5rem',
        }}
      />
    );
  };

  return (
    <Box sx={{ maxWidth: 400, position: 'relative' }}>
      {/* Up Arrow Button (placeholder, to be implemented if needed) */}
      {/* <IconButton sx={{ position: 'absolute', top: 0 }}>
        <ArrowUpwardIcon />
      </IconButton> */}

      {/* Stepper Component with scrollable content */}
      <Box
        ref={sidebarRef}
        sx={{
          maxHeight: 'calc(100vh - 100px)', // Adjust based on your layout to account for arrows
          overflowY: 'auto', // Make it scrollable
          paddingTop: '40px', // Space for the up arrow (if implemented)
          paddingBottom: '60px', // Space for the down arrow
          scrollbarWidth: 'none', // Hide scrollbar in Firefox
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on mobile
        }}
        onScroll={handleScroll}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.id || index} completed={questionStatus[step.id] === 'completed'}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  fontSize: '1rem', // Adjusted to a reasonable size
                  fontWeight: 'bold',
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Down Arrow Button (placeholder, to be implemented if needed) */}
      {/* <IconButton sx={{ position: 'absolute', bottom: 0 }}>
        <ArrowDownwardIcon />
      </IconButton> */}
    </Box>
  );
}