import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import generateText, { translateDiagnosis } from '../services/gemini';
import MechanicCard from '../components/MechanicCard';
import './RequestRepair.css';
import DiagnosisResult from '../components/DiagnosisResult';
import translations from '../utils/translations';

// RequestRepair receives lang prop from App.jsx
const RequestRepair = ({ lang }) => {
  const navigate = useNavigate();

  // Get the right translation object
  const t = translations[lang] || translations['en'];

  // Form field values — all logic is exactly the same as before
  const [farmerName, setFarmerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [motorType, setMotorType] = useState('');
  const [symptoms, setSymptoms] = useState('');
  // photoFile is optional — can be null
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // GPS coordinates
  const [gpsLocation, setGpsLocation] = useState(null);

  // Mechanic list from backend
  const [mechanics, setMechanics] = useState([]);

  // UI states
  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  // Filter options for mechanic list
  const [filterAvailability, setFilterAvailability] = useState('All');
  const [filterRating, setFilterRating] = useState('All');

  // Gets GPS from browser — logic unchanged
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert(t.alertFillAll);
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(5);
        const lng = position.coords.longitude.toFixed(5);
        setLocation(`Lat: ${lat}, Lng: ${lng}`);
        setGpsLocation({ lat, lng });
        setGpsLoading(false);
      },
      (error) => {
        alert("Could not get GPS. Please type your location.");
        setGpsLoading(false);
      }
    );
  };

  // Handles photo file selection — logic unchanged
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  // Remove the selected photo — logic unchanged
  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // Sends symptoms + motor type + optional photo to AI
  // If lang is Kannada, translate the result after getting English result
  const getAiDiagnosis = async () => {
    setLoading(true);
    setAiResponse(null);

    // Always get English result first (AI always responds in English)
    const englishResult = await generateText(symptoms, motorType, photoFile);

    if (lang === 'kn' && englishResult && typeof englishResult === 'object') {
      // Translate the diagnosis values into Kannada
      const kannadaResult = await translateDiagnosis(englishResult);
      setAiResponse(kannadaResult);
    } else {
      // English mode — use the AI result directly
      setAiResponse(englishResult);
    }

    setLoading(false);
  };

  // Form submit handler — logic unchanged
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!farmerName || !phoneNumber || !motorType || !symptoms || !location) {
      alert(t.alertFillAll);
      return;
    }

    if (motorType === t.motorTypeOptions[0]) {
      alert(t.alertSelectMotor);
      return;
    }

    await getAiDiagnosis();
  };

  // Calls backend to find best matching mechanics — logic unchanged
  const getMatchingMechanic = async () => {
    setLoading(true);
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/api/match-mechanic`;
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gpsLocation, aiResponse, motorType })
      };
      const response = await fetch(api, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setMechanics(data);
    } catch (e) {
      console.error("Mechanic matching failed:", e);
      alert("Could not find mechanics. Please try again.");
    }
    setLoading(false);
  };

  // Renders the repair request form — text replaced with t.xxx
  const renderForm = () => {
    return (
      <>
        <div className="repair-page__header">
          <span className="mm-eyebrow">{t.repairEyebrow}</span>
          <h1 className="repair-page__title">{t.repairTitle}</h1>
          <p className="repair-page__subtitle">{t.repairSubtitle}</p>
        </div>

        <div className="repair-form-card">
          <form onSubmit={handleSubmit}>

            {/* Farmer Name */}
            <div className="form-group">
              <label htmlFor="farmer-name">
                {t.labelName} <span className="required-star">*</span>
              </label>
              <input
                id="farmer-name"
                type="text"
                className="form-input"
                placeholder={t.placeholderName}
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone-number">
                {t.labelPhone} <span className="required-star">*</span>
              </label>
              <input
                id="phone-number"
                type="tel"
                className="form-input"
                placeholder={t.placeholderPhone}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Location with GPS button */}
            <div className="form-group">
              <label htmlFor="location">
                {t.labelLocation} <span className="required-star">*</span>
              </label>
              <div className="location-row">
                <input
                  id="location"
                  type="text"
                  className="form-input"
                  placeholder={t.placeholderLocation}
                  value={location}
                  readOnly
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  className="location-btn"
                  onClick={fetchLocation}
                  disabled={gpsLoading}
                >
                  {gpsLoading ? t.btnGpsLoading : t.btnGps}
                </button>
              </div>
              <span className="field-hint">{t.hintLocation}</span>
            </div>

            <div className="form-divider"></div>

            {/* Motor Type dropdown — options come from translations */}
            <div className="form-group">
              <label htmlFor="motor-type">
                {t.labelMotorType} <span className="required-star">*</span>
              </label>
              <select
                id="motor-type"
                className="form-select"
                value={motorType}
                onChange={(e) => setMotorType(e.target.value)}
              >
                {t.motorTypeOptions.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Problem description */}
            <div className="form-group">
              <label htmlFor="symptoms">
                {t.labelSymptoms} <span className="required-star">*</span>
              </label>
              <textarea
                id="symptoms"
                className="form-textarea"
                placeholder={t.placeholderSymptoms}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <span className="field-hint">{t.hintSymptoms}</span>
            </div>

            {/* Photo Upload — OPTIONAL */}
            <div className="form-group">
              <label>
                {t.labelPhoto}
                <span className="optional-tag"> {t.labelPhotoOptional}</span>
              </label>

              {!photoPreview && (
                <label htmlFor="motor-photo" className="photo-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    id="motor-photo"
                    style={{ display: 'none' }}
                  />
                  <div className="photo-upload-icon">📷</div>
                  <p className="photo-upload-text">
                    <strong>{t.photoUploadText}</strong>
                  </p>
                  <p className="photo-upload-text photo-upload-subtext">
                    {t.photoUploadSub}
                  </p>
                </label>
              )}

              {photoPreview && (
                <div className="photo-preview-box">
                  <img
                    src={photoPreview}
                    alt="Selected motor photo"
                    className="photo-preview-img"
                  />
                  <div className="photo-preview-info">
                    <span className="photo-preview-name">✅ {photoFile.name}</span>
                    <button
                      type="button"
                      className="photo-remove-btn"
                      onClick={removePhoto}
                    >
                      {t.photoRemove}
                    </button>
                  </div>
                </div>
              )}

              <span className="field-hint">
                {photoFile ? t.hintPhotoYes : t.hintPhotoNo}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="btn-loading-text">
                  <span className="spinner"></span>
                  {t.btnDiagnosing}
                </span>
              ) : (
                <>
                  {t.btnDiagnose}
                  {photoFile && <span className="btn-photo-badge">{t.btnWithPhoto}</span>}
                </>
              )}
            </button>

          </form>
        </div>
      </>
    );
  };

  // Renders the mechanic list after AI diagnosis
  const renderMechanics = () => {
    if (mechanics.length === 0) return null;

    // Apply user-chosen filters — logic unchanged
    const filteredMechanics = mechanics.filter(mech => {
      if (filterAvailability !== 'All' && mech.availability !== filterAvailability) return false;
      if (filterRating !== 'All') {
        const ratingNum = parseFloat(mech.rating);
        if (filterRating === '4.5+' && ratingNum < 4.5) return false;
        if (filterRating === '4.8+' && ratingNum < 4.8) return false;
      }
      return true;
    });

    return (
      <div className="mechanics-list-section" style={{ marginTop: '30px' }}>
        <h2 style={{ color: 'var(--green)', marginBottom: '16px' }}>{t.availableMechanics}</h2>

        {/* Filter dropdowns */}
        <div className="mechanic-filters" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={filterAvailability}
            onChange={e => setFilterAvailability(e.target.value)}
          >
            <option value="All">{t.allStatuses}</option>
            <option value="Available">{t.statusAvailable}</option>
            <option value="Busy">{t.statusBusy}</option>
          </select>

          <select
            className="form-select"
            style={{ width: 'auto' }}
            value={filterRating}
            onChange={e => setFilterRating(e.target.value)}
          >
            <option value="All">{t.anyRating}</option>
            <option value="4.5+">4.5+ Stars</option>
            <option value="4.8+">4.8+ Stars</option>
          </select>
        </div>

        {/* Mechanic cards */}
        <div className='mechanic-cards-list'>
          {filteredMechanics.length > 0 ? (
            filteredMechanics.map(mech => (
              <MechanicCard key={mech.id} mechanic={mech} confirmMechanic={confirmMechanic} lang={lang} />
            ))
          ) : (
            <p>{t.noMechanicsFilter}</p>
          )}
        </div>
      </div>
    );
  };

  // Called when farmer selects a mechanic and clicks Confirm — logic unchanged
  const confirmMechanic = async (mechanic) => {
    const api = `${import.meta.env.VITE_BACKEND_URL}/api/requests`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        farmerName,
        phoneNumber,
        location,
        farmerLat: gpsLocation ? gpsLocation.lat : null,
        farmerLng: gpsLocation ? gpsLocation.lng : null,
        motorType,
        symptoms,
        aiDiagnosis: aiResponse,
        assignedMechanic: mechanic,
        status: "Pending"
      })
    };
    const res = await fetch(api, options);
    const data = await res.json();
    console.log(data);
    navigate('/track');
  };

  return (
    <div className="repair-page">

      {/* Show form only when no AI result yet */}
      {!aiResponse && (
        <div className="repair-form-section">
          {renderForm()}
        </div>
      )}

      {/* Show AI diagnosis result */}
      <DiagnosisResult
        aiResponse={aiResponse}
        getAiDiagnosis={getAiDiagnosis}
        handleFindMechanic={getMatchingMechanic}
      />

      {/* Show mechanic list */}
      {renderMechanics()}

    </div>
  );
};

export default RequestRepair;