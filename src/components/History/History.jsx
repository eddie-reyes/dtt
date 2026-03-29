import data from "./data/patients.json";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import styles from "./History.module.css";
import "../scss/styles.scss";

export default function history() {
    return (
        <div className="grid text-center">
            <div className="row">
                <div className="col">
                    <button className="btn btn-success">
                        <Link to="/menu">
                            ← Back
                        </Link>
                    </button>
                </div>

                <div className="col">
                    <h1>History</h1>
                </div>

                <div className="col">
                    <img src={logo} alt="logo" className="w-25"></img>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <ul className="list-group">
                        {data.map((patient) => (
                            <li key={patient.id} className="list-group-item">
                                <p>Patient: {patient.name}: {patient.correct ? "Correct" : "Incorrect"} Diagnosis</p>
                                <Link to={`/details/${patient.id}`} state={{ patient }}>
                                    Show Details
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    // <div className={styles.body}>
    //     <div className={styles.exit}>
    //         <Link to="/menu" className={styles.backButton}>
    //             ← Back
    //         </Link>
    //     </div>

    //     <div className={styles.title}> 
    //         <h1>History</h1>
    //     </div>

    //     <div className={styles.content}>
    //         <ul className={styles.list}>
    //             {data.map((patient) => (
    //                 console.log(patient),
    //                 console.log(typeof patient),
    //                 <li key={patient.id}>
    //                     <div>
    //                         <p>Patient: {patient.name}: {patient.correct ? "Correct" : "Incorrect"} Diagnosis</p>
    //                         <Link to={`/details/${patient.id}`} state={{ patient }}>
    //                             Show Details
    //                         </Link>
    //                     </div>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // </div>
    )
}
