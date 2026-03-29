import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

export default function details() {
    const location = useLocation();
    const { patient } = location.state || {};

    return (
        <div className="grid text-center">
            <div className="row">
                <div className="col">
                    <button className="btn btn-success">
                        <Link to="/menu">
                            ← Back
                        </Link>
                    </button>
                </div>
            
                <div className="col">
                    <h1>History</h1>
                </div>
            
                <div className="col">
                    <img src={logo} alt="logo" className="w-25"></img>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h2>{patient.correct ? "Correct" : "Incorrect"} Diagnosis</h2>
                    <h3>{patient.details}</h3>
                    <p>Diagnosis Time: {patient.timeElapsed}</p>
                </div>
            </div>
        </div>
        // <div className={styles.body}>
        //     <div className={styles.exit}>
        //     <Link to="/history" className={styles.backButton}>
        //         ← Back
        //     </Link>
        // </div>

        // <div className={styles.title}> 
        //     <h1>History</h1>
        // </div>

        // <div className={styles.content}>
        //     <div className={styles.diagnosis}>
        //         <h2>{patient.correct ? "Correct" : "Incorrect"} Diagnosis</h2>
        //     </div>

        //     <div className={styles.details}>
        //         <h3>{patient.details}</h3>
        //     </div>

        //     <div className={styles.details}>
        //         <p>Diagnosis Time: {patient.timeElapsed}</p>
        //     </div>
        // </div>
        
        // </div>
    )
}