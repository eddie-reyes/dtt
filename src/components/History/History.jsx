import { Link } from "react-router-dom";
import styles from "./History.module.css";

export default function history() {
    return (
    <div className={styles.body}>
        <div className={styles.exit}>
            <Link to="/" className={styles.backButton}>
                ← Back
            </Link>
        </div>

        <div className={styles.title}> 
            <h1>History</h1>
        </div>

        <div className={styles.content}>
            <ul className={styles.list}>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde cumque aliquid minus perferendis vitae fugit inventore rerum quidem quasi modi delectus eveniet aliquam in sit deleniti repellat suscipit, repellendus maxime.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, assumenda.</li>
            </ul>
        </div>
    </div>
    )
}