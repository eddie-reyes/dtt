import { Link } from 'react-router-dom';
import '../scss/styles.scss';
import './Menu.module.css';

export default function Menu() {
    return (
        <>
            <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
                <div
                    className="d-flex flex-column justify-content-center align-items-center gap-5 p-3"
                    style={{ width: '50%' }}
                >
                    <button className="btn btn-lg btn-primary w-25">Start New Session</button>
                    <button className="btn btn-lg btn-primary w-25">Resume Session</button>
                    <button className="btn btn-lg btn-primary w-25">View History</button>
                    <button className="btn btn-lg btn-danger w-25">Back To Main</button>
                </div>

                {/* Right Half */}
                <div
                    className="d-flex justify-content-center align-items-center bg-secondary text-white"
                    style={{ width: '50%' }}
                >
                    <h2>Right Section</h2>
                </div>
            </div>
        </>
    );
}
