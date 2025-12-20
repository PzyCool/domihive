// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ListingTypeProvider } from './context/ListingTypeContext';
import App from './App.jsx';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ListingTypeProvider>
          <App />
        </ListingTypeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);