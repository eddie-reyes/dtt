import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

export default function details() {
    const location = useLocation();
    const { patient } = location.state || {};

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.background}`}>
            <div className="w-75">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-success">
                        <Link className="text-white" to="/history">
                            ← Back
                        </Link>
                    </button>
                    <h1>History</h1>
                    <img src={logo} alt="logo" style={{ width: '52px' }}></img>
                </div>

                <div className="p-4 border border-info rounded-4 bg-light">
                    <h2>{patient.correct ? "Correct" : "Incorrect"} Diagnosis</h2>
                    <h3>{patient.details}</h3>
                    <p>Diagnosis Time: {patient.timeElapsed}</p>
                </div>
            </div>

        </div>
    )
}