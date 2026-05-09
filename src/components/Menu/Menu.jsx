import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../scss/styles.scss';
import styles from './Menu.module.css';
import pfp from '../Menu/placeholder_pfp.jpg';
import logo from '../../assets/logo.png';

export default function Menu() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            console.warn('No user data found in localStorage');
            return;
        }

        console.log('User data from localStorage:', user);
        setUser(user);
    }, []);
    return (
        <>
            <div className="d-flex" style={{ height: '100vh', width: '100vw' }}>
                <div
                    className="d-flex flex-column justify-content-center align-items-center gap-5 p-3 "
                    style={{ width: '50%' }}
                >
                    <img className="w-25" src={logo} alt="logo"></img>

                    <Link
                        to="/practice"
                        className="btn btn-lg  w-25"
                        style={{
                            background: 'var(--dark-teal)',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                        }}
                    >
                        Start New Session
                    </Link>
                    <Link
                        to="/practice"
                        className="btn btn-lg  w-25"
                        style={{
                            background: 'var(--dark-teal)',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                        }}
                    >
                        Resume Session
                    </Link>
                    <Link
                        to="/history"
                        className="btn btn-lg  w-25"
                        style={{
                            background: 'var(--dark-teal)',
                            color: 'white',
                            padding: '12px',
                            borderRadius: '12px',
                        }}
                    >
                        View History
                    </Link>
                    <Link to="/" className="btn btn-lg btn-danger w-25">
                        Back to Main
                    </Link>
                </div>

                <div
                    className=" bg-dark text-white d-flex flex-column justify-content-between align-items-center py-5"
                    style={{ width: '50%' }}
                >
                    <p className="display-4 m-5">
                        Welcome Back, {user ? user.first_name : '[First Name]'}{' '}
                        {user ? user.last_name : '[Last Name]'}
                    </p>
                    <div className="d-flex flex-column align-items-center gap-3 m-5">
                        <img
                            src={user ? user.profile_image_url : pfp}
                            className="rounded-circle mb-5"
                            style={{ width: '400px' }}
                            alt="pfp"
                        ></img>
                        <h1>{user ? user.hospital : '[Hospital]'}</h1>
                        <h3>{user ? user.role : '[Role]'}</h3>
                    </div>
                    <div class="container py-5 w-75">
                        <div class="row row-cols-1 row-cols-md-4 g-4">
                            <div class="col">
                                <div class="card h-100 text-center shadow">
                                    <div class="card-body">
                                        <div class="display-4 text-primary mb-2">
                                            <i class="bi bi-people"></i>
                                        </div>
                                        <h2 class="card-title mb-3">
                                            {user ? user.stats.total_sessions_completed : 'N/A'}
                                        </h2>
                                        <p class="card-text text-muted">Sessions Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card h-100 text-center shadow">
                                    <div class="card-body">
                                        <div class="display-4 text-success mb-2">
                                            <i class="bi bi-graph-up"></i>
                                        </div>
                                        <h2 class="card-title mb-3 text-success">
                                            {user ? user.stats.correct_count : 'N/A'}
                                        </h2>
                                        <p class="card-text text-muted">Correct Diagnoises</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card h-100 text-center shadow">
                                    <div class="card-body">
                                        <div class="display-4 text-warning mb-2">
                                            <i class="bi bi-star"></i>
                                        </div>
                                        <h2 class="card-title mb-3 text-danger">
                                            {user ? user.stats.incorrect_count : 'N/A'}
                                        </h2>
                                        <p class="card-text text-muted">Incorrect Diagnoises</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col">
                                <div class="card h-100 text-center shadow">
                                    <div class="card-body">
                                        <div class="display-4 text-danger mb-2">
                                            <i class="bi bi-clock-history"></i>
                                        </div>
                                        <h2 class="card-title mb-3">
                                            {user
                                                ? (user.stats.correct_ratio * 100).toFixed(2)
                                                : 'N/A'}
                                            %
                                        </h2>
                                        <p class="card-text text-muted">Success Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
