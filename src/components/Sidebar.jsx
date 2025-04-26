import React, { useContext } from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { QuizContext } from "../context/QuizContext";

const Sidebar = () => {
  const { questions, currentQuestion, setCurrentQuestion, questionStatus } = useContext(QuizContext);

  const CustomStepIcon = ({ idx, status, isActive }) => {
    const isCompleted = status === 'completed';

    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isActive ? "#1976d2" : "#ffffff",
          fontSize: isCompleted ? "1.2rem" : "1rem",
          fontWeight: "bold",
          marginLeft:"20px",
        }}
      >
        {isCompleted ? "✓" : idx + 1}
      </span>
    );
  };

  return (
    <Stepper
      activeStep={currentQuestion}
      orientation="vertical"
      sx={{
        width: { xs: "50px", sm: "75px" },
        bgcolor: "#fff",
        minHeight: "0", // Allow dynamic height
        height: "100%", // Fill available height
        overflowY: 'auto',
        overflowX: 'hidden',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        '& .MuiStep-root': {
          padding: '2px 0',
          margin: '1px 0',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          mx: 1,
          '&:hover': {
            backgroundColor: '#bbdefb',
          },
        },
        '& .MuiStepConnector-root': {
          display: 'none',
        },
      }}
    >
      {questions.map((q, idx) => (
        <Step key={q.id} onClick={() => setCurrentQuestion(idx)}>
          <StepLabel
            StepIconComponent={() => (
              <CustomStepIcon
                idx={idx}
                status={questionStatus[q.id]}
                isActive={idx === currentQuestion}
              />
            )}
            sx={{
              width: "100%",
              textAlign: "center",
              backgroundColor: idx === currentQuestion ? "#ffffff" : "#1976d2",
              color: idx === currentQuestion ? "#1976d2" : "#ffffff",
              borderRadius: "8px",
              fontWeight: idx === currentQuestion ? 'bold' : 'normal',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              padding: "4px 0",
              '& .MuiStepLabel-label': {
                display: 'none',
              },
              '& .MuiStepLabel-iconContainer': {
                margin: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default Sidebar;