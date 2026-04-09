import { Link } from "react-router";
import styles from "../App.module.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className={styles.page}>
      <img className="w-25" src={logo} alt="logo"></img>
      <h1 className={styles.title}>Welcome to Diagnostic Training Tool</h1>
      <h4 className="text-center text-muted mb-4">
        Practice diagnosing patients in a simulated environment. Login in to
        bigin your session.
      </h4>
      {/* <Link to="/calculator" className={styles.openBtn}>
          Open Calculator
        </Link> */}
      <button className="btn btn-primary w-25 d-block mx-auto fs-4 fw-bold ">
        <Link to="/login" className="text-white text-decoration-none d-block">
          Log In
        </Link>
      </button>

      {/* <Link to="/menu" className={styles.openBtn}>
          Open Menu
        </Link> */}
    </div>
  );
}
