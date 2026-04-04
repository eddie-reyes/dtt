import { Link } from 'react-router-dom';
import '../scss/styles.scss';
import styles from './Menu.module.css';
import pfp from '../Menu/placeholder_pfp.jpg';
import logo from '../../assets/logo.png';

export default function Menu() {
    return (
        <>
            <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
                <div
                    className="d-flex flex-column justify-content-center align-items-center gap-5 p-3 "
                    style={{ width: '50%' }}
                >
                    <img className="w-25" src={logo} alt="logo"></img>
                    <button className="btn btn-lg btn-primary w-25">
                        <Link to="/practice" className={styles.link}>
                            Start New Session
                        </Link>
                    </button>
                    <button className="btn btn-lg btn-primary w-25">
                        <Link to="/sim" className={styles.link}>
                            Resume Session
                        </Link>
                    </button>
                    <button className="btn btn-lg btn-primary w-25">
                        <Link to="/history" className={styles.link}>
                            View History
                        </Link>
                    </button>
                    <button className="btn btn-lg btn-danger w-25">
                        <Link to="/" className={styles.link}>
                            Back To Main
                        </Link>
                    </button>
                </div>

                <div className=" bg-dark text-white" style={{ width: '50%' }}>
                    <p className="display-4 m-5">Welcome Back, [firstName] [lastName]</p>
                    <div
                        className="d-flex flex-column justify-content-center align-items-center"
                        style={{ marginTop: '10rem' }}
                    >
                        <img src={pfp} className="rounded-circle" alt="pfp"></img>
                        <p className="h3 mt-3">Kaiser Permanente, M.D.</p>
                        <p className="h3 mt-3">Surgeon</p>
                        <button
                            className="btn btn-lg btn-success  w-25"
                            style={{ marginTop: '10rem' }}
                        >
                            <Link to="/stats" className={styles.link}>
                                View Statistics
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
