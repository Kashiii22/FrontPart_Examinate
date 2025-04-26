import React, { createContext, useState } from "react";
import questions from "../data/dummy.js";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  return (
    <QuizContext.Provider
      value={{ currentQuestion, setCurrentQuestion, questions, answers, setAnswers }}
    >
      {children}
    </QuizContext.Provider>
  );
};