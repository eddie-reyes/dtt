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
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Scatter } from 'react-chartjs-2';
import { _angleBetween } from 'chart.js/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, 
  ArcElement,
  PointElement,
  LineElement
);

const baseOptions = {
      display: true,
      color: '#4697B6', 
    font: {
        size: 23, 
        weight: 'bold', 
        family: "'Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'",
      }
}; 

export const optionsBarh = (title) =>  ({ 
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
    ...baseOptions,
    text: title,
    },
  },
});

export const optionsBarv = (title) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
    ...baseOptions,
    text: title,
    },
  },
});

export const optionsPie = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
    legend: {
        position: 'right',
    },
    title: {
      ...baseOptions,
      text: 'Success Rate',
    },
}, 
}; 

export const optionsScatter = {
  scales: {
    y: [{
      beginAtZero: true,
      scaleLabel: {display: true, labelString: 'Diagnosis'}
    }],
  },
plugins: {
    title: {
      ...baseOptions,
      text: 'Diagnosis vs Communication',
      align: 'center',
    },
    legend: {
        display: false
    },
}, 
   
};

const labelsBarv = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; 

 export const dataBarh = (labels, data) => ({
  labels: labels,
  datasets: [
    {
      data: data,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}); 

 export const dataBarv = (labels, data) => ({
  labels: labels,
  datasets: [
    {
      data: data,
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}); 


export const dataPie = {
  labels: ['Incorrect', 'Correct'],
  datasets: [
    {
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

export const dataScatter = {
  datasets: [
    {
      data: [[100, 200], [300, 400], [500, 600], [700, 800]],
      backgroundColor: 'rgba(54, 162, 235, 1)',
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
                        <div className={`row row-cols-1 row-cols-md-2 g-4 ${styles.statsContainer}`}> 
                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}> 
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
                                        <h2 className="card-title mb-3"> 
                                            {user?.stats ? user.stats.correct_count : 'N/A'}
                                        </h2>
                                        <p className="card-text text-muted">Correct Diagnoises</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-warning mb-2">
                                            <i className="bi bi-star"></i>
                                        </div>
                                          <Bar options={optionsBarh('Patient Treatment')} data={dataBarh(['Empathy', 'Professionalism', 'Overall'], [25, 50, 30])} />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-danger mb-2">
                                            <i className="bi bi-clock-history"></i>
                                        </div>
                                        <div style={{
                                            height: '250px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Pie data={dataPie} options={optionsPie}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-success mb-2">
                                            <i className="bi bi-graph-up"></i>
                                        </div>
                                        <Scatter options={optionsScatter} data={dataScatter}/>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-success mb-2">
                                            <i className="bi bi-graph-up"></i>
                                        </div>
                                        <Bar options={optionsBarv('Average Time to Diagnose')} data={dataBarv(labelsBarv, ['1', '2', '3', '4', '5', '6', '7'])}/> 
                                    </div>
                                </div>
                            </div>  

                                <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-success mb-2">
                                            <i className="bi bi-graph-up"></i>
                                        </div>
                                        <Bar options={optionsBarh('# of Correct Diagnoses')} data={dataBarh(['GERD', 'Anxiety', 'Flu', 'Migraine'], [25, 50, 30, 40])}/> 
                                    </div>
                                </div>
                            </div>

                                <div className="col">
                                <div className={`card h-100 text-center shadow ${styles.statsCard}`}>
                                    <div className="card-body">
                                        <div className="display-4 text-success mb-2">
                                            <i className="bi bi-graph-up"></i>
                                        </div>
                                        <Bar options={optionsBarv('Avg Amount of Questions Asked')} data={dataBarv(labelsBarv, ['1', '2', '3', '4', '5', '6', '7'])}/> 
                                    </div>
                                </div>
                            </div>  
                            {/* Add more here  */}
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
                    style={{background: 'var(--seaform-grey)',
                             height: '100px', 
                              position: 'fixed',
                              bottom: '0',
                              width: '100%',
                    }}
                >   

                    <Link
                        to="/practice"
                         className={styles.taskbarButton}
                    >
                        Start New Session
                    </Link>
                    <Link
                        to="/practice"
                         className={styles.taskbarButton} 
                    >
                        Resume Session
                    </Link>
                    <Link
                        to="/history"
                        className={styles.taskbarButton} 
                    >
                        View History
                    </Link>
                    <Link to="/" 
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