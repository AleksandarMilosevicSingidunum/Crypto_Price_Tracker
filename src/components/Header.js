import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';

export default function Header() {
  const { isLoggedIn, simulateLogin, simulateLogout } = useAuth();
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isFavoritesClicked, setIsFavoritesClicked] = useState(false);

  const handleHomeClick = () => {
    setIsHomeClicked(true);
    setIsFavoritesClicked(false);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesClicked(true);
    setIsHomeClicked(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex align-items-center">
              <Link
                className={`navbar-brand ${isHomeClicked ? 'text-primary font-weight-bold' : 'text-dark'}`}
                to="/"
                onClick={handleHomeClick}
              >
                Home
              </Link>
              {isLoggedIn && (
                <Link
                  className={` navbar-brand  ${isFavoritesClicked ? 'text-primary font-weight-bold' : 'text-dark'}`}
                  to="/favorites"
                  onClick={handleFavoritesClick}
                >
                  Favorite
                </Link>
              )}
            </div>
            <div className="btn-group">
              {isLoggedIn ? (
                <>
                  <div className="btn btn-success">Logged In</div>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={simulateLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button className="btn btn-info mx-2" onClick={simulateLogin}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
