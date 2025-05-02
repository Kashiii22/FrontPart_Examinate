import React, { createContext, useState } from "react";
import questions from "../data/dummy.js";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState(
    safeQuestions.reduce((acc, q) => ({ ...acc, [q.id]: 'unattempted' }), {})
  );
  const [visitedQuestions, setVisitedQuestions] = useState(
    safeQuestions.reduce((acc, q) => ({ ...acc, [q.id]: false }), {})
  );
  const [subjectName] = useState("Mathematics");
  const [examID] = useState("EXAM-2025-001");
  const [fontSize, setFontSize] = useState(16);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // Added

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setQuestionStatus(safeQuestions.reduce((acc, q) => ({ ...acc, [q.id]: 'unattempted' }), {}));
    setVisitedQuestions(safeQuestions.reduce((acc, q) => ({ ...acc, [q.id]: false }), {}));
    setIsQuizCompleted(false);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        questions: safeQuestions,
        answers,
        setAnswers,
        questionStatus,
        setQuestionStatus,
        visitedQuestions,
        setVisitedQuestions,
        subjectName,
        examID,
        fontSize,
        setFontSize,
        isQuizCompleted, // Added
        setIsQuizCompleted, // Added
        resetQuiz // Added
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};