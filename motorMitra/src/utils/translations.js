// translations.js
// Two language objects: en (English) and kn (Kannada)
// Kannada is native spoken Karnataka style — how a farmer/mechanic in Koppal actually talks
// NOT formal/book Kannada

const translations = {

  en: {
    // Navbar
    navHome: "Home",
    navRequest: "Request Repair",
    navTrack: "Track Repair",
    navMechanic: "Mechanic Login",
    langToggle: "ಕನ್ನಡ",  // shown when English is active

    // Home Page - Hero
    heroTitle: "On-Field Motor Winding & Repair in Hours, Not Days.",
    heroSub: "MotorMitra uses multimodal AI to diagnose agricultural pump failures instantly and dispatches specialist mechanics directly to your borewell with the exact parts.",
    heroBtnRepair: "Request On-Site Repair",
    heroStatTime: "Avg Repair Time",
    heroStatCost: "City Transport Cost",
    heroStatRate: "Visit Fix Rate",

    // Home Page - Problem
    problemEyebrow: "The Problem",
    problemHeading: "Every Hour Without Water Costs a Farmer Money",
    problemBody1: "India has around 32 million irrigation pump motors. When a motor fails during crop season, farmers wait 1 to 3 days just to get it repaired. The mechanic comes unprepared, goes back to his shop, and returns — two trips become three. One day becomes three days.",
    problemBody2: "For water-sensitive crops, even one day without irrigation can reduce yield. Two or three days can destroy the crop completely.",
    problemQuote: `"I am not building this because of a hackathon theme. I am building this because I grew up in this problem. My father is a motor winding mechanic."`,
    problemQuoteAuthor: "— Mailari, Founder",
    problemCTA: "See the Solution",

    // Home Page - How it works
    flowEyebrow: "How It Works",
    flowTitle: "From failure to fresh water in four simple steps",
    flowSubtitle: "Designed for any farmer or CSC operator — no technical knowledge needed.",
    step1Title: "Motor Fails",
    step1Desc: "The farmer notices warning signs — a persistent hum, acrid burning odour, or the analog starter panel tripping repeatedly.",
    step1Bul1: "Loud hum or no-start condition",
    step1Bul2: "Burning smell from motor",
    step1Bul3: "Analog starter panel trips",
    step2Title: "Log the Issue",
    step2Desc: "Open MotorMitra, share your location, describe what happened, and tap submit — done in under 2 minutes.",
    step2Bul1: "Drop GPS pin at borewell",
    step2Bul2: "Describe problem in own words",
    step2Bul3: "Optional photo upload",
    step3Title: "Rapid On-Field Repair",
    step3Desc: "Our AI predicts the fault and parts required. The right mechanic arrives at the borewell prepared with every tool and part he needs.",
    step3Bul1: "AI reads description & photo",
    step3Bul2: "Parts list auto-generated",
    step3Bul3: "Best specialist dispatched",
    step4Title: "Crop Saved",
    step4Desc: "The motor hums back to life. Water flows to the field. Payment is settled right at the borewell — no city trip, no hidden cost.",
    step4Bul1: "Motor running — field watered",
    step4Bul2: "Transparent on-spot payment",
    step4Bul3: "Zero yield loss",

    // Home Page - Why MotorMitra
    whyEyebrow: "Why MotorMitra",
    whyTitle: "Every other service sends whoever is available. We send whoever is qualified.",
    whyCard1Title: "Right Mechanic, Right Fault",
    whyCard1Body: "We score every mechanic on skill match, fault success rate, rating, and distance. Not just whoever is closest.",
    whyCard2Title: "Arrives Fully Prepared",
    whyCard2Body: "The mechanic sees a mandatory packing checklist from the AI diagnosis. He cannot accept the job until he ticks every part and tool.",
    whyCard3Title: "Vehicle Warning Built In",
    whyCard3Body: "If the motor needs to be pulled from the borewell, only mechanics with vehicles are shown. No surprises on arrival.",
    whyCard4Title: "GPS Navigation to Borewell",
    whyCard4Body: "The mechanic navigates directly to the exact GPS coordinates of your field. No time wasted looking for the farm.",
    impact1: "Irrigation pumps in India",
    impact2: "Average current wait time",
    impact3: "MotorMitra repair time",
    impact4: "Fault categories diagnosed by AI",

    // Home Page - Bottom CTA
    ctaTitle: "Your motor failed. Your crops are waiting.",
    ctaSub: "Tell us what happened. In minutes, the right mechanic will be on his way to your field — with every part he needs.",
    ctaBtn: "Request Repair Now",
    ctaMech: "I am a Mechanic →",

    // RequestRepair — page header
    repairEyebrow: "🔧 Motor Repair",
    repairTitle: "Request a Repair",
    repairSubtitle: "Fill in the details below. Our AI will diagnose the problem and connect you with the right mechanic.",

    // Form labels
    labelName: "Your Name",
    labelPhone: "Phone Number",
    labelLocation: "Location",
    labelMotorType: "Motor Type",
    labelSymptoms: "Describe the Problem",
    labelPhoto: "Motor / Starter Panel Photo",
    labelPhotoOptional: "(Optional — helps AI diagnose better)",

    // Placeholders
    placeholderName: "e.g. Ramesh Kumar",
    placeholderPhone: "e.g. 9876543210",
    placeholderLocation: "Tap 'Auto' button to get location",
    placeholderSymptoms: "e.g. The motor starts but water is not coming out. It makes a humming sound and gets very hot after 5 minutes.",

    // Buttons
    btnGps: "📍 Auto",
    btnGpsLoading: "Getting...",
    btnDiagnose: "🔍 Get AI Diagnosis",
    btnDiagnosing: "AI is diagnosing...",
    btnWithPhoto: "📷 with photo",

    // Hints
    hintLocation: 'Click "Auto" to detect location automatically',
    hintSymptoms: "Describe what happened in as much detail as possible",
    hintPhotoYes: "📸 Photo will be analyzed by AI along with your description",
    hintPhotoNo: "Tip: A photo of the starter panel helps AI give a better diagnosis",

    // Photo upload area
    photoUploadText: "Tap to upload",
    photoUploadSub: "JPG, PNG supported · Optional but recommended",
    photoRemove: "✕ Remove Photo",

    // Motor type dropdown options
    motorTypeOptions: [
      "Select motor type...",
      "Borewell Submersible Pump",
      "Open Well Submersible Pump",
      "Agricultural Submersible Pump",
      "Domestic Water Pump (Submersible)",
      "Sewage / Dirty Water Pump",
      "Solar Submersible Pump",
    ],

    // Mechanic list section
    availableMechanics: "Available Mechanics",
    allStatuses: "All Statuses",
    statusAvailable: "Available",
    statusBusy: "Busy",
    anyRating: "Any Rating",
    noMechanicsFilter: "No mechanics found with these filters.",

    // Validation alerts
    alertFillAll: "Please fill in all the required fields before submitting.",
    alertSelectMotor: "Please select a motor type from the dropdown.",

    // TrackRequest page
    trackTitle: "📍 Track Your Repair",
    trackSubtitle: "Live updates — refreshes every 5 seconds automatically.",
    trackLoading: "Loading your request...",
    trackNoRequest: "No Active Repair Request",
    trackNoRequestSub: "You have not submitted a motor repair request yet. Send one first and the mechanic details will appear here.",
    trackRequestBtn: "Request a Repair →",
    trackNewRequest: "+ Submit Another Request",
    rateMechanic: "Rate your mechanic",
    submitRating: "Submit & Go Home",

    // Status steps
    stepSent: "Request Sent",
    stepOnWay: "Mechanic On Way",
    stepDone: "Repair Done",

    // Status banners
    statusPending: "⏳ Waiting for mechanic to accept...",
    statusAccepted: "🚗 Mechanic accepted and is on the way!",
    statusComplete: "✅ Repair complete. Motor is running!",

    // Section headings in track
    sectionStatus: "Request Status",
    sectionArrival: "Estimated Arrival",
    sectionDiagnosis: "AI Diagnosis Summary",
    sectionMechanic: "Your Mechanic",
    sectionRequest: "Your Request",

    // Diagnosis labels
    diagFault: "Fault Found",
    diagMotorType: "Motor Type",
    diagMotorPull: "Motor Pull?",
    diagCost: "Est. Cost",
    diagTime: "Est. Time",
    diagUrgency: "Urgency",
    diagPullYes: "🚜 Yes — Vehicle coming",
    diagPullNo: "✅ No — Field repair",
    timerLabel: "Estimated arrival countdown",
    timerNote: "⚠️ This is an estimate based on AI repair time. Actual arrival may vary.",
    timerArrived: "Mechanic should have arrived",

    // Mechanic stats
    mechRating: "Rating",
    mechExp: "Experience",
    mechJobs: "Jobs Done",
    mechCall: "📞 Call Mechanic",
    mechVehicle: "🚜 Mechanic is bringing a motor-pulling vehicle",

    // Request summary
    reqName: "Name",
    reqPhone: "Phone",
    reqMotor: "Motor",
    reqProblem: "Problem",

    // MechanicDashboard
    dashYourStatus: "Your Status",
    dashAvailable: "Available",
    dashBusy: "Busy",
    dashTapToggle: "Tap to toggle",
    dashJobsToday: "Jobs Today",
    dashRating: "Rating",
    dashTotalJobs: "Total Jobs",
    dashRefreshTip: "Dashboard refreshes every",
    dashRefreshSec: "10 seconds",
    dashRefreshAuto: "automatically.",

    dashWaitingTitle: "Waiting for a new job...",
    dashWaitingOnline: "You are online. New requests will appear here automatically.",
    dashWaitingBusy: "You are set to Busy. Change status to Available to receive jobs.",
    dashGoOnline: "Go Online",

    dashNewJob: "⚡ New Job Request",
    dashFaultDetected: "FAULT DETECTED",
    dashFarmer: "Farmer",
    dashPhone: "Phone",
    dashDistance: "Distance",
    dashEstRepair: "Est. Repair Time",
    dashEstCost: "Est. Cost",
    dashMotorPull: "Motor Pull?",
    dashPullYes: "🚜 Yes — Bring Vehicle",
    dashPullNo: "✅ No — Field Repair",
    dashCraneWarning: "This motor needs to be pulled out of the borewell. Attach your motor-pulling vehicle before leaving.",
    dashAiInstructions: "🤖 AI Instructions for You",

    dashChecklistTitle: "📋 Mandatory Packing Checklist",
    dashPacked: "packed",
    dashChecklistHint: "Tick every item before you can accept the job. This guarantees you arrive prepared.",
    dashPartsBring: "🔩 Parts to Bring",
    dashToolsCarry: "🔧 Tools to Carry",

    dashAcceptReady: "✅ Accept Job & Start Journey",
    dashAcceptLocked: "remaining items to accept",
    dashCheck: "Check all",

    dashTravelling: "TRAVELLING TO BOREWELL",
    dashCallFarmer: "Call Farmer",
    dashTapToCall: "Tap to call",
    dashNavigate: "Navigate to Farm",
    dashMapsHint: "Opens Google Maps",
    dashCraneWarningActive: "Motor needs to be pulled from borewell. Ensure your crane vehicle is attached.",

    dashJobSummary: "Job Summary",
    dashJobFarmer: "Farmer",
    dashJobFault: "Fault",
    dashJobRepairTime: "Est. Repair",
    dashJobCost: "Est. Cost",
    dashPartsYouPacked: "🔩 Parts you packed",
    dashComplete: "✅ Mark Repair Complete & Collect Payment",
    dashNewAlert: "🔔 NEW REPAIR REQUEST RECEIVED!",
  },

  kn: {
    // Navbar
    navHome: "ಮುಖಪುಟ",
    navRequest: "ರಿಪೇರಿ ಕೇಳಿ",
    navTrack: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    navMechanic: "ಮೆಕ್ಯಾನಿಕ್ ಲಾಗಿನ್",
    langToggle: "English",  // shown when Kannada is active

    // Home Page - Hero
    heroTitle: "ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲೇ ಮೋಟಾರ್ ವೈಂಡಿಂಗ್ ಮತ್ತು ರಿಪೇರಿ - ಕೆಲವೇ ಗಂಟೆಗಳಲ್ಲಿ!",
    heroSub: "ಮೋಟರ್‌ಮಿತ್ರ AI ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ಪಂಪ್ ವೈಫಲ್ಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ, ನಿಖರವಾದ ಬಿಡಿಭಾಗಗಳೊಂದಿಗೆ ನುರಿತ ತಜ್ಞರನ್ನು ನೇರವಾಗಿ ನಿಮ್ಮ ಜಮೀನಿಗೆ ಕಳುಹಿಸುತ್ತದೆ.",
    heroBtnRepair: "ಸ್ಥಳದಲ್ಲೇ ರಿಪೇರಿಗಾಗಿ ವಿನಂತಿಸಿ",
    heroStatTime: "ಸರಾಸರಿ ರಿಪೇರಿ ಸಮಯ",
    heroStatCost: "ಊರಿಗೆ ಹೋಗಿ ಬರೋ ಖರ್ಚು",
    heroStatRate: "ಮೊದಲ ಭೇಟಿಯಲ್ಲೇ ರಿಪೇರಿ",

    // Home Page - Problem
    problemEyebrow: "ಸಮಸ್ಯೆ ಏನು?",
    problemHeading: "ನೀರಿಲ್ಲದ ಪ್ರತಿ ಗಂಟೆಗೂ ರೈತನಿಗೆ ನಷ್ಟ",
    problemBody1: "ನಮ್ಮ ದೇಶದಲ್ಲಿ ಸುಮಾರು 3.2 ಕೋಟಿ ಕೃಷಿ ಪಂಪ್ ಮೋಟರ್‌ಗಳಿವೆ. ಬೆಳೆ ಬೆಳೆಯುವ ಸಮಯದಲ್ಲಿ ಮೋಟರ್ ಕೆಟ್ಟರೆ, ರಿಪೇರಿ ಆಗೋಕೆ 1 ರಿಂದ 3 ದಿನ ಕಾಯಬೇಕು. ಮೆಕ್ಯಾನಿಕ್ ತಯಾರಿಲ್ಲದೆ ಬರ್ತಾನೆ, ಮತ್ತೆ ಅಂಗಡಿಗೆ ಹೋಗಿ ಬರ್ತಾನೆ. ಒಂದೇ ದಿನದಲ್ಲಿ ಆಗೋ ಕೆಲಸ ಮೂರು ದಿನ ಆಗ್ತದೆ.",
    problemBody2: "ನೀರು ಬೇಡುವ ಬೆಳೆಗಳಿಗೆ ಒಂದು ದಿನ ನೀರಿಲ್ಲ ಅಂದ್ರೂ ಇಳುವರಿ ಕಡಿಮೆ ಆಗ್ತದೆ. ಎರಡು-ಮೂರು ದಿನ ಆದ್ರೆ ಬೆಳೆಯೇ ಒಣಗೋಗ್ತದೆ.",
    problemQuote: `"ನಾನು ಇದನ್ನ ಯಾವುದೋ ಸ್ಪರ್ಧೆಗಾಗಿ ಮಾಡ್ತಿಲ್ಲ. ನಾನೇ ಈ ಸಮಸ್ಯೆಯನ್ನ ನೋಡಿ ಬೆಳೆದವನು. ನನ್ನ ತಂದೆ ಕೂಡ ಮೋಟರ್ ವೈಂಡಿಂಗ್ ಮೆಕ್ಯಾನಿಕ್."`,
    problemQuoteAuthor: "— ಮೈಲಾರಿ, ಫೌಂಡರ್",
    problemCTA: "ಪರಿಹಾರ ನೋಡಿ",

    // Home Page - How it works
    flowEyebrow: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತೆ?",
    flowTitle: "ಮೋಟರ್ ಕೆಟ್ಟಾಗಿಂದ ನೀರು ಬರುವವರೆಗೆ 4 ಸುಲಭ ಹೆಜ್ಜೆಗಳು",
    flowSubtitle: "ಯಾವ ರೈತ ಅಥವಾ ಮೊಬೈಲ್ ಅಂಗಡಿಯವರಾದರೂ ಬಳಸಬಹುದು — ಯಾವ ಟೆಕ್ನಿಕಲ್ ಜ್ಞಾನವೂ ಬೇಡ.",
    step1Title: "ಮೋಟರ್ ಕೆಡುತ್ತದೆ",
    step1Desc: "ರೈತನಿಗೆ ಗೊತ್ತಾಗ್ತದೆ — ಮೋಟರ್ ಗುಯ್ ಅಂತ ಶಬ್ದ ಮಾಡ್ತದೆ, ಸೀದುಹೋದ ವಾಸನೆ ಬರ್ತದೆ, ಅಥವಾ ಸ್ಟಾರ್ಟರ್ ಪ್ಯಾನೆಲ್ ಟ್ರಿಪ್ ಆಗ್ತದೆ.",
    step1Bul1: "ಗುಯ್ ಅಂತ ಶಬ್ದ ಅಥವಾ ಸ್ಟಾರ್ಟ್ ಆಗಲ್ಲ",
    step1Bul2: "ಮೋಟರ್ ಇಂದ ಸೀದುಹೋದ ವಾಸನೆ",
    step1Bul3: "ಸ್ಟಾರ್ಟರ್ ಪ್ಯಾನೆಲ್ ಟ್ರಿಪ್ ಆಗ್ತದೆ",
    step2Title: "ಸಮಸ್ಯೆ ತಿಳಿಸಿ",
    step2Desc: "ಮೋಟರ್‌ಮಿತ್ರ ಆಪ್ ಓಪನ್ ಮಾಡಿ, ನಿಮ್ಮ ಜಾಗ ಹಾಕಿ, ಏನಾಗಿದೆ ಅಂತ ಬರೆದು ಕಳಿಸಿ — 2 ನಿಮಿಷದ ಕೆಲಸ.",
    step2Bul1: "ಬೋರ್‌ವೆಲ್ ಹತ್ತಿರ ನಿಂತು GPS ಹಾಕಿ",
    step2Bul2: "ಏನಾಗಿದೆ ಅಂತ ನಿಮ್ಮ ಭಾಷೆಲೇ ಬರೀರಿ",
    step2Bul3: "ಬೇಕಿದ್ರೆ ಫೋಟೋ ಹಾಕಿ",
    step3Title: "ಹೊಲದಲ್ಲೇ ತ್ವರಿತ ರಿಪೇರಿ",
    step3Desc: "ನಮ್ಮ AI ಏನಾಗಿದೆ ಮತ್ತೆ ಯಾವ ಪಾರ್ಟ್ ಬೇಕು ಅಂತ ಹೇಳ್ತದೆ. ಸರಿಯಾದ ಮೆಕ್ಯಾನಿಕ್ ಎಲ್ಲಾ ಟೂಲ್ ಮತ್ತು ಪಾರ್ಟ್ ತಗೊಂಡು ಬೋರ್‌ವೆಲ್ ಹತ್ತಿರ ಬರ್ತಾನೆ.",
    step3Bul1: "AI ನಿಮ್ಮ ವಿವರ ಮತ್ತು ಫೋಟೋ ನೋಡ್ತದೆ",
    step3Bul2: "ಯಾವ ಪಾರ್ಟ್ ಬೇಕು ಅಂತ ಲಿಸ್ಟ್ ಮಾಡ್ತದೆ",
    step3Bul3: "ಅದರಲ್ಲಿ ನುರಿತ ಮೆಕ್ಯಾನಿಕ್ ಬರ್ತಾನೆ",
    step4Title: "ಬೆಳೆ ಉಳಿಯಿತು",
    step4Desc: "ಮೋಟರ್ ಮತ್ತೆ ಶುರುವಾಯ್ತು. ಹೊಲಕ್ಕೆ ನೀರು ಬಂತು. ಹಣವನ್ನ ಬೋರ್‌ವೆಲ್ ಹತ್ತಿರಾನೇ ಕೊಡಬಹುದು — ಊರಿಗೆ ಹೋಗೋ ಕೆಲಸ ಇಲ್ಲ.",
    step4Bul1: "ಮೋಟರ್ ಶುರು — ಹೊಲಕ್ಕೆ ನೀರು",
    step4Bul2: "ಯಾವ ಮುಚ್ಚುಮರೆ ಇಲ್ಲದೆ ಬಿಲ್",
    step4Bul3: "ಬೆಳೆಗೆ ಯಾವ ನಷ್ಟವೂ ಇಲ್ಲ",

    // Home Page - Why MotorMitra
    whyEyebrow: "ಮೋಟರ್‌ಮಿತ್ರನೇ ಯಾಕೆ?",
    whyTitle: "ಬೇರೆಯವರು ಖಾಲಿ ಇರೋರನ್ನ ಕಳಿಸ್ತಾರೆ. ನಾವು ಸರಿಯಾದವರನ್ನ ಕಳಿಸ್ತೀವಿ.",
    whyCard1Title: "ಸರಿಯಾದ ಮೆಕ್ಯಾನಿಕ್, ಸರಿಯಾದ ರಿಪೇರಿ",
    whyCard1Body: "ನಾವು ಮೆಕ್ಯಾನಿಕ್ ರೇಟಿಂಗ್, ಆ ಕೆಲಸದಲ್ಲಿ ಅವರ ಅನುಭವ ಮತ್ತು ದೂರ ನೋಡಿ ಕಳಿಸ್ತೀವಿ. ಸುಮ್ಮನೆ ಹತ್ತಿರ ಇದ್ದಾರೆ ಅಂತ ಅಲ್ಲ.",
    whyCard2Title: "ಎಲ್ಲಾ ಸಿದ್ಧತೆ ಮಾಡ್ಕೊಂಡೇ ಬರ್ತಾರೆ",
    whyCard2Body: "ಮೆಕ್ಯಾನಿಕ್ ಹೊರಡೋ ಮುಂಚೆ AI ಹೇಳಿದ ಎಲ್ಲಾ ಪಾರ್ಟ್ಸ್ ಮತ್ತು ಟೂಲ್ಸ್ ಪ್ಯಾಕ್ ಮಾಡಬೇಕು. ಎಲ್ಲಾ ಟಿಕ್ ಮಾಡಿದ್ಮೇಲಷ್ಟೇ ಕೆಲಸ ಒಪ್ಪಿಕೊಳ್ಳೋಕೆ ಆಗ್ತದೆ.",
    whyCard3Title: "ವಾಹನ ಬೇಕಾ ಅಂತ ಮೊದಲೇ ಗೊತ್ತಿರುತ್ತೆ",
    whyCard3Body: "ಮೋಟರ್ ಬೋರ್‌ಯಿಂದ ತೆಗಿಬೇಕಾದ್ರೆ, ವಾಹನ ಇರೋ ಮೆಕ್ಯಾನಿಕ್ ಮಾತ್ರ ಬರ್ತಾರೆ. ಬಂದ್ಮೇಲೆ ಆಮೇಲೆ ತರ್ತೀನಿ ಅನ್ನೋ ಹಾಗಿಲ್ಲ.",
    whyCard4Title: "ಬೋರ್‌ವೆಲ್‌ಗೆ ನೇರ ದಾರಿ",
    whyCard4Body: "ಮೆಕ್ಯಾನಿಕ್ ನಿಮ್ಮ ಹೊಲದ GPS ಜಾಗಕ್ಕೆ ನೇರವಾಗಿ ಬರ್ತಾರೆ. ಹೊಲ ಹುಡುಕಿಕೊಂಡು ಸಮಯ ವ್ಯರ್ಥ ಆಗಲ್ಲ.",
    impact1: "ಭಾರತದಲ್ಲಿರೋ ಕೃಷಿ ಪಂಪ್ ಗಳು",
    impact2: "ಈಗ ರಿಪೇರಿಗೆ ಬೇಕಾಗೋ ಸರಾಸರಿ ಸಮಯ",
    impact3: "ಮೋಟರ್‌ಮಿತ್ರ ರಿಪೇರಿ ಸಮಯ",
    impact4: "AI ಕಂಡುಹಿಡಿಯುವ ಸಮಸ್ಯೆಗಳು",

    // Home Page - Bottom CTA
    ctaTitle: "ಮೋಟರ್ ಕೆಟ್ಟಿದೆ. ನಿಮ್ಮ ಬೆಳೆ ನೀರಿಗಾಗಿ ಕಾಯ್ತಿದೆ.",
    ctaSub: "ಏನಾಗಿದೆ ಅಂತ ನಮಗೆ ತಿಳಿಸಿ. ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಸರಿಯಾದ ಮೆಕ್ಯಾನಿಕ್ ಬೇಕಾದ ಪಾರ್ಟ್ಸ್ ತಗೊಂಡು ನಿಮ್ಮ ಹೊಲದ ಕಡೆ ಹೊರಡ್ತಾರೆ.",
    ctaBtn: "ಈಗಲೇ ರಿಪೇರಿ ಕೇಳಿ",
    ctaMech: "ನಾನು ಮೆಕ್ಯಾನಿಕ್ →",

    // RequestRepair — page header
    repairEyebrow: "🔧 ಮೋಟರ್ ರಿಪೇರಿ",
    repairTitle: "ರಿಪೇರಿ ಕೇಳಿ",
    repairSubtitle: "ಕೆಳಗಡೆ ವಿವರ ತುಂಬಿ. ನಮ್ಮ AI ತಕ್ಷಣ ಏನು ಕೆಟ್ಟಿದೆ ಅಂತ ನೋಡ್ತದೆ ಮತ್ತು ಸರಿಯಾದ ಮೆಕ್ಯಾನಿಕ್ ಕಳಿಸ್ತದೆ.",

    // Form labels
    labelName: "ನಿಮ್ಮ ಹೆಸರು",
    labelPhone: "ಫೋನ್ ನಂಬರ್",
    labelLocation: "ಊರು / ಜಾಗ",
    labelMotorType: "ಮೋಟರ್ ಯಾವ ಥರ",
    labelSymptoms: "ಏನು ಆಗಿದೆ ಅಂತ ಹೇಳಿ",
    labelPhoto: "ಮೋಟರ್ / ಸ್ಟಾರ್ಟರ್ ಪ್ಯಾನೆಲ್ ಫೋಟೋ",
    labelPhotoOptional: "(ಬೇಡ ಅಂದ್ರು ಆಗ್ತದೆ — ಫೋಟೋ ಇದ್ರೆ AI ಇನ್ನೂ ಸರಿಯಾಗಿ ಹೇಳ್ತದೆ)",

    // Placeholders
    placeholderName: "ಉದಾ: ರಮೇಶ್ ಕುಮಾರ್",
    placeholderPhone: "ಉದಾ: 9876543210",
    placeholderLocation: "ಜಾಗ ತಿಳಿಯಲು 'ಆಟೋ' ಬಟನ್ ಒತ್ತಿ",
    placeholderSymptoms: "ಉದಾ: ಮೋಟರ್ ಶುರು ಆಗ್ತದೆ ಆದ್ರೆ ನೀರು ಬರ್ತಿಲ್ಲ. ಶಬ್ದ ಮಾಡ್ತದೆ ಮತ್ತು ತುಂಬಾ ಬಿಸಿ ಆಗ್ತದೆ.",

    // Buttons
    btnGps: "📍 ಆಟೋ",
    btnGpsLoading: "ತಡಿ...",
    btnDiagnose: "🔍 AI ತಪಾಸಣೆ ಮಾಡಿ",
    btnDiagnosing: "AI ನೋಡ್ತಿದೆ...",
    btnWithPhoto: "📷 ಫೋಟೋ ಜೊತೆ",

    // Hints
    hintLocation: '"ಆಟೋ" ಒತ್ತಿ ಜಾಗ ತಾನಾಗಿ ಸಿಗ್ತದೆ',
    hintSymptoms: "ಆಗಿದ್ದು ಎಲ್ಲಾ ವಿಸ್ತಾರ ಹೇಳಿ",
    hintPhotoYes: "📸 ಫೋಟೋ ತಗೊಂಡ ವಿವರ ಎರಡೂ AI ನೋಡ್ತದೆ",
    hintPhotoNo: "ಟಿಪ್: ಸ್ಟಾರ್ಟರ್ ಪ್ಯಾನೆಲ್ ಫೋಟೋ ಇದ್ರೆ AI ಇನ್ನೂ ಒಳ್ಳೆ ಉತ್ತರ ಕೊಡ್ತದೆ",

    // Photo upload area
    photoUploadText: "ತಟ್ಟಿ ಫೋಟೋ ಹಾಕಿ",
    photoUploadSub: "JPG, PNG ಆಗ್ತದೆ · ಬೇಡ ಅಂದ್ರು ಆಗ್ತದೆ ಆದ್ರೆ ಹಾಕಿದ್ರೆ ಒಳ್ಳೆದು",
    photoRemove: "✕ ಫೋಟೋ ತೆಗಿ",

    // Motor type dropdown options
    motorTypeOptions: [
      "ಮೋಟರ್ ಥರ ಆಯ್ಕೆ ಮಾಡಿ...",
      "ಬೋರ್‌ವೆಲ್ ಸಬ್‌ಮರ್ಸಿಬಲ್ ಪಂಪ್",
      "ಓಪನ್ ವೆಲ್ ಸಬ್‌ಮರ್ಸಿಬಲ್ ಪಂಪ್",
      "ಕೃಷಿ ಸಬ್‌ಮರ್ಸಿಬಲ್ ಪಂಪ್",
      "ಮನೆ ನೀರಿನ ಪಂಪ್",
      "ಕೊಳಚೆ ನೀರು ಪಂಪ್",
      "ಸೋಲಾರ್ ಸಬ್‌ಮರ್ಸಿಬಲ್ ಪಂಪ್",
    ],

    // Mechanic list section
    availableMechanics: "ಇರೋ ಮೆಕ್ಯಾನಿಕ್ ಗಳು",
    allStatuses: "ಎಲ್ಲಾ",
    statusAvailable: "ಖಾಲಿ ಇದ್ದಾರೆ",
    statusBusy: "ಬ್ಯುಸಿ",
    anyRating: "ಯಾವ ರೇಟಿಂಗ್ ಬೇಕಾದ್ರು",
    noMechanicsFilter: "ಈ ಫಿಲ್ಟರ್‌ಗೆ ಮೆಕ್ಯಾನಿಕ್ ಸಿಕ್ಕಿಲ್ಲ.",

    // Validation alerts
    alertFillAll: "ಎಲ್ಲಾ ಖಾಲಿ ಜಾಗ ತುಂಬಿ ಮತ್ತೆ ಕಳಿಸಿ.",
    alertSelectMotor: "ಮೋಟರ್ ಥರ ಆಯ್ಕೆ ಮಾಡಿ.",

    // TrackRequest page
    trackTitle: "📍 ನಿಮ್ಮ ರಿಪೇರಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
    trackSubtitle: "ಲೈವ್ ಅಪ್‌ಡೇಟ್ — ಪ್ರತಿ 5 ಸೆಕೆಂಡ್‌ಗೆ ತಾನಾಗೇ ರಿಫ್ರೆಶ್ ಆಗ್ತದೆ.",
    trackLoading: "ನಿಮ್ಮ ಮಾಹಿತಿ ತರ್ತಿದ್ದೇವೆ...",
    trackNoRequest: "ಯಾವ ರಿಪೇರಿ ಕೇಳ್ಕೆ ಇಲ್ಲ",
    trackNoRequestSub: "ನೀವು ಇನ್ನೂ ರಿಪೇರಿ ಕೇಳ್ಕೆ ಕಳಿಸಿಲ್ಲ. ಮೊದ್ಲು ಕಳಿಸಿ, ಆಮೇಲೆ ಮೆಕ್ಯಾನಿಕ್ ವಿವರ ಇಲ್ಲಿ ಕಾಣ್ತದೆ.",
    trackRequestBtn: "ರಿಪೇರಿ ಕೇಳಿ →",
    trackNewRequest: "+ ಇನ್ನೊಂದು ರಿಪೇರಿ ಕೇಳಿ",
    rateMechanic: "ಮೆಕ್ಯಾನಿಕ್ ಗೆ ರೇಟಿಂಗ್ ಕೊಡಿ",
    submitRating: "ಸಲ್ಲಿಸಿ ಮತ್ತು ಮುಖಪುಟಕ್ಕೆ ಹೋಗಿ",

    // Status steps
    stepSent: "ಕೇಳ್ಕೆ ಕಳಿಸಿದ್ದೇವೆ",
    stepOnWay: "ಮೆಕ್ಯಾನಿಕ್ ಬರ್ತಿದ್ದಾರೆ",
    stepDone: "ರಿಪೇರಿ ಆಯ್ತು",

    // Status banners
    statusPending: "⏳ ಮೆಕ್ಯಾನಿಕ್ ಒಪ್ಪಿಕೊಳ್ಳಲಿ ಅಂತ ಕಾಯ್ತಿದ್ದೇವೆ...",
    statusAccepted: "🚗 ಮೆಕ್ಯಾನಿಕ್ ಒಪ್ಪಿ ಬರ್ತಿದ್ದಾರೆ!",
    statusComplete: "✅ ರಿಪೇರಿ ಆಯ್ತು. ಮೋಟರ್ ಓಡ್ತಿದೆ!",

    // Section headings in track
    sectionStatus: "ಕೇಳ್ಕೆ ಸ್ಥಿತಿ",
    sectionArrival: "ಬರೋ ಸಮಯ",
    sectionDiagnosis: "AI ತಪಾಸಣೆ ವರದಿ",
    sectionMechanic: "ನಿಮ್ಮ ಮೆಕ್ಯಾನಿಕ್",
    sectionRequest: "ನಿಮ್ಮ ಕೇಳ್ಕೆ",

    // Diagnosis labels
    diagFault: "ಕೆಟ್ಟಿದ್ದು ಏನು",
    diagMotorType: "ಮೋಟರ್ ಥರ",
    diagMotorPull: "ಮೋಟರ್ ತೆಗಿಬೇಕಾ?",
    diagCost: "ಅಂದಾಜು ಖರ್ಚು",
    diagTime: "ಅಂದಾಜು ಸಮಯ",
    diagUrgency: "ಅರ್ಜೆಂಟ್ ಎಷ್ಟು",
    diagPullYes: "🚜 ಹೌದು — ವಾಹನ ಬರ್ತದೆ",
    diagPullNo: "✅ ಬೇಡ — ಹೊಲದಲ್ಲೇ ಸರಿ ಮಾಡ್ತಾರೆ",
    timerLabel: "ಬರೋ ಸಮಯ ಕೌಂಟ್‌ಡೌನ್",
    timerNote: "⚠️ ಇದು AI ಹೇಳಿದ ಅಂದಾಜು. ನಿಜವಾದ ಸಮಯ ಬೇರೆ ಆಗಬಹುದು.",
    timerArrived: "ಮೆಕ್ಯಾನಿಕ್ ಬಂದಿರಬೇಕು",

    // Mechanic stats
    mechRating: "ರೇಟಿಂಗ್",
    mechExp: "ಅನುಭವ",
    mechJobs: "ಮಾಡಿದ ಕೆಲ್ಸ",
    mechCall: "📞 ಮೆಕ್ಯಾನಿಕ್‌ಗೆ ಫೋನ್",
    mechVehicle: "🚜 ಮೆಕ್ಯಾನಿಕ್ ಮೋಟರ್ ತೆಗಿಯೋ ವಾಹನ ತರ್ತಿದ್ದಾರೆ",

    // Request summary
    reqName: "ಹೆಸರು",
    reqPhone: "ಫೋನ್",
    reqMotor: "ಮೋಟರ್",
    reqProblem: "ಸಮಸ್ಯೆ",

    // MechanicDashboard (mechanic side — same en/kn independently)
    dashYourStatus: "ನಿಮ್ಮ ಸ್ಥಿತಿ",
    dashAvailable: "ಖಾಲಿ ಇದ್ದೇನೆ",
    dashBusy: "ಬ್ಯುಸಿ",
    dashTapToggle: "ತಟ್ಟಿ ಬದಲಾಯಿಸಿ",
    dashJobsToday: "ಇವತ್ತು ಕೆಲ್ಸ",
    dashRating: "ರೇಟಿಂಗ್",
    dashTotalJobs: "ಒಟ್ಟು ಕೆಲ್ಸ",
    dashRefreshTip: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರತಿ",
    dashRefreshSec: "10 ಸೆಕೆಂಡ್",
    dashRefreshAuto: "ಗೆ ತಾನಾಗೇ ಅಪ್‌ಡೇಟ್ ಆಗ್ತದೆ.",

    dashWaitingTitle: "ಹೊಸ ಕೆಲ್ಸ ಬರಲಿ ಅಂತ ಕಾಯ್ತಿದ್ದೇನೆ...",
    dashWaitingOnline: "ನೀವು ಆನ್‌ಲೈನ್ ಇದ್ದೀರಿ. ಹೊಸ ಕೇಳ್ಕೆ ಬಂದ್ರೆ ಇಲ್ಲಿ ತೋರ್ತದೆ.",
    dashWaitingBusy: "ನೀವು ಬ್ಯುಸಿ ಅಂತ ಇಟ್ಟಿದ್ದೀರಿ. ಖಾಲಿ ಇದ್ದೇನೆ ಅಂತ ಬದಲಾಯಿಸಿ.",
    dashGoOnline: "ಆನ್‌ಲೈನ್ ಆಗಿ",

    dashNewJob: "⚡ ಹೊಸ ಕೆಲ್ಸ ಬಂತು",
    dashFaultDetected: "ಕೆಟ್ಟಿದ್ದು",
    dashFarmer: "ರೈತ",
    dashPhone: "ಫೋನ್",
    dashDistance: "ದೂರ",
    dashEstRepair: "ಅಂದಾಜು ಸಮಯ",
    dashEstCost: "ಅಂದಾಜು ಖರ್ಚು",
    dashMotorPull: "ಮೋಟರ್ ತೆಗಿಬೇಕಾ?",
    dashPullYes: "🚜 ಹೌದು — ವಾಹನ ತಕ್ಕೊಂಡು ಬಾ",
    dashPullNo: "✅ ಬೇಡ — ಹೊಲದಲ್ಲೇ ಸರಿ ಆಗ್ತದೆ",
    dashCraneWarning: "ಈ ಮೋಟರ್ ಬೋರ್‌ಯಿಂದ ತೆಗಿಬೇಕು. ಹೊರಡೋ ಮೊದ್ಲೇ ಮೋಟರ್ ತೆಗಿಯೋ ವಾಹನ ಸಿದ್ಧ ಮಾಡ್ಕೊ.",
    dashAiInstructions: "🤖 AI ಸೂಚನೆ",

    dashChecklistTitle: "📋 ಕಡ್ಡಾಯ ಸಾಮಾನು ಪಟ್ಟಿ",
    dashPacked: "ಪ್ಯಾಕ್ ಆಗಿದೆ",
    dashChecklistHint: "ಕೆಲ್ಸ ಒಪ್ಪಿಕೊಳ್ಳೋ ಮೊದ್ಲು ಎಲ್ಲಾ ಟಿಕ್ ಮಾಡು. ಸಿದ್ಧ ಆಗಿ ಹೋದ್ರೆ ಒಂದೇ ಸಲ ಸರಿ ಆಗ್ತದೆ.",
    dashPartsBring: "🔩 ಪಾರ್ಟ್ಸ್ ತಕ್ಕೊಂಡು ಹೋಗು",
    dashToolsCarry: "🔧 ಟೂಲ್ ತಕ್ಕೊಂಡು ಹೋಗು",

    dashAcceptReady: "✅ ಒಪ್ಪಿ ಹೊರಡು",
    dashAcceptLocked: "ಬಾಕಿ ಐಟಂ ಟಿಕ್ ಮಾಡಿ ಒಪ್ಪಿಕೊಳ್ಳಿ",
    dashCheck: "ಇನ್ನೂ",

    dashTravelling: "ಬೋರ್‌ವೆಲ್‌ಗೆ ಹೊರಟಿದ್ದೇನೆ",
    dashCallFarmer: "ರೈತರಿಗೆ ಫೋನ್",
    dashTapToCall: "ಒತ್ತಿ ಫೋನ್ ಮಾಡಿ",
    dashNavigate: "ಹೊಲಕ್ಕೆ ದಾರಿ",
    dashMapsHint: "Google Maps ತೆರೆಯುತ್ತದೆ",
    dashCraneWarningActive: "ಮೋಟರ್ ಬೋರ್‌ಯಿಂದ ತೆಗಿಬೇಕು. ನಿಮ್ಮ ಕ್ರೇನ್ ವಾಹನ ಸಿದ್ಧ ಇದೆ ಅಂತ ಖಾತ್ರಿ ಮಾಡ್ಕೊ.",

    dashJobSummary: "ಕೆಲ್ಸದ ಸಾರಾಂಶ",
    dashJobFarmer: "ರೈತ",
    dashJobFault: "ಕೆಟ್ಟಿದ್ದು",
    dashJobRepairTime: "ಅಂದಾಜು ಸಮಯ",
    dashJobCost: "ಅಂದಾಜು ಖರ್ಚು",
    dashPartsYouPacked: "🔩 ನೀನು ತಂದ ಪಾರ್ಟ್ಸ್",
    dashComplete: "✅ ರಿಪೇರಿ ಆಯ್ತು — ಹಣ ತಕ್ಕೊ",
    dashNewAlert: "🔔 ಹೊಸ ರಿಪೇರಿ ಕೇಳ್ಕೆ ಬಂತು!",
  }
};

export default translations;
