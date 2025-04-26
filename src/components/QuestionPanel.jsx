import React, { useContext, useEffect } from "react";
import { QuizContext } from "../context/QuizContext";
import { Typography, Radio, RadioGroup, FormControlLabel, Button, Divider, Slider, Box } from "@mui/material";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';

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

const QuestionPanel = () => {
  const { questions, currentQuestion, setCurrentQuestion, answers, setAnswers, questionStatus, setQuestionStatus, visitedQuestions, setVisitedQuestions } = useContext(QuizContext);
  const question = questions[currentQuestion];

  const handleChange = (e) => {
    setAnswers({ ...answers, [question.id]: e.target.value });
    if (!answers[question.id] && e.target.value) {
      setQuestionStatus({ ...questionStatus, [question.id]: 'completed' });
    }
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
    if (!answers[question.id]) {
      alert("Choose at least one option");
      return;
    }
    setQuestionStatus({ ...questionStatus, [question.id]: 'completed' });
    if (currentQuestion < questions.length - 1) {
      setVisitedQuestions({ ...visitedQuestions, [question.id]: true });
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Quiz completed!");
    }
  };

  const markForReview = () => {
    setQuestionStatus({ ...questionStatus, [question.id]: 'review' });
  };

  const clearAnswer = () => {
    const newAnswers = { ...answers };
    delete newAnswers[question.id];
    setAnswers(newAnswers);
    setQuestionStatus({ ...questionStatus, [question.id]: 'unattempted' });
  };

  useEffect(() => {
    if (!answers[question.id] && !visitedQuestions[question.id]) {
      setQuestionStatus({ ...questionStatus, [question.id]: 'unattempted' });
    } else if (answers[question.id] && !questionStatus[question.id]) {
      setQuestionStatus({ ...questionStatus, [question.id]: 'completed' });
    }
  }, [currentQuestion, answers, question.id, questionStatus, setQuestionStatus, visitedQuestions]);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div style={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' }, // Responsive flex direction
      width: '100%',
      maxWidth: '100vw',
      padding: { xs: 8, sm: 16 },
      backgroundColor: '#fff',
      overflowX: 'hidden',
      position: 'relative',
      height: 'calc(100vh - 60px)', // Adjusted for TopBar height on xs
      minHeight: { xs: 'calc(100vh - 60px)', sm: 'calc(100vh - 80px)' }, // Responsive min height
    }}>
      <Watermark>
        <AssignmentIcon sx={{ fontSize: '12rem', color: '#1976d2' }} />
      </Watermark>

      {/* Left Side: Question */}
      <div style={{
        flex: 1,
        paddingRight: { xs: 0, sm: 16 },
        mb: { xs: 2, sm: 0 },
        maxWidth: '100%',
        overflowWrap: 'break-word',
      }}>
        <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word', marginTop: 2, color: '#000' }}>
          {question.title}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 1, color: '#000', fontSize: { xs: '0.9rem', sm: '1.1rem' }, wordBreak: 'break-word', fontWeight: 'bold' }}>
          {question.body}
        </Typography>
      </div>

      {/* Divider */}
      <Divider
        orientation={window.innerWidth < 600 ? "horizontal" : "vertical"}
        flexItem
        sx={{
          margin: { xs: '8px 0', sm: '0 16px' },
          borderColor: '#ccc',
          borderWidth: window.innerWidth < 600 ? '1px' : '2px',
          display: 'block'
        }}
      />

      {/* Right Side: Options and Buttons */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 8, sm: 16 },
        maxWidth: '100%',
        height: '100%', // Ensure it uses full available height
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
                      fill: '#42a5f5'
                    }
                  }
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
              flex: { xs: '100%', sm: '40%' },
              maxWidth: { xs: '100%', sm: '40%' },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              padding: { xs: '6px', sm: '8px' },
              marginRight: { xs: 0, sm: '180px' },
              background: 'none',
              boxShadow: 'none',
              color: 'red',
              textTransform: 'none',
              fontWeight: 'bolder',
              border: 'none',
              '&:hover': {
                background: 'none',
                boxShadow: 'none',
                border: 'none',
                color: 'none'
              },
            }}
          >
            Clear Answer
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

      {/* Slider at Bottom Left */}
      <Box sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        width: { xs: '90%', sm: '40%' },
        backgroundColor: '#fff',
        padding: 1,
        borderRadius: 4,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        display: { xs: 'block', sm: 'flex' }, // Show on xs, flex on sm
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '4px 8px', sm: '6px 12px' }, minWidth: '80px' }}
          >
            Previous
          </Button>
          <Slider
            value={progress}
            onChange={(e, v) => setCurrentQuestion(Math.round((v / 100) * (questions.length - 1)))}
            aria-labelledby="progress-slider"
            sx={{ color: '#1976d2', width: { xs: '60%', sm: '50%' }, mx: 1 }}
            disabled={false} // Enabled for interaction
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
            sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' }, padding: { xs: '4px 8px', sm: '6px 12px' }, minWidth: '80px' }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default QuestionPanel;