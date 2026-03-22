import { Link } from "react-router-dom";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

export default function details() {
    const location = useLocation();
    const { patient } = location.state || {};

    return (
        <div className={styles.body}>
            <div className={styles.exit}>
            <Link to="/history" className={styles.backButton}>
                ← Back
            </Link>
        </div>

        <div className={styles.title}> 
            <h1>History</h1>
        </div>

        <div className={styles.content}>
            <div className={styles.diagnosis}>
                <h2>{patient.correct ? "Correct" : "Incorrect"} Diagnosis</h2>
            </div>

            <div className={styles.details}>
                <h3>{patient.details}</h3>
            </div>

            <div className={styles.details}>
                <p>Diagnosis Time: {patient.timeElapsed}</p>
            </div>
        </div>
        
        </div>
    )
}