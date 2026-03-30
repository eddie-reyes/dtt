import data from "./data/patients.json";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./History.module.css";
import "../scss/styles.scss";

export default function history() {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-secondary">
            <div className="w-75">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <button className="btn btn-success">
                        <Link className="text-white" to="/menu">
                            ← Back
                        </Link>
                    </button>
                    <h1>History</h1>
                    <img src={logo} alt="logo" style={{ width: '52px' }}></img>
                </div>

                <div className="p-4 border border-info rounded-4 bg-light">
                    <ul className="list-group">
                        {data.map((patient) => (
                            <li key={patient.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Patient: {patient.name}</span>
                                <Link to={`/details/${patient.id}`} state={{ patient }} className="btn btn-primary">
                                    Show Details
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
