import styles from "@/styles/Login.module.css";
import Link from "next/link";
import image from "../static/images/registerimage.png";
import Image from "next/image";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [userName, setUserName] = useState('') 
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  const submitData = () => {
    const data = {
      "username":userName,
      "password":password
    }
    axios.post("http://localhost:8000/api/login/",data)
        .then(res=>{
            console.log(res.data)
            localStorage.setItem("access_token",res.data.access)
            localStorage.setItem("refresh_token",res.data.refresh)
            router.push("/")
        })
        .catch(err=>{
            console.log(err.response)
        })
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.right}>
          <h2>Log in</h2>
          <form>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Username"
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="password"
                value={confirmPassword}
                placeholder="Re enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button className={styles.btn} variant="contained" onClick={submitData}>
              Login
            </Button>
          </form>
        </div>
        <div className={styles.left}>
          <Image
            className={styles.image}
            src={image}
            alt="image"
            width={300}
            height={300}
          />
          <Link href="/register" className={styles.link}>
            Not have acount
          </Link>
        </div>
      </div>
    </div>
  );
}
