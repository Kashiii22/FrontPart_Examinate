import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import WaitingPage from "./components/WaitingPage.jsx"; // Import WaitingPage
import InstructionsPage from "./components/InstructionsPage.jsx"; // Import InstructionsPage
import { QuizProvider } from "./context/QuizContext";

// Components used in the exam page
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import QuestionPanel from "./components/QuestionPanel";

function ExamPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <TopBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          width: "100%",
          maxWidth: "100vw",
          height: "calc(100% - 80px)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            marginRight: "20px",
            height: "100%",
          }}
        >
          <Sidebar />
        </div>
        <div style={{ flex: 1 }}>
          <QuestionPanel />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/" element={<InstructionsPage />} /> {/* New route for instructions */}
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;