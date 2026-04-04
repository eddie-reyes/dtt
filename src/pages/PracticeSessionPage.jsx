import styles from "./PracticeSessionPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PracticeSession() {
  const [showPatientChart, setShowPatientChart] = useState(false);

  return (
    <div className={styles.practicePage}>
      <div className={styles.leftPanel}>
        <h1>Left Section</h1>
        <h2>Diagnosis ...</h2>
        {/* Placeholder for Diagnosis */}
        <h5>Covid</h5>
        <h5>Flu</h5>
        <h5>Angina</h5>
</div>
        <div className={styles.middlePanel}>
          <h1>Middle Section</h1>
          {/* Timer-PlaceHolder at the moment */}
          <h2>Timer 00:00:00</h2>
          <Link to="/menu">
            <button>Back to Menu</button>
          </Link>

          <button onClick={() => setShowPatientChart(true)}>
            View Patient Chart
          </button>
          <button>Notes</button>
          <button>Make a Diagnosis</button>
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
      <p><strong>Name:</strong> John Doe</p>
      <p><strong>Age:</strong> 27</p>
      <p><strong>Sex:</strong> Male</p>
      <p><strong>Height:</strong> 6'7</p>
      <p><strong>Weight:</strong> 274.29 lbs</p>
      <p><strong>Blood Type:</strong> O-</p>
      <p><strong>Allergies:</strong> Nuts, Dust, Milk, Dogs</p>
      <p><strong>Medications:</strong> Albuterol, Lisinopril, Tylenol</p>
    </div>
  </div>
)}

        <div className={styles.rightPanel}>
          <h1>Right Section</h1>
          {/* Placeholders for Chat */}
          <div>Hello, John. How do you feel?</div>
          <div>Hello Doctor, I don't feel very well today...</div>
        </div>
      

      {/* {showPatientChart && (
			<div>
				<h3>Chart</h3>

			</div>
			)} */}
    </div>
  );
}
