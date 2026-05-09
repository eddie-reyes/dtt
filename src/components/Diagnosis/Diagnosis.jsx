import styles from '../PracticeSession/PracticeSessionPage.module.css';
import { use, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const diagnoses = [
    'Appendicitis',
    'Migraine',
    'Asthma',
    'Gastroenteritis',
    'Flu',
    'UTI',
    'Pneumonia',
    'Anxiety',
    'Kidney Stones',
    'GERD',
];

export default function Diagnosis({ onClose, correctDiagnosis, seconds, notes, session_id }) {
  console.log(`NOTES CONSIST OF :::: ${notes}`)
  console.log(`SECONDS CONSISTS OF ::: ${seconds}`)
    const navigate = useNavigate();
    const [mode, setMode] = useState(null);
    // console.log("correct diagnosis: ", correctDiagnosis)
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
    const [result, setResult] = useState(null);

    //temporary correct Diagnosis
    const fakeCorrectDiagnosis = correctDiagnosis;
    const diagnosisOptions = correctDiagnosis
        ? [...new Set([...diagnoses, correctDiagnosis])]
        : diagnoses;

    const handleDiagnosisSubmit = async () => {
        const isCorrect = selectedDiagnosis === fakeCorrectDiagnosis;
        if (selectedDiagnosis === fakeCorrectDiagnosis) {
            setResult('correct');
        } else {
            setResult('incorrect');
        }

        const token = localStorage.getItem('token');

        const response = await fetch(
            `https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/${session_id}/submit`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    diagnosis: selectedDiagnosis,
                    notes: notes,
                    duration_seconds: seconds,
                }),
            },
        );

        const data = await response.json();
        console.log('Diagnosis submission response:', data);
        data.correctness ? setResult('correct') : setResult('incorrect');

        const updatedUser = JSON.parse(localStorage.getItem('user'));
        updatedUser.stats = data.user_stats;

        localStorage.setItem('user', JSON.stringify(updatedUser));

        const update = await fetch(
          `https://evening-sea-83470-b4d5b88ba33a.herokuapp.com/sessions/${session_id}`,
          {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              notes: notes,
              correctness: isCorrect,
              duration_seconds: seconds,
            }),
          },
        );

        console.log(`IS ENT SOMETHINGGG :::::`, update)
    };

    const formatTime = totalSecons => {
        const hours = Math.floor(totalSecons / 3600);
        const minutes = Math.floor((totalSecons % 3600) / 60);
        const secs = totalSecons % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalBox}>
                {/* <button onclick={onClose}>Close</button> */}
                {!mode && (
                    <>
                        <h2>How would you like to make a diagnosis?</h2>
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button
                                className="btn btn-outline-primary px-4 py-2"
                                onClick={() => setMode('myself')}
                            >
                                Myself
                            </button>
                            <button
                                className="btn btn-outline-primary px-4 py-2"
                                onClick={() => setMode('options')}
                            >
                                Options
                            </button>
                        </div>
                    </>
                )}

                {mode === 'myself' && (
                    <>
                        {!result && (
                            <button
                                className={styles.closeButton}
                                onClick={() => {
                                    if (result === 'correct') {
                                        navigate('/menu');
                                    } else {
                                        onClose();
                                    }
                                }}
                            >
                                X
                            </button>
                        )}
                        <h2>Select Diagnosis</h2>
                        <select
                            className="form-select mt-4"
                            value={selectedDiagnosis}
                            onChange={e => setSelectedDiagnosis(e.target.value)}
                        >
                            <option value="">Choose option ...</option>

                            {diagnosisOptions.map(d => (
                                <option key={d} value={d}>
                                    {d}
                                </option>
                            ))}
                        </select>
                        <button
                            className="btn btn-primary w-100 mt-4"
                            onClick={handleDiagnosisSubmit}
                            disabled={!selectedDiagnosis}
                        >
                            Submit Diagnosis
                        </button>
                        {result === 'correct' && (
                            <>
                                {' '}
                                <p className="text-success mt-3 fw-semibold">Correct Diagnosis!</p>
                                <p className="text-muted mt-2">Time: {formatTime(seconds)}</p>
                            </>
                        )}

                        {result === 'incorrect' && (
                            <>
                                {' '}
                                <p className="text-danger mt-3 fw-semibold">Incorrect Diagnosis</p>
                                <p className="text-muted mt-2">Time: {formatTime(seconds)}</p>
                            </>
                        )}
                    </>
                )}
                {mode === 'options' && (
                    <>
                        {!result && (
                            <button
                                className={styles.closeButton}
                                onClick={() => {
                                    if (result === 'correct') {
                                        navigate('/menu');
                                    } else {
                                        onClose();
                                    }
                                }}
                            >
                                X
                            </button>
                        )}
                        <h2>Choose Diagnosis</h2>

                        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                            {diagnosisOptions.slice(0, 10).map(d => (
                                <button
                                    key={d}
                                    className={`btn px-4 py-2 ${
                                        selectedDiagnosis === d
                                            ? 'btn-primary'
                                            : 'btn-outline-primary'
                                    }`}
                                    onClick={() => setSelectedDiagnosis(d)}
                                >
                                    {d}
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary w-100 mt-4"
                            onClick={handleDiagnosisSubmit}
                            disabled={!selectedDiagnosis}
                        >
                            Submit Diagnosis
                        </button>
                        {result === 'correct' && (
                            <>
                                {' '}
                                <p className="text-success mt-3 fw-semibold">Correct Diagnosis!</p>
                                <p className="text-muted mt-2">Time: {formatTime(seconds)}</p>
                            </>
                        )}

                        {result === 'incorrect' && (
                            <>
                                {' '}
                                <p className="text-danger mt-3 fw-semibold">Incorrect Diagnosis</p>
                                <p className="text-muted mt-2">Time: {formatTime(seconds)}</p>
                            </>
                        )}
                    </>
                )}

                {result && (
                    <button
                        className="btn btn-outline-primary w-100 mt-3"
                        onClick={() => navigate('/menu')}
                    >
                        Back to Menu
                    </button>
                )}
            </div>
        </div>
    );
}
