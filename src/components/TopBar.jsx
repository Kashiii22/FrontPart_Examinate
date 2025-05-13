import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setFontSize } from '../redux/quizSlice.js'; // Import setFontSize action
import { AppBar, Toolbar, Typography, Box, Button, Popover, Grid, Chip, Slider } from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';
import PersonIcon from '@mui/icons-material/Person';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
import PublicIcon from '@mui/icons-material/Public';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Timer from "./Timer";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

const TopBar = () => {
  const dispatch = useDispatch();
  const { subjectName, questions = [], questionStatus, fontSize } = useSelector((state) => state.quiz); // Access state from Redux

  const [signalStrength, setSignalStrength] = useState("unknown");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [anchorEl, setAnchorEl] = useState(null);
  const [batteryStatus, setBatteryStatus] = useState(null);

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
    window.addEventListener("offline", handleOnlineStatus); // Fixed: Should be "addEventListener"

    updateConnectionStatus();

    const updateBatteryStatus = async () => {
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        setBatteryStatus(battery.level);
        battery.onlevelchange = () => setBatteryStatus(battery.level);
      }
    };
    updateBatteryStatus();

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
      return <PublicIcon sx={{ color: "gray", fontSize: { xs: '1.2rem', sm: '1.8rem' } }} title="No Internet" />;
    }
    return (
      <SignalWifi4BarIcon
        sx={{
          color: signalStrength === "poor" ? "#ff4444" : signalStrength === "strong" ? "#00cc00" : "#757575",
          fontSize: { xs: '1.2rem', sm: '1.8rem' }
        }}
        title={signalStrength === "poor" ? "Poor" : signalStrength === "strong" ? "Strong" : "Unknown"}
      />
    );
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getColor = (status) => {
    switch (status) {
      case "completed":
        return "success.main";
      case "review":
        return "warning.main";
      case "unattempted":
      default:
        return "grey.400";
    }
  };

  // Calculate solved questions
  const solvedCount = questions.reduce((count, q) => {
    return questionStatus[q.id] === 'completed' ? count + 1 : count;
  }, 0);
  const totalCount = questions.length;

  const handleFontSizeChange = (e, newValue) => {
    dispatch(setFontSize(newValue)); // Dispatch setFontSize action
  };

  return (
    <>
      <AppBar position="static" sx={{ background: 'linear-gradient(to right,#1565c0, #42a5f5)', boxShadow: 'none' }}>
        <Toolbar sx={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          paddingX: 3,
          paddingY: { xs: 1.5, sm: 1.5 },
          gap: { xs: 1.5, sm: 2.5 },
          alignItems: 'center',
        }}>
          {/* Left Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AssignmentIcon sx={{ fontSize: { xs: 24, sm: 30 } }} />
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.5rem' }, fontWeight: 600 }}>
              {subjectName || "Quiz"} {/* Fallback if subjectName is not set */}
            </Typography>
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 }, flexWrap: 'wrap' }}>
            {/* Battery */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <BatteryFullIcon sx={{ fontSize: { xs: 18, sm: 24 }, color: batteryStatus !== null && batteryStatus < 0.2 ? 'red' : '#00cc00' }} />
              <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' }, fontWeight: 500 }}>
                {batteryStatus !== null ? `${Math.round(batteryStatus * 100)}%` : "N/A"}
              </Typography>
            </Box>

            {/* WiFi Icon */}
            {getIcon()}

            {/* Question Stats Button */}
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<QueryStatsIcon />}
              onClick={handlePopoverOpen}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.7rem', sm: '0.9rem' },
                borderColor: '#ffffff',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Question Stats
            </Button>

            {/* Timer */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <TimerIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              <Timer />
            </Box>

            {/* Font Size Slider */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>
                Font Size
              </Typography>
              <Slider
                value={fontSize}
                min={12}
                max={24}
                onChange={handleFontSizeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}px`}
                sx={{
                  width: 150,
                  color: "#00796b",
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#004d40',
                    '&:hover': {
                      backgroundColor: '#00332a',
                    },
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#00796b',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#b2dfdb',
                  },
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: '#004d40',
                    color: 'white',
                  },
                }}
              />
            </Box>

            {/* User Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
              <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 500 }}>
                KASHISH MUKHEJA
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { p: 2, width: 300, borderRadius: '8px' }
        }}
      >
        {/* Solved/Total Count */}
        <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, mb: 2, color: '#1976d2' }}>
          Solved: {solvedCount}/{totalCount}
        </Typography>

        {/* Legend */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-around' }}>
          <Chip icon={<CheckCircleIcon color="success" />} label="Solved" />
          <Chip icon={<RadioButtonUncheckedIcon />} label="Not Visited" />
          <Chip icon={<BookmarkIcon color="warning" />} label="Marked" />
        </Box>

        {/* Questions */}
        <Grid container spacing={1}>
          {questions.map((q, index) => (
            <Grid item xs={2} key={q.id || index}>
              <Box sx={{
                bgcolor: getColor(questionStatus[q.id]),
                color: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                padding: '6px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>
                {index + 1}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Popover>
    </>
  );
};

export default TopBar;