import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import illustration from '../assets/heroImg2.png'; // Adjust the path based on your project structure

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100vh',
  minHeight: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  maxWidth: '1200px',
  margin: '0 auto',
  gap: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '50%',
  [theme.breakpoints.down('md')]: {
    flex: 'none',
    width: '100%',
    maxWidth: '300px',
  },
}));

const LoginBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '350px',
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(3),
  display: 'flex',
  marginLeft:'120px',
  maxHeight:'450px',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
    padding: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
  '& .MuiInputBase-input': {
    background: '#fff',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '48px',
  margin: theme.spacing(1, 0),
  backgroundColor: '#1976d2',
  color: '#fff',
  fontSize: '1em',
  fontWeight: 'bold',
  borderRadius: '8px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const GoogleButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  width: '100%',
  backgroundColor: '#fff',
  color: '#757575',
  fontSize: '1rem',
  fontWeight: 'bold',
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  margin: theme.spacing(1, 0),
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(1px)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
  },
}));

const ForgotPasswordButton = styled(Button)(({ theme }) => ({
  color: '#1976d2',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '14px',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontWeight: 'bold',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#1565c0',
  },
}));

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // Handle Login Form Change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    toast.success("Successfully Logged In");
    localStorage.setItem("token", "mock-token");

    // Define test start time: 5:00 PM IST on April 30, 2025
    const testStartTime = new Date("2025-04-30T21:00:00").getTime();
    const currentTime = new Date().getTime();

    // Compare current time with test start time
    if (currentTime < testStartTime) {
      // Redirect to waiting page if before 5:00 PM
      setTimeout(() => {
        navigate("/waiting");
      }, 1500);
    } else {
      // Redirect to exam page if at or after 5:00 PM
      setTimeout(() => {
        navigate("/exam");
      }, 1500);
    }

    setLoginData({ email: "", password: "" });
  };

  // Forgot Password Flow Handlers
  const openForgotPassword = () => {
    setShowForgotPassword(true);
    setForgotPasswordStep(1);
  };

  const closeForgotPassword = () => {
    setShowForgotPassword(false);
    setEmail("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  const handleNextStep = () => {
    if (forgotPasswordStep === 1 && email) {
      setForgotPasswordStep(2);
    }
  };

  const handleResetPassword = () => {
    if (newPassword === confirmNewPassword) {
      toast.success("Password reset successfully! (Simulation)");
      closeForgotPassword();
    } else {
      toast.error("Passwords do not match.");
    }
  };

  const LoginWithGoogle = () => {
    toast.info("Google Login is disabled in frontend-only mode");
  };

  return (
    <>
      <MainContainer>
        {/* Assignment Icon in Top-Left Corner */}
        <IconButton
          sx={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            color: '#1976d2',
          }}
        >
          <AssignmentIcon fontSize="large" />
        </IconButton>

        {/* Left Side: Illustration */}
        <IllustrationContainer>
          <img
            src={illustration}
            alt="Login Illustration"
            style={{
              maxWidth: '750px',
              height: '500px',
              maxHeight: '600px',
            }}
          />
        </IllustrationContainer>

        {/* Right Side: Login Box */}
        <LoginBox>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
            Login
          </Typography>
          <form onSubmit={handleLoginSubmit} style={{ width: '100%' }}>
            <StyledTextField
              variant="outlined"
              name="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <StyledTextField
              variant="outlined"
              name="password"
              placeholder="Password"
              type="password"
              required
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <StyledButton type="submit">Login</StyledButton>
            {/* <ForgotPasswordButton onClick={openForgotPassword}>
              Forgot Password?
            </ForgotPasswordButton> */}
          </form>
        </LoginBox>
      </MainContainer>

      <Typography
        variant="body2"
        sx={{
          textAlign: 'center',
          padding: '10px',
          color: '#666',
          fontStyle: 'italic',
          fontSize: '1.6em',
          position: 'absolute',
          bottom: '10px',
          width: '100%',
        }}
      >
        "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
      </Typography>

      <Dialog open={showForgotPassword} onClose={closeForgotPassword} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '22px', color: '#333' }}>
          {forgotPasswordStep === 1 && "Enter Your Email"}
          {forgotPasswordStep === 2 && "Reset Password"}
          <IconButton
            aria-label="close"
            onClick={closeForgotPassword}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {forgotPasswordStep === 1 && (
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          {forgotPasswordStep === 2 && (
            <>
              <TextField
                margin="dense"
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                label="Confirm New Password"
                type="password"
                fullWidth
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          {forgotPasswordStep === 1 && (
            <Button onClick={handleNextStep} variant="contained" color="primary">
              Next
            </Button>
          )}
          {forgotPasswordStep === 2 && (
            <Button onClick={handleResetPassword} variant="contained" color="primary">
              Reset Password
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" autoClose={1000} hideProgressBar={false} />
    </>
  );
}