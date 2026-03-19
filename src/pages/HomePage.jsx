import { Link } from 'react-router';
import styles from '../App.module.css';

export default function Home() {
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Main Page</h1>
            <Link to="/calculator" className={styles.openBtn}>
                Open Calculator
            </Link>
            <Link to="/login" className={styles.openBtn}>
                Open Login
            </Link>
            <Link to="/menu" className={styles.openBtn}>
                Open Menu
            </Link>
        </div>
    );
}
