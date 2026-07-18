import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import MechanicDashboard from './pages/MechanicDashboard'
import TrackRequest from './pages/TrackRequest'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RequestRepair from './pages/RequestRepair'

import './App.css'

function App() {

  // 'en' = English, 'kn' = Kannada, Farmer side and mechanic side can use different lang, becaure those are separate pages
  const [lang, setLang] = useState('en');

  // Toggle between English and Kannada
  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'kn' : 'en');
  };

  return (
    <>
      {/* Pass lang and toggleLang to navbar so it shows the toggle button */}
      <Navbar lang={lang} toggleLang={toggleLang} />
      <Routes>
        <Route exact path="/" element={<Home lang={lang} />} />
        <Route exact path="/request" element={<RequestRepair lang={lang} />} />
        {/* Mechanic dashboard gets its own independent lang — same toggle but mechanic can switch separately */}
        <Route exact path="/mechanic" element={<MechanicDashboard lang={lang} />} />
        <Route exact path="/track" element={<TrackRequest lang={lang} />} />
      </Routes>
    </>
  )
}

export default App
