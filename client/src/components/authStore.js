// authStore.js
import create from 'zustand';

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  userId: null, // Add userId field
  username: '',
  userPicture: '', // Add userPicture field
  checkSession: async () => {
    try {
      const response = await fetch('/check_session');
      if (response.ok) {
        const user = await response.json();
        set({ isLoggedIn: true, userId: user.userId, username: user.username, userPicture: user.picture }); // Store user's id, username, and picture
      } else {
        set({ isLoggedIn: false, userId: null, username: '', userPicture: '' });
      }
    } catch (error) {
      console.error('Error checking session:', error);
    }
  },
  login: async (credentials, history) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const user = await response.json();
        set({ isLoggedIn: true, userId: user.userId, username: user.username, userPicture: user.picture }); // Store user's id, username, and picture
        history.push('/');
      } else {
        // If login fails, handle error (e.g., show error message)
        const data = await response.json();
        console.error(data.message); // Log the error message
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  },
  logout: async (history) => {
    try {
      const response = await fetch('/logout', {
        method: 'DELETE',
      });
      if (response.ok) {
        set({ isLoggedIn: false, userId: null, username: '', userPicture: '' }); // Clear user's id, username, and picture
        history.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },
}));

export default useAuthStore;