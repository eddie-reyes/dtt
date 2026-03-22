import { Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function login() {
    return (
    <>
    <div className={styles.body}>
        <div className={styles.back}>
            <Link to="/" className={styles.backButton}>
                ← Back
            </Link>
        </div>
        <div className={styles.title}>
            <h1>Diagnostic Training Tool</h1>
        </div>

        {/* <div className={styles.logo}>
            <img src="./src/assets/logo.png" alt="" className={styles.img}/>
        </div> */}

        <form className={styles.login}>
            <input name="username" type="text" placeholder="Username:" className={styles.username} required />
            <input name="password" type="password" placeholder="Password:" className={styles.password} required />
            <button type="submit" className={styles.submit}>Login</button>
        </form>

        <div className={`${styles.visittext} ${styles.text}`}>
            <p>Visit our website for more information: <a href="https://www.diagnostictrainingtool.com">www.diagnostictrainingtool.com</a></p>
        </div>
        <div className={`${styles.copyright} ${styles.text}`}>
            <p>Copyright © 2024 Diagnostic Training Tool. All rights reserved.</p>
        </div>
    </div>
    </>
    )
}