// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/home/layout/Header';
import Footer from './components/home/layout/Footer';
import Hero from './components/home/Hero';
import About from './components/home/About';
import FinalCta from './components/home/FinalCta';
import Properties from './components/home/Properties';
import HowItWorks from './components/home/HowItWorks';
import OurSecurity from './components/home/OurSecurity';
import SignupPage from './components/auth/pages/SignupPage';
import LoginPage from './components/auth/pages/LoginPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Homepage with Header and Footer */}
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <About />
              <Properties />
              <HowItWorks />
              <OurSecurity />
              <FinalCta />
            </main>
            <Footer />
          </>
        } />
        
        {/* Auth pages without Header/Footer */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;