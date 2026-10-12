import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../scss/styles.scss';
import styles from './Menu.module.css';
import pfp from '../Menu/placeholder_pfp.jpg'; /* Not Working for Me */
import logo from '../../assets/logo.png';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, 
  ArcElement
);

export const optionsBar = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      /*position: 'right',*/
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

export const optionsPie = {
    legend: {
        position: 'right',
    }
}

const labelsBar = ['Empathy', 'Professionalism', 'Overall'];
const labelsPie = ['Incorrect', 'Correct'];

 export const dataBar = {
  labels: labelsBar,
  datasets: [
    {
      label: 'Dataset 1',
      /* data: labelsBar.map(() => faker.number.int({ min: 0, max: 10 })), */ 
      data: [25, 50, 30],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}; 

export const dataPie = {
  labels: labelsPie,
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

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
        <h1 className="text-center"
            style={{ 
            color: 'var( --dark-text)',
            fontWeight: 'bold',
            marginTop: '16px',
        }} 
        >
                        Welcome Back, {user ? user.first_name : '[First Name]'}{' '}
                        {user ? user.last_name : '[Last Name]'}
        </h1>
        <img src={logo}
        style={{
            position: 'absolute',
            top: '-7px',
            right: '20px',
            height: '105px',
            opacity: '0.7',
        }}
        />
            <div className="d-flex"> {/* className="d-flex" style={{ height: '100vh', width: '100vw' }} */}
                    <div className="container p-5 flex-grow-1">
                        <div className="row row-cols-1 row-cols-md-2 g-4"
                            style={{
                                background: 'var(--stats-background)',
                                border: '1px solid var(--dark-border)', 
                                height: '75vh', 
                                position: 'relative',
                                right: '15px', 
                                borderRadius: '5px',
                                paddingBottom: '35px',
                            }}
                        > {/* row row-cols-1 row-cols-md-4 g-4 */}
                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}
                                 style={{
                                    minHeight: '280px',
                                }}
                                > {/* "card h-100 text-center shadow" */}
                                    <div className="card-body">
                                        <div className="display-4 text-primary mb-2">
                                            <i className="bi bi-people"></i>
                                        </div>
                                        <h2 className="card-title mb-3">
                                            {user?.stats
                                                ? user.stats.total_sessions_completed
                                                : 'N/A'}
                                        </h2>
                                        <p className="card-text text-muted">Sessions Completed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-success mb-2">
                                            <i className="bi bi-graph-up"></i>
                                        </div>
                                        <h2 className="card-title mb-3 text-success">
                                            {user?.stats ? user.stats.correct_count : 'N/A'}
                                        </h2>
                                        <p className="card-text text-muted">Correct Diagnoises</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}
                                style={{
                                    minHeight: '280px',
                                }}
                                >
                                    <div className="card-body">
                                        <div className="display-4 text-warning mb-2">
                                            <i className="bi bi-star"></i>
                                        </div>
                                       {/* <h2 className="card-title mb-3 text-danger">
                                            {user?.stats ? user.stats.incorrect_count : 'N/A'} 
                                        </h2> */}
                                        { /* <p className="card-text text-muted">Incorrect Diagnoises</p> */}
                                          <Bar options={optionsBar} data={dataBar} />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-danger mb-2">
                                            <i className="bi bi-clock-history"></i>
                                        </div>
                                       {/* <h2 className="card-title mb-3">
                                            {user?.stats
                                                ? (user.stats.correct_ratio * 100).toFixed(2)
                                                : 'N/A...'}
                                            %
                                        </h2>
                                        <p className="card-text text-muted">Success Rate</p> */}
                                        <div style={{
                                            height: '100px'
                                        }}>
                                        <Pie data={dataPie} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{  
                        background: 'var(--default-div)',
                        border: '1px solid var(--dark-border)', 
                        width: '30%',
                        height: '75vh',
                        position: 'relative',
                        right: '25px',
                        top: '25px',
                        borderRadius: '5px',
                    }}
                >
                    {/* User Info */}
                    <div className="d-flex flex-column justify-content-center align-items-center gap-3 m-3"
                    >
                        <img
                            src={user ? user.profile_image_url : pfp}
                            className="rounded-circle mb-5 w-50"
                            alt="pfp"
                        ></img>
                        <h2>{user ? user.hospital : '[Hospital]'}</h2>
                        <h4>{user ? user.role : '[Role]'}</h4>
                    </div>
                    {/* User Info */}

                </div>
                <footer
                    className="d-flex flex-row-reverse justify-content-center align-items-center gap-5 p-3" 
                    /* style={{ width: '50%' }} */ 
                    style={{background: 'var(--seaform-grey)',
                             height: '100px', 
                              position: 'fixed',
                              bottom: '0',
                              width: '100%',
                    }}
                >   
                    {/* <img className="w-25" src={logo} alt="logo"></img> */}

                    <Link
                        to="/practice"
                        /* className="btn btn-lg  w-50"  */ 
                         className={styles.taskbarButton}
                        /* style={{
                            background: 'var(--default-btn)',
                            color: 'var(--light-text)',
                            padding: '12px',
                            border: '1px solid var(--grey-border)',
                        }} */ 
                    >
                        Start New Session
                    </Link>
                    <Link
                        to="/practice"
                        /* className="btn btn-lg  w-50" */ 
                         className={styles.taskbarButton}
                        /* style={{
                            background: 'var(--default-btn)',
                            color: 'var(--light-text)',
                            padding: '12px',
                            border: '1px solid var(--grey-border)',
                        }} */ 
                    >
                        Resume Session
                    </Link>
                    <Link
                        to="/history"
                        /* className="btn btn-lg  w-50" */ 
                        className={styles.taskbarButton} 
                        /* style={{
                            background: 'var(--default-btn)',
                            color: 'var(--light-text)',
                            padding: '12px',
                            border: '1px solid var(--grey-border)',
                        }}*/ 
                    >
                        View History
                    </Link>
                    <Link to="/" 
                           /* className="btn btn-lg btn-danger w-50" */ 
                            className={styles.taskbarButton}
                            style={{
                            background:'var(--special-btn)',
                        }}
                    >
                        Log Out
                    </Link>
                </footer>
            </div>
        </>
    );
}
