import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

export default function details() {
    const location = useLocation();
    const { session } = location.state || {};

    if (!session) {
        return <div>No session data available</div>;
    }
    

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 ${styles.background}`}>
            <div className="w-75">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-success">
                        <Link className="text-white" to="/history">
                            ← Back
                        </Link>
                    </button>
                    <h1>Session Details</h1>
                    <img src={logo} alt="logo" style={{ width: '52px' }}></img>
                </div>

                <div className="p-4 border border-info rounded-4 bg-light">
                    <h2>{session.correctness ? "Correct" : "Incorrect"} Diagnosis</h2>
                    <p>Patient: {session.patient_name}</p>
                    <p>Notes: {session.notes || "No notes"}</p>
                    <p>Diagnosis Time: {session.duration_seconds ? `${session.duration_seconds} seconds` : "N/A"}</p>
                    <p>Created At: {new Date(session.created_at).toLocaleString()}</p>
                </div>
            </div>

        </div>
    )
}