import React from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import QuestionPanel from "./components/QuestionPanel";
import { QuizProvider } from "./context/QuizContext";
import { Divider } from "@mui/material";

function App() {
  return (
    <QuizProvider>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <TopBar />
        <div style={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flex: 1,
          width: '100%',
          maxWidth: '100vw',
          height: 'calc(100% - 80px)',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <Sidebar style={{ height: '100%' }} />
          {/* <Divider
            orientation={window.innerWidth < 600 ? "horizontal" : "vertical"}
            flexItem
            sx={{
              margin: { xs: '8px 0', sm: '0 16px' },
              borderColor: '#ccc', // Light gray border, no background
              borderWidth: window.innerWidth < 600 ? '1px' : '2px',
              display: 'block',
              // backgroundColor: 'transparent' // Explicitly set to transparent
            }}
          /> */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#fff',
            width: '100%',
            maxWidth: '100vw',
            height: '100%',
            overflow: 'auto',
            overflowX: 'hidden',
            position: 'relative'
          }}>
            <QuestionPanel />
          </div>
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;