import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./Details.module.css";
import { useLocation } from "react-router-dom";

export default function details() {
    const location = useLocation();
    const [viewTranscript, setViewTranscript] = useState(false);
    const { session } = location.state || {};
    const [transcript, setTranscript] = useState([]);
    let notes;
    let parsedNotes;

    try {
        parsedNotes = typeof session.notes === 'string' ? JSON.parse(session.notes) : session.notes;
        notes =  `Symptoms: ${parsedNotes.symptoms ? parsedNotes.symptoms : "N/A"}\n
                    History/Medications: ${parsedNotes.medications ? parsedNotes.medications : "N/A"}\n
                    Observations: ${parsedNotes.observations ? parsedNotes.observations : "N/A"}\n
                    Possible Diagnosis: ${parsedNotes.questions  ? parsedNotes.questions : "N/A"}\n
                    `
    } catch (error) {
        notes = session.notes != null ? session.notes : "N/A";
    }

    useEffect(() => {
        async function fetchTranscript() {
            try {
                const response = await fetch(
                    `https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/${session.session_id}`,
                    {
                        method: "GET",
                        headers: {
                            "accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    }
                );
                const result = await response.json();
                const transcript = result.transcript;
                console.log(result);
                setTranscript(transcript);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTranscript();
    }, []);

    function renderTranscript() {
        if (transcript.length === 0) {
            return <p>No transcript available for this session.</p>;
        } else {
            return (
                transcript.map((message) => (
                    <li key={message.id} className="list-group-item">
                        <strong>{message.sender}:</strong> {message.text}
                        <br />
                        <small className="text-muted">{new Date(message.created_at).toLocaleString()}</small>
                    </li>
                ))
            )
        }
    }

    return (
        <div className={`d-flex justify-content-center align-items-center vh-100 fixed-top ${styles.background}`}>
            <div className="w-75">
                <div className="d-flex justify-content-between align-items-center fixed-top p-3 mb-3">
                    <button className="btn btn-success">
                        <Link className="text-white" to="/history">
                            ← Back
                        </Link>
                    </button>
                    <h1>Session Details</h1>
                    <img src={logo} alt="logo" style={{ width: '52px' }}></img>
                </div>

                <div className="container text-center">
                    <div className="row">
                        <div className="col align-self-start">
                            <h1>Diagnosis Information</h1>
                        </div>
                        <div className="col align-self-end">
                            <div className="btn-group p-4" role="group">
                                <button
                                    type="button"
                                    className={`btn ${viewTranscript === false ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setViewTranscript(false)}
                                >
                                    View Notes
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${viewTranscript === true ? "btn-primary" : "btn-outline-primary"}`}
                                    onClick={() => setViewTranscript(true)}
                                >
                                    View Transcript
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3 align-items-stretch">
                        <div className="col d-flex">
                            <div className="border border-info rounded-4 bg-light p-4 flex-fill d-flex flex-column mh-25">
                                <p>Patient: {session.patient_name}</p>
                                <p>Diagnosis: {session.correctness ? "Correct" : session.correctness === false ? "Incorrect" : "Unknown"}</p>
                                <p>Diagnosis Time: {session.duration_seconds ? `${new Date(session.duration_seconds * 1000).toISOString().substring(11, 19)}` : "N/A"}</p>
                                <p>Created At: {new Date(session.created_at).toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="col d-flex">
                            <div className={`border border-info rounded-4 bg-light p-4 flex-fill d-flex flex-column mh-25 ${styles.list}`}>
                                <ul className="list-group list-group-flush flex-fill">
                                    {viewTranscript ? renderTranscript() : <li className="list-group-item" style={{ whiteSpace: 'pre-line' }}>{ notes }</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}