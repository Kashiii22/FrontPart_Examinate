import React, { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context/QuizContext";
import { Typography, Radio, RadioGroup, FormControlLabel, Button, Divider, Slider, Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const Watermark = styled('div')({
  position: 'absolute',
  top: '40%',
  left: '20%',
  transform: 'translateY(-50%)',
  color: '#1976d2',
  fontSize: '24rem',
  fontWeight: 'bold',
  zIndex: 0,
  pointerEvents: 'none',
  opacity: 0.2,
  whiteSpace: 'nowrap',
});

const GradientUnderlineTypography = styled(Typography)({
  position: 'relative',
  display: 'inline-block',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '16px',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(to right, #42a5f5, #1976d2)',
    borderRadius: '2px',
    bottom: '-6px',
  },
});

const QuestionPanel = () => {
  const { 
    questions, 
    currentQuestion, 
    setCurrentQuestion, 
    answers, 
    setAnswers, 
    questionStatus, 
    setQuestionStatus, 
    visitedQuestions, 
    setVisitedQuestions, 
    fontSize,
    isQuizCompleted, // Added for clarity, though not used yet
    setIsQuizCompleted // Ensure this is correctly destructured
  } = useContext(QuizContext);
  const question = questions[currentQuestion];
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    setAnswers({ ...answers, [question.id]: e.target.value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setVisitedQuestions({ ...visitedQuestions, [question.id]: true });
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setVisitedQuestions({ ...visitedQuestions, [question.id]: true });
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    if (!answers[question.id] && questionStatus[question.id] !== 'review') {
      alert("Choose at least one option");
      return;
    }
    const newStatus = answers[question.id] ? 'completed' : 'review';
    setQuestionStatus({ ...questionStatus, [question.id]: newStatus });
    if (currentQuestion < questions.length - 1) {
      setVisitedQuestions({ ...visitedQuestions, [question.id]: true });
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setOpenDialog(true);
    }
  };

  const handleConfirmSubmit = () => {
    console.log("handleConfirmSubmit called");
    setOpenDialog(false);
    if (typeof setIsQuizCompleted === 'function') {
      setIsQuizCompleted(true);
      console.log("setIsQuizCompleted called, navigating to /submit");
      navigate('/submit');
      console.log("Navigation attempted");
    } else {
      console.error("setIsQuizCompleted is not a function");
    }
  };

  const handleCancelSubmit = () => {
    setOpenDialog(false);
  };

  const markForReview = () => {
    setQuestionStatus({ ...questionStatus, [question.id]: 'review' });
    setVisitedQuestions({ ...visitedQuestions, [question.id]: true });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const clearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[question.id];
    setAnswers(newAnswers);
    setQuestionStatus({ ...questionStatus, [question.id]: 'unattempted' });
  };

  useEffect(() => {
    if (!visitedQuestions[question.id] && !answers[question.id]) {
      setQuestionStatus((prev) => ({ ...prev, [question.id]: 'unattempted' }));
    }
  }, [currentQuestion, question.id, visitedQuestions, answers]); // Removed questionStatus and setQuestionStatus from dependencies

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      width: '100%',
      maxWidth: '100vw',
      padding: { xs: 8, sm: 16 },
      paddingLeft: { xs: '24px', sm: '40px' },
      backgroundColor: '#fff',
      overflowX: 'hidden',
      position: 'relative',
      height: 'calc(100vh - 60px)',
      minHeight: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 80px)' },
    }}>
      <Watermark>
        <AssignmentIcon sx={{ fontSize: '12rem', color: '#1976d2' }} />
      </Watermark>

      <div style={{
        flex: 1,
        paddingRight: { xs: 10, sm: 16 },
        mb: { xs: 2, sm: 0 },
        maxWidth: '100%',
        overflowWrap: 'break-word',
      }}>
        <GradientUnderlineTypography
          variant="h4"
          sx={{
            fontSize: { xs: `calc(${fontSize}px * 1.5)`, sm: `calc(${fontSize}px * 0.78125)` },
            wordBreak: 'break-word',
            marginTop: 4,
            marginBottom: '16px',
            marginLeft: 5,
          }}
        >
          {question.title}
        </GradientUnderlineTypography>
        <Typography
          variant="body1"
          sx={{
            marginTop: 3,
            color: '#000',
            fontSize: { xs: `calc(${fontSize}px * 0.9)`, sm: `calc(${fontSize}px * 1.1)` },
            wordBreak: 'break-word',
            marginLeft: 5,
          }}
        >
          {question.body}
        </Typography>
      </div>

      <Divider
        orientation={window.innerWidth < 600 ? "horizontal" : "vertical"}
        flexItem
        sx={{
          margin: { xs: '8px 0', sm: '0 16px' },
          borderColor: '#ccc',
          borderWidth: window.innerWidth < 600 ? '1px' : '2px',
          display: 'block',
        }}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 8, sm: 16 },
        maxWidth: '100%',
        height: '100%',
      }}>
        <div style={{ maxWidth: '100%' }}>
          <Typography variant="subtitle1" sx={{ fontSize: { xs: '0.9rem', sm: '1.2rem' }, color: '#000', marginTop: '10px', fontWeight: 'bold' }}>
            Choose any one
          </Typography>
          <RadioGroup value={answers[question.id] || ""} onChange={handleChange} sx={{ marginTop: 1 }}>
            {question.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio sx={{
                  color: '#42a5f5',
                  '&.Mui-checked': {
                    color: '#42a5f5',
                    '& .MuiSvgIcon-root': {
                      fill: '#42a5f5',
                    },
                  },
                }} />}
                label={opt}
                sx={{ color: '#000', '& .MuiTypography-root': { fontSize: { xs: '0.9rem', sm: '1rem' }, wordBreak: 'break-word' } }}
              />
            ))}
          </RadioGroup>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px', flexWrap: 'wrap' }}>
          <Button
            onClick={clearAnswer}
            sx={{
              flex: { xs: '100%', sm: '30%' },
              maxWidth: { xs: '100%', sm: '30%' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              padding: { xs: '6px', sm: '8px' },
              background: 'none',
              boxShadow: 'none',
              color: 'red',
              textTransform: 'none',
              fontWeight: 'bolder',
              border: 'none',
              '&:hover': {
                background: 'rgba(255, 0, 0, 0.1)',
                boxShadow: 'none',
                border: 'none',
                color: 'red',
              },
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
              },
              '&:active': {
                background: 'rgba(255, 0, 0, 0.15)',
                boxShadow: 'none',
                border: 'none',
              },
            }}
          >
            Clear Answer
          </Button>

          <Button
            onClick={markForReview}
            sx={{
              flex: { xs: '100%', sm: '30%' },
              maxWidth: { xs: '100%', sm: '30%' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              padding: { xs: '6px', sm: '8px' },
              background: 'none',
              boxShadow: 'none',
              color: '#ffb300',
              textTransform: 'none',
              fontWeight: 'bolder',
              border: 'none',
              '&:hover': {
                background: 'rgba(255, 179, 0, 0.1)',
                boxShadow: 'none',
                border: 'none',
              },
              '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.2)',
                border: 'none',
              },
              '&:active': {
                background: 'rgba(255, 179, 0, 0.15)',
                boxShadow: 'none',
                border: 'none',
              },
            }}
          >
            Mark for Review
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              flex: { xs: '100%', sm: '30%' },
              maxWidth: { xs: '100%', sm: '30%' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              padding: { xs: '6px', sm: '8px' },
            }}
          >
            Submit
          </Button>
        </div>
      </div>

      <Box sx={{
        position: 'absolute',
        bottom: 15,
        left: { xs: 16, sm: 40 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        width: { xs: '100%', sm: '650px' },
        maxWidth: '100%',
        padding: 1,
        backgroundColor: '#fff',
        borderRadius: 4,
        border: 'none',
        boxShadow: '0 0 4px rgba(255, 255, 255, 0.1)',
      }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '4px 8px', sm: '6px 12px' }, minWidth: '80px', marginBottom: '20px', marginRight: '450px' }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '4px 8px', sm: '6px 12px' }, minWidth: '80px', marginBottom: '20px' }}
        >
          Next
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCancelSubmit}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuestionPanel;