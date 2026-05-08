// import { Placeholder } from "reactstrap";
import styles from "../PracticeSession/PracticeSessionPage.module.css";
export default function Notes({notes, setNotes, patient, onClose}) {
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
        {patient && <p>Patient:{patient.name}</p>}
        {/* <p>Patient:</p> */}
        <textarea
          className={styles.notesTextarea}
          value={notes}
          onChange={(n) => setNotes(n.target.value)}
          placeholder="Write your notes... "
          rows={8}
          style={{ width: "100%" }}
        />
        <button className={styles.notesButton} onClick={onClose}>
          Save
        </button>
      </div>
    </div>
  );
}
