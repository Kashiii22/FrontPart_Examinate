import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrentQuestion,
  setAnswer,
  setQuestionStatus,
  markVisited,
  clearAnswer as clearAnswerAction,
  completeQuiz,
} from '../redux/quizSlice';

import {
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  '@media (max-width: 600px)': {
    fontSize: '8rem',
    left: '10%',
  },
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
  const dispatch = useDispatch();
  const {
    questions,
    currentQuestion,
    answers,
    questionStatus,
    visitedQuestions,
    fontSize,
    isQuizCompleted,
  } = useSelector((state) => state.quiz);

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [localAnswer, setLocalAnswer] = useState(answers[questions[currentQuestion]?.id] || "");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px

  useEffect(() => {
    setLocalAnswer(answers[questions[currentQuestion]?.id] || "");
  }, [answers, currentQuestion, questions]);

  if (!questions.length || currentQuestion < 0 || currentQuestion >= questions.length) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Error: No questions available or invalid question index.
        </Typography>
      </Box>
    );
  }

  const question = questions[currentQuestion];

  const handleChange = (e) => {
    const newAnswer = e.target.value;
    setLocalAnswer(newAnswer);
    dispatch(setAnswer({ id: question.id, answer: newAnswer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch(markVisited(question.id));
      dispatch(setCurrentQuestion(currentQuestion + 1));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      dispatch(markVisited(question.id));
      dispatch(setCurrentQuestion(currentQuestion - 1));
    }
  };

  const handleSubmit = () => {
    if (!localAnswer && questionStatus[question.id] !== 'review') {
      alert("Choose at least one option");
      return;
    }
    const newStatus = localAnswer ? 'completed' : 'review';
    dispatch(setQuestionStatus({ id: question.id, status: newStatus }));
    if (currentQuestion < questions.length - 1) {
      dispatch(markVisited(question.id));
      dispatch(setCurrentQuestion(currentQuestion + 1));
    } else {
      setOpenDialog(true);
    }
  };

  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    dispatch(completeQuiz());
    navigate('/submit');
  };

  const handleCancelSubmit = () => {
    setOpenDialog(false);
  };

  const markForReview = () => {
    dispatch(setQuestionStatus({ id: question.id, status: 'review' }));
    dispatch(markVisited(question.id));
    if (currentQuestion < questions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1));
    }
  };

  const handleClearAnswer = () => {
    dispatch(clearAnswerAction(question.id));
    setLocalAnswer("");
  };

  useEffect(() => {
    if (!visitedQuestions[question.id] && !answers[question.id]) {
      dispatch(setQuestionStatus({ id: question.id, status: 'unattempted' }));
    }
  }, [currentQuestion, question.id, visitedQuestions, answers, dispatch]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '100vw',
      height: 'calc(100vh - 60px)',
      position: 'relative',
    }}>
      {/* Main Content (Left and Right Sections) */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack vertically on mobile
        flex: 1,
        padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        backgroundColor: '#fff',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
        <Watermark>
          <AssignmentIcon sx={{ 
            fontSize: { xs: '8rem', sm: '12rem' }, // Responsive watermark size
            color: '#1976d2' 
          }} />
        </Watermark>

        {/* Left Side - Question Display */}
        <Box sx={{
          flex: 1,
          paddingRight: { xs: 0, sm: 2 }, // No paddingRight on mobile
          paddingBottom: { xs: 2, sm: 0 }, // PaddingBottom on mobile
        }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              marginLeft: { xs: 0, sm: 5 }, // Adjust margin for mobile
              color: '#666',
              fontSize: { xs: '0.8rem', sm: '1rem' }, // Responsive font size
            }}
          >
            Question {currentQuestion + 1} of {questions.length}
          </Typography>

          <GradientUnderlineTypography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', md: `calc(${fontSize}px * 1)` }, // Responsive font size
              wordBreak: 'break-word',
              marginTop: 2,
              marginBottom: '16px',
              marginLeft: { xs: 0, sm: 5 }, // Adjust margin for mobile
            }}
          >
            {question.title}
          </GradientUnderlineTypography>

          <Typography
            variant="body1"
            sx={{
              marginTop: 3,
              color: '#000',
              fontSize: { xs: '0.9rem', sm: '1rem', md: `calc(${fontSize}px * 1.1)` }, // Responsive font size
              wordBreak: 'break-word',
              marginLeft: { xs: 0, sm: 5 }, // Adjust margin for mobile
            }}
          >
            {question.body}
          </Typography>
        </Box>

        {/* Divider */}
        <Divider
          orientation={isMobile ? "horizontal" : "vertical"}
          flexItem
          sx={{ 
            margin: { xs: '8px 0', sm: '0 16px' }, // Responsive margin
            borderColor: '#ccc', 
            borderWidth: isMobile ? '1px' : '2px',
          }}
        />

        {/* Right Side - Options and Actions */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 }, // Responsive gap
          paddingTop: { xs: 2, sm: 0 }, // PaddingTop on mobile
        }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
            }}
          >
            Choose any one
          </Typography>

          <RadioGroup value={localAnswer} onChange={handleChange}>
            {question.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={<Radio sx={{
                  color: '#42a5f5',
                  '&.Mui-checked': {
                    color: '#42a5f5',
                    '& .MuiSvgIcon-root': { fill: '#42a5f5' },
                  },
                }} />}
                label={opt}
                sx={{ 
                  color: '#000', 
                  '& .MuiTypography-root': { 
                    wordBreak: 'break-word',
                    fontSize: { xs: '0.8rem', sm: '1rem' }, 
                  } 
                }}
              />
            ))}
          </RadioGroup>

          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2, sm: 3 }, // Responsive gap
            justifyContent: 'flex-start',
          }}>
            <Button
              onClick={handleClearAnswer}
              sx={{
                color: 'red',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: { xs: '4px 8px', sm: '6px 12px' }, // Responsive padding
                fontSize: { xs: '0.7rem', sm: '0.875rem' }, // Responsive font size
                background: 'none',
                boxShadow: 'none',
                marginRight:'70px',
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
              aria-label="Clear selected answer"
            >
              Clear Answer
            </Button>

            <Button
              onClick={markForReview}
              sx={{
                color: '#ffb300',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: { xs: '4px 8px', sm: '6px 12px' }, // Responsive padding
                fontSize: { xs: '0.7rem', sm: '0.875rem' }, // Responsive font size
                background: 'none',
                boxShadow: 'none',
                border: 'none',
                marginRight:'120px',
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
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: '#1976d2',
                padding: { xs: '4px 8px', sm: '6px 12px' }, // Responsive padding
                fontSize: { xs: '0.7rem', sm: '0.875rem' }, // Responsive font size
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Save & Next"}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{
        position: 'absolute',
        bottom: { xs: 16, sm: 32 }, // Responsive bottom position
        left: 16,
        right: 12,
        display: 'flex',
        justifyContent: 'flex-start',
        gap: { xs: 2, sm: 3 }, // Responsive gap
        padding: { xs: '0 8px', sm: '0 16px' }, // Responsive padding
      }}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{
            fontSize: { xs: '0.6rem', sm: '0.875rem' }, // Responsive font size
            padding: { xs: '4px 8px', sm: '6px 12px' }, // Responsive padding
            minWidth: { xs: '60px', sm: '80px' }, // Responsive minWidth
            backgroundColor: '#1565c0',
            color: '#FFF',
            borderColor: '#1565c0',
            marginRight:'450px',
            '&:hover': {
              backgroundColor: '#104e8b',
              borderColor: '#104e8b',
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey.500',
              color: 'grey.700',
              borderColor: 'grey.500',
            },
          }}
          aria-label="Go to previous question"
        >
          Previous
        </Button>

        <Button
          variant="outlined"
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          sx={{
            fontSize: { xs: '0.6rem', sm: '0.875rem' }, // Responsive font size
            padding: { xs: '4px 8px', sm: '6px 12px' }, // Responsive padding
            minWidth: { xs: '60px', sm: '80px' }, // Responsive minWidth
            backgroundColor: '#1565c0',
            color: '#FFF',
            borderColor: '#1565c0',
            '&:hover': {
              backgroundColor: '#104e8b',
              borderColor: '#104e8b',
            },
            '&.Mui-disabled': {
              backgroundColor: 'grey.500',
              color: 'grey.700',
              borderColor: 'grey.500',
            },
          }}
          aria-label="Go to next question"
        >
          Next
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCancelSubmit}>
        <DialogTitle>Confirm Submit</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to submit the quiz?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit}>Cancel</Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuestionPanel;