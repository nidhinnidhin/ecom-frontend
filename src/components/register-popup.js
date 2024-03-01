import { useEffect, useState } from "react";
import styles from "@/styles/RegisterPopUp.module.css";
import { useRouter } from "next/router";
import axios from 'axios'

export default function RegisterPopUp() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      console.log("Access Token:", accessToken);
      setAccessToken(accessToken);
        axios
          .get(`http://localhost:8000/account/account-detail/`, {
            headers: {
              Authorization: `Bearer ` + localStorage.getItem("access_token"),
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            setUserName(res.data.userName);
          });
    }
  }, []);
  const register = () => {
    router.push("/register");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {accessToken ? (
          <span className={styles.welcome}>Welcome, {userName}</span>
        ) : (
          <div className={styles.btnWrapper}>
            <p className={styles.popUpText}>You dont have account, you can create by clicking register button</p>
            <button className={styles.registerBtn} onClick={register}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
