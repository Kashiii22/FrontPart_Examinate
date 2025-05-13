import { createSlice } from '@reduxjs/toolkit';
import questions from '../data/dummy.js';

// Ensure questions are valid
const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : [];

// Initial state
const initialState = {
  questions: safeQuestions,
  currentQuestion: 0,
  answers: {},
  questionStatus: safeQuestions.reduce((acc, q) => {
    acc[q.id] = 'unattempted';
    return acc;
  }, {}),
  visitedQuestions: safeQuestions.reduce((acc, q) => {
    acc[q.id] = false;
    return acc;
  }, {}),
  fontSize: 16,
  isQuizCompleted: false,
  subjectName: "Sample Quiz",
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
      state.questionStatus = action.payload.reduce((acc, q) => {
        acc[q.id] = 'unattempted';
        return acc;
      }, {});
      state.visitedQuestions = action.payload.reduce((acc, q) => {
        acc[q.id] = false;
        return acc;
      }, {});
    },

    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },

    setAnswer: (state, action) => {
      const { id, answer } = action.payload;
      state.answers[id] = answer;
    },

    setQuestionStatus: (state, action) => {
      const { id, status } = action.payload;
      state.questionStatus[id] = status;
    },

    markVisited: (state, action) => {
      state.visitedQuestions[action.payload] = true;
    },

    clearAnswer: (state, action) => {
      const id = action.payload;
      delete state.answers[id];
      state.questionStatus[id] = 'unattempted';
    },

    completeQuiz: (state) => {
      state.isQuizCompleted = true;
    },

    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },

    setSubjectName: (state, action) => {
      state.subjectName = action.payload;
    },

    resetQuiz: (state) => {
      state.currentQuestion = 0;
      state.answers = {};
      state.questionStatus = state.questions.reduce((acc, q) => {
        acc[q.id] = 'unattempted';
        return acc;
      }, {});
      state.visitedQuestions = state.questions.reduce((acc, q) => {
        acc[q.id] = false;
        return acc;
      }, {});
      state.isQuizCompleted = false;
      state.subjectName = "Sample Quiz";
    },
  },
});

export const {
  setQuestions,
  setCurrentQuestion,
  setAnswer,
  setQuestionStatus,
  markVisited,
  clearAnswer,
  completeQuiz,
  setFontSize,
  setSubjectName,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
