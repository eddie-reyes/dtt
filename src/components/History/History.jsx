import data from "./data/patients.json";
import { Link } from "react-router-dom";
import styles from "./History.module.css";

export default function history() {
    return (
    <div className={styles.body}>
        <div className={styles.exit}>
            <Link to="/menu" className={styles.backButton}>
                ← Back
            </Link>
        </div>

        <div className={styles.title}> 
            <h1>History</h1>
        </div>

        <div className={styles.content}>
            <ul className={styles.list}>
                {data.map((patient) => (
                    console.log(patient),
                    console.log(typeof patient),
                    <li key={patient.id}>
                        <div>
                            <p>Patient: {patient.name}: {patient.correct ? "Correct" : "Incorrect"} Diagnosis</p>
                            <Link to={`/details/${patient.id}`} state={{ patient }}>
                                Show Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
    )
}
