import { useState } from "react";
import styles from "../App.module.css";

export default function Calculator() {
	
	const [display, setDisplay] = useState("0");
	const [justCalculated, setJustCalculated] = useState(false);

	const handleNumber = (num) => {
		if (justCalculated) {
			setDisplay(num);
			setJustCalculated(false);
		} else if (display === "0") {
			setDisplay(num);
		} else {
			setDisplay(display + num);
		}
	};

	const clear = () => {
		setDisplay("0");
		setJustCalculated(false);
	};
	
	const handleOperator =(operation) => {
		if ("=-*/".includes(display.slice(-1))) {
			setDisplay(display.slice(0,-1)) + operation;
		} else {
			setDisplay(display + operation);
		} 
		setJustCalculated(false);
	};

	const calculate = () => {
		try {
			const result = eval(display);
			setDisplay(String(result));
			setJustCalculated(true);
		} catch {
			setDisplay("Error");
			setJustCalculated(true);
		}
	};

	const backspace = () => {
		if (justCalculated) {
			setDisplay("0");
			setJustCalculated(false);
		} else if (display.length === 1) {
			setDisplay("0");
		} else {
			setDisplay(display.slice(0, -1));
		}
	};

	return (
    <div className={styles.calculator}>
      <div className={styles.display}>{display}</div>

      <div className={styles.grid}>
        <button onClick={clear}>C</button>
        <button onClick={backspace}>⌫</button>
        <button onClick={() => handleOperator("/")}>÷</button>
        <button onClick={() => handleOperator("*")}>×</button>

        <button onClick={() => handleNumber("7")}>7</button>
        <button onClick={() => handleNumber("8")}>8</button>
        <button onClick={() => handleNumber("9")}>9</button>
        <button onClick={() => handleOperator("-")}>−</button>

        <button onClick={() => handleNumber("4")}>4</button>
        <button onClick={() => handleNumber("5")}>5</button>
        <button onClick={() => handleNumber("6")}>6</button>
        <button onClick={() => handleOperator("+")}>+</button>

        <button onClick={() => handleNumber("1")}>1</button>
        <button onClick={() => handleNumber("2")}>2</button>
        <button onClick={() => handleNumber("3")}>3</button>
        <button onClick={calculate}>=</button>

        <button className={styles.zero} onClick={() => handleNumber("0")}>0</button>
        <button onClick={() => handleNumber(".")}>.</button>
      </div>
    </div>
  );
}
