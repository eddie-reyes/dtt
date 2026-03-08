import { Link } from "react-router-dom";
import styles from "../App.module.css";
import Calculator from "../components/Calculator.jsx";

export default function CalculatorPage () {
  return (
    <div className={styles.page}>
      <Link to="/" className={styles.back}>
        ← Back
      </Link>

      <h1>Calculator</h1>
      <Calculator />
    </div>
  );
}
