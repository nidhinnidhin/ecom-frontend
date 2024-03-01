import styles from "@/styles/Address.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CustomSnackbar from "../pages/customSnackbar";
import RegisterPopUp from "../components/register-popup";

export default function EditAccount() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      axios
        .get(`http://localhost:8000/account/account-detail/`, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("access_token"),
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setUserName(res.data.userName);
        });
    }
  }, []);

  const editAccount = () => {
    let datas = {
      firstName: firstName,
      lastName: lastName,
      userName: userName,
    };
    axios
      .put(`http://localhost:8000/account/account-edit/`, datas, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("access_token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("edited");
        setSnackbarSeverity("success");
        setSnackbarMessage("Account edited successfully.");
        setSnackbarOpen(true);
        router.push("/");
      })
      .catch((err) => {
        console.log(err.response);
        setSnackbarSeverity("error");
        setSnackbarMessage("Error occurred.");
        setSnackbarOpen(true);
      });
  };

  return (
    <div className={styles.container}>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
      <div className={styles.wrapper}>
        <div className={styles.titlewrapper}>
          <span className={styles.title}>Your account</span>
        </div>
        <form>
          <div class="input-group mb-3">
            <label className={styles.label}>
              First name
              <input
                type="text"
                class="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </label>
          </div>
          <div class="input-group mb-3">
            <label className={styles.label}>
              Last name
              <input
                type="text"
                class="form-control"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </label>
          </div>
          <div class="input-group mb-3">
            <label className={styles.label}>
              User name
              <input
                type="text"
                class="form-control"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </label>
          </div>
          <div className={styles.btn}>
            <button type="button" class="btn btn-primary" onClick={editAccount}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
