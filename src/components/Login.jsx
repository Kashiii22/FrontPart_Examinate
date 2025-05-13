import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, IconButton } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import illustration from '../assets/heroImg2.png';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  height: '100vh',
  minHeight: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  maxWidth: { xs: '100%', sm: '800px', md: '1200px' },
  margin: '0 auto',
  gap: theme.spacing(2),
  position: 'relative',
}));

const IllustrationContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: { xs: '100%', md: '50%' },
  padding: { xs: theme.spacing(2), md: 0 },
}));

const LoginBox = styled(Box)(({ theme }) => ({
  width: '25%',
  maxWidth: { xs: '40%', sm: '200px' },
  backgroundColor: '#fff',
  borderRadius: '15px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  padding: '10px',
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  marginRight: '200px',
  alignItems: 'center',
  height: '400px',
  maxHeight: { xs: 'auto', sm: '550px' },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '80%',
  margin: theme.spacing(2, 0),
  '& .MuiInputBase-input': {
    background: '#fff',
    padding: { xs: theme.spacing(1), sm: theme.spacing(1.5) },
    borderRadius: '8px',
    fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
  width: '40%',
  height: { xs: '40px', sm: '58px' },
  margin: theme.spacing(1, 0),
  backgroundColor: '#1976d2',
  color: '#fff',
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
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
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
  fontWeight: 'bold',
  border: '1px solid #d9d9d9',
  borderRadius: '8px',
  padding: { xs: theme.spacing(1), sm: theme.spacing(1.5) },
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
  fontSize: { xs: '12px', sm: '14px' },
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
    passcode: "",
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    // For passcode, ensure only digits are entered and limit to 6 characters
    if (name === "passcode") {
      const digitsOnly = value.replace(/[^0-9]/g, '');
      setLoginData({ ...loginData, [name]: digitsOnly.slice(0, 6) });
    } else {
      setLoginData({ ...loginData, [name]: value });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validate passcode: must be exactly 6 digits
    const passcodeRegex = /^\d{6}$/;
    if (!passcodeRegex.test(loginData.passcode)) {
      toast.error("Passcode must be a 6-digit number.");
      return;
    }

    toast.success("Successfully Logged In");
    localStorage.setItem("token", "mock-token");

    const testStartTime = new Date("2025-05-01T10:00:00").getTime();
    const currentTime = new Date().getTime();

    if (currentTime < testStartTime) {
      setTimeout(() => {
        navigate("/waiting");
      }, 1500);
    } else {
      setTimeout(() => {
        navigate("/exam");
      }, 1500);
    }

    setLoginData({ email: "", password: "", passcode: "" });
  };

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
            top: { xs: '8px', sm: '16px' },
            left: { xs: '8px', sm: '16px' },
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
              maxWidth: { xs: '100%', sm: '500px', md: '750px' },
              height: 'auto',
              maxHeight: { xs: '300px', sm: '400px', md: '500px' },
            }}
          />
        </IllustrationContainer>

        {/* Right Side: Login Box */}
        <LoginBox>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 3, 
              fontWeight: 'bold', 
              color: '#333',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
              textAlign: 'center',
            }}
          >
            Login
          </Typography>
          <form onSubmit={handleLoginSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
            <StyledTextField
              variant="outlined"
              name="passcode"
              placeholder="Passcode"
              type="text"
              required
              value={loginData.passcode}
              onChange={handleLoginChange}
              inputProps={{ maxLength: 6 }} // Limit input to 6 characters
              // helperText="Enter a 6-digit passcode"
            />
            <StyledButton type="submit">Login</StyledButton>
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
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem' },
          position: 'absolute',
          bottom: { xs: '5px', sm: '10px' },
          width: '100%',
        }}
      >
        "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
      </Typography>

      <Dialog open={showForgotPassword} onClose={closeForgotPassword} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontSize: { xs: '18px', sm: '22px' },
          color: '#333' 
        }}>
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