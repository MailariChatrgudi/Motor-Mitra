import { useState, useEffect } from 'react';
import './MechanicDashboard.css';
import translations from '../utils/translations';

// MechanicDashboard receives lang prop from App.jsx — mechanic can use English even if farmer chose Kannada
const MechanicDashboard = ({ lang }) => {
  // Get the right translation object
  const t = translations[lang] || translations['en'];

  const [isAvailable, setIsAvailable] = useState(true);
  const [newJobAlert, setNewJobAlert] = useState(false);
  const [jobStage, setJobStage] = useState('waiting');
  const [jobRequest, setJobRequest] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [allChecked, setAllChecked] = useState(false);

  // Fetch pending repair requests from backend every 10 seconds
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests`);
        const data = await response.json();

        // Find a pending job
        const activeReq = data.find(req => req.status === 'Pending' || req.status === 'Accepted');

        if (activeReq && !jobRequest) {
          // Flash notification — new job arrived
          document.title = '🔔 NEW JOB! — MotorMitra';
          setNewJobAlert(true);
          setTimeout(() => setNewJobAlert(false), 4000);
        }

        if (activeReq) {
          setJobRequest({
            id: activeReq._id || activeReq.id,
            fault: activeReq.aiDiagnosis?.faultCategory || 'Unknown Fault',
            farmerName: activeReq.farmerName,
            phoneNumber: activeReq.phoneNumber || activeReq.phone,
            farmerLat: activeReq.farmerLat,
            farmerLng: activeReq.farmerLng,
            distance: activeReq.assignedMechanic?.distanceKm
              ? `${activeReq.assignedMechanic.distanceKm} km`
              : '~5 km',
            estimatedTime: activeReq.aiDiagnosis?.estimatedTime || '1.5 hours',
            needsCrane: activeReq.aiDiagnosis?.motorPullRequired,
            urgency: activeReq.aiDiagnosis?.urgency || 'Today',
            estimatedCost: activeReq.aiDiagnosis?.estimatedCost || '₹500-₹1500',
            mechanicInstructions: activeReq.aiDiagnosis?.mechanicInstructions || '',
            parts: activeReq.aiDiagnosis?.parts || [],
            tools: activeReq.aiDiagnosis?.tools || [],
            packingList: [
              ...(activeReq.aiDiagnosis?.parts || []),
              ...(activeReq.aiDiagnosis?.tools || [])
            ]
          });

          setJobStage(activeReq.status === 'Pending' ? 'incoming' : 'active');
        } else {
          setJobStage('waiting');
          setJobRequest(null);
          document.title = 'MotorMitra';
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  // When a checkbox is ticked, check if ALL items are now ticked
  const handleCheckItem = (item) => {
    const updatedChecks = { ...checkedItems, [item]: !checkedItems[item] };
    setCheckedItems(updatedChecks);

    // See if every single item is checked
    let allDone = true;
    if (jobRequest && jobRequest.packingList) {
      for (let i = 0; i < jobRequest.packingList.length; i++) {
        if (!updatedChecks[jobRequest.packingList[i]]) {
          allDone = false;
          break;
        }
      }
    }
    setAllChecked(allDone);
  };

  // Called when mechanic clicks Accept Job
  const handleAcceptJob = async () => {
    if (!allChecked || !jobRequest) return;

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests/${jobRequest.id}/accept`, {
        method: 'PATCH'
      });
      setJobStage('active');
    } catch (err) {
      console.error('Failed to accept job:', err);
      alert('Could not accept job. Check connection.');
    }
  };

  // Called when mechanic marks job complete
  const handleCompleteJob = async () => {
    if (!jobRequest) return;

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/requests/${jobRequest.id}/complete`, {
        method: 'PATCH'
      });
    } catch (err) {
      console.error('Failed to mark complete:', err);
    }

    // Reset dashboard to waiting state
    setJobStage('waiting');
    setJobRequest(null);
    setAllChecked(false);
    setCheckedItems({});
    document.title = 'MotorMitra';
  };

  // Open phone dialler
  const callFarmer = () => {
    if (jobRequest?.phoneNumber) {
      window.open(`tel:${jobRequest.phoneNumber}`);
    }
  };

  // Open Google Maps with farmer's GPS coordinates
  const openGPS = () => {
    const lat = jobRequest?.farmerLat;
    const lng = jobRequest?.farmerLng;
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
    } else {
      alert('GPS coordinates not available for this job.');
    }
  };

  // Count how many items are checked (for progress display)
  const checkedCount = jobRequest
    ? jobRequest.packingList.filter(item => checkedItems[item]).length
    : 0;
  const totalItems = jobRequest ? jobRequest.packingList.length : 0;
  const progressPercent = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="md-wrapper">

      {/* Flash banner when new job arrives */}
      {newJobAlert && (
        <div className="md-new-job-flash">
          {t.dashNewAlert}
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside className="md-sidebar">

        {/* Mechanic profile card */}
        <div className="md-profile-card">
          <div className="md-avatar">👨‍🔧</div>
          <h2 className="md-name">Hanumanth Gouda</h2>
          <p className="md-shop">Sri Lakshmi Motor Rewinding</p>
          <p className="md-phone">📞 +91 9876543210</p>
        </div>

        {/* Status toggle */}
        <div className="md-status-card">
          <p className="md-status-label">{t.dashYourStatus}</p>
          <button
            className={`md-status-btn ${isAvailable ? 'md-status-on' : 'md-status-off'}`}
            onClick={() => setIsAvailable(!isAvailable)}
          >
            <span className={`md-status-dot ${isAvailable ? 'dot-green' : 'dot-red'}`}></span>
            {isAvailable ? t.dashAvailable : t.dashBusy}
          </button>
          <p className="md-status-hint">{t.dashTapToggle}</p>
        </div>

        {/* Quick stats */}
        <div className="md-stats-row">
          <div className="md-stat-pill">
            <span className="md-stat-num">3</span>
            <span className="md-stat-lbl">{t.dashJobsToday}</span>
          </div>
          <div className="md-stat-pill">
            <span className="md-stat-num">⭐ 4.8</span>
            <span className="md-stat-lbl">{t.dashRating}</span>
          </div>
          <div className="md-stat-pill">
            <span className="md-stat-num">312</span>
            <span className="md-stat-lbl">{t.dashTotalJobs}</span>
          </div>
        </div>

        {/* What this app does — quick info */}
        <div className="md-info-tip">
          <p>🔄 {t.dashRefreshTip} <strong>{t.dashRefreshSec}</strong> {t.dashRefreshAuto}</p>
        </div>

      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="md-main">

        {/* ── STAGE 1: WAITING ── */}
        {jobStage === 'waiting' && (
          <div className="md-card md-waiting">
            <div className="md-waiting-ring">
              <div className="md-ring-spinner"></div>
            </div>
            <h2 className="md-waiting-title">{t.dashWaitingTitle}</h2>
            <p className="md-waiting-sub">
              {isAvailable ? t.dashWaitingOnline : t.dashWaitingBusy}
            </p>
            {!isAvailable && (
              <button
                className="md-go-online-btn"
                onClick={() => setIsAvailable(true)}
              >
                {t.dashGoOnline}
              </button>
            )}
          </div>
        )}

        {/* ── STAGE 2: INCOMING JOB ── */}
        {jobStage === 'incoming' && jobRequest && (
          <div className="md-card md-incoming">

            {/* Top alert banner */}
            <div className="md-incoming-banner">
              <span className="md-incoming-pulse"></span>
              <span>{t.dashNewJob}</span>
            </div>

            {/* Fault + urgency row */}
            <div className="md-fault-row">
              <div className="md-fault-tag">
                <span className="md-fault-label">{t.dashFaultDetected}</span>
                <span className="md-fault-name">{jobRequest.fault}</span>
              </div>
              <div className={`md-urgency-tag md-urgency-${jobRequest.urgency?.toLowerCase().replace(' ', '-')}`}>
                🔴 {jobRequest.urgency}
              </div>
            </div>

            {/* Job info grid */}
            <div className="md-job-grid">
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashFarmer}</span>
                <span className="md-cell-value">{jobRequest.farmerName}</span>
              </div>
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashPhone}</span>
                <span className="md-cell-value">{jobRequest.phoneNumber || 'N/A'}</span>
              </div>
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashDistance}</span>
                <span className="md-cell-value">{jobRequest.distance}</span>
              </div>
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashEstRepair}</span>
                <span className="md-cell-value">{jobRequest.estimatedTime}</span>
              </div>
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashEstCost}</span>
                <span className="md-cell-value">{jobRequest.estimatedCost}</span>
              </div>
              <div className="md-job-cell">
                <span className="md-cell-label">{t.dashMotorPull}</span>
                <span className={`md-cell-value ${jobRequest.needsCrane ? 'text-red' : 'text-green'}`}>
                  {jobRequest.needsCrane ? t.dashPullYes : t.dashPullNo}
                </span>
              </div>
            </div>

            {/* Crane warning if motor needs to be pulled */}
            {jobRequest.needsCrane && (
              <div className="md-crane-warning">
                ⚠️ {t.dashCraneWarning}
              </div>
            )}

            {/* Mechanic instructions from AI */}
            {jobRequest.mechanicInstructions && (
              <div className="md-instructions-box">
                <p className="md-instructions-label">{t.dashAiInstructions}</p>
                <p className="md-instructions-text">{jobRequest.mechanicInstructions}</p>
              </div>
            )}

            {/* PACKING CHECKLIST */}
            <div className="md-checklist">
              <div className="md-checklist-header">
                <h3 className="md-checklist-title">{t.dashChecklistTitle}</h3>
                <div className="md-progress-pill">
                  {checkedCount}/{totalItems} {t.dashPacked}
                </div>
              </div>

              {/* Progress bar */}
              <div className="md-progress-bar-bg">
                <div
                  className="md-progress-bar-fill"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>

              <p className="md-checklist-hint">{t.dashChecklistHint}</p>

              {/* Two column checklist */}
              <div className="md-checklist-grid">
                {/* Parts section */}
                {jobRequest.parts.length > 0 && (
                  <div className="md-checklist-section">
                    <p className="md-section-label">{t.dashPartsBring}</p>
                    {jobRequest.parts.map((part, idx) => (
                      <label key={`part-${idx}`} className="md-check-row">
                        <input
                          type="checkbox"
                          checked={checkedItems[part] || false}
                          onChange={() => handleCheckItem(part)}
                          className="md-checkbox"
                        />
                        <span className={checkedItems[part] ? 'md-check-done' : ''}>{part}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Tools section */}
                {jobRequest.tools.length > 0 && (
                  <div className="md-checklist-section">
                    <p className="md-section-label">{t.dashToolsCarry}</p>
                    {jobRequest.tools.map((tool, idx) => (
                      <label key={`tool-${idx}`} className="md-check-row">
                        <input
                          type="checkbox"
                          checked={checkedItems[tool] || false}
                          onChange={() => handleCheckItem(tool)}
                          className="md-checkbox"
                        />
                        <span className={checkedItems[tool] ? 'md-check-done' : ''}>{tool}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Accept button — only active when all items are checked */}
            <button
              className={`md-accept-btn ${allChecked ? 'md-accept-ready' : 'md-accept-locked'}`}
              onClick={handleAcceptJob}
              disabled={!allChecked}
            >
              {allChecked
                ? t.dashAcceptReady
                : `${t.dashCheck} ${totalItems - checkedCount} ${t.dashAcceptLocked}`}
            </button>

          </div>
        )}

        {/* ── STAGE 3: ACTIVE JOB ── */}
        {jobStage === 'active' && jobRequest && (
          <div className="md-card md-active">

            {/* Green travelling banner */}
            <div className="md-travelling-banner">
              <span className="md-live-dot"></span>
              {t.dashTravelling}
            </div>

            {/* Big action buttons */}
            <div className="md-action-grid">
              <button className="md-action-card md-call-card" onClick={callFarmer}>
                <span className="md-action-icon">📞</span>
                <span className="md-action-label">{t.dashCallFarmer}</span>
                <span className="md-action-sub">{jobRequest.phoneNumber || t.dashTapToCall}</span>
              </button>
              <button className="md-action-card md-map-card" onClick={openGPS}>
                <span className="md-action-icon">🗺️</span>
                <span className="md-action-label">{t.dashNavigate}</span>
                <span className="md-action-sub">{t.dashMapsHint}</span>
              </button>
            </div>

            {/* Crane warning */}
            {jobRequest.needsCrane && (
              <div className="md-crane-warning">
                ⚠️ {t.dashCraneWarningActive}
              </div>
            )}

            {/* Job summary */}
            <div className="md-active-job-summary">
              <h3 className="md-summary-title">{t.dashJobSummary}</h3>
              <div className="md-summary-grid">
                <div className="md-summary-row">
                  <span className="md-summary-label">{t.dashJobFarmer}</span>
                  <span className="md-summary-value">{jobRequest.farmerName}</span>
                </div>
                <div className="md-summary-row">
                  <span className="md-summary-label">{t.dashJobFault}</span>
                  <span className="md-summary-value">{jobRequest.fault}</span>
                </div>
                <div className="md-summary-row">
                  <span className="md-summary-label">{t.dashJobRepairTime}</span>
                  <span className="md-summary-value">{jobRequest.estimatedTime}</span>
                </div>
                <div className="md-summary-row">
                  <span className="md-summary-label">{t.dashJobCost}</span>
                  <span className="md-summary-value">{jobRequest.estimatedCost}</span>
                </div>
              </div>
            </div>

            {/* Parts reminder */}
            {jobRequest.parts.length > 0 && (
              <div className="md-parts-reminder">
                <p className="md-parts-reminder-title">{t.dashPartsYouPacked}</p>
                <div className="md-parts-tags">
                  {jobRequest.parts.map((part, idx) => (
                    <span key={idx} className="md-part-tag">{part}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Complete job button */}
            <button className="md-complete-btn" onClick={handleCompleteJob}>
              {t.dashComplete}
            </button>

          </div>
        )}

      </main>
    </div>
  );
};

export default MechanicDashboard;