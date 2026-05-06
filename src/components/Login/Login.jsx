// src/components/Login/Login.jsx

import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import LoginForm from "./LoginForm.jsx";
import styles from "./Login.module.css";
import "../scss/styles.scss";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleCredentialResponse = useCallback((response) => {
    const idToken = response.credential;
    const [, payloadBase64] = idToken.split(".");
    const payload = JSON.parse(atob(payloadBase64));

    localStorage.setItem("user", JSON.stringify({
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    }));

    navigate("/menu");
  }, [navigate]);

  useEffect(() => {
    const existingScript = document.getElementById("google-gis-script");

    const initializeGoogle = () => {
      if (!window.google || !googleButtonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: 300,
        text: "signin_with",
        shape: "rectangular",
      });
    };

    if (existingScript) {
      initializeGoogle();
    } else {
      const script = document.createElement("script");
      script.id = "google-gis-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      document.body.appendChild(script);
    }
  }, [handleGoogleCredentialResponse]);

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.pageBackground}`}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h1 className={styles.title}>Diagnostic Training Tool</h1>
        </div>

        <LoginForm />

        <div className={styles.divider}>
          <span>or</span>
        </div>

        <div ref={googleButtonRef} className="d-flex justify-content-center" />
      </div>
    </div>
  );
}
