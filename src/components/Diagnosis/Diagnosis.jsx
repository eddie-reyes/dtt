// import { useEffect, useState } from "react";
import { useState } from "react";
import styles from "../PracticeSession/PracticeSessionPage.module.css";

const diagnoses = ["Flu", "Covid", "Angina", "Pneumonia", "Healthy"]

export default function Diagnosis({ onClose }) {
	const [mode, setMode] = useState(null);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {/* <button onclick={onClose}>Close</button> */}
        {!mode && (
          <>
            <h2>How would you like to make a diagnosis?</h2>
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                className="btn btn-outline-primary px-4 py-2"
                onClick={() => setMode("myself")}
              >
                Myself
              </button>
              <button
                className="btn btn-outline-primary px-4 py-2"
                onClick={() => setMode("options")}
              >
                Options
              </button>
            </div>
          </>
        )}

        {mode === "myself" && (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              X
            </button>
            <h2>Select Diagnosis</h2>
            <select className="form-select mt-4">
              <option value="">Choose option ...</option>

              {diagnoses.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </>
        )}
        {mode === "options" && (
          <>
            <button className={styles.closeButton} onClick={onClose}>
              X
            </button>
            <h2>Choose Diagnosis</h2>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
              {diagnoses.slice(0, 4).map((d) => (
                <button key={d} className="btn btn-outline-primary px-4 py-2">
                  {d}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
