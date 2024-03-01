import styles from "@/styles/Forget-pass.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CustomSnackbar from "./customSnackbar";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [step, setStep] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const router = useRouter();

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };
  const resetPassword = () => {
    axios
      .post(`http://localhost:8000/account/reset-password/`, {
        otp: otp,
        email: email,
        password1: password,
        password2: confirmpassword,
      })
      .then((res) => {
        router.push("/login");
        setSnackbarSeverity("success");
        setSnackbarMessage("Password changed successfully");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error occured");
        setSnackbarOpen(true);
      });
  };

  const generateOtp = () => {
    axios
      .post(`http://localhost:8000/account/generate-otp/`, {
        email: email,
      })
      .then((res) => {
        setStep(2);
        setSnackbarSeverity("success");
        setSnackbarMessage("Otp send to your email");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage("Email does not exist");
        setSnackbarOpen(true);
      });
  };
  const resendOtp = () => {
    axios
      .post(`http://localhost:8000/account/generate-otp/`, {
        email: email,
      })
      .then((res) => {
        setStep(2);
        setSnackbarSeverity("success");
        setSnackbarMessage("New otp send to your email");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSnackbarSeverity("error");
        setSnackbarMessage("Email does not exist");
        setSnackbarOpen(true);
      });
  }

  return (
    <div className={styles.container}>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <div className={styles.wrapper}>
        {step === 1 ? (
          <form onSubmit={submitForm}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="emailHelp" class="form-text">
                We l never share your email with anyone else.
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={generateOtp}
              >
                Send OTP
              </button>
            </div>
            
          </form>
        ) : (
          <form onSubmit={submitForm}>
            <div class="mb-3">
              <label for="otp" class="form-label">
                OTP
              </label>
              <input
                type="text"
                class="form-control"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password
              </label>
              <input
                type="text"
                class="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="confirm_password" class="form-label">
                Confirm password
              </label>
              <input
                type="text"
                class="form-control"
                id="confirm_password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
            <div class="d-flex justify-content-center">
              <button
                onClick={resetPassword}
                type="submit"
                class="btn btn-primary"
              >
                Submit
              </button>
            </div>
              <div class="d-flex justify-content-end mt-2">
              <button class="btn btn-primary" onClick={resendOtp}>Resend otp</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
