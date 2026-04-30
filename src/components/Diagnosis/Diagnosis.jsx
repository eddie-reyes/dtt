// import { useEffect, useState } from "react";
import styles from "../PracticeSession/PracticeSessionPage.module.css";
const diagnoses = ["Flu", "Covid", "Angina", "Pneumonia", "Healthy"]
export default function Diagnosis({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button onClick={onClose}>Close</button>
        <h2>Do you want select Diagnosis yourself or with options?</h2>
        <button>Myself</button>
<br/>
        <select value="">
          <option>__choose optiopn__</option>
			 {diagnoses.map((d) =>(
				<option key={d} value={d}>
					{d}
				</option>
			 ))}
        </select>
		  <br/>
        <button>Options</button>
		  <div>
			{diagnoses.slice(0,4).map((d) => (
				<button>{d}</button>
			))}
		  </div>
      </div>
    </div>
  );
}
