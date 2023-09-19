import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DetailsPage from './components/DetailsPage';
import FavoritesPage from './components/FavoritePage';
import { AuthProvider } from './services/AuthContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:symbol" element={<DetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} /> {/* Add this route */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
