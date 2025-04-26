import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { QuizContext } from "../context/QuizContext";
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PublicIcon from '@mui/icons-material/Public';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Timer from "./Timer";

const TopBar = () => {
  const { subjectName } = useContext(QuizContext);
  const [signalStrength, setSignalStrength] = useState("unknown");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateConnectionStatus = () => {
      if (navigator.connection) {
        const conn = navigator.connection;
        const effectiveType = conn.effectiveType || "unknown";
        setSignalStrength(
          effectiveType.includes("2g") || effectiveType === "slow-2g" ? "poor" : "strong"
        );
        conn.onchange = updateConnectionStatus;
      }
    };

    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    updateConnectionStatus();

    return () => {
      if (navigator.connection) {
        navigator.connection.onchange = null;
      }
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const getIcon = () => {
    if (!isOnline) {
      return <PublicIcon sx={{ color: "gray", fontSize: { xs: '1rem', sm: '1.5rem' } }} title="No Internet" />;
    }
    return <SignalWifi4BarIcon
      sx={{
        color: signalStrength === "poor" ? "#ff4444" : signalStrength === "strong" ? "#00cc00" : "#757575",
        fontSize: { xs: '1rem', sm: '1.5rem' }
      }}
      title={signalStrength === "poor" ? "Poor" : signalStrength === "strong" ? "Strong" : "Unknown"}
    />;
  };

  return (
    <AppBar position="static" color="primary" sx={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', backgroundColor: '#1976d2', height: { xs: '60px', sm: '80px' } }}>
      <Toolbar sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
        backgroundColor: '#1976d2',
        color: '#fff',
        gap: { xs: 0.5, sm: 1 },
        padding: { xs: 0.5, sm: 1 },
        minWidth: 'unset',
        maxWidth: '100%'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AssignmentIcon sx={{ color: '#fff', fontSize: { xs: '1rem', sm: '2rem' } }} />
          <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' }, color: '#fff' }}>{subjectName}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: '4px', sm: '8px' }, flexWrap: 'wrap', maxWidth: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <TimerIcon sx={{ color: '#fff', fontSize: { xs: '0.9rem', sm: '1.25rem' } }} />
            <Timer />
          </Box>
          {getIcon()}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <PersonIcon sx={{ color: '#fff', fontSize: { xs: '0.9rem', sm: '1.5rem' } }} />
            <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>KASHISH MUKHEJA</Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;