import styles from "@/styles/Register.module.css";
import Link from "next/link";
import image from "../static/images/registerimage.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const submitForm = () => {
    const datas = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
    };

    axios
      .post("http://localhost:8000/account/register/", datas, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(res => {
        console.log(res.data)
        const data = {
          username: userName,
          password: password,
        };
        axios.post("http://localhost:8000/api/login/", data).then(res => {
          console.log("token")
          console.log(res.data.access);
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);
          router.push("/");
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Image
            className={styles.image}
            src={image}
            alt="image"
            width={300}
            height={300}
          />
          <Link href="/login" className={styles.link}>
            I am already member
          </Link>
        </div>
        <div className={styles.right}>
          <h2>Register</h2>
          <form>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="email"
                placeholder="eg@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                placeholder="Re enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              className={styles.btn}
              variant="contained"
              onClick={submitForm}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
