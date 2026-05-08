// src/pages/Login/Login.jsx

import { useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import LoginForm from "./LoginForm.jsx"
import styles from "./Login.module.css";
import "../scss/styles.scss";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
// For Create React App use: process.env.REACT_APP_GOOGLE_CLIENT_ID

export default function Login() {
  const googleButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleGoogleCredentialResponse = useCallback((response) => {
    const idToken = response.credential; // signed JWT from Google

    // Decode the JWT payload to read user info (no verification — Option A)
    const [, payloadBase64] = idToken.split(".");
    const payload = JSON.parse(atob(payloadBase64));

    console.log("Google user info:", {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      googleId: payload.sub,
    });

    // Store whatever you need in localStorage or app state
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
    <div
      className={`d-flex justify-content-center align-items-center vh-100 ${styles.pageBackground}`}
    >
      <div className="w-50">
        <span className="position-absolute top-0 start-50 translate-middle-x mt-5 d-flex align-items-center">
          <img src={logo} alt="logo" style={{ width: "128px" }} />
          <h1 className="d-inline-block ms-3">iagnostic Training Tool</h1>
        </span>

        <div className="d-flex flex-column align-items-center gap-3 mt-4">
          {/* Username and password is 'admin' */}
          <LoginForm></LoginForm>
          {/* Official Google Sign-In button */}

			 {/* !!!!!! */}
          {/* <div ref={googleButtonRef} /> */}
			 {/* !!!!!!!! */}

          {/* Temporary nav buttons */}
          {/* <button className="btn btn-primary w-50">
            <Link className="text-white" to="/menu">
              Open the Menu
            </Link>
          </button> */}
          <button className="btn btn-primary w-50">
            <Link className="text-white" to="/">
              ← Back to the Main Page
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}