
import styles from '../PracticeSession/PracticeSessionPage.module.css';

function DiseaseCard({ name, description }) {
  return (
    <div className={styles.diseaseCard}>
      <h2>{name}</h2>

      <p>{description}</p>

      <button>Select</button>

      {/* TODO: Add Select button */}
    </div>
  );
}

export default DiseaseCard;
