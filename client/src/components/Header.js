import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import useAuthStore from './authStore';
import ConfirmationDialog from './ConfirmationDialog';

function Header() {
  const { isLoggedIn, username, userPicture, userId, logout, deleteAccount } = useAuthStore();
  const history = useHistory();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const handleLogout = async () => {
    try {
      logout(history);
      setIsDropdownOpen(false); // Close the dropdown
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
        setIsDropdownOpen(false); // Close the dropdown
        setIsConfirmationOpen(false); // Close the confirmation dialog
        logout(history);
      });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUserDetails = () => {
    setShowUserDetails(!showUserDetails);
  };

  return (
    <header className="header">
      <div className="header-section">
        {/* Wrap the entire app title, including the logo, inside the Link component */}
        <Link to="/" className="header-title">
          Bazuu Fitness
          <span className="logo" role="img">
            🏋️‍♂️
          </span>
        </Link>
      </div>
      <div className="head-right-section">
        <Link to="/" className="home-button">Home</Link>
        {isLoggedIn && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/my-activities" className="home-button">My Activities</Link>
            <div style={{ position: 'relative' }}>
              <span 
                className="username home-button" 
                onClick={toggleDropdown}
              >
                <img src={userPicture} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
                {username}
              </span>
              {isDropdownOpen && (
                <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', backgroundColor: '#333', padding: '10px', borderRadius: '5px', zIndex: 999 }}>
                  <button onClick={handleLogout} className="dropdown-button" >Logout</button>
                  <button onClick={handleDeleteAccount} className="dropdown-button ">Delete Account</button>
                </div>
              )}
            </div>
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link to="/login" className="home-button">Login</Link>
            <Link to="/sign-up" className="home-button">Sign Up</Link>
          </>
        )}
      </div>
      <div className="user-details">
        {showUserDetails && (
          <div className="user-details-popup">
            <p>Username: {username}</p>
            <p>User ID: {userId}</p>
            {/* Add more user details as needed */}
          </div>
        )}
        {/* Bind toggleUserDetails directly to the onClick event of the username span */}
        <span className="username" onClick={toggleUserDetails}>
          {username}
        </span>
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
