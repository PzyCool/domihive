// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/home/layout/Header';
import Footer from './components/home/layout/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/signup" element={<div>Sign Up Page - To be built</div>} />
          <Route path="/login" element={<div>Login Page - To be built</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;