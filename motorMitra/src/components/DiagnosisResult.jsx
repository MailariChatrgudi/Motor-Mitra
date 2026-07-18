

const DiagnosisResult = (props) => {
    const { aiResponse, getAiDiagnosis, handleFindMechanic } = props

    // Helper to get severity color class
    const getSeverityClass = (severity) => {
        if (!severity) return '';
        const s = severity.toLowerCase();
        if (s === 'low') return 'severity-low';
        if (s === 'medium') return 'severity-medium';
        if (s === 'high') return 'severity-high';
        return '';
    };

    const onFindMechanic=()=>{
        handleFindMechanic()
    }

    if (!aiResponse) return null;

    if (typeof aiResponse === 'string') {
        return (
            <div className="ai-result-card error-card">
                <h2 className="ai-result-card__title">⚠️ Error</h2>
                <p className="error-text">{aiResponse}</p>
                <button type="button" onClick={() => getAiDiagnosis()} className="submit-btn" style={{ marginTop: '10px' }}>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="ai-result-card">
            <h2 className="ai-result-card__title">AI Diagnosis Result</h2>

            <div className="ai-result-row">
                <span className="ai-result-label">Fault</span>
                <span className="ai-result-value fault-highlight">{aiResponse.faultCategory}</span>
            </div>

            <div className="ai-result-row">
                <span className={`ai-result-label ${getSeverityClass(aiResponse.confidence)}`}>Confidence</span>
                <span className={`ai-result-value confidence-${aiResponse.confidence?.toLowerCase()}`}>
                    {aiResponse.confidence}
                </span>
            </div>

            <div className="ai-result-row">
                <span className="ai-result-label">Pull Motor?</span>
                <span className="ai-result-value">
                    {aiResponse.motorPullRequired ? "🚜 Yes (Crane/Vehicle needed)" : "🔧 No (Surface repair)"}
                </span>
            </div>

            <div className="ai-result-row">
                <span className="ai-result-label">Urgency</span>
                <span className="ai-result-value">{aiResponse.urgency}</span>
            </div>

            <div className="ai-result-row">
                <span className="ai-result-label">Est. Cost</span>
                <span className="ai-result-value">{aiResponse.estimatedCost}</span>
            </div>

            <div className="ai-result-row">
                <span className="ai-result-label">Est. Time</span>
                <span className="ai-result-value">{aiResponse.estimatedTime}</span>
            </div>

            <div className="ai-result-row">
                <span className="ai-result-label">Parts Needed</span>
                <span className="ai-result-value">
                    {aiResponse.parts ? aiResponse.parts.join(", ") : "None"}
                </span>
            </div>

            <button type="button" onClick={onFindMechanic} className="submit-btn" style={{ marginTop: '20px' }}>
                Find Mechanic For This Fault
            </button>
        </div>
    );
};

export default DiagnosisResult