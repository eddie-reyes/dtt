// import { Placeholder } from "reactstrap";
import styles from "../PracticeSession/PracticeSessionPage.module.css";
export default function Notes({notes, setNotes, patient, onClose}) {
  return(
	< div className={styles.modalOverlay}>
	<div className={styles.modalBox}>
		<button onClick={onClose}>X</button>
		<h2>Notes</h2>
		{patient && (<p>{patient.name}</p>)}
		<textarea 
		value={notes}
		onChange={(n) => setNotes(n.target.value)}
		placeholder="Write your notes... "
		rows={3}
		style={{width: "100%"}}/>
		<button onClick={onClose}>Save</button>
	</div>
		</div>
  )
}
