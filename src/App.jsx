// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/home/layout/Header';
import Footer from './components/home/layout/Footer';
// import Hero from './components/home/Hero';
import About from './components/home/About';
import FinalCta from './components/home/FinalCta';
// import Properties from './components/Properties/Properties';
import HowItWorks from './components/home/HowItWorks';
import OurSecurity from './components/home/OurSecurity';
// import GetApp from './components/home/GetApp';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              {/* <Hero /> */}
              <About />
              {/* <Properties /> */}
              <HowItWorks />
              <OurSecurity />
              {/* <GetApp /> */}
              <FinalCta />
            </>
          } />
          <Route path="/signup" element={<div>Sign Up Page - To be built</div>} />
          <Route path="/login" element={<div>Login Page - To be built</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;