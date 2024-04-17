// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import useAuthStore from './authStore';

function Header() {
  const { isLoggedIn, username, userPicture, checkSession, logout } = useAuthStore();
  const history = useHistory();

  useEffect(() => {
    checkSession();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });
      if (response.ok) {
        logout(history); // Use the logout function from the store
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-section">
        <h1 className="header-title">
          Bazuu Fitness
          <span className="logo" role="img">
            🏋️‍♂️
          </span>
        </h1>
      </div>
      <div className="head-right-section">
        <Link to="/" className="nav-link">Home</Link>
        {isLoggedIn ? (
          <>
             <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '20px', marginRight: '10px' }}>
              <img src={userPicture} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
            </span>
            <span style={{ fontSize: '20px' }}>
              {username}!
            </span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/sign-up" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
