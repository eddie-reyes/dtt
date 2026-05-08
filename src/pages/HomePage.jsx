import { Link } from "react-router";
import styles from "../App.module.css";
import logo from "../assets/logo.png";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img className={styles.logo} src={logo} alt="logo" />
        <h1 className={styles.title}>Diagnostic Training Tool</h1>
        <p className={styles.subtitle}>
          Practice diagnosing patients in a simulated environment. Log in to
          begin your session.
        </p>
        <Link to="/login" className={styles.loginBtn}>
          Log In
        </Link>
      </div>
    </div>
  );
}
