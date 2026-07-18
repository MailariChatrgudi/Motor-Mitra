import React from 'react';
import './MechanicCard.css';
import translations from '../utils/translations';

// MechanicCard receives lang prop so it shows text in correct language
const MechanicCard = ({ mechanic, confirmMechanic, lang }) => {
  const t = translations[lang] || translations['en'];

  const onConfirmMechanic = () => {
    confirmMechanic(mechanic);
  };

  // Pick the right shop name and location based on selected language
  const mechName = lang === 'kn' && mechanic.nameKn ? mechanic.nameKn : mechanic.name;
  const shopName = lang === 'kn' && mechanic.shopNameKn ? mechanic.shopNameKn : mechanic.shopName;
  const location = lang === 'kn' && mechanic.locationKn ? mechanic.locationKn : mechanic.location;
  const availability = lang === 'kn' && mechanic.availabilityKn ? mechanic.availabilityKn : mechanic.availability;

  return (
    <div className="mechanic-card">
      <div className="mechanic-card__header">
        <h3 className="mechanic-name">{mechName}</h3>
        <span className="mechanic-rating">⭐ {mechanic.rating}</span>
      </div>

      <p className="mechanic-shop">🏢 {shopName}</p>
      <p className="mechanic-location" style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 8px' }}>
        📍 {location}
      </p>

      <div className="mechanic-details">
        <div className="detail-item">
          <span className="detail-label">{t.mechExp}</span>
          <span className="detail-value">{mechanic.experience} {lang === 'kn' ? 'ವರ್ಷ' : 'Years'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">{t.mechJobs}</span>
          <span className="detail-value">{mechanic.completedJobs}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">{lang === 'kn' ? 'ಸ್ಥಿತಿ' : 'Status'}</span>
          <span className={`detail-value status-${mechanic.availability?.toLowerCase()}`}>
            {availability}
          </span>
        </div>
      </div>

      <div className={`mechanic-vehicle ${mechanic.hasVehicle ? 'has-vehicle' : 'no-vehicle'}`}>
        {mechanic.hasVehicle
          ? (lang === 'kn' ? '🚛 ವಾಹನ ಇದೆ — ಮೋಟರ್ ತೆಗೆಯಬಹುದು' : '🚛 Has Vehicle — Can Pull Motor')
          : (lang === 'kn' ? '🔧 ಹೊಲದಲ್ಲೇ ರಿಪೇರಿ ಮಾಡ್ತಾರೆ' : '🔧 Field Repair Only')}
      </div>

      <button className="confirm-mechanic-btn" type="button" onClick={onConfirmMechanic}>
        {lang === 'kn' ? 'ಈ ಮೆಕ್ಯಾನಿಕ್ ಆಯ್ಕೆ ಮಾಡಿ' : 'Confirm Mechanic'}
      </button>
    </div>
  );
};

export default MechanicCard;
