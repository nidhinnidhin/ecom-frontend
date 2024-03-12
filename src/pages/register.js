import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "@/styles/Register.module.css";
import image from "../static/images/registerimage.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import CustomSnackbar from "./customSnackbar";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Click Shop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => setShowPassword(false), 1000);
  };

  const router = useRouter();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "userName":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!userName.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      const datas = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        password: password,
        confirmpassword: confirmPassword,
      };

      axios
        .post("http://13.235.209.32/account/register/", datas, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setSuccess(true);
          console.log(res.data);
          const data = {
            username: userName,
            password: password,
          };
          axios
            .post("http://13.235.209.32/api/login/", data)
            .then((res) => {
              console.log("token");
              console.log(res.data.access);
              localStorage.setItem("access_token", res.data.access);
              localStorage.setItem("refresh_token", res.data.refresh);
              setSnackbarSeverity("success");
              setSnackbarMessage("Register successful!");
              setSnackbarOpen(true);
            })
            .then(() => {
              router.push("/");
            });
        })
        .catch((error) => {
          setLoading(false);
          console.log(error.response);
          setSnackbarSeverity("error");
          setSnackbarMessage("Error occurred during the register.");
          setSnackbarOpen(true);
        });
      console.log("Form submitted");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <Container className={styles.container} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <span style={{ color: "red" }}>{errors.firstName}</span>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <span style={{ color: "red" }}>{errors.lastName}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User name"
                  name="userName"
                  autoComplete="userName"
                  value={userName}
                  onChange={handleChange}
                />
                {errors.userName && (
                  <span style={{ color: "red" }}>{errors.userName}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: password && (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilitySharpIcon />
                        ) : (
                          <VisibilityOffSharpIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span style={{ color: "red" }}>{errors.confirmPassword}</span>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading && 'Registering...' || success && 'Registered' || loading == false && 'Sign up'}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
