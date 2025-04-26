import React, { createContext, useState } from "react";
import questions from "../data/dummy.js";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: 'unattempted' }), {})
  );
  const [visitedQuestions, setVisitedQuestions] = useState(
    questions.reduce((acc, q) => ({ ...acc, [q.id]: false }), {})
  );
  const [subjectName] = useState("Mathematics"); // Hardcoded subject name

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        questions,
        answers,
        setAnswers,
        questionStatus,
        setQuestionStatus,
        visitedQuestions,
        setVisitedQuestions,
        subjectName
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};