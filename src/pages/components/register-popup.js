import { useEffect, useState } from "react";
import styles from "@/styles/RegisterPopUp.module.css";
import { useRouter } from "next/router";

export default function RegisterPopUp() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      console.log("Access Token:", accessToken);
      setAccessToken(accessToken);
    }
  }, []);
  const register = () => {
    router.push("/register");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {accessToken ? (
          <span className={styles.welcome}>Welcome, user</span>
        ) : (
          <div className={styles.btnWrapper}>
            <p>You dont have account, you can create by clicking register button</p>
            <button className={styles.registerBtn} onClick={register}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
