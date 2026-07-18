import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import translations from '../utils/translations';

import {
  AlertTriangle,
  Smartphone,
  Wrench,
  Leaf,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  MapPin,
  Mic,
  Cpu,
  Zap,
  Droplets,
  BadgeCheck,
} from 'lucide-react';

import pumpMotorImg from '../assets/agri_pump_motor.png';
import './home.css';

/* ─── Hook that detects if an element is visible on screen ─── */
function useInView(options = {}) {
  const myRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    if (myRef.current) {
      observer.observe(myRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return [myRef, isVisible];
}

/* ─── Animated number counter ─── */
function CountUpNumber({ target, suffix = '' }) {
  const [current, setCurrent] = useState(0);
  const [ref, visible] = useInView();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const end = parseFloat(target);
    const duration = 1500;
    const step = duration / 60;
    const increment = end / 60;

    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, step);

    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref}>{current}{suffix}</span>;
}

/* ─── Home page component ─── */
const Home = ({ lang }) => {
  const navigate = useNavigate();
  // Use global language state passed from App.jsx
  const t = translations[lang] || translations['en'];

  const [problemRef, problemVisible] = useInView();
  const [howItWorksRef, howItWorksVisible] = useInView();
  const [whyRef, whyVisible] = useInView();

  // Go to repair request page
  const goToRepair = () => {
    navigate('/request');
  };

  /* ─── How It Works steps ─── */
  const stepByStepData = [
    {
      stepIdNumber: 1,
      stepIconPic: AlertTriangle,
      mainColor: '#ef4444',
      bgColorCode: '#fef2f2',
      stepBadgeText: lang === 'kn' ? 'ಹಂತ 1' : 'Step 1',
      stepMainTitle: t.step1Title,
      bulletPointsList: [
        { bulletIconPic: Zap, bulletText: t.step1Bul1 },
        { bulletIconPic: AlertTriangle, bulletText: t.step1Bul2 },
        { bulletIconPic: Cpu, bulletText: t.step1Bul3 },
      ],
      stepLongDescription: t.step1Desc,
    },
    {
      stepIdNumber: 2,
      stepIconPic: Smartphone,
      mainColor: '#f59e0b',
      bgColorCode: '#fffbeb',
      stepBadgeText: lang === 'kn' ? 'ಹಂತ 2' : 'Step 2',
      stepMainTitle: t.step2Title,
      bulletPointsList: [
        { bulletIconPic: MapPin, bulletText: t.step2Bul1 },
        { bulletIconPic: Mic, bulletText: t.step2Bul2 },
        { bulletIconPic: Smartphone, bulletText: t.step2Bul3 },
      ],
      stepLongDescription: t.step2Desc,
    },
    {
      stepIdNumber: 3,
      stepIconPic: Wrench,
      mainColor: '#1a6b3c',
      bgColorCode: '#ecfdf5',
      stepBadgeText: lang === 'kn' ? 'ಹಂತ 3' : 'Step 3',
      stepMainTitle: t.step3Title,
      bulletPointsList: [
        { bulletIconPic: Cpu, bulletText: t.step3Bul1 },
        { bulletIconPic: Wrench, bulletText: t.step3Bul2 },
        { bulletIconPic: BadgeCheck, bulletText: t.step3Bul3 },
      ],
      stepLongDescription: t.step3Desc,
    },
    {
      stepIdNumber: 4,
      stepIconPic: Leaf,
      mainColor: '#0284c7',
      bgColorCode: '#eff6ff',
      stepBadgeText: lang === 'kn' ? 'ಹಂತ 4' : 'Step 4',
      stepMainTitle: t.step4Title,
      bulletPointsList: [
        { bulletIconPic: Droplets, bulletText: t.step4Bul1 },
        { bulletIconPic: BadgeCheck, bulletText: t.step4Bul2 },
        { bulletIconPic: Leaf, bulletText: t.step4Bul3 },
      ],
      stepLongDescription: t.step4Desc,
    },
  ];

  /* ─── Why MotorMitra cards ─── */
  const whyCards = [
    {
      icon: '🎯',
      title: t.whyCard1Title,
      body: t.whyCard1Body,
    },
    {
      icon: '⚡',
      title: t.whyCard2Title,
      body: t.whyCard2Body,
    },
    {
      icon: '🚜',
      title: t.whyCard3Title,
      body: t.whyCard3Body,
    },
    {
      icon: '🗺️',
      title: t.whyCard4Title,
      body: t.whyCard4Body,
    },
  ];

  return (
    <>
      {/* ══ HERO SECTION ══ */}
      <section className="mm-hero">
        <div className="mm-hero__overlay" />
        <div className="mm-hero__content">
          <h1 className="mm-hero__headline">{t.heroTitle}</h1>
          <p className="mm-hero__sub">{t.heroSub}</p>

          <div className="mm-hero__ctas">
            <button
              className="mm-btn mm-btn--primary mm-btn--lg"
              onClick={goToRepair}
              type="button"
            >
              {t.heroBtnRepair} <ArrowRight size={17} />
            </button>
          </div>

          {/* Stats bar */}
          <div className="mm-hero__stats">
            <div className="mm-stat">
              <span className="mm-stat__num">3.8h</span>
              <span className="mm-stat__label">{t.heroStatTime}</span>
            </div>
            <div className="mm-stat-divider" />
            <div className="mm-stat">
              <span className="mm-stat__num">₹0</span>
              <span className="mm-stat__label">{t.heroStatCost}</span>
            </div>
            <div className="mm-stat-divider" />
            <div className="mm-stat">
              <span className="mm-stat__num">1st</span>
              <span className="mm-stat__label">{t.heroStatRate}</span>
            </div>
          </div>
        </div>
        <a
          href="#problem"
          className="mm-hero__scroll-hint"
          aria-label="Scroll down"
          onClick={(e) => {
            e.preventDefault();
            let el = document.getElementById('problem');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <ChevronDown size={22} />
        </a>
      </section>

      {/* ══ PROBLEM SECTION ══ */}
      <section id="problem" className="mm-problem" ref={problemRef}>
        <img
          src={pumpMotorImg}
          alt="Agricultural submersible pump motor being serviced on-field"
          className="mm-problem__bg-img"
        />
        <div className={`mm-problem__panel${problemVisible ? ' mm-fade-in' : ' mm-hidden'}`}>
          <span className="mm-eyebrow">{t.problemEyebrow}</span>
          <h2 className="mm-problem__heading">{t.problemHeading}</h2>
          <p className="mm-problem__body">
            {lang === 'en' ? (
              <>India has around <strong>32 million irrigation pump motors</strong>. When a motor fails during crop season, farmers wait <strong>1 to 3 days</strong> just to get it repaired. The mechanic comes unprepared, goes back to his shop, and returns — two trips become three. One day becomes three days.</>
            ) : (
              <>ನಮ್ಮ ದೇಶದಲ್ಲಿ ಸುಮಾರು <strong>3.2 ಕೋಟಿ ಕೃಷಿ ಪಂಪ್ ಮೋಟರ್‌ಗಳಿವೆ</strong>. ಬೆಳೆ ಬೆಳೆಯುವ ಸಮಯದಲ್ಲಿ ಮೋಟರ್ ಕೆಟ್ಟರೆ, ರಿಪೇರಿ ಆಗೋಕೆ <strong>1 ರಿಂದ 3 ದಿನ</strong> ಕಾಯಬೇಕು. ಮೆಕ್ಯಾನಿಕ್ ತಯಾರಿಲ್ಲದೆ ಬರ್ತಾನೆ, ಮತ್ತೆ ಅಂಗಡಿಗೆ ಹೋಗಿ ಬರ್ತಾನೆ. ಒಂದೇ ದಿನದಲ್ಲಿ ಆಗೋ ಕೆಲಸ ಮೂರು ದಿನ ಆಗ್ತದೆ.</>
            )}
          </p>
          <p className="mm-problem__body">
            {lang === 'en' ? (
              <>For water-sensitive crops, even <strong>one day without irrigation can reduce yield</strong>. Two or three days can destroy the crop completely.</>
            ) : (
              <>ನೀರು ಬೇಡುವ ಬೆಳೆಗಳಿಗೆ <strong>ಒಂದು ದಿನ ನೀರಿಲ್ಲ ಅಂದ್ರೂ ಇಳುವರಿ ಕಡಿಮೆ ಆಗ್ತದೆ</strong>. ಎರಡು-ಮೂರು ದಿನ ಆದ್ರೆ ಬೆಳೆಯೇ ಒಣಗೋಗ್ತದೆ.</>
            )}
          </p>
          <p className="mm-problem__body mm-problem__body--personal">
            {t.problemQuote}
            <br /><strong>{t.problemQuoteAuthor}</strong>
          </p>

          <button
            className="mm-problem__cta"
            type="button"
            onClick={() => {
              let el = document.getElementById('how-it-works');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.problemCTA} <ArrowDown size={16} />
          </button>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="mm-flow" ref={howItWorksRef}>
        <div className="mm-flow__header">
          <span className="mm-eyebrow">{t.flowEyebrow}</span>
          <h2 className="mm-flow__title">{t.flowTitle}</h2>
          <p className="mm-flow__subtitle">{t.flowSubtitle}</p>
        </div>

        {/* Colored connector line */}
        <div className="mm-flow__track-wrap" aria-hidden="true">
          <div className="mm-flow__track" />
        </div>

        <div className={`mm-flow__grid${howItWorksVisible ? ' mm-flow-visible' : ''}`}>
          {stepByStepData.map((step, index) => {
            let StepIcon = step.stepIconPic;
            let isLastStep = index === stepByStepData.length - 1;
            let delayMs = (index * 130) + 'ms';

            return (
              <div
                className="mm-step"
                key={step.stepIdNumber}
                style={{
                  '--step-accent': step.mainColor,
                  '--step-bg': step.bgColorCode,
                  '--delay': delayMs,
                }}
              >
                {/* Step number + arrow */}
                <div className="mm-step__num-wrap">
                  <div className="mm-step__num" style={{ background: step.mainColor }}>
                    {step.stepIdNumber}
                  </div>
                  {!isLastStep && (
                    <>
                      <div className="mm-step__desktop-arrow"><ArrowRight size={18} /></div>
                      <div className="mm-step__mobile-arrow"><ArrowDown size={18} /></div>
                    </>
                  )}
                </div>

                {/* Step card */}
                <div className="mm-step__card">
                  <div className="mm-step__icon-ring" style={{ background: step.bgColorCode }}>
                    <StepIcon size={26} style={{ color: step.mainColor }} strokeWidth={2} />
                  </div>

                  <span
                    className="mm-step__badge"
                    style={{ color: step.mainColor, background: step.bgColorCode }}
                  >
                    {step.stepBadgeText}
                  </span>
                  <h3 className="mm-step__title">{step.stepMainTitle}</h3>
                  <p className="mm-step__desc">{step.stepLongDescription}</p>

                  <ul className="mm-step__bullets">
                    {step.bulletPointsList.map((bullet, bulletIdx) => {
                      let BulletIcon = bullet.bulletIconPic;
                      return (
                        <li key={bulletIdx} className="mm-step__bullet">
                          <BulletIcon size={13} style={{ color: step.mainColor, flexShrink: 0 }} />
                          <span>{bullet.bulletText}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ WHY MOTORMITRA SECTION ══ */}
      <section className="mm-why">
        <div className="mm-why__inner">
          <div className="mm-why__header">
            <span className="mm-eyebrow">{t.whyEyebrow}</span>
            <h2 className="mm-why__title">{t.whyTitle}</h2>
          </div>

          <div className={`mm-why__grid${whyVisible ? ' mm-why-visible' : ''}`} ref={whyRef}>
            {whyCards.map((card, idx) => (
              <div
                className="mm-why-card"
                key={idx}
                style={{ '--card-delay': (idx * 100) + 'ms' }}
              >
                <div className="mm-why-card__icon">{card.icon}</div>
                <h3 className="mm-why-card__title">{card.title}</h3>
                <p className="mm-why-card__body">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Impact numbers */}
          <div className="mm-impact-row">
            <div className="mm-impact-item">
              <div className="mm-impact-num">
                <CountUpNumber target={32} suffix={lang === 'kn' ? ' ಲಕ್ಷ' : 'M'} />
              </div>
              <div className="mm-impact-label">{t.impact1}</div>
            </div>
            <div className="mm-impact-divider" />
            <div className="mm-impact-item">
              <div className="mm-impact-num">
                <CountUpNumber target={3} suffix={lang === 'kn' ? ' ದಿನ' : ' days'} />
              </div>
              <div className="mm-impact-label">{t.impact2}</div>
            </div>
            <div className="mm-impact-divider" />
            <div className="mm-impact-item">
              <div className="mm-impact-num">
                <CountUpNumber target={2} suffix={lang === 'kn' ? ' ಗಂಟೆ' : ' hrs'} />
              </div>
              <div className="mm-impact-label">{t.impact3}</div>
            </div>
            <div className="mm-impact-divider" />
            <div className="mm-impact-item">
              <div className="mm-impact-num">
                <CountUpNumber target={12} />
              </div>
              <div className="mm-impact-label">{t.impact4}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA SECTION ══ */}
      <section className="mm-cta-bottom">
        <div className="mm-cta-bottom__inner">
          <div className="mm-cta-bottom__leaf" aria-hidden="true">🌾</div>
          <h2 className="mm-cta-bottom__title">{t.ctaTitle}</h2>
          <p className="mm-cta-bottom__sub">{t.ctaSub}</p>
          <div className="mm-cta-bottom__btns">
            <button
              className="mm-btn mm-btn--primary mm-btn--lg"
              onClick={goToRepair}
              type="button"
            >
              {t.ctaBtn} <ArrowRight size={18} />
            </button>
            <a href="/mechanic" className="mm-btn mm-btn--ghost-dark mm-btn--lg">
              {t.ctaMech}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;