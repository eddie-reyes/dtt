import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./History.module.css";
import "../scss/styles.scss";

export default function history() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    "https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions",
                    {
                        method: "GET",
                        headers: {
                            "accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                const result = await response.json();
                setSessions(result.sessions || []);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 fixed-top ${styles.background}`}>
            <div className="w-75">
                <div className="d-flex justify-content-between align-items-center fixed-top p-3 mb-3">
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
                        {sessions.map((session) => (
                            <li key={session.session_id} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>Patient: {session.patient_name}</span>
                                <Link to={`/details/${session.session_id}`} state={{ session }} className="btn btn-primary">
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
