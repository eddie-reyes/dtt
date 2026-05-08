// import { Placeholder } from "reactstrap";
import styles from "../PracticeSession/PracticeSessionPage.module.css";
export default function Notes({notes, setNotes, patient, onClose}) {
const updateNoteField = (field, value) => {
	setNotes((prev) => ({
		...prev,
		[field]: value,
	}))
}

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>
        <h2 style={{ marginBottom: "8px" }}>Notes</h2>
        <p style={{ fontSize: "14px", color: "#6b7280" }}>
          Track important symptoms and observations
        </p>
        {patient && (
          <div className="mb-3 p-3 border rounded bg-light">
            <div className="fw-semibold">{patient.name}</div>

            <div className="text-muted small">
              {patient.age} years old • {patient.gender}
            </div>

            <div className="mt-2">
              <strong>Chief Complaint:</strong> {patient.chief_complaint}
            </div>
          </div>
        )}
        <div className="d-flex flex-column gap-2 mt-3">
          <div>
            <label className="fw-semibold small">Symptoms</label>
            <textarea
              className={styles.notesTextarea}
              value={notes.symptoms}
              onChange={(e) => updateNoteField("symptoms", e.target.value)}
              placeholder="Symptoms..."
              rows={2}
            />
          </div>

          <div>
            <label className="fw-semibold small">History / Medications</label>
            <textarea
              className={styles.notesTextarea}
              value={notes.medications}
              onChange={(e) => updateNoteField("medications", e.target.value)}
              placeholder="History..."
              rows={2}
            />
          </div>

          <div>
            <label className="fw-semibold small">Observations</label>
            <textarea
              className={styles.notesTextarea}
              value={notes.observations}
              onChange={(e) => updateNoteField("observations", e.target.value)}
              placeholder="Observations..."
              rows={2}
            />
          </div>

          <div>
            <label className="fw-semibold small">Possible Diagnosis</label>
            <input
              className="form-control"
              value={notes.questions}
              onChange={(e) => updateNoteField("questions", e.target.value)}
              placeholder="Possible diagnosis..."
            />
          </div>
        </div>
        <button className={styles.notesButton} onClick={onClose}>
          Save
        </button>
      </div>
    </div>
  );
}
