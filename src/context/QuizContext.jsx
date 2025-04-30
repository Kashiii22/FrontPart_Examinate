import React, { createContext, useState } from "react";
import questions from "../data/dummy.js";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // Fallback for questions if dummy.js is empty
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
        setFontSize
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}; 