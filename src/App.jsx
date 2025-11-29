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
          <Route
            path="/"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-primary-color">
                  DomiHive - Home Page Coming Soon
                </h1>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
