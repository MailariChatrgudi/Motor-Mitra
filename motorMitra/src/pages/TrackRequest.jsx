import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TrackRequest.css';
import translations from '../utils/translations';

// Helper: parse estimated time string like "1.5 hours" or "1.5 ಗಂಟೆ" into minutes
function parseEstimatedMinutes(timeStr) {
  if (!timeStr) return 60;
  const match = timeStr.match(/[\d.]+/);
  if (!match) return 60;
  const num = parseFloat(match[0]);
  if (timeStr.toLowerCase().includes('min') || timeStr.includes('ನಿಮಿಷ')) {
    return Math.round(num);
  }
  return Math.round(num * 60);
}

// Countdown timer component — shows MM:SS format
function CountdownTimer({ totalMinutes, t }) {
  const totalSeconds = totalMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    setSecondsLeft(totalMinutes * 60);
  }, [totalMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const minsStr = String(mins).padStart(2, '0');
  const secsStr = String(secs).padStart(2, '0');

  const isDone = secondsLeft <= 0;
  const isUrgent = secondsLeft > 0 && secondsLeft < 300; // last 5 mins = red

  return (
    <div className={`tr-timer ${isUrgent ? 'tr-timer-urgent' : ''} ${isDone ? 'tr-timer-done' : ''}`}>
      {isDone ? (
        <>
          <div className="tr-timer-display">✅</div>
          <p className="tr-timer-label">{t.timerArrived}</p>
        </>
      ) : (
        <>
          <div className="tr-timer-display">{minsStr}:{secsStr}</div>
          <p className="tr-timer-label">{t.timerLabel}</p>
        </>
      )}
    </div>
  );
}

