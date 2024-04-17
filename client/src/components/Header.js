// Header.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import useAuthStore from './authStore';
import ConfirmationDialog from './ConfirmationDialog';

function Header() {
  const { isLoggedIn, username, userPicture, userId, logout, deleteAccount } = useAuthStore();
  const history = useHistory();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleLogout = async () => {
    try {
      logout(history);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    setIsConfirmationOpen(true);
  };
  
  const confirmDeleteAccount = async () => {
    try {
      deleteAccount(userId, () => {
        alert('Your account has been successfully deleted. You are welcome back anytime!');
        handleLogout();
        setIsConfirmationOpen(false); // Close the confirmation dialog
      });
    } catch (error) {
      console.error('Error deleting account:', error);
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
              <button onClick={handleDeleteAccount} className="logout-button">Delete Account</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/sign-up" className="nav-link">Sign Up</Link>
          </>
        )}
      </div>
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmDeleteAccount}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </header>
  );
}

export default Header;
