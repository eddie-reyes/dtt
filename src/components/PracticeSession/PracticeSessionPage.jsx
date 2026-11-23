import styles from './PracticeSessionPage.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Timer from '../../components/Timer/Timer.jsx';
import DiseaseCard from '../DiseaseCard/DiseaseCard.jsx';
// import Notes from '../../components/Notes/Notes.jsx';
import pfp from '../Menu/placeholder_pfp.jpg'; 

export default function PracticeSession() {
    const [showPatientChart, setShowPatientChart] = useState(false);
    const [messages, setMessages] = useState([]);
    const messagesListRef = useRef(null);
    const messageInputRef = useRef(null);
    const [sessionInfo, setSessionInfo] = useState({});
    const patient = sessionInfo.patient;
    const patientChartSections = [
        {
            title: 'Patient and visit',
            source: 'Backend patient record',
            fields: [
                { label: 'Name', value: patient?.name ?? 'Not available' },
                { label: 'Patient ID', value: patient?.patient_id ?? patient?.id ?? 'Not provided' },
                { label: 'Age', value: patient?.age != null ? `${patient.age} years` : 'Not provided' },
                { label: 'Gender', value: patient?.gender ?? 'Not provided' },
                { label: 'Chief complaint', value: patient?.chief_complaint ?? 'Not provided' },
            ],
        },
        {
            title: 'Vital signs',
            source: 'Sample practice placeholders',
            fields: [
                { label: 'Blood pressure', value: '118/76 mmHg' },
                { label: 'Heart rate', value: '78 bpm' },
                { label: 'Respiratory rate', value: '16 breaths/min' },
                { label: 'Temperature', value: '36.8 °C (98.2 °F)' },
                { label: 'Oxygen saturation', value: '98%' },
                { label: 'Pain', value: '3/10' },
            ],
        },
        {
            title: 'Medical history',
            source: 'Sample practice placeholders',
            fields: [
                { label: 'Conditions', value: 'Mild asthma; seasonal allergies' },
                { label: 'Surgical history', value: 'No prior surgeries reported' },
                { label: 'Hospitalizations', value: 'None reported' },
            ],
        },
        {
            title: 'Medications and allergies',
            source: 'Sample practice placeholders',
            fields: [
                { label: 'Current medications', value: 'Cetirizine 10 mg as needed' },
                { label: 'Allergies', value: 'Penicillin (rash)' },
                { label: 'Preferred pharmacy', value: 'Not on file' },
            ],
        },
        {
            title: 'Family and social history',
            source: 'Sample practice placeholders',
            fields: [
                { label: 'Family history', value: 'Parent with hypertension' },
                { label: 'Tobacco', value: 'Does not smoke' },
                { label: 'Alcohol', value: 'Occasional use' },
                { label: 'Living situation', value: 'Lives with family' },
            ],
        },
    ];
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [diagnosisResult, setDiagnosisResult] = useState(null);
    const [isSubmittingDiagnosis, setIsSubmittingDiagnosis] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
    const [notes, setNotes] = useState({
        symptoms: '',
        duration: '',
        medications: '',
        observations: '',
        questions: '',
    });

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

const updateNoteField = (field, value) => {
	setNotes((prev) => ({
		...prev,
		[field]: value,
	}))
}

function handleSearchChange(e){
    setSearchTerm(e.target.value); 
}

const filteredDiagnoses = diagnoses.filter(disease => 
        disease.toLowerCase().includes(searchTerm.toLowerCase())
); 

    const handleMakeDiagnosis = async () => {
        if (!selectedDiagnosis || !sessionInfo.session_id || isSubmittingDiagnosis) return;

        setIsSubmittingDiagnosis(true);
        setDiagnosisResult(null);
        setIsTimerRunning(false);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `https://dtt-9fc5c2fc9663.herokuapp.com/sessions/${sessionInfo.session_id}/submit`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        diagnosis: selectedDiagnosis,
                        notes: JSON.stringify(notes),
                        duration_seconds: seconds,
                    }),
                },
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || 'Unable to submit your diagnosis.');
            }
            if (typeof data.correctness !== 'boolean') {
                throw new Error('The server did not return a diagnosis result. Please try again.');
            }

            const storedUser = localStorage.getItem('user');
            if (storedUser && data.user_stats) {
                try {
                    const updatedUser = JSON.parse(storedUser);
                    updatedUser.stats = data.user_stats;
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                } catch (error) {
                    console.error('Could not update saved user stats:', error);
                }
            }

            const correctDiagnosis =
                data.correct_diagnosis ||
                data.correctDiagnosis ||
                data.patient?.correct_diagnosis ||
                data.patient?.correctDiagnosis ||
                data.patient?.diagnosis ||
                sessionInfo.correct_diagnosis ||
                sessionInfo.correctDiagnosis ||
                sessionInfo.patient?.correct_diagnosis ||
                sessionInfo.patient?.correctDiagnosis ||
                sessionInfo.patient?.diagnosis;

            setDiagnosisResult({ correctness: data.correctness, correctDiagnosis });
        } catch (error) {
            setDiagnosisResult({ error: error.message || 'Unable to submit your diagnosis.' });
            setIsTimerRunning(true);
        } finally {
            setIsSubmittingDiagnosis(false);
        }
    };


    const notesKey = sessionInfo.session_id ? `notes_${sessionInfo.session_id}` : 'notes';

    useEffect(() => {
        const initSession = async () => {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            console.log('token:', token);
            const response = await fetch('https://dtt-9fc5c2fc9663.herokuapp.com/sessions/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: user.username,
                    patient_id: user.current_patient_id,
                }),
            });

            const data = await response.json();
            console.log('data:', data);
            if (!response.ok) {
                console.log('Session error: ', data);
            }
            setSessionInfo(data);
        };

        console.log('Initializing session...');
        initSession();
    }, []);

    const onSubmitMessage = async message => {
        if (!sessionInfo.session_id) return;
        setMessages([...messages, message]);
        const token = localStorage.getItem('token');
        const response = await fetch(
            `https://dtt-9fc5c2fc9663.herokuapp.com/sessions/${sessionInfo.session_id}/message`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: message }),
            },
        );

        const data = await response.json();
        console.log('Received response:', data);
        setMessages([...messages, message, data.Patient]);
    };

    //   Notes - LocalStorage
    useEffect(() => {
        if (!sessionInfo.session_id) return;
        const saved = localStorage.getItem(notesKey);
        if (saved) {
            setNotes(JSON.parse(saved));
        }
    }, [sessionInfo.session_id]);

    useEffect(() => {
        if (!sessionInfo.session_id) return;
        localStorage.setItem(notesKey, JSON.stringify(notes));
    }, [notes, sessionInfo.session_id]);

    //Messages auto-scroll
    useEffect(() => {
        const list = messagesListRef.current;
        if (!list) return;

        list.scrollTop = list.scrollHeight;
    }, [messages]);

    return (
        <div className={`container-fluid ${styles.practicePage}`}>
            <div className={styles.Panel} id={styles.leftPanel}>
                <div className={`${styles.panelElem} ${styles.panelHeader}`}>
                    <h2>Diseases</h2>
                    <br/>
                    <div id={styles.searchContainer}>
                        <input type="text" placeholder="Search..."value={searchTerm} onChange={handleSearchChange}/>
                        {/* <button>Search</button>  Add Icon Later */}
                    </div>
                </div>
                <div id={styles.DiseaseCardContainer}> 
                    {filteredDiagnoses.map((disease) => (
                        <DiseaseCard key={disease} name={disease} description="Disease Discription" isSelected={selectedDiagnosis === disease} onSelect={() => setSelectedDiagnosis(disease)}/>
                    ))} 
                </div>
                <div id={styles.panelFooter} className={styles.panelElem}>
                <button
                    className={`btn ${styles.mainButtonPrimary}`}
                    onClick={handleMakeDiagnosis}
                    disabled={
                        !selectedDiagnosis ||
                        !sessionInfo.session_id ||
                        isSubmittingDiagnosis ||
                        diagnosisResult?.correctness !== undefined
                    }
                >
                    {isSubmittingDiagnosis ? 'Checking Diagnosis…' : 'Make a Diagnosis'}
                </button>
                {!selectedDiagnosis && (
                    <p className="text-muted mt-2 mb-0">Select a disease before submitting.</p>
                )}
                {diagnosisResult?.correctness === true && (
                    <p className="text-success fw-semibold mt-2 mb-0" role="status">
                        Correct diagnosis!
                    </p>
                )}
                {diagnosisResult?.correctness === false && (
                    <p className="text-danger fw-semibold mt-2 mb-0" role="status">
                        Incorrect Diagnosis. The patient has{' '}
                        {diagnosisResult.correctDiagnosis || 'an unknown diagnosis'}.
                    </p>
                )}
                {diagnosisResult?.error && (
                    <p className="text-danger mt-2 mb-0" role="alert">
                        {diagnosisResult.error}
                    </p>
                )}
                </div>
            </div>

            <div className="col-md-4">
                <div className={`${styles.middlePanel} h-100 p-4`}>
                    <div className={styles.middlePanel}>
                        {/* Logo */}
                        <div className={`text-center ${styles.logoWrapper}`}>
                            <img src="src/assets/logo.png" alt="logo" className={styles.logo} />
                        </div>
                        {/* Timer - PlaceHolder at the moment */}
                        <div className={`text-center m-1 ${styles.timer}`}> {/* mb-4 */}
                            {/* Timer 00:00:00 */}
                            {diagnosisResult?.correctness === undefined && (
                                <Timer
                                    isRunning={isTimerRunning}
                                    seconds={seconds}
                                    setSeconds={setSeconds}
                                />
                            )} 
                        </div>
                        {/* Notes */}
                        <div className="d-flex flex-column align-items-center"> {/* gap-5 */}
                                    {/* <h2 style={{ marginBottom: "8px" }}>Notes</h2>
                                    <p style={{ fontSize: "14px", color: "#6b7280" }}>
                                      Track important symptoms and observations
                                    </p> */} 
                                    {patient && (
                                      <div className={styles.notesTextarea} id={styles.patientInfo}> {/* mb-3 p-3 border rounded bg-light */}
                                        <div>
                                            <img src={pfp} alt="Patient Profile" id={styles.patientPic}/>
                                        </div>
                                        <div>
                                            <div className="fw-semibold">{patient.name}</div>

                                            <div className="text-muted small">
                                                {patient.age} years old • {patient.gender}
                                            </div>
                            
                                            <div className="mt-2">
                                                <strong>Chief Complaint:</strong> {patient.chief_complaint}
                                            </div>
                                                <a
                                                    href="#patient-chart"
                                                    aria-haspopup="dialog"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setShowPatientChart(true);
                                                    }}
                                                >
                                                    View More
                                                </a>
                                        </div>
                                      </div>
                                    )}
                                    <div className="d-flex flex-column"> {/* gap-2 mt-3*/}
                                      <div>
                                        <label className="fw-semibold small">Symptoms</label>
                                        <textarea
                                          className={styles.notesTextarea}
                                          value={notes.symptoms}
                                          onChange={(e) => updateNoteField("symptoms", e.target.value)}
                                          placeholder="Symptoms..."
                                          rows={2}
                                        />
                                      </div>
                            
                                      <div>
                                        <label className="fw-semibold small">History / Medications</label>
                                        <textarea
                                          className={styles.notesTextarea}
                                          value={notes.medications}
                                          onChange={(e) => updateNoteField("medications", e.target.value)}
                                          placeholder="History..."
                                          rows={2}
                                        />
                                      </div>
                            
                                      <div>
                                        <label className="fw-semibold small">Observations</label>
                                        <textarea
                                          className={styles.notesTextarea}
                                          value={notes.observations}
                                          onChange={(e) => updateNoteField("observations", e.target.value)}
                                          placeholder="Observations..."
                                          rows={2}
                                        />
                                      </div>
                            
                                      <div>
                                        <label className="fw-semibold small">Possible Diagnosis</label>
                                        <input
                                          className="form-control"
                                          value={notes.questions}
                                          onChange={(e) => updateNoteField("questions", e.target.value)}
                                          placeholder="Possible diagnosis..."
                                        />
                                      </div>
                                      <Link to="/menu" className={`btn ${styles.mainButtonPrimary}`} id={styles.backtoMenu}>
                                        Back to Menu
                                    </Link>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPatientChart && (
                <div
                    className={styles.modalOverlay}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setShowPatientChart(false);
                    }}
                >
                    <div
                        className={`${styles.modalBox} ${styles.patientChartModal}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="patient-chart-title"
                    >
                        <button
                            className={styles.closeButton}
                            onClick={() => setShowPatientChart(false)}
                            aria-label="Close patient chart"
                        >
                            X
                        </button>

                        <h2 id="patient-chart-title" className="mb-1">Patient Chart</h2>
                        <p className={styles.patientChartIntro}>
                            Patient details come from the session record. Other sections contain sample practice data.
                        </p>
                        <div className={styles.patientChartSections}>
                            {patientChartSections.map((section) => (
                                <section className={styles.patientChartSection} key={section.title}>
                                    <div className={styles.patientChartSectionHeader}>
                                        <h3>{section.title}</h3>
                                        <span>{section.source}</span>
                                    </div>
                                    <dl>
                                        {section.fields.map((field) => (
                                            <div className={styles.patientChartField} key={field.label}>
                                                <dt>{field.label}</dt>
                                                <dd>{field.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </section>
                            ))}
                        </div>
                        {/*<button
                            className={styles.patientChartCloseButton}
                            onClick={() => setShowPatientChart(false)}
                        >
                            Close Patient Chart
                        </button>*/}
                    </div>
                </div>
            )}

            {showNotes && (
                <Notes
                    notes={notes}
                    setNotes={setNotes}
                    patient={patient}
                    onClose={() => setShowNotes(false)}
                />
            )}

            <div className="col-md-4">
                <div className={`h-100 p-4 ${styles.Panel} `} id={styles.rightPanel}>
                    <ul className="list-group list-group-flush" ref={messagesListRef}>
                        {messages.map((message, index) =>
                            index % 2 === 0 ? (
                                <li key={index} className="list-group-item m-3 w-50 rounded">
                                    <span>
                                        <strong>You:</strong> {message}
                                    </span>
                                </li>
                            ) : (
                                <li
                                    key={index}
                                    className="list-group-item m-3 w-50 rounded align-self-end"
                                >
                                    <span>
                                        <strong>Patient:</strong> {message}
                                    </span>
                                </li>
                            ),
                        )}
                    </ul>
                    <div className={`${styles.inputWrapper} input-group mb-3`}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Message"
                            ref={messageInputRef}
                            onKeyDown={e => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    const input = e.target;
                                    onSubmitMessage(input.value);
                                    input.value = '';
                                }
                            }}
                        ></input>
                        <div className="input-group-append">
                            <button
                                className="input-group-text"
                                id="basic-addon2"
                                onClick={() => {
                                    const input = messageInputRef.current;
                                    
                                     if (!input || !input.value.trim()) return;

                                    onSubmitMessage(input.value);
                                    
                                     input.value = '';
                                }}
                            >
                                Send
                            </button>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
