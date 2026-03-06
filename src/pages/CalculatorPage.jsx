import { Link } from "react-router-dom";
import Calculator from "../components/Calculator.jsx";

export default function CalculatorPage () {
  return (
    <div className="page">
      <Link to="/" className="back">
        ← Back
      </Link>

      <h1>Calculator</h1>
      <Calculator />
    </div>
  );
}
