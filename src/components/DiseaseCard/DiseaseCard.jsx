// import {useState} from "react"; 
import styles from '../PracticeSession/PracticeSessionPage.module.css';

function DiseaseCard({ name, description, isSelected, onSelect }) {
    // const [selected, setSelected] = useState(false); 
  return (
    <div className={styles.diseaseCard}>
      <h2>{name}</h2>

      <p>{description}</p>

      <button onClick={onSelect} className={isSelected ? styles.selectedDiseaseCard: ""}>{isSelected ? "Selected" : "Select"}</button>

      {/* TODO: Add Select button */}
    </div>
  );
}

export default DiseaseCard;