// Status step progress indicator
function StatusSteps({ status, t }) {
  const steps = [
    { id: 'Pending', label: t.stepSent, icon: '📋' },
    { id: 'Accepted', label: t.stepOnWay, icon: '🚗' },
    { id: 'Complete', label: t.stepDone, icon: '✅' },
  ];

  let currentStepIndex = 0;
  if (status === 'Accepted') currentStepIndex = 1;
  if (status === 'Complete') currentStepIndex = 2;

  return (
    <div className="tr-steps">
      {steps.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isCurrent = idx === currentStepIndex;
        return (
          <div key={step.id} className="tr-step-item">
            <div className={`tr-step-circle ${isDone ? 'step-done' : isCurrent ? 'step-current' : 'step-pending'}`}>
              {isDone ? '✓' : step.icon}
            </div>
            <span className={`tr-step-label ${isCurrent ? 'step-label-current' : ''}`}>
              {step.label}
            </span>
            {idx < steps.length - 1 && (
              <div className={`tr-step-line ${isDone ? 'line-done' : 'line-pending'}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// TrackRequest page — receives lang prop from App.jsx
const TrackRequest = ({ lang }) => {
  const t = translations[lang] || translations['en'];
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch latest request every 5 seconds — logic unchanged
  useEffect(() => {
    const fetchLatestRequest = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests`);
        const data = await response.json();
        if (data && data.length > 0) {
          setRequest(data[data.length - 1]);
        } else {
          setRequest(null);
        }
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      }
      setLoading(false);
    };

    fetchLatestRequest();
    const interval = setInterval(fetchLatestRequest, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="tr-loading">
        <div className="tr-loading-spinner"></div>
        <p>{t.trackLoading}</p>
      </div>
    );
  }

  // No requests — tell farmer to send one first
  if (!request) {
    return (
      <div className="tr-empty">
        <div className="tr-empty-icon">🔍</div>
        <h2 className="tr-empty-title">{t.trackNoRequest}</h2>
        <p className="tr-empty-sub">{t.trackNoRequestSub}</p>
        <Link to="/request" className="tr-empty-btn">
          {t.trackRequestBtn}
        </Link>
      </div>
    );
  }

  const estimatedMins = parseEstimatedMinutes(request.aiDiagnosis?.estimatedTime);
  const showTimer = request.status === 'Accepted';

  return (
    <div className="tr-wrapper">

      {/* Page header */}
      <div className="tr-header">
        <h1 className="tr-title">{t.trackTitle}</h1>
        <p className="tr-subtitle">{t.trackSubtitle}</p>
      </div>

      <div className="tr-layout">

        {/* LEFT — Main tracking card */}
        <div className="tr-main">

          {/* Status progress steps */}
          <div className="tr-card">
            <h2 className="tr-card-title">{t.sectionStatus}</h2>
            <StatusSteps status={request.status} t={t} />

            <div className={`tr-status-banner tr-status-${request.status?.toLowerCase()}`}>
              {request.status === 'Pending' && t.statusPending}
              {request.status === 'Accepted' && t.statusAccepted}
              {request.status === 'Complete' && t.statusComplete}
            </div>
          </div>

          {/* Countdown timer */}
          {showTimer && (
            <div className="tr-card">
              <h2 className="tr-card-title">{t.sectionArrival}</h2>
              <CountdownTimer totalMinutes={estimatedMins} t={t} />
              <p className="tr-timer-note">{t.timerNote}</p>
            </div>
          )}


          {request.status === 'Complete' && (
            <div className="tr-card tr-rating-card">
              <h2 className="tr-card-title">{t.rateMechanic}</h2>
              <div className="tr-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`tr-star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                    onClick={() => {
                      setRating(star);
                      setTimeout(() => navigate('/'), 400);
                    }}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {star <= (hoverRating || rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Diagnosis summary */}
          {request.status !== 'Complete' && (
            <div className="tr-card">
              <h2 className="tr-card-title">{t.sectionDiagnosis}</h2>
            <div className="tr-diagnosis-grid">
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagFault}</span>
                <span className="tr-diag-value tr-fault-highlight">
                  {request.aiDiagnosis?.faultCategory || '...'}
                </span>
              </div>
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagMotorType}</span>
                <span className="tr-diag-value">{request.motorType}</span>
              </div>
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagMotorPull}</span>
                <span className={`tr-diag-value ${request.aiDiagnosis?.motorPullRequired ? 'text-red' : 'text-green'}`}>
                  {request.aiDiagnosis?.motorPullRequired ? t.diagPullYes : t.diagPullNo}
                </span>
              </div>
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagCost}</span>
                <span className="tr-diag-value">{request.aiDiagnosis?.estimatedCost || (lang === 'kn' ? 'ನಂತರ ತಿಳಿಸಲಾಗುವುದು' : 'TBD')}</span>
              </div>
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagTime}</span>
                <span className="tr-diag-value">{request.aiDiagnosis?.estimatedTime || (lang === 'kn' ? 'ನಂತರ ತಿಳಿಸಲಾಗುವುದು' : 'TBD')}</span>
              </div>
              <div className="tr-diag-row">
                <span className="tr-diag-label">{t.diagUrgency}</span>
                <span className="tr-diag-value">{request.aiDiagnosis?.urgency || (lang === 'kn' ? 'ಇವತ್ತು' : 'Today')}</span>
              </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT — Mechanic info */}
        {request.status !== 'Complete' && (
          <div className="tr-sidebar">

            <div className="tr-card tr-mechanic-card">
            <h2 className="tr-card-title">{t.sectionMechanic}</h2>
            <div className="tr-mech-avatar">👨‍🔧</div>
            <h3 className="tr-mech-name">{
              (lang === 'kn' && request.assignedMechanic?.nameKn) 
                ? request.assignedMechanic.nameKn 
                : (request.assignedMechanic?.name || (lang === 'kn' ? 'ನೇಮಿಸಿದ ಮೆಕ್ಯಾನಿಕ್' : 'Assigned Mechanic'))
            }</h3>
            <p className="tr-mech-shop">{request.assignedMechanic?.shopName || ''}</p>

            <div className="tr-mech-stats">
              <div className="tr-mech-stat">
                <span className="tr-mech-stat-num">⭐ {request.assignedMechanic?.rating || '4.8'}</span>
                <span className="tr-mech-stat-lbl">{t.mechRating}</span>
              </div>
              <div className="tr-mech-stat">
                <span className="tr-mech-stat-num">{request.assignedMechanic?.experience || '10'}yr</span>
                <span className="tr-mech-stat-lbl">{t.mechExp}</span>
              </div>
              <div className="tr-mech-stat">
                <span className="tr-mech-stat-num">{request.assignedMechanic?.completedJobs || '300'}+</span>
                <span className="tr-mech-stat-lbl">{t.mechJobs}</span>
              </div>
            </div>

            {request.assignedMechanic?.phone && (
              <a href={`tel:${request.assignedMechanic.phone}`} className="tr-call-btn">
                {t.mechCall}
              </a>
            )}

            {request.aiDiagnosis?.motorPullRequired && (
              <div className="tr-vehicle-note">{t.mechVehicle}</div>
            )}
          </div>

          {/* Your request summary */}
          <div className="tr-card">
            <h2 className="tr-card-title">{t.sectionRequest}</h2>
            <div className="tr-request-summary">
              <p><strong>{t.reqName}:</strong> {request.farmerName}</p>
              <p><strong>{t.reqPhone}:</strong> {request.phoneNumber}</p>
              <p><strong>{t.reqMotor}:</strong> {request.motorType}</p>
              <p><strong>{t.reqProblem}:</strong> {request.symptoms?.substring(0, 80)}{request.symptoms?.length > 80 ? '...' : ''}</p>
            </div>
          </div>

            <Link to="/request" className="tr-new-request-link">
              {t.trackNewRequest}
            </Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default TrackRequest;