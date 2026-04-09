import styles from "./PracticeSessionPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PracticeSession() {
  const [showPatientChart, setShowPatientChart] = useState(false);

  return (
    <div className={`container-fluid ${styles.practicePage}`}>
      <div className={styles.leftPanel}>
        <h1>Left Section</h1>
        <h2>Diagnosis ...</h2>
        {/* Placeholder for Diagnosis */}
        <h5>Covid</h5>
        <h5>Flu</h5>
        <h5>Angina</h5>
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
              <button className={`btn ${styles.mainButtonPrimary}`}>
                Make a Diagnosis
              </button>
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
          <div className={styles.chatArea}></div>
          {/* <h1>Right Section</h1> */}
          {/* Placeholders for Chat */}
          {/* <div>Hello, John. How do you feel?</div>
            <div>Hello Doctor, I don't feel very well today...</div> */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={`form-control ${styles.chatInput}`}
              placeholder="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
