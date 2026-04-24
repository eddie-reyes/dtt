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
                    
                    <Link to="/practice" className="btn btn-lg btn-primary w-25">
                        Start New Session
                    </Link>
                    <Link to="/practice" className="btn btn-lg btn-primary w-25">
                        Resume Session
                    </Link>
                    <Link to="/history" className="btn btn-lg btn-primary w-25">
                        View History
                    </Link>
                    <Link to="/" className="btn btn-lg btn-danger w-25">
                        Back to Main
                    </Link>
                    
                </div>

                <div className=" bg-dark text-white d-flex flex-column justify-content-between align-items-center" style={{ width: '50%' }}>
                    <p className="display-4 m-5">Welcome Back, [firstName] [lastName]</p>
                    <img src={pfp} className="rounded-circle" alt="pfp"></img>
                    <p className="h3 mt-3">Kaiser Permanente, M.D.</p>
                    <p className="h3">Surgeon</p>
                    <button
                        className="btn btn-lg btn-success  w-25 m-5"
                    >
                        <Link to="/stats" className={styles.link}>
                            View Statistics
                        </Link>
                    </button>
                </div>
            </div>
        </>
    );
}
