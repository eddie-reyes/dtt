import styles from "./PracticeSessionPage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Timer from "../../components/Timer/Timer.jsx";
import Diagnosis from "../../components/Diagnosis/Diagnosis.jsx";
import Notes from "../../components/Notes/Notes.jsx";

export default function PracticeSession() {
  const [showPatientChart, setShowPatientChart] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sessionInfo, setSessionInfo] = useState({});
  const patient = sessionInfo.patient;
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isDiagnosisOpen, setDiagnosisOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const notesKey = sessionInfo.session_id ? `notes_${sessionInfo.session_id}` : "notes";

  useEffect(() => {
    const initSession = async () => {
		const token = localStorage.getItem("token");
		console.log("token:", token);
      const response = await fetch(
        "https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: "admin", patient_id: "1" }),
        },
      );

      const data = await response.json();
      console.log("data:",data);
		if (!response.ok) {
			console.log("Session error: ", data);
		}
      setSessionInfo(data);
    };

    console.log("Initializing session...");
    initSession();
  }, []);

  const onSubmitMessage = async (message) => {
	if (!sessionInfo.session_id) return;
    setMessages([...messages, message]);
	const token = localStorage.getItem("token");
    const response = await fetch(
      `https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/${sessionInfo.session_id}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
			 Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: message }),
      },
    );

    const data = await response.json();
    console.log("Received response:", data);
    setMessages([...messages, message, data.Patient]);
  };
  // console.log("patien", patient);
//   console.log("data:",data);
useEffect(() => {
	if( !sessionInfo.session_id) return;
	const saved = localStorage.getItem(notesKey);
	if (saved) setNotes(saved);
},[sessionInfo.session_id]);

useEffect(() => {
	if (!sessionInfo.session_id) return;
localStorage.setItem(notesKey,notes)
}, [notes, sessionInfo.session_id]);


  return (
    <div className={`container-fluid ${styles.practicePage}`}>
      <div className={styles.leftPanel}>
        <h2>How to start:</h2>
        {/* Placeholder for Diagnosis */}
        <ol className={styles.instructions}>
          <li>Review the Patient Chart</li>
          <li>Ask the patient about symptoms</li>
          <li>Use notes to track key information</li>
          <li>Select the most accurate diagnosis</li>
        </ol>
        <button
          className={`btn ${styles.mainButtonPrimary}`}
          onClick={() => {
            setIsTimerRunning(false);
            setDiagnosisOpen(true);
          }}
        >
          Make a Diagnosis
        </button>
      </div>

      <div className="col-md-4">
        <div className={`${styles.middlePanel} h-100 p-4`}>
          <div className={styles.middlePanel}>
            {/* Logo */}
            <div className={`text-center ${styles.logoWrapper}`}>
              <img
                src="src/assets/logo.png"
                alt="logo"
                className={styles.logo}
              />
            </div>

            {/* Timer - PlaceHolder at the moment */}
            <div className={`text-center mb-4 ${styles.timer}`}>
              {/* Timer 00:00:00 */}
              <Timer isRunning={isTimerRunning} />
            </div>
            {/* Buttons */}
            <div className="d-flex flex-column align-items-center gap-5">
              <Link to="/menu" className={`btn ${styles.mainButton}`}>
                Back to Menu
              </Link>
              <button
                className={`btn ${styles.mainButton}`}
                onClick={() => setShowPatientChart(true)}
              >
                View Patient Chart
              </button>
              <button className={`btn ${styles.mainButton}`}
				  onClick={()=> setShowNotes(true)}>Notes</button>
              {/* <button className={`btn ${styles.mainButtonPrimary}`}>
                  Make a Diagnosis
                </button> */}
            </div>
          </div>
        </div>
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
            {patient ? (
              <div>
                <p>
                  <strong>Name:</strong> {patient.name}
                </p>
                <p>
                  <strong>Sex:</strong> {patient.gender}
                </p>
                <p>
                  <strong>Age:</strong> {patient.age}
                </p>
                <p>
                  <strong>Reason for Visit:</strong> {patient.chief_complaint}
                </p>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
      )}

      {isDiagnosisOpen && (
       <Diagnosis onClose={() => {setDiagnosisOpen(false);
			setIsTimerRunning(true);
		 }}/>
      )}

		{showNotes && (
			<Notes
			notes={notes}
			setNotes={setNotes}
			patient={patient}
			onClose={() => setShowNotes(false)}/>
		)}

      <div className="col-md-4">
        <div className={`${styles.rightPanel} h-100 p-4`}>
          <ul className="list-group list-group-flush">
            {messages.map((message, index) =>
              index % 2 === 0 ? (
                <li key={index} className="list-group-item m-3 w-50 rounded">
                  <span>
                    <strong>You:</strong> {message}
                  </span>
                </li>
              ) : (
                <li
                  key={index}
                  className="list-group-item m-3 w-50 rounded align-self-end"
                >
                  <span>
                    <strong>Patient:</strong> {message}
                  </span>
                </li>
              ),
            )}
          </ul>
          <div className={`${styles.inputWrapper} input-group mb-3`}>
            <input
              type="text"
              className="form-control"
              placeholder="Message"
				  onKeyDown ={(e) =>{
					if (e.key === "Enter" && e.target.value.trim()) {
						const input = e.target;
						onSubmitMessage(input.value);
						input.value = "";
					}
				  }}
            ></input>
            <div className="input-group-append">
              <button
                className="input-group-text"
                id="basic-addon2"
                onClick={() =>{
						const input = document.querySelector(".form-control");
						if (!input.value.trim()) return;
                  onSubmitMessage(input.value);
						input.value = "";
					 }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
