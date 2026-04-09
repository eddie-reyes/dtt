import styles from "./PracticeSessionPage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PracticeSession() {
  const [showPatientChart, setShowPatientChart] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});

  useEffect(() => {
    const initSession = async () => {
      const response = await fetch(
        "https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: "admin", patient_id: "1" }),
        },
      );

      const data = await response.json();
      console.log(data);
      setSessionInfo(data);
    };

    console.log("Initializing session...");
    initSession();
  }, []);

  const onSubmitMessage = async (message) => {
    setMessages([...messages, message]);

    const response = await fetch(
      `https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/${sessionInfo.session_id}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      },
    );

    const data = await response.json();
    console.log("Received response:", data);
    setMessages([...messages, message, data.Patient]);
  };

  return (
    <div className={`container-fluid ${styles.practicePage}`}>
      <div className={styles.leftPanel}>
        <h2>How to start:</h2>
        {/* Placeholder for Diagnosis */}
        <h5>1. Review the Patient Chart</h5>
        <h5>2. Ask the patient about symptoms </h5>
        <h5>3. Use notes to track key information</h5>{" "}
        <h5>4. Select the most accurate diagnosis </h5>
        <button className={`btn ${styles.mainButtonPrimary}`}>
          Make a Diagnosis
        </button>
      </div>

      <div className="col-md-4">
        <div className={`${styles.middlePanel} h-100 p-4`}>
          <div className={styles.middlePanel}>
            {/* Logo */}
            <div className={`text-center ${styles.logoWrapper}`}>
              <img
                src="src/assets/logo.png"
                alt="logo"
                className={styles.logo}
              />
            </div>

            {/* Timer - PlaceHolder at the moment */}
            <h2 className={`text-center mb-4 ${styles.timer}`}>
              Timer 00:00:00
            </h2>
            {/* Buttons */}
            <div className="d-flex flex-column align-items-center gap-5">
              <Link to="/menu" className={`btn ${styles.mainButton}`}>
                Back to Menu
              </Link>
              <button
                className={`btn ${styles.mainButton}`}
                onClick={() => setShowPatientChart(true)}
              >
                View Patient Chart
              </button>
              <button className={`btn ${styles.mainButton}`}>Notes</button>
              {/* <button className={`btn ${styles.mainButtonPrimary}`}>
                  Make a Diagnosis
                </button> */}
            </div>
          </div>
        </div>
      </div>

      {showPatientChart && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <button
              className={styles.closeButton}
              onClick={() => setShowPatientChart(false)}
            >
              X
            </button>

            <h2>Patient Chart</h2>
            <p>
              <strong>Name:</strong> John Doe
            </p>
            <p>
              <strong>Age:</strong> 27
            </p>
            <p>
              <strong>Sex:</strong> Male
            </p>
            <p>
              <strong>Height:</strong> 6'7
            </p>
            <p>
              <strong>Weight:</strong> 274.29 lbs
            </p>
            <p>
              <strong>Blood Type:</strong> O-
            </p>
            <p>
              <strong>Allergies:</strong> Nuts, Dust, Milk, Dogs
            </p>
            <p>
              <strong>Medications:</strong> Albuterol, Lisinopril, Tylenol
            </p>
          </div>
        </div>
      )}

      <div className="col-md-4">
        <div className={`${styles.rightPanel} h-100 p-4`}>
          <ul className="list-group list-group-flush">
            {messages.map((message, index) =>
              index % 2 === 0 ? (
                <li key={index} className="list-group-item m-3 w-50 rounded">
                  <span>
                    <strong>You:</strong> {message}
                  </span>
                </li>
              ) : (
                <li
                  key={index}
                  className="list-group-item m-3 w-50 rounded align-self-end"
                >
                  <span>
                    <strong>Patient:</strong> {message}
                  </span>
                </li>
              ),
            )}
          </ul>
          <div className={`${styles.inputWrapper} input-group mb-3`}>
            <input
              type="text"
              className="form-control"
              placeholder="Message"
            ></input>
            <div className="input-group-append">
              <button
                className="input-group-text"
                id="basic-addon2"
                onClick={() =>
                  onSubmitMessage(document.querySelector(".form-control").value)
                }
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
